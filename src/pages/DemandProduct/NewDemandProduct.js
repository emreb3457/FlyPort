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
import { newDemandValidate } from "../../utils/validation";
import {
  getCompanyList,
  getDemandInsert,
  getProductInsert,
  getProductList,
} from "../../api/api";
import useSWR from "swr";
import {
  getPublicCategoryList,
  getProductPropertyList,
  getProductPropertyValueList,
  getCountryList,
  getDeliveryList,
} from "../../api/DefinitionsApi";
import { useEffect, useState } from "react";
import ImageComp from "../../components/Talepler/ImageComp/ImageComp";
import { Navigate, useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";

const NewDemand = () => {
  const navigate = useNavigate();
  const [submitLoading, setSublitLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(999);
  const [deger, setDeger] = useState([]);
  const [imageURLS, setImageURLs] = useState([]);

  const { data: Product } = useSWR(
    ["getProductList", page, limit],
    getProductList
  );

  const { data: PublicCategory } = useSWR(
    ["getPublicCategoryList", page, limit],
    getPublicCategoryList
  );

  const { data: ProductProperty } = useSWR(
    ["getProductPropertyList", page, limit],
    getProductPropertyList
  );

  const { data: ProductPropertyValue } = useSWR(
    ["getProductPropertyValueList", page, limit],
    getProductPropertyValueList
  );

  const { data: Country } = useSWR(
    ["getCountryList", page, limit],
    getCountryList
  );

  const { data: Delivery } = useSWR(
    ["getDeliveryList", page, limit],
    getDeliveryList
  );

  const { data: Company } = useSWR(
    ["getCompanyList", page, limit],
    getCompanyList
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
        Islenilen: "",
        NerdenId: "",
        NereyeId: "",
        TeslimSekliId: "",
        Miktar: "",
        KategoriId: "",
        UrunId: "",
        TalepEden: "",
        Email: "",
        Telefon: "",
        TeknikOzellikDegerleri: [],
        UrunResimleri: [],
        aciklama: "",
      },
      onSubmit: (values, { resetForm }) => {
        newDemondSubmit({ values });
      },
      validationSchema: newDemandValidate,
    });

  useEffect(() => {
    if (values.UrunResimleri.length < 1) return;
    const newImageUrls = [];
    values.UrunResimleri.forEach((image) =>
      newImageUrls.push(URL.createObjectURL(image))
    );
    setImageURLs(newImageUrls);
  }, [values.UrunResimleri]);

  const newDemondSubmit = async ({ values }) => {
    setSublitLoading(true);
    const formData = new FormData();
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
    const { status } = await sendRequest(getDemandInsert("", formData));
    if (status) {
      setSublitLoading(false);
      navigate(routes.talepler);
    }
    setSublitLoading(false);
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
        Yeni Talep
      </BreadCrumb>

      <form onSubmit={handleSubmit}>
        <Box display={["block", "block", "block", "flex"]} mt="20px" px="50px">
          <ImageComp images={imageURLS} onImageChange={onImageChange} />

          <Box width={{ lg: "35%", "2xl": "30%" }} marginLeft="30px">
            <SelectInput
              name={"Islenilen"}
              value={values.Islenilen}
              onChange={handleChange}
              data={[
                { ad: "Ürün Tedarigi", id: 1 },
                { ad: "Taşıma", id: 2 },
                { ad: "Gümlükleme", id: 3 },
              ]}
              visableValue={"ad"}
              error={touched.Islenilen && errors.Islenilen}
            >
              İstenen
            </SelectInput>
            <SelectInput
              name={"NerdenId"}
              value={values.NerdenId}
              data={Country?.data}
              visableValue="adOrjinal"
              onChange={handleChange}
              error={touched.NerdenId && errors.NerdenId}
            >
              Nereden
            </SelectInput>
            <SelectInput
              name={"NereyeId"}
              value={values.NereyeId}
              data={Country?.data}
              visableValue="adOrjinal"
              onChange={handleChange}
              error={touched.NereyeId && errors.NereyeId}
            >
              Nereye
            </SelectInput>
            <SelectInput
              name={"TeslimSekliId"}
              value={values.TeslimSekliId}
              onChange={handleChange}
              data={Delivery?.data}
              visableValue={"ad"}
              error={touched.TeslimSekliId && errors.TeslimSekliId}
            >
              Teslimat Şekli
            </SelectInput>
            <TextInput
              name={"Miktar"}
              value={values.Miktar}
              onChange={handleChange}
              error={touched.Miktar && errors.Miktar}
            >
              İstenen Miktar
            </TextInput>
            <SelectInput
              name={"KategoriId"}
              value={values.KategoriId}
              onChange={handleChange}
              data={PublicCategory?.data}
              visableValue={"ad"}
              error={touched.KategoriId && errors.KategoriId}
            >
              Kategori
            </SelectInput>
          </Box>
          <Box width={{ lg: "35%", "2xl": "30%" }} ml="17px">
            <SelectInput
              name={"UrunId"}
              value={values.UrunId}
              onChange={handleChange}
              data={Product?.data}
              visableValue={"urunKisaAd"}
              error={touched.UrunId && errors.UrunId}
            >
              Ürün Adı
            </SelectInput>
            <Box py="10px" fontSize={"18px"} w="100%">
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
              <Text mr="5px" color={"#232F3D"}>
                Teknik Özellik Ekle
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
            <SelectInput
              name={"MusteriId"}
              value={values.MusteriId}
              onChange={handleChange}
              data={Company?.data}
              visableValue={"kisaAdi"}
              error={touched.MusteriId && errors.MusteriId}
            >
              Müşteri
            </SelectInput>
            <TextInput
              name={"TalepEden"}
              value={values.TalepEden}
              onChange={handleChange}
              error={touched.TalepEden && errors.TalepEden}
            >
              Talep Eden
            </TextInput>
            <TextInput
              name={"Email"}
              value={values.Email}
              onChange={handleChange}
              error={touched.Email && errors.Email}
            >
              Email
            </TextInput>
            <TextInput
              name={"Telefon"}
              value={values.Telefon}
              onChange={handleChange}
              error={touched.Telefon && errors.Telefon}
            >
              Telefon
            </TextInput>
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

export default NewDemand;
