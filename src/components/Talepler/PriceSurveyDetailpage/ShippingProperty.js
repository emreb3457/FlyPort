import { Box, Button, Select, Text, Input, Heading } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import {
  DefaultSelect,
  SelectInput,
  TextInput,
} from "../../Inputs/CustomInputs";
import colors from "../../../theme/colors";
import { useFormik } from "formik";
import { getShipping, shippingInsert } from "../../../api/api";
import { sendRequest } from "../../../utils/helpers";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { uzunlukBirim } from "../../../constants/other";

const ShippingProperty = (props) => {
  const { item, setFunctions } = props;
  const { detayId } = useParams();
  const [isEdit, setIsEdit] = useState(true);

  const { errors, handleChange, handleSubmit, values, touched, setFieldValue } =
    useFormik({
      initialValues: {
        id: item?.shipping?.id !== 0 ? item?.shipping?.id : undefined,
        teklifId: item?.teklifId || "",
        tasimaSekli: item?.shipping?.tasimaSekli || "",
        uzunluk: item?.shipping?.uzunluk || "",
        uzunlukBirim: item?.shipping?.uzunlukBirim || "",
        genislik: item?.shipping?.genislik || "",
        genislikBirim: item?.shipping?.genislikBirim || "",
        yukseklik: item?.shipping?.yukseklik || "",
        yukseklikBirim: item?.shipping?.yukseklikBirim || "",
        birimAgirlik: item?.shipping?.birimAgirlik || "",
        birimAgirlikBirim: item?.shipping?.birimAgirlikBirim || "",
        urunMiktari: item?.shipping?.urunMiktari || "",
        urunMiktariBirim: item?.shipping?.urunMiktariBirim || "",
        toplamM3: item?.shipping?.toplamM3 || "",
        toplamAgirlik: item?.shipping?.toplamAgirlik || "",
      },
      onSubmit: (values, { resetForm }) => {
        newPriceResearchSubmit({ values });
      },
    });

  useEffect(() => {
    setFunctions({
      create: !isEdit && { title: "Kaydet", function: handleSubmit },
      update: { title: "Düzenle", function: () => setIsEdit(false) },
    });
  }, [isEdit]);

  const newPriceResearchSubmit = async ({ values }) => {
    const { status } = await sendRequest(shippingInsert("_", { ...values }));
  };

  useEffect(() => {
    if (values.uzunluk && values.genislik && values.yukseklik) {
      const toplamM3 =
        Number(values.genislik) *
        Number(values.uzunluk) *
        Number(values.yukseklik) *
        values.urunMiktari;
      setFieldValue("toplamM3", toplamM3);
    }
    if (values.birimAgirlik) {
      const toplamAgırlık = Number(values.birimAgirlik) * values.urunMiktari;
      setFieldValue("toplamAgirlik", toplamAgırlık);
    }
  }, [
    values.uzunluk,
    values.genislik,
    values.yukseklik,
    values.urunMiktari,
    values.birimAgirlik,
  ]);

  return (
    <Box mt="20px">
      <Box textAlign={"center"}>
        <Button
          bg={colors.lightdarkblue}
          color="white"
          px="40px"
          fontSize={"20px"}
          _hover={{}}
        >
          Benzer Ürünleri Göster
        </Button>
      </Box>

      <Heading
        size="md"
        mb="27px"
        fontSize={"26px"}
        color={colors.lightdarkblue}
      >
        Kargo Bilgileri
      </Heading>
      <Box display={["block", "block", "block", "flex"]}>
        <Box width={{ lg: "35%", "2xl": "30%" }}>
          <TextInput
            name={"tasimaSekli"}
            value={values.tasimaSekli}
            onChange={handleChange}
            disabled={isEdit}
            error={touched.tasimaSekli && errors.tasimaSekli}
          >
            Ürün Ne İle Taşınıyor?{" "}
          </TextInput>
          <Box display={"flex"} alignItems="end">
            <TextInput
              pr="10px"
              name={"uzunluk"}
              value={values.uzunluk}
              onChange={handleChange}
              disabled={isEdit}
              error={touched.uzunluk && errors.uzunluk}
            >
              Uzunluğu
            </TextInput>
            <DefaultSelect
              name={"uzunlukBirim"}
              value={values.uzunlukBirim}
              onChange={handleChange}
              disabled={isEdit}
              data={uzunlukBirim}
              visableValue={"value"}
              error={touched.uzunlukBirim && errors.uzunlukBirim}
            >
              Birim
            </DefaultSelect>
          </Box>
          <Box display={"flex"} alignItems="end">
            <TextInput
              pr="10px"
              name={"genislik"}
              value={values.genislik}
              onChange={handleChange}
              disabled={isEdit}
              error={touched.genislik && errors.genislik}
            >
              Genişliği
            </TextInput>
            <DefaultSelect
              name={"genislikBirim"}
              value={values.genislikBirim}
              onChange={handleChange}
              disabled={isEdit}
              data={uzunlukBirim}
              visableValue={"value"}
              error={touched.genislikBirim && errors.genislikBirim}
            >
              Birim
            </DefaultSelect>
          </Box>
          <Box display={"flex"} alignItems="end">
            <TextInput
              pr="10px"
              name={"yukseklik"}
              value={values.yukseklik}
              onChange={handleChange}
              disabled={isEdit}
              error={touched.yukseklik && errors.yukseklik}
            >
              Yüksekliği
            </TextInput>
            <DefaultSelect
              name={"yukseklikBirim"}
              value={values.yukseklikBirim}
              onChange={handleChange}
              disabled={isEdit}
              data={uzunlukBirim}
              visableValue={"value"}
              error={touched.yukseklikBirim && errors.yukseklikBirim}
            >
              Birim
            </DefaultSelect>
          </Box>
          <Box display={"flex"} alignItems="end">
            <TextInput
              pr="10px"
              name={"birimAgirlik"}
              value={values.birimAgirlik}
              onChange={handleChange}
              disabled={isEdit}
              error={touched.birimAgirlik && errors.birimAgirlik}
            >
              Birim Ağırlığı
            </TextInput>
            <DefaultSelect
              name={"birimAgirlikBirim"}
              value={values.birimAgirlikBirim}
              onChange={handleChange}
              disabled={isEdit}
              data={uzunlukBirim}
              visableValue={"value"}
              error={touched.birimAgirlikBirim && errors.birimAgirlikBirim}
            >
              Birim
            </DefaultSelect>
          </Box>
        </Box>
        <Box width={{ lg: "35%", "2xl": "30%" }} ml="20px">
          <Box display={"flex"} alignItems="end">
            <TextInput
              pr="10px"
              name={"urunMiktari"}
              value={values.urunMiktari}
              onChange={handleChange}
              disabled={isEdit}
              error={touched.urunMiktari && errors.urunMiktari}
            >
              Koli İçindeki Ürün Miktarı
            </TextInput>
            <TextInput
              pl="10px"
              name={"urunMiktariBirim"}
              value={values.urunMiktariBirim}
              onChange={handleChange}
              disabled={isEdit}
              error={touched.urunMiktariBirim && errors.urunMiktariBirim}
            ></TextInput>
          </Box>
          <TextInput
            name={"toplamM3"}
            value={values.toplamM3}
            onChange={handleChange}
            disabled={true}
            error={touched.toplamM3 && errors.toplamM3}
          >
            Toplam M3
          </TextInput>
          <TextInput
            name={"toplamAgirlik"}
            value={values.toplamAgirlik}
            onChange={handleChange}
            disabled={true}
            error={touched.toplamAgirlik && errors.toplamAgirlik}
          >
            Toplam Ağırlık
          </TextInput>
        </Box>
      </Box>
    </Box>
  );
};

export default ShippingProperty;
