import { Box, Text, Textarea } from "@chakra-ui/react";
import { useFormik } from "formik";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import {
  TextInput,
  SelectInput,
  DateInput,
  DefaultSelect,
} from "../../components/Inputs/CustomInputs";
import { sendRequest } from "../../utils/helpers";
import { newPriceResearch } from "../../utils/validation";
import useSWR from "swr";
import {
  getCountryTable,
  getCityTable,
  getDeliveryTable,
  getUnitTypeTable,
  getCurrencyTypeTable,
} from "../../api/DefinitionsApi";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";
import { getCompanyTable, getPriceResearchInsert } from "../../api/api";

const NewPriceResearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(999);

  const { errors, handleChange, handleSubmit, values, touched, setFieldValue } =
    useFormik({
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
    ["getCountryTable", page, limit],
    getCountryTable
  );

  const { data: City } = useSWR(
    ["getCityTable", values.ureticininBulunduguUlkeId, page, limit],
    values.ureticininBulunduguUlkeId && getCityTable
  );

  const { data: Delivery } = useSWR(
    ["getDeliveryTable", page, limit],
    getDeliveryTable
  );

  const { data: UnitType } = useSWR(
    ["getUnitTypeTable", page, limit],
    getUnitTypeTable
  );

  const { data: CurrencyType } = useSWR(
    ["getCurrencyTypeTable", page, limit],
    getCurrencyTypeTable
  );

  const { data: Company } = useSWR(
    ["getCompanyTable", page, limit],
    getCompanyTable
  );

  const newPriceResearchSubmit = async ({ values }) => {
    setSubmitLoading(true);
    const { status } = await sendRequest(
      getPriceResearchInsert("", { ...values })
    );
    if (status) {
      setSubmitLoading(false);
      navigate(routes.gorevler);
    }
    setSubmitLoading(false);
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
                data={Company}
                visableValue="firmaUnvani"
                onChange={setFieldValue}
                error={touched.ureticiFirmaId && errors.ureticiFirmaId}
              >
                Üretici Firma Ünvanı
              </SelectInput>
              <DefaultSelect
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
              </DefaultSelect>
              <SelectInput
                name={"ureticininBulunduguUlkeId"}
                value={values.ureticininBulunduguUlkeId}
                data={Country}
                visableValue="adOrjinal"
                onChange={setFieldValue}
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
                data={City}
                visableValue="adOrjinal"
                onChange={setFieldValue}
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
                data={Delivery}
                visableValue="ad"
                onChange={setFieldValue}
                error={touched.teslimSekliId && errors.teslimSekliId}
              >
                Teslim Şekli
              </SelectInput>
              <SelectInput
                name={"ucretlendirmeyeEsasMiktarBirimiId"}
                value={values.ucretlendirmeyeEsasMiktarBirimiId}
                data={UnitType}
                visableValue="ad"
                onChange={setFieldValue}
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
                  data={UnitType}
                  visableValue="ad"
                  onChange={setFieldValue}
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
                data={CurrencyType}
                visableValue="ad"
                onChange={setFieldValue}
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
