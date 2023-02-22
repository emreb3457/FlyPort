import { Box } from "@chakra-ui/react";
import { useFormik } from "formik";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import {
  TextInput,
  SelectInput,
  DateInput,
} from "../../../components/Inputs/CustomInputs";
import { sendRequest } from "../../../utils/helpers";
import {
  getCompanyOfficialTable,
  getCompanyTable,
  getProductTable,
  offerInsert,
  offerUpdate,
} from "../../../api/api";
import useSWR from "swr";
import {
  getDeliveryTable,
  getCountryTable,
  getTransportTable,
} from "../../../api/DefinitionsApi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../../constants/routes";
import colors from "../../../theme/colors";

const NewOffer = () => {
  const navigate = useNavigate();
  const { id, detayId } = useParams();

  const [submitLoading, setSubmitLoading] = useState(false);

  const { errors, handleChange, handleSubmit, values, touched, setFieldValue } =
    useFormik({
      initialValues: {
        urunId: id,
        teklifNo: "",
        urunId: "",
        urunMiktari: "",
        olcuBirimiId: "",
        hizmetTuru: "",
        teslimSekliId: "",
        tasimaTipiId: "",
        cikiUlkeId: "",
        varisUlkeId: "",
        musteriId: "",
        musteriYetkiliId: "",
        teklifGecerlilikSuresi: "",
        teklifTuru: "",
        teklifDurumu: "",
      },
      onSubmit: (values, { resetForm }) => {
        newOfferSubmit({ values });
      },
    });

  const { data: Product } = useSWR(["getProductTable"], getProductTable);

  const { data: Country } = useSWR(["getCountryTable"], getCountryTable);

  const { data: Delivery } = useSWR(["getDeliveryTable"], getDeliveryTable);
  const { data: Transport } = useSWR(["getTransportTable"], getTransportTable);
  const { data: Company } = useSWR(["getCompanyTable"], getCompanyTable);
  const { data: CompanyOfficial } = useSWR(
    ["getCompanyOfficialTable", values?.musteriId],
    getCompanyOfficialTable
  );
  const newOfferSubmit = async ({ values }) => {
    setSubmitLoading(true);
    const { status } = await sendRequest(
      detayId
        ? offerUpdate("", { ...values, id: detayId })
        : offerInsert("", { ...values })
    );
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
            document.getElementById("addOffer").click();
          },
        }}
      >
        {detayId ? "" : "Yeni Teklif"}
      </BreadCrumb>

      <form onSubmit={handleSubmit}>
        <Box display={"flex"} mt="20px" px="50px" mb="100px">
          {/*  */}
          <Box display={"flex"}>
            <Box w="30%">
              <TextInput
                name={"teklifNo"}
                value={values.teklifNo}
                onChange={handleChange}
                error={touched.teklifNo && errors.teklifNo}
              >
                Teklif No
              </TextInput>
              <SelectInput
                name={"urunId"}
                value={values.urunId}
                onChange={setFieldValue}
                data={Product}
                visableValue={"urunKisaAd"}
                error={touched.urunId && errors.urunId}
              >
                Ürün Adı
              </SelectInput>
              <Box display={"flex"} gap="20px">
                <TextInput
                  name={"urunMiktari"}
                  value={values.urunMiktari}
                  onChange={handleChange}
                  error={touched.urunMiktari && errors.urunMiktari}
                >
                  Ürün Miktarı
                </TextInput>
                <SelectInput
                  name={"olcuBirimiId"}
                  value={values.olcuBirimiId}
                  onChange={setFieldValue}
                  data={Product}
                  visableValue={"urunKisaAd"}
                  error={touched.olcuBirimiId && errors.olcuBirimiId}
                >
                  Ölçü Birimi
                </SelectInput>
              </Box>
              <TextInput
                name={"hizmetTuru"}
                value={values.hizmetTuru}
                onChange={handleChange}
                error={touched.hizmetTuru && errors.hizmetTuru}
              >
                Hizmet Türü
              </TextInput>
              <SelectInput
                name={"teslimSekliId"}
                value={values.teslimSekliId}
                onChange={setFieldValue}
                data={Delivery}
                visableValue={"ad"}
                error={touched.teslimSekliId && errors.teslimSekliId}
              >
                Teslim Şekli
              </SelectInput>
              <SelectInput
                name={"tasimaTipiId"}
                value={values.tasimaTipiId}
                onChange={setFieldValue}
                data={Transport}
                visableValue={"ad"}
                error={touched.tasimaTipiId && errors.tasimaTipiId}
              >
                Taşıma Tipi
              </SelectInput>
              <SelectInput
                name={"cikiUlkeId"}
                value={values.cikiUlkeId}
                onChange={setFieldValue}
                data={Country}
                visableValue={"adOrjinal"}
                error={touched.cikiUlkeId && errors.cikiUlkeId}
              >
                Çıkış Ülkesi
              </SelectInput>
              <SelectInput
                name={"varisUlkeId"}
                value={values.varisUlkeId}
                onChange={setFieldValue}
                data={Country}
                visableValue={"adOrjinal"}
                error={touched.varisUlkeId && errors.varisUlkeId}
              >
                Varış Ülkesi
              </SelectInput>
            </Box>
            <Box w="30%" ml="17px">
              <SelectInput
                name={"musteriId"}
                value={values.musteriId}
                onChange={setFieldValue}
                data={Company}
                visableValue={"kisaAdi"}
                error={touched.musteriId && errors.musteriId}
              >
                Müşteri
              </SelectInput>
              <SelectInput
                name={"musteriYetkiliId"}
                value={values.musteriYetkiliId}
                onChange={setFieldValue}
                data={CompanyOfficial}
                visableValue={"ad"}
                error={touched.musteriYetkiliId && errors.musteriYetkiliId}
              >
                Müşteri Yetkilisi
              </SelectInput>
              <DateInput
                name={"teklifGecerlilikSuresi"}
                value={values.teklifGecerlilikSuresi}
                onChange={handleChange}
                error={
                  touched.teklifGecerlilikSuresi &&
                  errors.teklifGecerlilikSuresi
                }
              >
                Teklifin Geçerlilik Tarihi
              </DateInput>
              <TextInput
                name={"teklifTuru"}
                value={values.teklifTuru}
                onChange={handleChange}
                error={touched.teklifTuru && errors.teklifTuru}
              >
                Teklif Türü
              </TextInput>
              <TextInput
                name={"teklifDurumu"}
                value={values.teklifDurumu}
                onChange={handleChange}
                error={touched.teklifDurumu && errors.teklifDurumu}
              >
                Teklif Durumu
              </TextInput>
            </Box>
            <Box w="40%" ml="90px">
              <Box>
                <Box display={"flex"} gap="20px">
                  <TextInput
                    name={"UrunAdi"}
                    value={values.UrunAdi}
                    onChange={handleChange}
                    error={touched.UrunAdi && errors.UrunAdi}
                  >
                    Toplam Maliyet
                  </TextInput>
                  <TextInput
                    name={"UrunAdi"}
                    value={values.UrunAdi}
                    onChange={handleChange}
                    error={touched.UrunAdi && errors.UrunAdi}
                  >
                    Doviz Cinsi
                  </TextInput>
                </Box>
                <Box display={"flex"} gap="20px">
                  <TextInput
                    name={"UrunAdi"}
                    value={values.UrunAdi}
                    onChange={handleChange}
                    error={touched.UrunAdi && errors.UrunAdi}
                  >
                    Birim Maliyet
                  </TextInput>
                  <TextInput
                    name={"UrunAdi"}
                    value={values.UrunAdi}
                    onChange={handleChange}
                    error={touched.UrunAdi && errors.UrunAdi}
                  >
                    Doviz Cinsi
                  </TextInput>
                </Box>
              </Box>
              <TextInput
                name={"UrunAdi"}
                value={values.UrunAdi}
                onChange={handleChange}
                error={touched.UrunAdi && errors.UrunAdi}
              >
                Satış Kar Oranı
              </TextInput>
              <TextInput
                name={"UrunAdi"}
                value={values.UrunAdi}
                onChange={handleChange}
                error={touched.UrunAdi && errors.UrunAdi}
              >
                Toplam Kar Oranı
              </TextInput>
              <Box display={"flex"} gap="20px">
                <TextInput
                  name={"UrunAdi"}
                  value={values.UrunAdi}
                  onChange={handleChange}
                  error={touched.UrunAdi && errors.UrunAdi}
                >
                  Toplam Satış Tutarı
                </TextInput>
                <TextInput
                  name={"UrunAdi"}
                  value={values.UrunAdi}
                  onChange={handleChange}
                  error={touched.UrunAdi && errors.UrunAdi}
                >
                  Döviz Cinsi
                </TextInput>
              </Box>
              <Box display={"flex"} gap="20px">
                <TextInput
                  name={"UrunAdi"}
                  value={values.UrunAdi}
                  onChange={handleChange}
                  error={touched.UrunAdi && errors.UrunAdi}
                >
                  Birim Satış Tutarı
                </TextInput>
                <TextInput
                  name={"UrunAdi"}
                  value={values.UrunAdi}
                  onChange={handleChange}
                  error={touched.UrunAdi && errors.UrunAdi}
                >
                  Döviz Cinsi
                </TextInput>
              </Box>
            </Box>
          </Box>
        </Box>
        <button
          id="addOffer"
          type="submit"
          style={{ visibility: "hidden" }}
        ></button>
      </form>
    </Box>
  );
};

export default NewOffer;
