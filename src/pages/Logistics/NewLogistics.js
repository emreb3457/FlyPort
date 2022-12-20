import { Box, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import {
  TextInput,
  SelectInput,
  DateInput,
} from "../../components/Inputs/CustomInputs";
import { sendRequest } from "../../utils/helpers";
import { newLogistics } from "../../utils/validation";
import useSWR from "swr";
import {
  getDeliveryTable,
  getCurrencyTypeTable,
  getTransportTable,
} from "../../api/DefinitionsApi";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";
import { logisticsInsert } from "../../api/api";

const NewLogistics = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(999);

  const { errors, handleChange, handleSubmit, values, touched, setFieldValue } =
    useFormik({
      initialValues: {
        teklifId: location.state,
        tasiyiciFirma: "",
        yetkiliKisi: "",
        teklifAlanKisi: "",
        yuklemeYeri: "",
        teslimYeri: "",
        tasimaTipiId: "",
        tasimaStatusu: "",
        tasimaMiktari: "",
        aracTipi: "",
        toplamTutar: "",
        dovizCinsiId: "",
        gecerlilikTarihi: "",
      },
      onSubmit: (values, { resetForm }) => {
        newLogisticSubmit({ values });
      },
      validationSchema: newLogistics,
    });

  const { data: Transport } = useSWR(
    ["getTransportTable", page, limit],
    getTransportTable
  );

  const { data: CurrencyType } = useSWR(
    ["getCurrencyTypeTable", page, limit],
    getCurrencyTypeTable
  );

  const newLogisticSubmit = async ({ values }) => {
    setSubmitLoading(true);
    const { status } = await sendRequest(logisticsInsert("", { ...values }));
    if (status) {
      setSubmitLoading(false);
      navigate(-1);
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
            document.getElementById("addLogistic").click();
          },
        }}
      >
        Lojistik Ekle
      </BreadCrumb>
      <Box mt="20px" px={"38px"}>
        <form onSubmit={handleSubmit}>
          <Box display={"flex"}>
            <Box width={{ lg: "25%", "2xl": "20%" }}>
              <Text fontSize={"22px"} fontWeight={"bold"}>
                Teklif Veren Firma
              </Text>
              <TextInput
                name={"tasiyiciFirma"}
                value={values.tasiyiciFirma}
                onChange={handleChange}
                error={touched.tasiyiciFirma && errors.tasiyiciFirma}
              >
                Taşımacı Firma
              </TextInput>
              <TextInput
                name={"yetkiliKisi"}
                value={values.yetkiliKisi}
                onChange={handleChange}
                error={touched.yetkiliKisi && errors.yetkiliKisi}
              >
                Yetkili Kişi
              </TextInput>
              <TextInput
                name={"teklifAlanKisi"}
                value={values.teklifAlanKisi}
                onChange={handleChange}
                error={touched.teklifAlanKisi && errors.teklifAlanKisi}
              >
                Teklif Alan Kişi
              </TextInput>
            </Box>
            <Box width={{ lg: "25%", "2xl": "20%" }} ml="40px">
              <Text fontSize={"22px"} fontWeight={"bold"}>
                Taşıma Detayı
              </Text>
              <TextInput
                name={"yuklemeYeri"}
                value={values.yuklemeYeri}
                onChange={handleChange}
                error={touched.yuklemeYeri && errors.yuklemeYeri}
              >
                Yükleme Yeri
              </TextInput>
              <TextInput
                name={"teslimYeri"}
                value={values.teslimYeri}
                onChange={handleChange}
                error={touched.teslimYeri && errors.teslimYeri}
              >
                Teslim Yeri
              </TextInput>
              <SelectInput
                name={"tasimaTipiId"}
                value={values.tasimaTipiId}
                data={Transport}
                visableValue="ad"
                onChange={setFieldValue}
                error={touched.tasimaTipiId && errors.tasimaTipiId}
              >
                Taşıma Tipi
              </SelectInput>
              <TextInput
                name={"tasimaStatusu"}
                value={values.tasimaStatusu}
                onChange={handleChange}
                error={touched.tasimaStatusu && errors.tasimaStatusu}
              >
                Taşıma Statüsü
              </TextInput>
              <TextInput
                name={"tasimaMiktari"}
                value={values.tasimaMiktari}
                onChange={handleChange}
                error={touched.tasimaMiktari && errors.tasimaMiktari}
              >
                Taşıma Miktari
              </TextInput>
              <TextInput
                name={"aracTipi"}
                value={values.aracTipi}
                onChange={handleChange}
                error={touched.aracTipi && errors.aracTipi}
              >
                Araç Tipi
              </TextInput>
            </Box>
            <Box width={{ lg: "25%", "2xl": "20%" }} ml={{ lg: "40px" }}>
              <Text fontSize={"22px"} fontWeight={"bold"}>
                Taşıma Detayı
              </Text>
              <TextInput
                name={"toplamTutar"}
                value={values.toplamTutar}
                onChange={handleChange}
                type="number"
                error={touched.toplamTutar && errors.toplamTutar}
              >
                Toplam Tutar
              </TextInput>
              <SelectInput
                name={"dovizCinsiId"}
                value={values.dovizCinsiId}
                data={CurrencyType}
                visableValue="ad"
                onChange={setFieldValue}
                error={touched.dovizCinsiId && errors.dovizCinsiId}
              >
                Döviz Miktarı
              </SelectInput>
              <DateInput
                name="gecerlilikTarihi"
                value={values.gecerlilikTarihi}
                onChange={handleChange}
                error={touched.gecerlilikTarihi && errors.gecerlilikTarihi}
              >
                Geçerlilik Tarihi
              </DateInput>
              <Text fontSize={"22px"} color="#818181">
                Anlaşma Koşulları
              </Text>
            </Box>
          </Box>
          <button
            id="addLogistic"
            type="submit"
            style={{ visibility: "hidden" }}
          ></button>
        </form>
      </Box>
    </Box>
  );
};

export default NewLogistics;

//firma detay bağlancak
//talep detay eksiklere bakılacak
