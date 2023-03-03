import { Box, Button, Flex, Text, Textarea } from "@chakra-ui/react";
import { useFormik } from "formik";
import {
  TextInput,
  SelectInput,
  DateInput,
  DefaultSelect,
} from "../../../components/Inputs/CustomInputs";
import {
  sendRequest,
  sumPriceArray,
  updateArrayState,
} from "../../../utils/helpers";
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
  productPriceDetail,
} from "../../../api/api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import { useSideBarData } from "../../../context/SideBarContext";
import { ProductMenu } from "../../../constants/MenuItems";
import TabMenu from "../../../components/TabMenu";
import { UreticiFiyatiTabs } from "../../../constants/Tabs";

const ProductPriceNew = () => {
  const { detayId, id } = useParams();
  const { updateSideBar } = useSideBarData();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    updateSideBar({ selectedSideBar: ProductMenu(id) });
  }, []);

  const [urunFiyatları, setUrunFiyatlari] = useState(
    location.state.detay
      ? location.state.detay.urunFiyat
      : [
          {
            urunMiktar: "",
            birimFiyati: "",
            dovizCinsiId: " ",
            hazirlikMiktarSuresi: "",
            ambalajKutuFiyatDahil: "",
            ambalajKutuFiyat: "",
            ambalajKutuDovizCinsiId: "",
            toplamMaliyet: "",
          },
        ]
  );

  useEffect(() => {
    console.log(sumPriceArray(urunFiyatları));
  }, [urunFiyatları]);
  const { errors, handleChange, handleSubmit, values, touched, setFieldValue } =
    useFormik({
      initialValues: {
        urunId: Number(id),
        ...location.state.detay,
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
    ["getCityTable", values.urunMenseiUlkeId],
    getCityTable
  );

  const { data: Detail } = useSWR(
    ["productPriceDetail", detayId],
    productPriceDetail
  );

  const { data: Delivery } = useSWR(["getDeliveryTable"], getDeliveryTable);

  const { data: UnitType } = useSWR(["getUnitTypeTable"], getUnitTypeTable);

  const { data: CurrencyType } = useSWR(
    ["getCurrencyTypeTable"],
    getCurrencyTypeTable
  );
  const { data: Company } = useSWR(["getCompanyTable"], getCompanyTable);

  const createProductPrice = async ({ values, detayId }) => {
    values.urunFiyat = urunFiyatları;
    if (detayId) {
      values.id = detayId;
    }
    const { status } = await sendRequest(
      productPriceInsert("_", {
        ...values,
        detayId,
        urunMenseiUlkeId: values.urunMenseiUlkeId,
      })
    );

    const { status: statusCustoms } = await sendRequest(
      productCustomsInsert("_", {
        urunId: Number(values.urunId),
        menseiUlkeId: values.urunMenseiUlkeId,
        cikisUlkeId: values.urunMenseiUlkeId,
        varisUlkeId: values.teslimYeriUlkeId,
      })
    );
    if (status && statusCustoms) {
      navigate(-1);
    }
  };

  useEffect(() => {
    if (values.ucretlendirmeyeEsasMiktarBirimiId) {
      setFieldValue("urunHazirMiktarBirimiId", 0);
      setTimeout(() => {
        setFieldValue(
          "urunHazirMiktarBirimiId",
          values.ucretlendirmeyeEsasMiktarBirimiId
        );
      }, 10);
    }
  }, [values.ucretlendirmeyeEsasMiktarBirimiId]);

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
          isVisible={detayId}
        >
          <form onSubmit={handleSubmit}>
            <Box display={["block", "block", "block", "flex"]} mt="20px">
              <Box width={{ lg: "35%", "2xl": "30%" }}>
                <SelectInput
                  name={"firmaUnvanId"}
                  value={values.firmaUnvanId}
                  data={Company}
                  visableValue="kisaAdi"
                  onChange={setFieldValue}
                  error={touched.firmaUnvanId && errors.firmaUnvanId}
                >
                  Üretici Firma Ünvanı
                </SelectInput>
                <SelectInput
                  name={"urunMenseiUlkeId"}
                  value={values.urunMenseiUlkeId}
                  data={Country}
                  visableValue="adOrjinal"
                  onChange={setFieldValue}
                  error={touched.urunMenseiUlkeId && errors.urunMenseiUlkeId}
                >
                  Üreticinin Bulunduğu Ülke
                </SelectInput>
                <SelectInput
                  name={"ureticiSehirId"}
                  value={values.ureticiSehirId}
                  data={City}
                  visableValue="adOrjinal"
                  onChange={setFieldValue}
                  error={touched.ureticiSehirId && errors.ureticiSehirId}
                >
                  Üreticinin Bulunduğu Şehir
                </SelectInput>
                <SelectInput
                  name={"teslimYeriUlkeId"}
                  value={values.teslimYeriUlkeId}
                  data={Country}
                  visableValue="adOrjinal"
                  onChange={setFieldValue}
                  error={touched.teslimYeriUlkeId && errors.teslimYeriUlkeId}
                >
                  Teslim Yeri
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
                  {values.urunHazirMiktarBirimiId !== 0 && (
                    <SelectInput
                      name={"urunHazirMiktarBirimiId"}
                      value={values.ucretlendirmeyeEsasMiktarBirimiId}
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
                  )}
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
            {urunFiyatları.map((item, index) => {
              const urunMiktar = item?.urunMiktar || 0;
              const birimFiyati = item?.birimFiyati || 0;
              const ambalajKutuFiyat = item?.ambalajKutuFiyat || 0;
              const toplamFiyat =
                Number(urunMiktar) * Number(birimFiyati) +
                Number(ambalajKutuFiyat);

              return (
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
                      error={
                        touched.ambalajKutuFiyat && errors.ambalajKutuFiyat
                      }
                      minW="200px"
                      disabled={
                        urunFiyatları[index].ambalajKutuFiyatDahil === "evet" ||
                        !urunFiyatları[index].ambalajKutuFiyatDahil
                      }
                    >
                      Ambalaj / Kutu Fiyatı?
                    </TextInput>
                    <SelectInput
                      name={"ambalajKutuDovizCinsiId"}
                      value={urunFiyatları[index].ambalajKutuDovizCinsiId}
                      data={CurrencyType}
                      visableValue="ad"
                      onChange={(name, value) => {
                        updateArrayState(setUrunFiyatlari, index, {
                          name,
                          value,
                        });
                      }}
                      error={
                        touched.ambalajKutuDovizCinsiId &&
                        errors.ambalajKutuDovizCinsiId
                      }
                      disabled={
                        urunFiyatları[index].ambalajKutuFiyatDahil === "evet" ||
                        !urunFiyatları[index].ambalajKutuFiyatDahil
                      }
                    >
                      Döviz Cinsi
                    </SelectInput>
                    <TextInput
                      name={"toplamMaliyet"}
                      value={toplamFiyat}
                      onChange={(e) => {
                        updateArrayState(setUrunFiyatlari, index, e);
                      }}
                      error={touched.toplamMaliyet && errors.toplamMaliyet}
                      minW="300px"
                      disabled
                    >
                      Toplam Maliyet
                    </TextInput>
                  </Flex>
                </Box>
              );
            })}
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
