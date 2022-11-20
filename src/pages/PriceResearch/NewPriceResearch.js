import { Box, Text, Textarea } from "@chakra-ui/react";
import { useFormik } from "formik";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import {
  TextInput,
  SelectInput,
  DateInput,
} from "../../components/Inputs/CustomInputs";
import { sendRequest } from "../../utils/helpers";
import { newCompanyValidate } from "../../utils/validation";
import useSWR from "swr";
import {
  getCountryList,
  getCityList,
  getDeliveryList,
  getUnitTypeList,
} from "../../api/DefinitionsApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";
import { getCompanyInsert } from "../../api/api";

const NewCompany = () => {
  const navigate = useNavigate();
  const [submitLoading, setSublitLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(999);

  const { errors, handleChange, handleSubmit, values, touched } = useFormik({
    initialValues: {
      talepId: "",
      ureticiFirmaUnvani: "",
      istenilenUrunAynisiMi: "",
      ureticininBulunduguUlkeId: "",
      ureticininBulunduguSehirId: "",
      teslimSekliId: "",
      ucretlendirmeyeEsasMiktarBirimiId: "",
      hazirOlanMiktar: "",
      miktarBirimiId: "",
      istenikenMiktarIcinHazirlikSuresi: "",
      birimFiyati: "",
      dovizCinsi: "",
      teklifinAlindigiTarihi: "",
      teklifGecerlilikTarihi: "",
      aciklama: "",
    },
    onSubmit: (values, { resetForm }) => {
      newCompanySubmit({ values });
    },
    validationSchema: newCompanyValidate,
  });

  const { data: Country, mutate } = useSWR(
    ["getCountryList", page, limit],
    getCountryList
  );

  const { data: City } = useSWR(
    ["getCityList", values.ureticininBulunduguUlkeId, page, limit],
    getCityList
  );

  const { data: Delivery } = useSWR(
    ["getDeliveryList", page, limit],
    getDeliveryList
  );

  const { data: UnitType } = useSWR(
    ["getUnitTypeList", page, limit],
    getUnitTypeList
  );

  const newCompanySubmit = async ({ values }) => {
    setSublitLoading(true);
    const { status } = await sendRequest(getCompanyInsert("", { ...values }));
    if (status) {
      setSublitLoading(false);
      navigate(routes.company);
    }
    setSublitLoading(false);
  };
  return (
    <Box>
      <BreadCrumb
        loading={submitLoading}
        funct1={{
          title: "Kaydet",
          function: () => {
            document.getElementById("addCompany").click();
          },
        }}
      >
        Yeni Fiyat Araştırma
      </BreadCrumb>

      <Box px="50px" mt="40px">
        <form onSubmit={handleSubmit}>
          <Text fontSize={"24px"} fontWeight="bold">
            Üretici Firma Ünvanı
          </Text>
          <Box display={["block", "block", "block", "flex"]} mt="20px">
            <Box width={{ lg: "35%", "2xl": "30%" }}>
              <SelectInput
                name={"istenilenUrunAynisiMi"}
                value={values.istenilenUrunAynisiMi}
                onChange={handleChange}
                data={[
                  { ad: "Evet", id: 1 },
                  { ad: "Hayır", id: 2 },
                ]}
                visableValue={"ad"}
                error={
                  touched.istenilenUrunAynisiMi && errors.istenilenUrunAynisiMi
                }
              >
                İstenen Ürünün Aynısı mı?
              </SelectInput>
              <SelectInput
                name={"ureticininBulunduguUlkeId"}
                value={values.ureticininBulunduguUlkeId}
                data={Country?.data}
                visableValue="adOrjinal"
                onChange={handleChange}
                error={
                  touched.ureticininBulunduguUlkeId &&
                  errors.ureticininBulunduguUlkeId
                }
              >
                Üreticinin Bulunduğu Ülke
              </SelectInput>
              <SelectInput
                name={"ureticininBulunduguUlkeId"}
                value={values.ureticininBulunduguSehirId}
                data={City?.data}
                visableValue="adOrjinal"
                onChange={handleChange}
                error={
                  touched.ureticininBulunduguSehirId &&
                  errors.ureticininBulunduguSehirId
                }
              >
                Üreticinin Bulunduğu Şehir
              </SelectInput>
              <SelectInput
                name={"teslimSekliId"}
                value={values.teslimSekliId}
                data={Delivery?.data}
                visableValue="ad"
                onChange={handleChange}
                error={touched.teslimSekliId && errors.teslimSekliId}
              >
                Teslim Şekli
              </SelectInput>
              <SelectInput
                name={"ucretlendirmeyeEsasMiktarBirimiId"}
                value={values.ucretlendirmeyeEsasMiktarBirimiId}
                data={Delivery?.data}
                visableValue="adOrjinal"
                onChange={handleChange}
                error={
                  touched.ucretlendirmeyeEsasMiktarBirimiId &&
                  errors.ucretlendirmeyeEsasMiktarBirimiId
                }
              >
                Ücretlendirmeye Esas Miktar Birimi
              </SelectInput>
              <Box display={"flex"} gap="10px">
                <TextInput
                  name={"hazirOlanMiktar"}
                  value={values.hazirOlanMiktar}
                  onChange={handleChange}
                  error={touched.hazirOlanMiktar && errors.hazirOlanMiktar}
                >
                  Hazır Olan Miktar
                </TextInput>
                <SelectInput
                  name={"miktarBirimiId"}
                  value={values.miktarBirimiId}
                  data={UnitType?.data}
                  visableValue="ad"
                  onChange={handleChange}
                  error={touched.miktarBirimiId && errors.miktarBirimiId}
                >
                  Miktar Birimi
                </SelectInput>
              </Box>
            </Box>
            <Box width={{ lg: "35%", "2xl": "30%" }} ml="17px">
              <TextInput
                name={"birimFiyati"}
                value={values.birimFiyati}
                onChange={handleChange}
                error={touched.birimFiyati && errors.birimFiyati}
              >
                1 Birim Fiyatı
              </TextInput>
              <TextInput
                name={"dovizCinsi"}
                value={values.dovizCinsi}
                onChange={handleChange}
                error={touched.dovizCinsi && errors.dovizCinsi}
              >
                Doviz Cinsi
              </TextInput>
              <DateInput
                name={"Sektoru"}
                value={values.teklifGecerlilikTarihi}
                onChange={handleChange}
                error={
                  touched.teklifGecerlilikTarihi &&
                  errors.teklifGecerlilikTarihi
                }
              >
                Teklifin Geçerlilik Tarihi
              </DateInput>
            </Box>
          </Box>
          <button
            id="addCompany"
            type="submit"
            style={{ visibility: "hidden" }}
          ></button>
        </form>
      </Box>
    </Box>
  );
};

export default NewCompany;

//firma detay bağlancak
//talep detay eksiklere bakılacak
