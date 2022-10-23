import { Box, Text, Textarea } from "@chakra-ui/react";
import { useFormik } from "formik";
import { TextInput, SelectInput } from "../../components/Inputs/CustomInputs";
import { sendRequest } from "../../utils/helpers";
import { newDemandValidate } from "../../utils/validation";
import { getDemandInsert } from "../../api/api";
import useSWR from "swr";
import { getCountryList, getCityList } from "../../api/DefinitionsApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";

const CompanyInfermation = (props) => {
  const { item, isEdit } = props;
  console.log(item);
  const navigate = useNavigate();
  const [submitLoading, setSublitLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(999);

  const data = {
    firmaUnvanı: item?.firmaUnvani,
    kısaAdı: item?.kısaAd,
    ulke: item?.ulke,
    ulkeId: item?.ulkeId,
    sehir: item?.sehir,
    sehirId: item?.sehirId,
    adres: item?.adres,
    acikAdres: item?.acikAdresi,
    postaKodu: item?.postaKodu,
    vergiDairesi: item?.vergiDairesi,
    vergiNo: item?.vergiNo,
    sektoru: item?.sektoru,
  };

  const { data: Country } = useSWR(
    ["getCountryList", page, limit],
    getCountryList
  );

  const { data: City } = useSWR(["getCityList", page, limit], getCityList);

  const { errors, handleChange, handleSubmit, values, touched } = useFormik({
    initialValues: {
      FirmaUnvani: data.firmaUnvanı || "",
      KisaAd: data.kısaAdı || "",
      UlkeId: data.ulkeId || "",
      SehirId: data.sehirId || "",
      Adres: data.adres || "",
      PostaKodu: data.postaKodu || "",
      AcikAdresi: data.acikAdres || "",
      VergiDairesi: data.vergiDairesi || "",
      VergiNo: data.vergiNo || "",
      Sektoru: data.sektoru || "",
    },
    onSubmit: (values, { resetForm }) => {
      newCompanySubmit({ values });
    },
    validationSchema: newDemandValidate,
  });

  const newCompanySubmit = async ({ values }) => {
    setSublitLoading(true);
    const { status } = await sendRequest(getDemandInsert("", { ...values }));
    if (status) {
      setSublitLoading(false);
      navigate(routes.company);
    }
  };
  return (
    <Box px="50px" mt="40px">
      <form onSubmit={handleSubmit}>
        <Text fontSize={"24px"} fontWeight="bold">
          Firma Bilgileri
        </Text>
        <Box display={["block", "block", "block", "flex"]} mt="20px">
          <Box width={{ lg: "35%", "2xl": "30%" }}>
            <TextInput
              name={"FirmaUnvani"}
              value={values.FirmaUnvani}
              onChange={handleChange}
              error={touched.FirmaUnvani && errors.FirmaUnvani}
              disabled={isEdit}
            >
              Firma Unvanı
            </TextInput>
            <TextInput
              name={"KisaAd"}
              value={values.KisaAd}
              onChange={handleChange}
              error={touched.KisaAd && errors.KisaAd}
              disabled={isEdit}
            >
              Kısa Adı
            </TextInput>
            <SelectInput
              name={"UlkeId"}
              value={values.UlkeId}
              data={Country?.data}
              visableValue="adOrjinal"
              onChange={handleChange}
              error={touched.UlkeId && errors.UlkeId}
              disabled={isEdit}
            >
              Ülke
            </SelectInput>
            <SelectInput
              name={"SehirId"}
              value={values.SehirId}
              data={City?.data}
              visableValue="adOrjinal"
              onChange={handleChange}
              error={touched.SehirId && errors.SehirId}
              disabled={isEdit}
            >
              Şehir
            </SelectInput>
            <TextInput
              name={"Adres"}
              value={values.Adres}
              onChange={handleChange}
              error={touched.Adres && errors.Adres}
              disabled={isEdit}
            >
              Adres
            </TextInput>
            <TextInput
              name={"PostaKodu"}
              value={values.PostaKodu}
              onChange={handleChange}
              error={touched.PostaKodu && errors.PostaKodu}
              disabled={isEdit}
            >
              Posta Kodu
            </TextInput>
          </Box>
          <Box width={{ lg: "35%", "2xl": "30%" }} ml="17px">
            <Box>
              <Text fontSize={"18px"}>Açık Adresi</Text>
              <Textarea
                maxW="100%"
                minH="200px"
                border={"1px solid #9B9696"}
                borderRadius="21px"
                mt="10px"
                name={"AcikAdresi"}
                value={values.AcikAdresi}
                onChange={handleChange}
                disabled={isEdit}
              />
            </Box>
          </Box>
          <Box width={{ lg: "35%", "2xl": "30%" }} ml="17px">
            <TextInput
              name={"VergiDairesi"}
              value={values.VergiDairesi}
              onChange={handleChange}
              error={touched.VergiDairesi && errors.VergiDairesi}
              disabled={isEdit}
            >
              Vergi Dairesi
            </TextInput>
            <TextInput
              name={"VergiNo"}
              value={values.VergiNo}
              onChange={handleChange}
              error={touched.VergiNo && errors.VergiNo}
              disabled={isEdit}
            >
              Vergi No
            </TextInput>
            <TextInput
              name={"Sektoru"}
              value={values.Sektoru}
              onChange={handleChange}
              error={touched.Sektoru && errors.Sektoru}
              disabled={isEdit}
            >
              Sektörü
            </TextInput>
          </Box>
        </Box>
        <button
          id="addCompanyInfermation"
          type="submit"
          style={{ visibility: "hidden" }}
        ></button>
      </form>
    </Box>
  );
};
export default CompanyInfermation;
