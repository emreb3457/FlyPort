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
  getProduct,
} from "../../../api/api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import { useSideBarData } from "../../../context/SideBarContext";
import TabMenu from "../../../components/TabMenu";
import { UreticiFiyatiTabs } from "../../../constants/Tabs";
import ImageComp from "../../../components/Talepler/ImageComp/ImageComp";
import { baseApi } from "../../../config/config";

const ProductPriceNew = () => {
  const { detayId, id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isHovering, setIsHovering] = useState(false);
  const [images, setImages] = useState([]);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const [urunFiyatları, setUrunFiyatlari] = useState(
    location.state.detay
      ? location.state.detay.urunFiyat
      : [
          {
            urunMiktar: "",
            birimFiyati: "",
            dovizCinsiId: 5,
            hazirlikMiktarSuresi: "",
            ambalajKutuFiyatDahil: "",
            ambalajKutuFiyat: "",
            ambalajKutuDovizCinsiId: "",
            toplamMaliyet: "",
          },
        ]
  );

  useEffect(() => {}, [urunFiyatları]);
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

  const { data: ProductDetail } = useSWR(["ProductDetail", id], getProduct);

  const { data: Delivery } = useSWR(["getDeliveryTable"], getDeliveryTable);

  const { data: UnitType } = useSWR(["getUnitTypeTable"], getUnitTypeTable);

  const { data: CurrencyType } = useSWR(
    ["getCurrencyTypeTable"],
    getCurrencyTypeTable
  );
  const { data: Company } = useSWR(["getCompanyTable"], getCompanyTable);

  const createProductPrice = async ({ values, detayId }) => {
    values.urunFiyat = sumPriceArray(urunFiyatları);
    if (detayId) {
      values.id = Number(detayId);
    }
    try {
      const { status } = await sendRequest(
        productPriceInsert("_", {
          ...values,
          detayId,
          urunMenseiUlkeId: values.urunMenseiUlkeId,
        })
      );
      if (status) {
        const { status: statusCustoms } = await sendRequest(
          productCustomsInsert("_", {
            urunId: Number(values.urunId),
            menseiUlkeId: values.urunMenseiUlkeId,
            cikisUlkeId: values.urunMenseiUlkeId,
            varisUlkeId: values.teslimYeriUlkeId,
          })
        );
        if (statusCustoms) {
          navigate(-1);
        }
      }
    } catch (error) {}
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

  useEffect(() => {
    ProductDetail?.resimler?.forEach((image) =>
      setImages((prev) => [...prev, baseApi + image.dosyaYolu])
    );
  }, [ProductDetail]);

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
          <Box>
            <Text
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              mt="20px"
              fontWeight={"medium"}
              fontSize="20px"
            >
              {ProductDetail?.urunAdi}
            </Text>
            {isHovering && (
              <Box
                position={"absolute"}
                backgroundColor={"white"}
                boxShadow={"base"}
                zIndex={2}
                padding="10px"
                borderRadius={"5px"}
              >
                <ImageComp images={images} />
              </Box>
            )}
          </Box>
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
                    type={"number"}
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
                      disabled
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
              const ambalajKutuFiyat =
                item?.ambalajKutuFiyatDahil === "evet"
                  ? 0
                  : item?.ambalajKutuFiyat || 0;

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
                      type={"number"}
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
                      type={"number"}
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
                      value={ambalajKutuFiyat}
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
                      type={"number"}
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
                      type={"number"}
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
                    dovizCinsiId: 5,
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
