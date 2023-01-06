import { Box, Button, Textarea, Text } from "@chakra-ui/react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ListTable from "../../components/ListTable";
import useSWR from "swr";
import {
  getCountryTable,
  getCurrencyTypeTable,
} from "../../api/DefinitionsApi";
import BasicModal from "../../helpers/Modal";
import SkeletonComp from "../../components/Skeleton/Skeleton";
import { useModalStatus } from "../../hooks/useModalStatus";
import {
  DateInput,
  SelectInput,
  TextInput,
} from "../../components/Inputs/CustomInputs";
import React, { useState } from "react";
import { useFormik } from "formik";
import { otherCosts } from "../../utils/validation";
import { sendRequest } from "../../utils/helpers";
import {
  otherCostsInsert,
  otherCostsRemove,
  otherCostsTable,
  otherCostsUpdate,
} from "../../api/api";
import { useParams } from "react-router-dom";

const OtherCostsList = () => {
  const { clickFunct, isClick } = useModalStatus();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(999);
  const [radioValue, setRadioValue] = React.useState({});
  const [submitType, setSubmitType] = React.useState("");
  const { id } = useParams();
  const { data, mutate, error } = useSWR(
    ["getOtherCosts", id],
    otherCostsTable
  );
  const { data: CurrencyType } = useSWR(
    ["getCurrencyTypeTable", page, limit],
    getCurrencyTypeTable
  );

  const { data: Company } = useSWR(
    ["getCompanyTable", page, limit],
    getCountryTable
  );

  const {
    errors,
    handleChange,
    handleSubmit,
    values,
    setValues,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      teklifUrunId: id,
      islemYapan: "",
      tedarikciFirmaId: "",
      ozelKod: "",
      giderTipi: "",
      giderTuru: "",
      not: "",
      birimFiyat: "",
      dovizCinsiId: "",
      kdvOrani: "",
      kdvDahilTutari: "",
      toplamMaliyetUSD: "",
      gecerlilikTarihi: "",
    },
    onSubmit: (values, { resetForm }) => {
      submitType === "create"
        ? newOtherCostsSubmit({ values, mutate })
        : updateOtherCostsSubmit({
            values,
            mutate,
            id: radioValue.id,
          });
      resetForm();
      document.getElementsByClassName("chakra-modal__close-btn")[0].click();
    },
    validationSchema: otherCosts,
  });
  console.log(errors);

  const Head = [
    {
      title: "ID",
      column: "id",
    },
    {
      title: "Gider Tipi",
      column: "giderTipi",
    },
    {
      title: "Gider Kalemi",
      column: "giderTuru",
    },
    {
      title: "Tutar",
      column: "kdvDahilTutari",
    },
    {
      title: "Doviz Cinsi",
      column: "kdvOrani",
    },
    {
      title: "USD Tutarı",
      column: "toplamMaliyetUSD",
    },
  ];

  const loading = !error && !data;

  const newOtherCostsSubmit = async ({ values, mutate }) => {
    const { status } = await sendRequest(
      otherCostsInsert("", {
        ...values,
      })
    );
    status && mutate();
  };

  const updateOtherCostsSubmit = async ({ values, mutate, id }) => {
    const { status } = await sendRequest(
      otherCostsUpdate("", {
        id,
        ...values,
      })
    );
    status && mutate();
  };

  const removeOtherCosts = async ({ radioValue, mutate }) => {
    if (radioValue) {
      const { status } = await sendRequest(
        otherCostsRemove("_", radioValue.id)
      );
      status && mutate();
    }
  };

  const NewOtherCostsComp = ({
    handleChange,
    setFieldValue,
    values,
    handleSubmit,
  }) => {
    return (
      <form onSubmit={handleSubmit} style={{ padding: "10px 0" }}>
        <Box mt="20px" px={"38px"}>
          <Box display={"flex"}>
            <Box width={"30%"}>
              <TextInput
                name={"islemYapan"}
                value={values.islemYapan}
                onChange={handleChange}
                error={touched.islemYapan && errors.islemYapan}
              >
                İşlemi Yapan
              </TextInput>
              <SelectInput
                name={"tedarikciFirmaId"}
                value={values.tedarikciFirmaId}
                onChange={setFieldValue}
                data={Company}
                visableValue={"adOrjinal"}
                error={touched.tedarikciFirmaId && errors.tedarikciFirmaId}
              >
                Tedarikci Firma
              </SelectInput>
              <TextInput
                name={"ozelKod"}
                value={values.ozelKod}
                onChange={handleChange}
                error={touched.ozelKod && errors.ozelKod}
              >
                Özel Kod
              </TextInput>
              <TextInput
                name={"giderTipi"}
                value={values.giderTipi}
                onChange={handleChange}
                error={touched.giderTipi && errors.giderTipi}
              >
                Gider Tipi
              </TextInput>
              <TextInput
                name={"giderTuru"}
                value={values.giderTuru}
                onChange={handleChange}
                error={touched.giderTuru && errors.giderTuru}
              >
                Gider Türü
              </TextInput>
              <TextInput
                name={"aciklama"}
                value={values.aciklama}
                onChange={handleChange}
                error={touched.aciklama && errors.aciklama}
              >
                Açıklama
              </TextInput>
            </Box>
            <Box width={"30%"} ml="50px">
              <TextInput
                name={"birimFiyat"}
                value={values.birimFiyat}
                onChange={handleChange}
                type={"number"}
                error={touched.birimFiyat && errors.birimFiyat}
              >
                Birim Fiyatı
              </TextInput>
              <SelectInput
                name={"dovizCinsiId"}
                value={values.dovizCinsiId}
                onChange={setFieldValue}
                data={CurrencyType}
                visableValue={"ad"}
                error={touched.dovizCinsiId && errors.dovizCinsiId}
              >
                Doviz Cinsi
              </SelectInput>
              <TextInput
                name={"kdvOrani"}
                value={values.kdvOrani}
                onChange={handleChange}
                type={"number"}
                error={touched.kdvOrani && errors.kdvOrani}
              >
                KDV Oranı
              </TextInput>
              <TextInput
                name={"kdvDahilTutari"}
                value={values.kdvDahilTutari}
                onChange={handleChange}
                type={"number"}
                error={touched.kdvDahilTutari && errors.kdvDahilTutari}
              >
                KDV Dahil Tutar
              </TextInput>
              <TextInput
                name={"toplamMaliyetUSD"}
                value={values.toplamMaliyetUSD}
                onChange={handleChange}
                type={"number"}
                error={touched.toplamMaliyetUSD && errors.toplamMaliyetUSD}
              >
                Toplam Maliyet USD
              </TextInput>
              <DateInput
                name={"gecerlilikTarihi"}
                value={values.gecerlilikTarihi}
                onChange={handleChange}
                error={touched.gecerlilikTarihi && errors.gecerlilikTarihi}
              >
                Geçerlilik Tarihi
              </DateInput>
            </Box>
            <Box w="40%" ml={{ lg: "50px" }}>
              <Text fontSize={"22px"}>Not</Text>
              <Textarea
                maxW="1000px"
                minH="200px"
                border={"1px solid #9B9696"}
                borderRadius="21px"
                mt="10px"
                name={"not"}
                value={values.not}
                onChange={handleChange}
              />
            </Box>
          </Box>
        </Box>
        <Button type="submit" float={"right"}>
          {submitType === "create" ? "Ekle" : "Güncelle"}
        </Button>
      </form>
    );
  };

  return loading ? (
    <SkeletonComp />
  ) : (
    <Box>
      <BreadCrumb
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
            removeOtherCosts({ radioValue, mutate });
          },
        }}
      >
        Diğer Maliyet
      </BreadCrumb>
      <Box mt="20px" px={"38px"}>
        <ListTable
          id="OtherCosts"
          head={Head}
          row={data}
          radioValue={radioValue}
          radioSetValue={setRadioValue}
          link={false}
        />
      </Box>
      <BasicModal
        size={"6xl"}
        click={isClick}
        title={submitType === "create" ? "Yeni Maliyet" : "Güncelle"}
        formik={{ handleChange, handleSubmit, values }}
        component={NewOtherCostsComp({
          handleChange,
          values,
          handleSubmit,
          setFieldValue,
        })}
      />
    </Box>
  );
};
export default React.memo(OtherCostsList);
