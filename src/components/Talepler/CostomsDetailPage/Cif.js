import { Box, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import {
  TextInput,
  SelectInput,
  DefaultSelect,
} from "../../../components/Inputs/CustomInputs";
import { sendRequest, stringToBoolean } from "../../../utils/helpers";
import useSWR from "swr";
import {
  getCountryTable,
  getDelivery,
  getDeliveryTable,
  getTransportTable,
} from "../../../api/DefinitionsApi";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { routes } from "../../../constants/routes";
import {
  customCifUpdate,
  customInsert,
  customUpdate,
  getCustomCifDetail,
  getCustomCifTable,
} from "../../../api/api";
import { getCustomDetail } from "../../../api/api";
import { newCustom } from "../../../utils/validation";

const Cif = (props) => {
  const { item, setFunctions } = props;
  const navigate = useNavigate();
  const { state } = useLocation();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [page, setPage] = useState("");
  const [limit, setLimit] = useState(999);
  const { id, detayId } = useParams();
  const [isEdit, setIsEdit] = useState(true);

  const { data, error } = useSWR(
    ["getCustomCifDetail", detayId],
    getCustomCifDetail
  );
  const initialData = useMemo(() => {
    if (data) {
      return {
        ...data,
        teklifUrunId: Number(id),
      };
    }
    return {};
  }, [data]);
  console.log(item);
  useEffect(() => {
    setFunctions({
      create: !isEdit && { title: "Kaydet", function: handleSubmit },
      update: { title: "Düzenle", function: () => setIsEdit(false) },
    });
  }, [isEdit]);

  const { errors, handleChange, handleSubmit, values, touched, setFieldValue } =
    useFormik({
      initialValues: initialData,
      enableReinitialize: true,
      onSubmit: (values, { resetForm }) => {
        newCustomSubmit({ values });
      },
    });

  const { data: Country, mutate } = useSWR(
    ["getCountryTable"],
    getCountryTable
  );

  const { data: Delivery } = useSWR(["getDeliveryTable"], getDeliveryTable);
  const { data: Transport } = useSWR(["getTransportTable"], getTransportTable);

  const newCustomSubmit = async ({ values }) => {
    setSubmitLoading(true);
    const { status } = await sendRequest(
      customCifUpdate("", {
        ...values,
        id: data && Number(data.id),
      })
    );
    setSubmitLoading(false);
  };
  return (
    <Box>
      <Box px="50px" mt="40px">
        <form onSubmit={handleSubmit}>
          <Box display={["block", "block", "block", "flex"]} mt="20px">
            <Box width={{ lg: "35%", "2xl": "30%" }}>
              <Text fontSize={"22px"}>Sevkiyat Bilgileri</Text>
              <SelectInput
                name={"cikisUlkeId"}
                value={values.cikisUlkeId}
                data={Country}
                visableValue="adOrjinal"
                onChange={setFieldValue}
                disabled={isEdit}
                error={touched.cikisUlkeId && errors.cikisUlkeId}
              >
                Çıkış Ülkesi
              </SelectInput>
              <SelectInput
                name={"varisUlkeId"}
                value={values.cikisUlkeId}
                data={Country}
                visableValue="adOrjinal"
                onChange={setFieldValue}
                disabled={isEdit}
                error={touched.varisUlkeId && errors.varisUlkeId}
              >
                Varış Ülkesi
              </SelectInput>
              <SelectInput
                name={"teslimSekliId"}
                value={values.teslimSekliId}
                data={Delivery}
                visableValue="ad"
                onChange={setFieldValue}
                disabled={isEdit}
                error={touched.teslimSekliId && errors.teslimSekliId}
              >
                Teslim Şekli
              </SelectInput>
              <SelectInput
                name={"tasimaTipiId"}
                value={values.tasimaTipiId}
                data={Transport}
                visableValue="ad"
                onChange={setFieldValue}
                disabled={isEdit}
                error={touched.tasimaTipiId && errors.tasimaTipiId}
              >
                Taşıma Tipi
              </SelectInput>
              <Box display={"flex"} alignItems="end">
                <TextInput
                  pr="10px"
                  name={"urunMiktari"}
                  value={values.urunMiktari}
                  onChange={handleChange}
                  disabled={isEdit}
                  type="number"
                  error={touched.urunMiktari && errors.urunMiktari}
                >
                  Ürün Miktarı
                </TextInput>
                <TextInput
                  pr="10px"
                  name={"olcuBirimiId"}
                  value={values.olcuBirimiId}
                  onChange={handleChange}
                  disabled={isEdit}
                  type={"number"}
                  error={touched.olcuBirimiId && errors.olcuBirimiId}
                >
                  Ölçü Birimi
                </TextInput>
              </Box>
              <TextInput
                pr="10px"
                name={"toplamAgirlik"}
                value={values.toplamAgirlik}
                onChange={handleChange}
                disabled={isEdit}
                error={touched.toplamAgirlik && errors.toplamAgirlik}
              >
                Toplam Ağırlık
              </TextInput>
            </Box>
            <Box width={{ lg: "35%", "2xl": "30%" }} ml="17px">
              <Text fontSize={"22px"}>Diğer Detaylar</Text>
              <TextInput
                pr="10px"
                name={"gTipNo"}
                value={values.gTipNo}
                onChange={handleChange}
                disabled={isEdit}
                error={touched.gTipNo && errors.gTipNo}
              >
                GTİP NO
              </TextInput>
              <TextInput
                pr="10px"
                name={"urunAdi"}
                value={values.urunAdi}
                onChange={handleChange}
                disabled={isEdit}
                error={touched.urunAdi && errors.urunAdi}
              >
                Ürün Adı
              </TextInput>
              <TextInput
                pr="10px"
                name={"birimFiyat1"}
                value={values.birimFiyat1}
                onChange={handleChange}
                disabled={isEdit}
                type="number"
                error={touched.birimFiyat1 && errors.birimFiyat1}
              >
                1 Birim Fiyatı
              </TextInput>
              <TextInput
                pr="10px"
                name={"toplamMalBedeli"}
                value={values.toplamMalBedeli}
                onChange={handleChange}
                disabled={isEdit}
                type="number"
                error={touched.toplamMalBedeli && errors.toplamMalBedeli}
              >
                Toplam Mal Bedeli
              </TextInput>
              <TextInput
                pr="10px"
                name={"logisticMaliyeti"}
                value={values.logisticMaliyeti}
                onChange={handleChange}
                disabled={isEdit}
                error={touched.logisticMaliyeti && errors.logisticMaliyeti}
              >
                Lojistik Maliyeti
              </TextInput>
              <TextInput
                pr="10px"
                name={"sigortaBedeli"}
                value={values.sigortaBedeli}
                onChange={handleChange}
                type="number"
                disabled={isEdit}
                error={touched.sigortaBedeli && errors.sigortaBedeli}
              >
                Sigorta Bedeli
              </TextInput>
              <TextInput
                pr="10px"
                name={"toplamCifMaliyet"}
                value={values.toplamCifMaliyet}
                onChange={handleChange}
                disabled={isEdit}
                type="number"
                error={touched.toplamCifMaliyet && errors.toplamCifMaliyet}
              >
                Toplam CIF Maliyet
              </TextInput>
            </Box>
            <Box width={{ lg: "35%", "2xl": "30%" }} ml="17px">
              <Text fontSize={"22px"}>Gümrük Vergileri</Text>
              <TextInput
                pr="10px"
                name={"gozetimTutari"}
                value={values.gozetimTutari}
                onChange={handleChange}
                disabled={isEdit}
                type="number"
                error={touched.gozetimTutari && errors.gozetimTutari}
              >
                Gözetim Tutarı
              </TextInput>
              <TextInput
                pr="10px"
                name={"gumrukVergisiTutari"}
                value={values.gumrukVergisiTutari}
                onChange={handleChange}
                disabled={isEdit}
                type="number"
                error={
                  touched.gumrukVergisiTutari && errors.gumrukVergisiTutari
                }
              >
                Gümrük Vergisi Tutarı
              </TextInput>
              <TextInput
                pr="10px"
                name={"igvTutari"}
                value={values.igvTutari}
                onChange={handleChange}
                disabled={isEdit}
                type="number"
                error={touched.igvTutari && errors.igvTutari}
              >
                İGV Tutarı
              </TextInput>
              <TextInput
                pr="10px"
                name={"otvTutari"}
                value={values.otvTutari}
                onChange={handleChange}
                disabled={isEdit}
                type="number"
                error={touched.otvTutari && errors.otvTutari}
              >
                ÖTV Tutarı
              </TextInput>
              <TextInput
                pr="10px"
                name={"dampingTutari"}
                value={values.dampingTutari}
                onChange={handleChange}
                disabled={isEdit}
                type="number"
                error={touched.dampingTutari && errors.dampingTutari}
              >
                Damping Tutarı
              </TextInput>
              <TextInput
                pr="10px"
                name={"kdvTutari"}
                value={values.kdvTutari}
                onChange={handleChange}
                disabled={isEdit}
                type="number"
                error={touched.kdvTutari && errors.kdvTutari}
              >
                KDV Tutarı
              </TextInput>
            </Box>
          </Box>
          <button
            id="addCustom"
            type="submit"
            style={{ visibility: "hidden" }}
          ></button>
        </form>
      </Box>
    </Box>
  );
};

export default Cif;
