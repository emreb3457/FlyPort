import { Box, Select, Text, Textarea } from "@chakra-ui/react";
import { Form, useFormik } from "formik";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import { TextInput, SelectInput } from "../../Inputs/CustomInputs";
import {
  arrayParse,
  arrayStringify,
  selectNitelikDeger,
  sendRequest,
} from "../../../utils/helpers";
import { newProductValidate } from "../../../utils/validation";
import { getProductInsert } from "../../../api/api";
import useSWR from "swr";
import {
  getProductPropertyList,
  getProductPropertyValueList,
  getChildrenCategoryTable,
  getPublicCategoryTable,
  getCategoryTable,
} from "../../../api/DefinitionsApi";
import { getMatchingProduct } from "../../../api/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../../constants/routes";
import { baseApi } from "../../../config/config";
import SkeletonComp from "../../Skeleton/Skeleton";

const MatchingProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(999);
  const [deger, setDeger] = useState([]);
  const [imageURLS, setImageURLs] = useState([]);

  const { data: Product } = useSWR(
    ["getMatchingProduct", params.id],
    getMatchingProduct
  );

  const { data: ChildrenCategory } = useSWR(
    ["getChildrenCategoryTable", page, limit],
    getChildrenCategoryTable
  );
  const { data: PublicCategory, error } = useSWR(
    ["getPublicCategoryTable", page, limit],
    getPublicCategoryTable
  );

  const { data: Category } = useSWR(
    ["getCategoryTable", page, limit],
    getCategoryTable
  );

  const { data: ProductProperty } = useSWR(
    ["getProductPropertyList", page, limit],
    getProductPropertyList
  );

  const { data: ProductPropertyValue } = useSWR(
    ["getProductPropertyValueList", page, limit],
    getProductPropertyValueList
  );

  useEffect(() => {
    setFieldValue(
      "TeknikOzellikDegerleri",
      arrayParse(deger).map(selectNitelikDeger("id"))
    );
  }, [deger]);

  const onImageChange = (e) => {
    setFieldValue("UrunResimleri", [...e.target.files]);
  };

  useEffect(() => {}, [ProductPropertyValue]); //don't delete

  const { errors, handleChange, handleSubmit, values, touched, setFieldValue } =
    useFormik({
      initialValues: {
        UrunAdi: "",
        KisaAdi: "",
        GTip: "",
        GenelKategoriId: "",
        AltKategoriId: "",
        FlyKategoriId: "",
        TeknikOzellikDegerleri: [],
        UrunResimleri: [],
        aciklama: "",
      },
      onSubmit: (values, { resetForm }) => {
        ProductSubmit({ values });
      },
      validationSchema: newProductValidate,
    });

  useEffect(() => {
    if (values.UrunResimleri.length < 1) return;
    const newImageUrls = [];
    try {
      values.UrunResimleri.forEach((image) =>
        newImageUrls.push(URL.createObjectURL(image))
      );
    } catch (error) {
      values.UrunResimleri.forEach((image) =>
        newImageUrls.push(baseApi + image.dosyaYolu)
      );
    }

    setImageURLs(newImageUrls);
  }, [values.UrunResimleri]);

  const ProductSubmit = async ({ values }) => {
    setSubmitLoading(true);
    const formData = new FormData();
    formData.append("UrunAdi", values.UrunAdi);
    formData.append("KisaAdi", values.KisaAdi);
    formData.append("GTip", values.GTip);
    formData.append("GenelKategoriId", values.GenelKategoriId);
    formData.append("AltKategoriId", values.AltKategoriId);
    formData.append("FlyKategoriId", values.FlyKategoriId);
    for (let index = 0; index < values.TeknikOzellikDegerleri.length; index++) {
      formData.append(
        "TeknikOzellikDegerleri",
        values.TeknikOzellikDegerleri[index]
      );
    }
    for (let index = 0; index < values.TeknikOzellikDegerleri.length; index++) {
      formData.append("UrunResimleri", values.UrunResimleri[index]);
    }
    formData.append("aciklama", values.aciklama);
    const { status } = await sendRequest(getProductInsert("", formData));
    if (status) {
      setSubmitLoading(false);
      navigate(routes.urunler);
    }
    setSubmitLoading(false);
  };
  const loading = !PublicCategory && !error;
  return loading ? (
    <SkeletonComp />
  ) : (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box display={"flex"} mt="20px" w="100%">
          {/* <ImageComp images={imageURLS} onImageChange={onImageChange} /> */}
          <Box width={{ lg: "35%", "2xl": "60%" }}>
            <TextInput
              name={"UrunAdi"}
              value={values.UrunAdi}
              onChange={handleChange}
              error={touched.UrunAdi && errors.UrunAdi}
            >
              Ürün Tam Adı
            </TextInput>
            <TextInput
              name={"KisaAdi"}
              value={values.KisaAdi}
              onChange={handleChange}
              error={touched.KisaAdi && errors.KisaAdi}
            >
              Kısa Adı
            </TextInput>
            <SelectInput
              name={"GenelKategoriId"}
              value={values.GenelKategoriId}
              onChange={setFieldValue}
              data={PublicCategory}
              visableValue={"ad"}
              error={touched.GenelKategoriId && errors.GenelKategoriId}
            >
              Genel Kategori
            </SelectInput>
            <SelectInput
              name={"AltKategoriId"}
              value={values.AltKategoriId}
              onChange={setFieldValue}
              data={ChildrenCategory}
              visableValue={"ad"}
              error={touched.AltKategoriId && errors.AltKategoriId}
            >
              Alt Kategori
            </SelectInput>
          </Box>
          <Box ml="17px">
            <SelectInput
              name={"FlyKategoriId"}
              value={values.FlyKategoriId}
              onChange={setFieldValue}
              data={Category}
              visableValue={"ad"}
              error={touched.FlyKategoriId && errors.FlyKategoriId}
            >
              Fly Kategori
            </SelectInput>
            {arrayParse(deger)?.map((data, index) => {
              return (
                <Box key={index} display={"flex"}>
                  <TextInput
                    disabled={true}
                    mr="10px"
                    value={data?.nitelikAd || data?.ad}
                  >
                    Teknik Özellik {index + 1}
                  </TextInput>
                  <SelectInput
                    value={data?.id}
                    onChange={(x) => {
                      const newArray = arrayParse(deger);
                      newArray[index] = {
                        ...newArray[index],
                        id: Number(x.target.value),
                      };
                      setDeger(arrayStringify(newArray));
                    }}
                    data={ProductPropertyValue?.data?.filter(
                      (x) => x.nitelikId === data?.nitelikId
                    )}
                    visableValue={"ad"}
                  />
                </Box>
              );
            })}
            <Box py="10px" fontSize={"18px"} w="100%">
              <Text mr="5px" color={"#232F3D"}>
                Ekle
              </Text>
              <Select
                onChange={(x) => setDeger((prev) => [...prev, x.target.value])}
                h="54px"
                borderColor={"#D6D6D6"}
                value={""}
              >
                <option value={"default"}>Seçiniz</option>
                {ProductProperty?.data?.map((x) => {
                  return (
                    <option key={x.id} value={JSON.stringify(x)}>
                      {x.ad}
                    </option>
                  );
                })}
              </Select>
            </Box>
          </Box>
        </Box>
        <Box mt="40px">
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
        <button
          id="addProduct"
          type="submit"
          style={{ visibility: "hidden" }}
        ></button>
      </form>
    </Box>
  );
};

export default MatchingProduct;
