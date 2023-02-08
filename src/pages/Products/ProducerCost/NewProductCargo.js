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
import { useParams } from "react-router-dom";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import { useSideBarData } from "../../../context/SideBarContext";
import { ProductMenu } from "../../../constants/MenuItems";
import { uzunlukBirim } from "../../../constants/other";

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
};

const NewProductCargo = () => {
  const { detayId, id } = useParams();
  const { updateSideBar } = useSideBarData();

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
        demontemi: "hayır",
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
        Yeni Kargo Özelliği
      </BreadCrumb>
      <Box px="50px" mt="40px">
        <form onSubmit={handleSubmit}>
          <Box display={["block", "block", "block", "block"]} mt="20px">
            <Box width={{ lg: "35%", "2xl": "30%" }}>
              <DefaultSelect
                name={"demontemi"}
                value={false}
                onChange={handleChange}
                minW="250px"
                data={[
                  { ad: "Evet", id: "evet" },
                  { ad: "Hayır", id: "hayır" },
                ]}
                visableValue={"ad"}
                error={touched.demontemi && errors.demontemi}
              >
                Ürün Demonte mi?
              </DefaultSelect>

              {values.demontemi === "hayır" && (
                <Box>
                  <DefaultSelect
                    name={""}
                    value={false}
                    onChange={handleChange}
                    minW="250px"
                    data={[
                      { ad: "Evet", id: "evet" },
                      { ad: "Hayır", id: "hayır" },
                    ]}
                    visableValue={"ad"}
                    error={touched.demontemi && errors.demontemi}
                  >
                    Ürün Kutulu mu?
                  </DefaultSelect>
                  <TextInput
                    name={"tasimaSekli"}
                    value={values.tasimaSekli}
                    onChange={handleChange}
                    error={touched.tasimaSekli && errors.tasimaSekli}
                  >
                    Ürün Ne İle Taşınıyor?
                  </TextInput>
                  <Box display={"flex"} alignItems="end">
                    <TextInput
                      pr="10px"
                      name={"uzunluk"}
                      value={values.uzunluk}
                      onChange={handleChange}
                      error={touched.uzunluk && errors.uzunluk}
                    >
                      Uzunluğu
                    </TextInput>
                    <DefaultSelect
                      name={"uzunlukBirim"}
                      value={values.uzunlukBirim}
                      onChange={handleChange}
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
                      error={touched.genislik && errors.genislik}
                    >
                      Genişliği
                    </TextInput>
                    <DefaultSelect
                      name={"genislikBirim"}
                      value={values.genislikBirim}
                      onChange={handleChange}
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
                      error={touched.yukseklik && errors.yukseklik}
                    >
                      Yüksekliği
                    </TextInput>
                    <DefaultSelect
                      name={"yukseklikBirim"}
                      value={values.yukseklikBirim}
                      onChange={handleChange}
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
                      error={touched.birimAgirlik && errors.birimAgirlik}
                    >
                      Birim Ağırlığı
                    </TextInput>
                    <DefaultSelect
                      name={"birimAgirlikBirim"}
                      value={values.birimAgirlikBirim}
                      onChange={handleChange}
                      data={uzunlukBirim}
                      visableValue={"value"}
                      error={
                        touched.birimAgirlikBirim && errors.birimAgirlikBirim
                      }
                    >
                      Birim
                    </DefaultSelect>
                  </Box>
                </Box>
              )}
            </Box>
            {values.demontemi === "evet" && (
              <Box my="50px" overflow={"auto"}>
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
                        error={
                          touched.ambalajKutuFiyat && errors.ambalajKutuFiyat
                        }
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
                  mb="50px"
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
            )}
          </Box>
          <button
            id="addCompany"
            type="submit"
            style={{ visibility: "hidden" }}
          />
        </form>
      </Box>
    </Box>
  );
};
export default NewProductCargo;
