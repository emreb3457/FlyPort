import { Box, Button, Flex, Text, Textarea } from "@chakra-ui/react";
import { useFormik } from "formik";
import {
  TextInput,
  SelectInput,
  DefaultSelect,
} from "../../../components/Inputs/CustomInputs";
import {
  sendRequest,
  stringToBoolean,
  updateArrayState,
} from "../../../utils/helpers";
import SkeletonComp from "../../../components/Skeleton/Skeleton";
import { useState, useEffect } from "react";
import { productCargoInsert } from "../../../api/api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import { useSideBarData } from "../../../context/SideBarContext";
import { ProductMenu } from "../../../constants/MenuItems";
import { agirlikBirim, uzunlukBirim } from "../../../constants/other";

const NewProductCargo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateSideBar } = useSideBarData();
  const location = useLocation();

  useEffect(() => {
    updateSideBar({ selectedSideBar: ProductMenu(id) });
  }, []);

  const [loading, setLoading] = useState();
  const [kargoOzellikleri, setKargoOzellikleri] = useState([
    {
      tasimaSekli: "",
      uzunluk: 0,
      uzunlukBirim: "",
      genislik: 0,
      genislikBirim: "",
      yukseklik: 0,
      yukseklikBirim: "",
      birimAgirlik: 0,
      birimAgirlikBirim: "",
      urunMiktari: 0,
      urunMiktariBirim: "",
      urunKutulu: 0,
      parcaAciklama: "",
    },
  ]);

  const { errors, handleChange, handleSubmit, values, touched, setFieldValue } =
    useFormik({
      initialValues: {
        urunId: Number(id),
        urunDemonte: "",
        kargoOzellikleri: [],
        urunFiyatId: Number(location.state.detayId),
      },
      onSubmit: (values) => {
        createProductPrice({ values, detayId: location.state.detayId });
      },
    });

  const createProductPrice = async ({ values, detayId }) => {
    values.kargoOzellikleri = kargoOzellikleri;
    setLoading(true);
    const { status } = await sendRequest(
      productCargoInsert("_", {
        ...values,
        urunDemonte: stringToBoolean(values?.urunDemonte),
      })
    );
    if (status) {
      setLoading(false);
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
        Yeni Kargo Özelliği
      </BreadCrumb>
      {loading ? (
        <SkeletonComp />
      ) : (
        <Box px="50px" mt="40px" mb="100px">
          <form onSubmit={handleSubmit}>
            <Box display={["block", "block", "block", "block"]} mt="20px">
              <Box width={{ lg: "35%", "2xl": "30%" }}>
                <DefaultSelect
                  name={"demontemi"}
                  value={false}
                  onChange={handleChange}
                  minW="250px"
                  data={[
                    { ad: "Evet", id: "true" },
                    { ad: "Hayır", id: "false" },
                  ]}
                  visableValue={"ad"}
                  error={touched.demontemi && errors.demontemi}
                >
                  Ürün Demonte mi?
                </DefaultSelect>

                {!stringToBoolean(values.demontemi) && (
                  <Box>
                    <DefaultSelect
                      name={"urunKutulu"}
                      value={kargoOzellikleri[0].urunKutulu}
                      onChange={(e) => {
                        updateArrayState(setKargoOzellikleri, 0, e);
                      }}
                      minW="250px"
                      data={[
                        { ad: "Evet", id: 1 },
                        { ad: "Hayır", id: 0 },
                      ]}
                      visableValue={"ad"}
                      error={touched.demontemi && errors.demontemi}
                    >
                      Ürün Kutulu mu?
                    </DefaultSelect>
                    <TextInput
                      name={"tasimaSekli"}
                      value={kargoOzellikleri[0].tasimaSekli}
                      onChange={(e) => {
                        updateArrayState(setKargoOzellikleri, 0, e);
                      }}
                      error={touched.tasimaSekli && errors.tasimaSekli}
                    >
                      Ürün Ne İle Taşınıyor?
                    </TextInput>
                    <Box display={"flex"} alignItems="end">
                      <TextInput
                        pr="10px"
                        name={"uzunluk"}
                        value={kargoOzellikleri[0].uzunluk}
                        onChange={(e) => {
                          updateArrayState(setKargoOzellikleri, 0, e);
                        }}
                        error={touched.uzunluk && errors.uzunluk}
                      >
                        Uzunluğu
                      </TextInput>
                      <DefaultSelect
                        name={"uzunlukBirim"}
                        value={kargoOzellikleri[0].uzunlukBirim}
                        onChange={(e) => {
                          updateArrayState(setKargoOzellikleri, 0, e);
                        }}
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
                        value={kargoOzellikleri[0].genislik}
                        onChange={(e) => {
                          updateArrayState(setKargoOzellikleri, 0, e);
                        }}
                        error={touched.genislik && errors.genislik}
                      >
                        Genişliği
                      </TextInput>
                      <DefaultSelect
                        name={"genislikBirim"}
                        value={kargoOzellikleri[0].genislikBirim}
                        onChange={(e) => {
                          updateArrayState(setKargoOzellikleri, 0, e);
                        }}
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
                        value={kargoOzellikleri[0].yukseklik}
                        onChange={(e) => {
                          updateArrayState(setKargoOzellikleri, 0, e);
                        }}
                        error={touched.yukseklik && errors.yukseklik}
                      >
                        Yüksekliği
                      </TextInput>
                      <DefaultSelect
                        name={"yukseklikBirim"}
                        value={kargoOzellikleri[0].yukseklikBirim}
                        onChange={(e) => {
                          updateArrayState(setKargoOzellikleri, 0, e);
                        }}
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
                        value={kargoOzellikleri[0].birimAgirlik}
                        onChange={(e) => {
                          updateArrayState(setKargoOzellikleri, 0, e);
                        }}
                        error={touched.birimAgirlik && errors.birimAgirlik}
                      >
                        Birim Ağırlığı
                      </TextInput>
                      <DefaultSelect
                        name={"birimAgirlikBirim"}
                        value={kargoOzellikleri[0].birimAgirlikBirim}
                        onChange={(e) => {
                          updateArrayState(setKargoOzellikleri, 0, e);
                        }}
                        data={agirlikBirim}
                        visableValue={"value"}
                        error={
                          touched.birimAgirlikBirim && errors.birimAgirlikBirim
                        }
                      >
                        Birim
                      </DefaultSelect>
                    </Box>
                    <Box display={"flex"} alignItems="end">
                      <TextInput
                        pr="10px"
                        name={"urunMiktari"}
                        value={kargoOzellikleri[0].urunMiktari}
                        onChange={(e) => {
                          updateArrayState(setKargoOzellikleri, 0, e);
                        }}
                        error={touched.urunMiktari && errors.urunMiktari}
                      >
                        Ürün Miktarı
                      </TextInput>
                      <TextInput
                        pr="10px"
                        name={"urunMiktariBirim"}
                        value={kargoOzellikleri[0].urunMiktariBirim}
                        onChange={(e) => {
                          updateArrayState(setKargoOzellikleri, 0, e);
                        }}
                        error={
                          touched.urunMiktariBirim && errors.urunMiktariBirim
                        }
                      >
                        Birim
                      </TextInput>
                    </Box>
                  </Box>
                )}
              </Box>
              {stringToBoolean(values.demontemi) && (
                <Box my="50px" overflow={"auto"}>
                  <Box w={"100%"} height="2px" bg="#707070" />
                  {kargoOzellikleri.map((item, index) => (
                    <Box>
                      <Flex gap={"10px"} alignItems="center">
                        <TextInput
                          maxW="180px"
                          name={"tasimaSekli"}
                          value={kargoOzellikleri[index].tasimaSekli}
                          onChange={(e) => {
                            updateArrayState(setKargoOzellikleri, index, e);
                          }}
                          error={touched.tasimaSekli && errors.tasimaSekli}
                        >
                          Ürün Ne İle Taşınıyor?
                        </TextInput>
                        <Box display={"flex"} alignItems="end">
                          <TextInput
                            pr="10px"
                            name={"uzunluk"}
                            value={kargoOzellikleri[index].uzunluk}
                            onChange={(e) => {
                              updateArrayState(setKargoOzellikleri, index, e);
                            }}
                            error={touched.uzunluk && errors.uzunluk}
                          >
                            Uzunluğu
                          </TextInput>
                          <DefaultSelect
                            maxW="80px"
                            name={"uzunlukBirim"}
                            value={kargoOzellikleri[index].uzunlukBirim}
                            onChange={(e) => {
                              updateArrayState(setKargoOzellikleri, index, e);
                            }}
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
                            value={kargoOzellikleri[index].genislik}
                            onChange={(e) => {
                              updateArrayState(setKargoOzellikleri, index, e);
                            }}
                            error={touched.genislik && errors.genislik}
                          >
                            Genişliği
                          </TextInput>
                          <DefaultSelect
                            maxW="80px"
                            name={"genislikBirim"}
                            value={kargoOzellikleri[index].genislikBirim}
                            onChange={(e) => {
                              updateArrayState(setKargoOzellikleri, index, e);
                            }}
                            data={uzunlukBirim}
                            visableValue={"value"}
                            error={
                              touched.genislikBirim && errors.genislikBirim
                            }
                          >
                            Birim
                          </DefaultSelect>
                        </Box>
                        <Box display={"flex"} alignItems="end">
                          <TextInput
                            pr="10px"
                            name={"yukseklik"}
                            value={kargoOzellikleri[index].yukseklik}
                            onChange={(e) => {
                              updateArrayState(setKargoOzellikleri, index, e);
                            }}
                            error={touched.yukseklik && errors.yukseklik}
                          >
                            Yüksekliği
                          </TextInput>
                          <DefaultSelect
                            maxW="80px"
                            name={"yukseklikBirim"}
                            value={kargoOzellikleri[index].yukseklikBirim}
                            onChange={(e) => {
                              updateArrayState(setKargoOzellikleri, index, e);
                            }}
                            data={uzunlukBirim}
                            visableValue={"value"}
                            error={
                              touched.yukseklikBirim && errors.yukseklikBirim
                            }
                          >
                            Birim
                          </DefaultSelect>
                        </Box>
                        <Box display={"flex"} alignItems="end">
                          <TextInput
                            pr="10px"
                            name={"birimAgirlik"}
                            value={kargoOzellikleri[index].birimAgirlik}
                            onChange={(e) => {
                              updateArrayState(setKargoOzellikleri, index, e);
                            }}
                            error={touched.birimAgirlik && errors.birimAgirlik}
                          >
                            Birim Ağırlığı
                          </TextInput>
                          <DefaultSelect
                            maxW="80px"
                            name={"birimAgirlikBirim"}
                            value={kargoOzellikleri[index].birimAgirlikBirim}
                            onChange={(e) => {
                              updateArrayState(setKargoOzellikleri, index, e);
                            }}
                            data={agirlikBirim}
                            visableValue={"value"}
                            error={
                              touched.birimAgirlikBirim &&
                              errors.birimAgirlikBirim
                            }
                          >
                            Birim
                          </DefaultSelect>
                        </Box>
                        <Box display={"flex"} alignItems="end">
                          <TextInput
                            pr="10px"
                            name={"urunMiktari"}
                            value={kargoOzellikleri[index].urunMiktari}
                            onChange={(e) => {
                              updateArrayState(setKargoOzellikleri, index, e);
                            }}
                            error={touched.urunMiktari && errors.urunMiktari}
                          >
                            Ürün Miktarı
                          </TextInput>
                          <TextInput
                            pr="10px"
                            name={"urunMiktariBirim"}
                            value={kargoOzellikleri[index].urunMiktariBirim}
                            onChange={(e) => {
                              updateArrayState(setKargoOzellikleri, index, e);
                            }}
                            error={
                              touched.urunMiktariBirim &&
                              errors.urunMiktariBirim
                            }
                          >
                            Birim
                          </TextInput>
                        </Box>
                        <TextInput
                          maxW="150px"
                          name={"parcaAciklama"}
                          value={kargoOzellikleri[index].parcaAciklama}
                          onChange={(e) => {
                            updateArrayState(setKargoOzellikleri, index, e);
                          }}
                          error={touched.parcaAciklama && errors.parcaAciklama}
                        >
                          Parça Açıklama
                        </TextInput>
                      </Flex>
                    </Box>
                  ))}
                  <Button
                    mb="50px"
                    onClick={() =>
                      setKargoOzellikleri((prev) => [
                        ...prev,
                        {
                          tasimaSekli: "",
                          uzunluk: 0,
                          uzunlukBirim: "",
                          genislik: 0,
                          genislikBirim: "",
                          yukseklik: 0,
                          yukseklikBirim: "",
                          birimAgirlik: 0,
                          birimAgirlikBirim: "",
                          urunMiktari: 0,
                          urunMiktariBirim: "",
                          toplamM3: 0,
                          toplamAgirlik: 0,
                          urunDemonte: 0,
                          urunKutulu: 0,
                          tasimaTipId: 0,
                          parcaAciklama: "",
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
      )}
    </Box>
  );
};
export default NewProductCargo;
