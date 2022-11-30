import { Box, Button, Select, Text, Input, Heading } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { SelectInput, TextInput } from "../../Inputs/CustomInputs";
import colors from "../../../theme/colors";
import { useFormik } from "formik";
import { shippingInsert } from "../../../api/api";
import { sendRequest } from "../../../utils/helpers";
import { useParams } from "react-router-dom";

const ShippingProperty = (props) => {
  const { item, setFunctions } = props;
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(true);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(999);

  const { errors, handleChange, handleSubmit, values, touched, setFieldValue } =
    useFormik({
      initialValues: {
        teklifId: item?.id,
        tasimaSekli: "",
        uzunluk: "",
        uzunlukBirim: "",
        genislik: "",
        genislikBirim: "",
        yukseklik: "",
        yukseklikBirim: "",
        birimAgirlik: "",
        birimAgirlikBirim: "",
        urunMiktari: "",
        urunMiktariBirim: "",
        toplamM3: "",
        toplamAgirlik: "",
      },
      onSubmit: (values, { resetForm }) => {
        newPriceResearchSubmit({ values });
        resetForm();
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
            <TextInput
              pl="10px"
              name={"uzunlukBirim"}
              value={values.uzunlukBirim}
              onChange={handleChange}
              disabled={isEdit}
              error={touched.uzunlukBirim && errors.uzunlukBirim}
            ></TextInput>
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
            <TextInput
              pl="10px"
              name={"genislikBirim"}
              value={values.genislikBirim}
              onChange={handleChange}
              disabled={isEdit}
              error={touched.genislikBirim && errors.genislikBirim}
            ></TextInput>
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
            <TextInput
              pl="10px"
              name={"yukseklikBirim"}
              value={values.yukseklikBirim}
              onChange={handleChange}
              disabled={isEdit}
              error={touched.yukseklikBirim && errors.yukseklikBirim}
            ></TextInput>
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
            <TextInput
              pl="10px"
              name={"birimAgirlikBirim"}
              value={values.birimAgirlikBirim}
              onChange={handleChange}
              disabled={isEdit}
              error={touched.birimAgirlikBirim && errors.birimAgirlikBirim}
            ></TextInput>
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
