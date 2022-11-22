import { Box, Text, Textarea } from "@chakra-ui/react";
import { useFormik } from "formik";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import {
  TextInput,
  SelectInput,
  DateInput,
} from "../../components/Inputs/CustomInputs";
import { sendRequest } from "../../utils/helpers";
import { newCompanyValidate, newPriceResearch } from "../../utils/validation";
import useSWR from "swr";
import {
  getCountryList,
  getCityList,
  getDeliveryList,
  getUnitTypeList,
  getCurrencyTypeList,
} from "../../api/DefinitionsApi";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";
import {
  getCompanyInsert,
  getCompanyList,
  getPriceResearchInsert,
} from "../../api/api";

const NewPriceResearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [submitLoading, setSublitLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(999);

  const { errors, handleChange, handleSubmit, values, touched } = useFormik({
    initialValues: {
      talepUrunId: location.state,
      ureticiFirmaId: "",
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
      teklifGecerlilikTarihi: "",
      aciklama: "",
    },
    onSubmit: (values, { resetForm }) => {
      newPriceResearchSubmit({ values });
    },
    validationSchema: newPriceResearch,
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

  const { data: CurrencyType } = useSWR(
    ["getCurrencyTypeList", page, limit],
    getCurrencyTypeList
  );

  const { data: Company } = useSWR(
    ["getCompanyList", page, limit],
    getCompanyList
  );

  const newPriceResearchSubmit = async ({ values }) => {
    setSublitLoading(true);
    const { status } = await sendRequest(
      getPriceResearchInsert("", { ...values })
    );
    if (status) {
      setSublitLoading(false);
      navigate(routes.teklif);
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
          <Box display={["block", "block", "block", "flex"]} mt="20px">
            <Box width={{ lg: "35%", "2xl": "30%" }}>
              <SelectInput
                name={"ureticiFirmaId"}
                value={values.ureticiFirmaId}
                data={Company?.data}
                visableValue="firmaUnvani"
                onChange={handleChange}
                error={touched.ureticiFirmaId && errors.ureticiFirmaId}
              >
                Üretici Firma Ünvanı
              </SelectInput>
              <SelectInput
                name={"istenilenUrunAynisiMi"}
                value={values.istenilenUrunAynisiMi}
                onChange={handleChange}
                data={[
                  { ad: "Evet", id: true },
                  { ad: "Hayır", id: false },
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
                name={"ureticininBulunduguSehirId"}
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
                data={UnitType?.data}
                visableValue="ad"
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
                name={"istenikenMiktarIcinHazirlikSuresi"}
                value={values.istenikenMiktarIcinHazirlikSuresi}
                onChange={handleChange}
                error={
                  touched.istenikenMiktarIcinHazirlikSuresi &&
                  errors.istenikenMiktarIcinHazirlikSuresi
                }
              >
                İsteniken Miktar İcin Hazırlık Süresi
              </TextInput>
              <TextInput
                name={"birimFiyati"}
                value={values.birimFiyati}
                onChange={handleChange}
                error={touched.birimFiyati && errors.birimFiyati}
              >
                1 Birim Fiyatı
              </TextInput>
              <SelectInput
                name={"dovizCinsi"}
                value={values.dovizCinsi}
                data={CurrencyType?.data}
                visableValue="ad"
                onChange={handleChange}
                error={touched.dovizCinsi && errors.dovizCinsi}
              >
                Döviz Cinsi
              </SelectInput>
              <DateInput
                name={"teklifGecerlilikTarihi"}
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
            <Box width={{ lg: "35%", "2xl": "30%" }} ml="17px">
              <Box pl="30px">
                <Text fontSize={"22px"}>Açıklama</Text>
                <Textarea
                  maxW="1000px"
                  minH="200px"
                  border={"1px solid #9B9696"}
                  borderRadius="21px"
                  mt="10px"
                  name={"aciklama"}
                  value={values.aciklama}
                  onChange={handleChange}
                />
              </Box>
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

export default NewPriceResearch;

//firma detay bağlancak
//talep detay eksiklere bakılacak
