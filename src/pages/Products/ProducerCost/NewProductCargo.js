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
import useSWR from "swr";
import { getUnitTypeTable } from "../../../api/DefinitionsApi";

const NewProductCargo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState();
  const [kargoOzellikleri, setKargoOzellikleri] = useState(
    location.state.detay
      ? location.state?.detay?.kargoOzellikleri
      : [
          {
            tasimaSekli: "",
            uzunluk: "",
            uzunlukBirimId: "",
            genislik: "",
            yukseklik: "",
            yukseklikBirimId: "",
            birimAgirlik: "",
            birimAgirlikBirimId: "",
            urunMiktari: "",
            urunMiktariBirimId: "",
            urunKutulu: "",
            parcaAciklama: "",
          },
        ]
  );

  const { errors, handleChange, handleSubmit, values, touched, setFieldValue } =
    useFormik({
      initialValues: {
        urunId: Number(id),
        urunDemonte: location.state?.detay?.urunDemonte || "",
        kargoOzellikleri: location.state?.detay?.kargoOzellikleri || [],
        urunFiyatId: Number(location.state.detayId),
      },
      onSubmit: (values) => {
        createProductPrice({ values, detayId: location.state.detayId });
      },
    });

  const createProductPrice = async ({ values, detayId }) => {
    console.log(kargoOzellikleri);
    const newCargo = kargoOzellikleri.map((item) => {
      return {
        ...item,
        urunKutulu: stringToBoolean(item?.urunKutulu),
      };
    });

    values.kargoOzellikleri = newCargo;
    setLoading(true);
    if (location.state?.detay) {
      const { status } = await sendRequest(
        productCargoInsert("_", {
          ...values,
          id: location.state?.detay?.id,
          urunDemonte: stringToBoolean(values?.urunDemonte),
        })
      );
      if (status) {
        setLoading(false);
        navigate(-1);
      }
    } else {
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
    }
    setLoading(false);
  };

  const { data: UnitType } = useSWR(["getUnitTypeTable"], getUnitTypeTable);

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
                        { ad: "Evet", id: "true" },
                        { ad: "Hayır", id: "false" },
                      ]}
                      isNumber
                      visableValue={"ad"}
                      error={touched.urunKutulu && errors.urunKutulu}
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
                      <SelectInput
                        name={"uzunlukBirimId"}
                        value={kargoOzellikleri[0].uzunlukBirimId}
                        onChange={(e) => {
                          updateArrayState(setKargoOzellikleri, 0, e);
                        }}
                        customState
                        data={UnitType}
                        visableValue={"ad"}
                        error={touched.uzunlukBirimId && errors.uzunlukBirimId}
                      >
                        Birim
                      </SelectInput>
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
                      <SelectInput
                        name={"genislikBirimId"}
                        value={kargoOzellikleri[0].genislikBirimId}
                        onChange={(e) => {
                          updateArrayState(setKargoOzellikleri, 0, e);
                        }}
                        customState
                        data={UnitType}
                        visableValue={"ad"}
                        error={
                          touched.genislikBirimId && errors.genislikBirimId
                        }
                      >
                        Birim
                      </SelectInput>
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
                      <SelectInput
                        name={"yukseklikBirimId"}
                        value={kargoOzellikleri[0].yukseklikBirimId}
                        onChange={(e) => {
                          updateArrayState(setKargoOzellikleri, 0, e);
                        }}
                        customState
                        data={UnitType}
                        visableValue={"ad"}
                        error={
                          touched.yukseklikBirimId && errors.yukseklikBirimId
                        }
                      >
                        Birim
                      </SelectInput>
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
                      <SelectInput
                        name={"birimAgirlikBirimId"}
                        value={kargoOzellikleri[0].birimAgirlikBirimId}
                        onChange={(e) => {
                          updateArrayState(setKargoOzellikleri, 0, e);
                        }}
                        data={UnitType}
                        customState
                        visableValue={"ad"}
                        error={
                          touched.birimAgirlikBirimId &&
                          errors.birimAgirlikBirimId
                        }
                      >
                        Birim
                      </SelectInput>
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
                      <SelectInput
                        pr="10px"
                        name={"urunMiktariBirimId"}
                        value={kargoOzellikleri[0].urunMiktariBirimId}
                        data={UnitType}
                        visableValue={"ad"}
                        customState
                        onChange={(e) => {
                          updateArrayState(setKargoOzellikleri, 0, e);
                        }}
                        error={
                          touched.urunMiktariBirimId &&
                          errors.urunMiktariBirimId
                        }
                      >
                        Birim
                      </SelectInput>
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
                          <SelectInput
                            name={"uzunlukBirimId"}
                            value={kargoOzellikleri[index].uzunlukBirimId}
                            onChange={(e) => {
                              updateArrayState(setKargoOzellikleri, index, e);
                            }}
                            data={UnitType}
                            visableValue={"ad"}
                            customState
                            error={
                              touched.uzunlukBirimId && errors.uzunlukBirimId
                            }
                          >
                            Birim
                          </SelectInput>
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
                          <SelectInput
                            name={"genislikBirimId"}
                            value={kargoOzellikleri[index].genislikBirimId}
                            onChange={(e) => {
                              updateArrayState(setKargoOzellikleri, index, e);
                            }}
                            data={UnitType}
                            customState
                            visableValue={"ad"}
                            error={
                              touched.genislikBirimId && errors.genislikBirimId
                            }
                          >
                            Birim
                          </SelectInput>
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
                          <SelectInput
                            name={"yukseklikBirimId"}
                            value={kargoOzellikleri[index].yukseklikBirimId}
                            onChange={(e) => {
                              updateArrayState(setKargoOzellikleri, index, e);
                            }}
                            data={UnitType}
                            visableValue={"ad"}
                            customState
                            error={
                              touched.yukseklikBirimId &&
                              errors.yukseklikBirimId
                            }
                          >
                            Birim
                          </SelectInput>
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
                          <SelectInput
                            name={"birimAgirlikBirimId"}
                            value={kargoOzellikleri[index].birimAgirlikBirimId}
                            onChange={(e) => {
                              updateArrayState(setKargoOzellikleri, index, e);
                            }}
                            customState
                            data={UnitType}
                            visableValue={"ad"}
                            error={
                              touched.birimAgirlikBirimId &&
                              errors.birimAgirlikBirimId
                            }
                          >
                            Birim
                          </SelectInput>
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
                          <SelectInput
                            pr="10px"
                            name={"urunMiktariBirimId"}
                            value={kargoOzellikleri[index].urunMiktariBirimId}
                            data={UnitType}
                            visableValue={"ad"}
                            onChange={(e) => {
                              updateArrayState(setKargoOzellikleri, index, e);
                            }}
                            customState
                            error={
                              touched.urunMiktariBirimId &&
                              errors.urunMiktariBirimId
                            }
                          >
                            Birim
                          </SelectInput>
                        </Box>
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
                          urunDemonte: "",
                          urunKutulu: "",
                          tasimaTipId: "",
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
