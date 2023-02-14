import { Box, Button, Image, Text } from "@chakra-ui/react";
import useSWR from "swr";
import React from "react";
import { useParams } from "react-router-dom";
import {
  productCertificatesInsert,
  productCertificatesRemove,
  productCertificatesTable,
} from "../../api/api";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import SkeletonComp from "../../components/Skeleton/Skeleton";
import ListTable from "../../components/ListTable";
import { sendRequest } from "../../utils/helpers";
import { useModalStatus } from "../../hooks/useModalStatus";
import { useDrawerStatus } from "../../hooks/useDrawerStatus";
import { useFormik } from "formik";
import BasicModal from "../../helpers/Modal";
import {
  DateInput,
  DefaultSelect,
  TextInput,
} from "../../components/Inputs/CustomInputs";
import DrawerModal from "../../helpers/DraverModal";
import { baseApi } from "../../config/config";

const ProductCertificates = () => {
  const { clickFunct, isClick } = useModalStatus();
  const { clickFunct: drawerClick, isClick: isDrawerClick } = useDrawerStatus();
  const { id } = useParams();

  const [radioValue, setRadioValue] = React.useState({});
  const [submitType, setSubmitType] = React.useState("");

  const { data, mutate, error } = useSWR(
    ["productCertificatesTable", id],
    productCertificatesTable
  );

  const loading = !error && !data;

  const {
    errors,
    handleChange,
    handleSubmit,
    values,
    touched,
    setValues,
    setFieldValue,
  } = useFormik({
    initialValues: {
      Ad: "",
      UrunId: id,
      formFiles: "",
      BaslangicTarihi: "",
      BitisTarihi: "",
      BelgeGecerliMi: "",
    },
    onSubmit: (values, { resetForm }) => {
      newProductCertificatesSubmit({ values, mutate });
      resetForm();
      document.getElementsByClassName("chakra-modal__close-btn")[0].click();
    },
  });

  const Head = [
    {
      title: "ID",
      column: "id",
    },
    {
      title: "Belge Adı",
      column: "ad",
    },
    {
      title: "Başlangıç Tarihi",
      column: "baslangicTarihi",
    },
    {
      title: "Bitiş Tarihi",
      column: "bitisTarihi",
    },
    {
      title: "Belge Geçerli mi?",
      column: "belgeGecerliMi",
    },
  ];

  const newProductCertificatesSubmit = async ({ values, mutate }) => {
    const formData = new FormData();
    formData.append("Ad", values.Ad);
    formData.append("UrunId", values.UrunId);
    formData.append("formFiles", values.formFiles[0]);
    formData.append("BaslangicTarihi", values.BaslangicTarihi);
    formData.append("BitisTarihi", values.BitisTarihi);
    formData.append("BelgeGecerliMi", values.BelgeGecerliMi);

    const { status } = await sendRequest(
      productCertificatesInsert("", formData)
    );

    status && mutate();
  };

  const removeProductCertificates = async ({ radioValue, mutate }) => {
    const { status } = await sendRequest(
      productCertificatesRemove("_", radioValue.id)
    );
    status && mutate();
  };

  const NewProductCertificatesComp = ({
    handleChange,
    values,
    handleSubmit,
  }) => {
    return (
      <form onSubmit={handleSubmit} style={{ padding: "10px 0" }}>
        <TextInput
          name={"Ad"}
          value={values.Ad}
          onChange={handleChange}
          error={touched?.Ad && errors.Ad}
        >
          Belge Adı
        </TextInput>
        <DateInput
          name={"BaslangicTarihi"}
          value={values.BaslangicTarihi}
          onChange={handleChange}
          error={touched.BaslangicTarihi && errors.BaslangicTarihi}
        >
          Başlangıç Tarihi
        </DateInput>
        <DateInput
          name={"BitisTarihi"}
          value={values.BitisTarihi}
          onChange={handleChange}
          error={touched.BitisTarihi && errors.BitisTarihi}
        >
          Bitiş Tarihi
        </DateInput>
        <DefaultSelect
          name={"BelgeGecerliMi"}
          value={values.BelgeGecerliMi}
          onChange={handleChange}
          data={[
            { ad: "Evet", id: "Evet" },
            { ad: "Hayır", id: "Hayır" },
          ]}
          visableValue={"ad"}
          error={touched.BelgeGecerliMi && errors.BelgeGecerliMi}
        >
          Belge Geçerli mi?
        </DefaultSelect>
        <input
          id="file-input"
          type="file"
          onChange={(e) => setFieldValue("formFiles", e.target.files)}
        />

        <Button type="submit">Ekle</Button>
      </form>
    );
  };

  return loading ? (
    <SkeletonComp />
  ) : (
    <Box>
      <BreadCrumb
        selectValue={radioValue}
        funct1={{
          title: "Yeni Ekle",
          function: () => {
            setSubmitType("create");
            clickFunct();
          },
        }}
        funct2={{
          title: "Göster",
          function: () => {
            setSubmitType("update");
            setValues({
              ...radioValue,
            });
            drawerClick();
          },
        }}
        funct3={{
          function: () => {
            removeProductCertificates({ radioValue, mutate });
          },
        }}
      >
        Sertifikalar
      </BreadCrumb>
      <Box mt="20px" px={"38px"}>
        <ListTable
          id="ProductCertificates"
          head={Head}
          row={data}
          radioValue={radioValue}
          radioSetValue={setRadioValue}
          link={true}
          select={true}
        />
      </Box>
      <BasicModal
        click={isClick}
        title={submitType === "create" ? "Serfitika Ekle" : ""}
        component={NewProductCertificatesComp({
          handleChange,
          values,
          handleSubmit,
        })}
      />
      <DrawerModal
        click={isDrawerClick}
        component={
          <Box>
            <Text mt="50px" mb="20px" fontSize={"18px"} fontWeight="bold">
              {radioValue.ad}
            </Text>
            <Image src={baseApi + radioValue.dosyaYolu} height="400px" />
          </Box>
        }
      />
    </Box>
  );
};
export default ProductCertificates;
