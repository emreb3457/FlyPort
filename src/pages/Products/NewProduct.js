import { Box, Select, Text, Textarea } from "@chakra-ui/react";
import { useFormik } from "formik";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import { TextInput, SelectInput } from "../../components/Inputs/CustomInputs";
import {
  arrayParse,
  arrayStringify,
  selectNitelikDeger,
  sendRequest,
} from "../../utils/helpers";
import { newProductValidate } from "../../utils/validation";
import { getProductInsert } from "../../api/api";
import useSWR from "swr";
import {
  getProductPropertyList,
  getProductPropertyValueList,
  getChildrenCategoryTable,
  getPublicCategoryTable,
  getCategoryTable,
} from "../../api/DefinitionsApi";
import { useEffect, useState } from "react";
import ImageComp from "../../components/Talepler/ImageComp/ImageComp";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";

const NewProduct = () => {
  const navigate = useNavigate();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(999);
  const [deger, setDeger] = useState([]);
  const [imageURLS, setImageURLs] = useState([]);

  const { data: ChildrenCategory, error } = useSWR(
    ["getChildrenCategoryTable", page, limit],
    getChildrenCategoryTable
  );

  const { data: PublicCategory } = useSWR(
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

  const { errors, handleChange, handleSubmit, values, touched, setFieldValue } =
    useFormik({
      initialValues: {
        UrunAdi: "",
        KisaAdi: "",
        GenelKategoriId: "",
        AltKategoriId: "",
        FlyKategoriId: "",
        TeknikOzellikDegerleri: [],
        UrunResimleri: [],
        aciklama: "",
      },
      onSubmit: (values, { resetForm }) => {
        newProductSubmit({ values });
      },
      validationSchema: newProductValidate,
    });

  useEffect(() => {
    if (values.UrunResimleri.length < 1) return;
    const newImageUrls = [];
    values.UrunResimleri.forEach((image) =>
      newImageUrls.push(URL.createObjectURL(image))
    );
    setImageURLs(newImageUrls);
  }, [values.UrunResimleri]);

  const newProductSubmit = async ({ values }) => {
    setSubmitLoading(true);
    const formData = new FormData();
    formData.append("UrunAdi", values.UrunAdi);
    formData.append("KisaAdi", values.KisaAdi);
    formData.append("GenelKategoriId", values.GenelKategoriId);
    formData.append("AltKategoriId", values.AltKategoriId);
    formData.append("FlyKategoriId", values.FlyKategoriId);
    for (let index = 0; index < values.TeknikOzellikDegerleri.length; index++) {
      formData.append(
        "TeknikOzellikDegerleri",
        values.TeknikOzellikDegerleri[index]
      );
    }

    for (let index = 0; index < values.UrunResimleri.length; index++) {
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
  return (
    <Box>
      <BreadCrumb
        loading={submitLoading}
        funct1={{
          title: "Kaydet",
          function: () => {
            document.getElementById("addProduct").click();
          },
        }}
      >
        Yeni Ürün
      </BreadCrumb>

      <form onSubmit={handleSubmit}>
        <Box display={"flex"} mt="20px" px="50px">
          <ImageComp images={imageURLS} onImageChange={onImageChange} />

          <Box width={{ lg: "35%", "2xl": "30%" }} marginLeft="30px">
            <TextInput
              name={"UrunAdi"}
              value={values.UrunAdi}
              onChange={handleChange}
              error={touched.UrunAdi && errors.UrunAdi}
            >
              Ürün Adı
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
          <Box width={{ lg: "35%", "2xl": "30%" }} ml="17px">
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
              const parseData = data;
              return (
                <Box key={index} display={"flex"}>
                  <TextInput disabled={true} mr="10px" value={parseData.ad}>
                    Teknik Özellik {index}
                  </TextInput>
                  <SelectInput
                    onChange={(x) => {
                      const newArray = arrayParse(deger);
                      newArray[index] = {
                        ...newArray[index],
                        nitelikId: Number(x.target.value),
                      };
                      setDeger(arrayStringify(newArray));
                    }}
                    data={ProductPropertyValue?.data.filter(
                      (x) => x.nitelikId === parseData.id
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
        <Box mt="40px" pl="30px">
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

export default NewProduct;
