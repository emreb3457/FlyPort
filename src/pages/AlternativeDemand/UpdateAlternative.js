import { Box, Select, Text, Textarea } from "@chakra-ui/react";
import { Form, useFormik } from "formik";
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
  getPublicCategoryList,
  getChildrenCategoryList,
  getCategoryList,
  getProductPropertyList,
  getProductPropertyValueList,
  getChildrenCategoryTable,
  getPublicCategoryTable,
  getCategoryTable,
} from "../../api/DefinitionsApi";
import { useEffect, useState } from "react";
import ImageComp from "../../components/Talepler/ImageComp/ImageComp";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";
import { baseApi } from "../../config/config";
import SkeletonComp from "../../components/Skeleton/Skeleton";

const UpdateAlternative = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(999);
  const [deger, setDeger] = useState(
    arrayStringify(state.nitelikDegerleri) || []
  );
  const [imageURLS, setImageURLs] = useState([]);

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
        UrunAdi: state?.urunAdi || "",
        KisaAdi: state?.kisaAdi || "",
        GTip: state?.gTip || "",
        GenelKategoriId: state?.genelKategoriId || "",
        AltKategoriId: state?.altKategoriId || "",
        FlyKategoriId: state?.flyKategoriId || "",
        TeknikOzellikDegerleri: [],
        UrunResimleri: state?.resimler || [],
        aciklama: state?.aciklama || "",
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
    formData.append("UrunAdi", values.urunAdi);
    formData.append("Islenilen", values.Islenilen);
    formData.append("NerdenId", values.NerdenId);
    formData.append("NereyeId", values.NereyeId);
    formData.append("TeslimSekliId", values.TeslimSekliId);
    formData.append("Miktar", values.Miktar);
    formData.append("KategoriId", values.KategoriId);
    formData.append("UrunId", values.UrunId);
    formData.append("MusteriId", values.MusteriId);
    formData.append("TalepEden", values.TalepEden);
    formData.append("Email", values.Email);
    formData.append("Telefon", values.Telefon);
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
    state && formData.append("id", state.id);
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
      <BreadCrumb
        loading={submitLoading}
        funct1={{
          title: "Kaydet",
          function: () => {
            document.getElementById("addProduct").click();
          },
        }}
      >
        Güncelle
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
            <TextInput
              name={"GTip"}
              value={values.GTip}
              onChange={handleChange}
              error={touched.GTip && errors.GTip}
            >
              Gtip
            </TextInput>
            <SelectInput
              name={"GenelKategoriId"}
              value={values.GenelKategoriId}
              onChange={setFieldValue}
              data={PublicCategory?.data}
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
                    data={ProductPropertyValue?.data.filter(
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

export default UpdateAlternative;
