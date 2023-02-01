import { Box } from "@chakra-ui/react";
import useSWR from "swr";
import React from "react";
import { useParams } from "react-router-dom";
import {
  productCertificatesInsert,
  productCertificatesRemove,
  productCertificatesTable,
} from "../../../api/api";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import SkeletonComp from "../../Skeleton/Skeleton";
import ListTable from "../../ListTable";
import { sendRequest } from "../../../utils/helpers";
import { useModalStatus } from "../../../hooks/useModalStatus";
import { useFormik } from "formik";
import BasicModal from "../../../helpers/Modal";
import { Button } from "devextreme-react";
import { TextInput } from "../../Inputs/CustomInputs";
const ProductCertificates = () => {
  const { clickFunct, isClick } = useModalStatus();
  const { id } = useParams();
  const [radioValue, setRadioValue] = React.useState({});
  const [submitType, setSubmitType] = React.useState("");

  const { data, mutate, error } = useSWR(
    ["productCertificatesTable", id],
    productCertificatesTable
  );

  const loading = !error && !data;

  const { errors, handleChange, handleSubmit, values, touched, setValues } =
    useFormik({
      initialValues: {
        Ad: "",
        UrunId: id,
        formFiles: "",
        DosyaYolu: "",
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
      column: "musteriAd",
    },
    {
      title: "Bitiş Tarihi",
      column: "urun",
    },
    {
      title: "Belge Geçerli mi?",
      column: "ozellik1",
    },
  ];

  const newProductCertificatesSubmit = async ({ values, mutate }) => {
    const formData = new FormData();
    formData.append("Ad", values.UrunAdi);
    formData.append("KisaAdi", values.KisaAdi);
    formData.append("GTip", values.GTip);
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
          name={"ad"}
          value={values.ad}
          onChange={handleChange}
          error={touched?.ad && errors.ad}
        >
          Ad
        </TextInput>
        <TextInput
          name={"aciklama"}
          value={values.aciklama}
          onChange={handleChange}
          error={touched?.aciklama && errors.aciklama}
        >
          Acıklama
        </TextInput>
        <Button type="submit">
          {submitType === "create" ? "Ekle" : "Güncelle"}
        </Button>
      </form>
    );
  };

  return loading ? (
    <SkeletonComp />
  ) : (
    <Box>
      {/* <BreadCrumb
        selectValue={radioValue}
        funct1={{
          title: "Yeni Ekle",
          function: () => {
            setSubmitType("create");
            clickFunct();
          },
        }}
        funct2={{
          title: "Düzenle",
          function: () => {
            setSubmitType("update");
            setValues({
              ...radioValue,
            });
            clickFunct();
          },
        }}
        funct3={{
          function: () => {
            removeProductCertificates({ radioValue, mutate });
          },
        }}
      >
        Sertifikalar
      </BreadCrumb> */}
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
        formik={{ handleChange, handleSubmit, values }}
        component={NewProductCertificatesComp({
          handleChange,
          values,
          handleSubmit,
        })}
      />
    </Box>
  );
};
export default ProductCertificates;
