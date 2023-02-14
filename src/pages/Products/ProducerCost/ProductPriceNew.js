import { Box, Button, Flex, Text, Textarea } from "@chakra-ui/react";
import { useFormik } from "formik";
import {
  TextInput,
  SelectInput,
  DateInput,
  DefaultSelect,
} from "../../../components/Inputs/CustomInputs";
import { sendRequest, updateArrayState } from "../../../utils/helpers";
import useSWR from "swr";
import {
  getCountryTable,
  getCityTable,
  getDeliveryTable,
  getUnitTypeTable,
  getCurrencyTypeTable,
} from "../../../api/DefinitionsApi";
import { useState, useEffect } from "react";
import {
  getCompanyTable,
  productCustomsInsert,
  productPriceInsert,
} from "../../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import { useSideBarData } from "../../../context/SideBarContext";
import { ProductMenu } from "../../../constants/MenuItems";
import TabMenu from "../../../components/TabMenu";
import { UreticiFiyatiTabs } from "../../../constants/Tabs";

const ProductPriceNew = () => {
  const { detayId, id } = useParams();
  const { updateSideBar } = useSideBarData();
  const navigate = useNavigate();

  useEffect(() => {
    updateSideBar({ selectedSideBar: ProductMenu(id) });
  }, []);

  const [urunFiyatları, setUrunFiyatlari] = useState([
    {
      urunMiktar: 0,
      birimFiyati: 0,
      dovizCinsiId: 0,
      hazirlikMiktarSuresi: "",
      ambalajKutuFiyatDahil: "",
      ambalajKutuFiyat: 0,
      ambalajKutuDovizCinsiId: 0,
      toplamMaliyet: 0,
    },
  ]);

  const { errors, handleChange, handleSubmit, values, touched, setFieldValue } =
    useFormik({
      initialValues: {
        urunId: id,
        urunUlkeId: 0,
        urunSehirId: 0,
        urunTeslimUlkeId: 0,
        kargoId: 0,
        urunMiktar: "",
        urunHazirMiktar: "",
        urunHazirMiktarBirimi: "",
        aciklama: "",
        urunTeklifTarihi: "",
        urunTeklifGecerlilikTarihi: "",
        urunFiyat: [],
      },
      onSubmit: (values) => {
        createProductPrice({ values, detayId });
      },
    });
  const { data: Country, mutate } = useSWR(
    ["getCountryTable"],
    getCountryTable
  );

  const { data: City } = useSWR(
    ["getCityTable", values.urunUlkeId],
    getCityTable
  );

  const { data: Delivery } = useSWR(["getDeliveryTable"], getDeliveryTable);

  const { data: UnitType } = useSWR(["getUnitTypeTable"], getUnitTypeTable);

  const { data: CurrencyType } = useSWR(
    ["getCurrencyTypeTable"],
    getCurrencyTypeTable
  );

  const { data: Company } = useSWR(["getCompanyTable"], getCompanyTable);

  const createProductPrice = async ({ values, detayId }) => {
    const { status } = await sendRequest(
      productPriceInsert("_", {
        detayId,
        ...values,
      })
    );

    const { status: statusCustoms } = await sendRequest(
      productCustomsInsert("_", {
        urunId: Number(values.urunId),
        menseiUlkeId: values.urunUlkeId,
        cikisUlkeId: values.urunUlkeId,
        varisUlkeId: values.urunTeslimUlkeId,
      })
    );
    if (status && statusCustoms) {
      navigate(-1);
    }
  };

  return (
    <Box>
      <BreadCrumb
        funct1={{
          title: "Kaydet",
          function: () => {
            document.getElementById("addCompany").click();
          },
        }}
      >
        Üretici Fiyatı
      </BreadCrumb>
      <Box px="50px" mt="40px">
        <TabMenu
          tabs={UreticiFiyatiTabs(id)}
          activeTab={0}
          onClick={(tab) => navigate(tab.route, { state: { detayId } })}
          visible
        >
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
                <SelectInput
                  name={"urunUlkeId"}
                  value={values.urunUlkeId}
                  data={Country}
                  visableValue="adOrjinal"
                  onChange={setFieldValue}
                  error={touched.urunUlkeId && errors.urunUlkeId}
                >
                  Üreticinin Bulunduğu Ülke
                </SelectInput>
                <SelectInput
                  name={"urunSehirId"}
                  value={values.urunSehirId}
                  data={City}
                  visableValue="adOrjinal"
                  onChange={setFieldValue}
                  error={touched.urunSehirId && errors.urunSehirId}
                >
                  Üreticinin Bulunduğu Şehir
                </SelectInput>
                <SelectInput
                  name={"urunTeslimUlkeId"}
                  value={values.urunTeslimUlkeId}
                  data={Country}
                  visableValue="adOrjinal"
                  onChange={setFieldValue}
                  error={touched.urunTeslimUlkeId && errors.urunTeslimUlkeId}
                >
                  Teslim Yeri
                </SelectInput>
                <SelectInput
                  name={"kargoId"}
                  value={values.kargoId}
                  data={Delivery}
                  visableValue="ad"
                  onChange={setFieldValue}
                  error={touched.kargoId && errors.kargoId}
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
              </Box>
              <Box width={{ lg: "35%", "2xl": "30%" }} ml="17px">
                <Box display={"flex"} gap="10px">
                  <TextInput
                    name={"urunHazirMiktar"}
                    value={values.urunHazirMiktar}
                    onChange={handleChange}
                    error={touched.urunHazirMiktar && errors.urunHazirMiktar}
                  >
                    Hazır Olan Miktar
                  </TextInput>
                  <SelectInput
                    name={"urunHazirMiktarBirimiId"}
                    value={values.miktarBirimiId}
                    data={UnitType}
                    visableValue="ad"
                    onChange={setFieldValue}
                    error={
                      touched.urunHazirMiktarBirimiId &&
                      errors.urunHazirMiktarBirimiId
                    }
                  >
                    Miktar Birimi
                  </SelectInput>
                </Box>
                <DateInput
                  name={"urunTeklifTarihi"}
                  value={values.urunTeklifTarihi}
                  onChange={handleChange}
                  error={touched.urunTeklifTarihi && errors.urunTeklifTarihi}
                >
                  Teklifin Alındığı Tarih
                </DateInput>
                <DateInput
                  name={"urunTeklifGecerlilikTarihi"}
                  value={values.urunTeklifGecerlilikTarihi}
                  onChange={handleChange}
                  error={
                    touched.urunTeklifGecerlilikTarihi &&
                    errors.urunTeklifGecerlilikTarihi
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
            />
          </form>
          <Box mb="100px" pb="50px" overflow={"auto"}>
            <Text fontWeight={"bold"} fontSize="23px">
              Ürün Fiyatı
            </Text>
            <Box w={"100%"} height="2px" bg="#707070" />
            {urunFiyatları.map((item, index) => (
              <Box>
                <Flex gap={"10px"}>
                  <TextInput
                    name={"urunMiktar"}
                    value={urunFiyatları[index].urunMiktar}
                    onChange={(e) => {
                      updateArrayState(setUrunFiyatlari, index, e);
                    }}
                    error={touched.urunMiktar && errors.urunMiktar}
                  >
                    Ürün Miktarı
                  </TextInput>
                  <TextInput
                    name={"birimFiyati"}
                    value={urunFiyatları[index].birimFiyati}
                    onChange={(e) => {
                      updateArrayState(setUrunFiyatlari, index, e);
                    }}
                    error={touched.birimFiyati && errors.birimFiyati}
                  >
                    Birim Fiyatı
                  </TextInput>
                  <SelectInput
                    name={"dovizCinsiId"}
                    value={urunFiyatları[index].dovizCinsiId}
                    data={CurrencyType}
                    visableValue="ad"
                    onChange={(name, value) => {
                      updateArrayState(setUrunFiyatlari, index, {
                        name,
                        value,
                      });
                    }}
                    error={touched.dovizCinsiId && errors.dovizCinsiId}
                  >
                    Döviz Cinsi
                  </SelectInput>
                  <TextInput
                    name={"hazirlikMiktarSuresi"}
                    value={urunFiyatları[index].hazirlikMiktarSuresi}
                    onChange={(e) => {
                      updateArrayState(setUrunFiyatlari, index, e);
                    }}
                    error={
                      touched.hazirlikMiktarSuresi &&
                      errors.hazirlikMiktarSuresi
                    }
                    minW="300px"
                  >
                    İsteniken Miktar İcin Hazırlık Süresi
                  </TextInput>
                  <DefaultSelect
                    name={"ambalajKutuFiyatDahil"}
                    value={urunFiyatları[index].ambalajKutuFiyatDahil}
                    onChange={(e) => {
                      updateArrayState(setUrunFiyatlari, index, e);
                    }}
                    minW="250px"
                    data={[
                      { ad: "Evet", id: "evet" },
                      { ad: "Hayır", id: "hayır" },
                    ]}
                    visableValue={"ad"}
                    error={
                      touched.ambalajKutuFiyatDahil &&
                      errors.ambalajKutuFiyatDahil
                    }
                  >
                    Ambalaj / Kutu Fiyatı Dahil mi?
                  </DefaultSelect>
                  <TextInput
                    name={"ambalajKutuFiyat"}
                    value={urunFiyatları[index].ambalajKutuFiyat}
                    onChange={(e) => {
                      updateArrayState(setUrunFiyatlari, index, e);
                    }}
                    error={touched.ambalajKutuFiyat && errors.ambalajKutuFiyat}
                    minW="200px"
                  >
                    Ambalaj / Kutu Fiyatı?
                  </TextInput>
                  <SelectInput
                    name={"ambalajKutuDovizCinsiId"}
                    value={urunFiyatları[index].ambalajKutuDovizCinsiId}
                    data={CurrencyType}
                    visableValue="ad"
                    onChange={(e) => {
                      updateArrayState(setUrunFiyatlari, index, e);
                    }}
                    error={
                      touched.ambalajKutuDovizCinsiId &&
                      errors.ambalajKutuDovizCinsiId
                    }
                  >
                    Döviz Cinsi
                  </SelectInput>
                  <TextInput
                    name={"toplamMaliyet"}
                    value={urunFiyatları[index].toplamMaliyet}
                    onChange={(e) => {
                      updateArrayState(setUrunFiyatlari, index, e);
                    }}
                    error={touched.toplamMaliyet && errors.toplamMaliyet}
                    minW="300px"
                  >
                    Toplam Maliyet
                  </TextInput>
                </Flex>
              </Box>
            ))}
            <Button
              onClick={() =>
                setUrunFiyatlari((prev) => [
                  ...prev,
                  {
                    urunMiktar: 0,
                    birimFiyati: 0,
                    dovizCinsiId: 0,
                    hazirlikMiktarSuresi: "",
                    ambalajKutuFiyatDahil: "",
                    ambalajKutuFiyat: 0,
                    ambalajKutuDovizCinsiId: 0,
                    toplamMaliyet: 0,
                  },
                ])
              }
            >
              Yeni Ekle
            </Button>
          </Box>
        </TabMenu>
      </Box>
    </Box>
  );
};
export default ProductPriceNew;
