import { Box, Text, Textarea } from "@chakra-ui/react";
import { useFormik } from "formik";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import {
  TextInput,
  SelectInput,
  DefaultSelect,
} from "../../components/Inputs/CustomInputs";
import { sendRequest, stringToBoolean } from "../../utils/helpers";
import useSWR from "swr";
import { getCountryTable, getCityTable } from "../../api/DefinitionsApi";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../constants/routes";
import { customInsert } from "../../api/api";
import { newCustom } from "../../utils/validation";

const NewCustom = () => {
  const navigate = useNavigate();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(999);
  const { id } = useParams();
  const { errors, handleChange, handleSubmit, values, touched, setFieldValue } =
    useFormik({
      initialValues: {
        teklifUrunId: id,
        menseiUlkeId: "",
        cikisUlkeId: "",
        varisUlkeId: "",
        gTipNo: "",
        gTipNoAciklama: "",
        gozetimTuru: "",
        kgGozetimOrani: "",
        gumrukVergisiOrani: "",
        igvOrani: "",
        dampingTuru: "",
        dampingOrani: "",
        otvOrani: "",
        kdvOrani: "",
        tarexIsteniyorMu: "",
        tarimIsteniyorMu: "",
        ihtisasGumruguVarMi: "",
      },
      onSubmit: (values, { resetForm }) => {
        newCustomSubmit({ values });
      },
      validationSchema: newCustom,
    });

  const { data: Country, mutate } = useSWR(
    ["getCountryTable", page, limit],
    getCountryTable
  );

  const { data: City } = useSWR(
    ["getCityTable", values.UlkeId, page, limit],
    getCityTable
  );

  const newCustomSubmit = async ({ values }) => {
    setSubmitLoading(true);
    const { status } = await sendRequest(
      customInsert("", {
        ...values,
        tarexIsteniyorMu: stringToBoolean(values?.tarexIsteniyorMu),
        tarimIsteniyorMu: stringToBoolean(values?.tarimIsteniyorMu),
      })
    );
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
            document.getElementById("addCustom").click();
          },
        }}
      >
        Yeni Gümrükleme
      </BreadCrumb>
      <Box px="50px" mt="40px">
        <form onSubmit={handleSubmit}>
          <Box display={["block", "block", "block", "flex"]} mt="20px">
            <Box width={{ lg: "35%", "2xl": "30%" }}>
              <SelectInput
                name={"menseiUlkeId"}
                value={values.menseiUlkeId}
                data={Country}
                visableValue="adOrjinal"
                onChange={setFieldValue}
                error={touched.menseiUlkeId && errors.menseiUlkeId}
              >
                Menşei Ülkesi
              </SelectInput>
              <SelectInput
                name={"cikisUlkeId"}
                value={values.cikisUlkeId}
                data={Country}
                visableValue="adOrjinal"
                onChange={setFieldValue}
                error={touched.cikisUlkeId && errors.cikisUlkeId}
              >
                Çıkış Ülkesi
              </SelectInput>
              <SelectInput
                name={"varisUlkeId"}
                value={values.varisUlkeId}
                data={Country}
                visableValue="adOrjinal"
                onChange={setFieldValue}
                error={touched.varisUlkeId && errors.varisUlkeId}
              >
                Varış Ülkesi
              </SelectInput>
              <TextInput
                name={"gTipNo"}
                value={values.gTipNo}
                onChange={handleChange}
                error={touched.gTipNo && errors.gTipNo}
              >
                GTİP NO
              </TextInput>
              <TextInput
                name={"gTipNoAciklama"}
                value={values.gTipNoAciklama}
                onChange={handleChange}
                error={touched.gTipNoAciklama && errors.gTipNoAciklama}
              >
                GTİP No Açıklama
              </TextInput>
            </Box>
            <Box width={{ lg: "35%", "2xl": "30%" }} ml="17px">
              <Box display={"flex"} alignItems="end">
                <TextInput
                  pr="10px"
                  name={"gozetimTuru"}
                  value={values.gozetimTuru}
                  onChange={handleChange}
                  error={touched.gozetimTuru && errors.gozetimTuru}
                >
                  Gözetim Türü
                </TextInput>
                <TextInput
                  pr="10px"
                  name={"kgGozetimOrani"}
                  value={values.kgGozetimOrani}
                  onChange={handleChange}
                  error={touched.kgGozetimOrani && errors.kgGozetimOrani}
                >
                  KG Gözetim Oranı
                </TextInput>
              </Box>
              <TextInput
                pr="10px"
                name={"gumrukVergisiOrani"}
                value={values.gumrukVergisiOrani}
                onChange={handleChange}
                type="number"
                error={touched.gumrukVergisiOrani && errors.gumrukVergisiOrani}
              >
                Gümrük Vergisi Oranı
              </TextInput>
              <TextInput
                pr="10px"
                name={"igvOrani"}
                value={values.igvOrani}
                onChange={handleChange}
                type="number"
                error={touched.igvOrani && errors.igvOrani}
              >
                İGV Oranı
              </TextInput>
              <Box display={"flex"} alignItems="end">
                <TextInput
                  pr="10px"
                  name={"dampingTuru"}
                  value={values.dampingTuru}
                  onChange={handleChange}
                  error={touched.dampingTuru && errors.dampingTuru}
                >
                  Damping Türü
                </TextInput>
                <TextInput
                  pr="10px"
                  name={"dampingOrani"}
                  value={values.dampingOrani}
                  onChange={handleChange}
                  type="number"
                  error={touched.dampingOrani && errors.dampingOrani}
                >
                  Damping Oranı
                </TextInput>
              </Box>
              <TextInput
                pr="10px"
                name={"otvOrani"}
                value={values.otvOrani}
                onChange={handleChange}
                type="number"
                error={touched.otvOrani && errors.otvOrani}
              >
                ÖTV Oranı
              </TextInput>
              <TextInput
                pr="10px"
                name={"kdvOrani"}
                value={values.kdvOrani}
                onChange={handleChange}
                type="number"
                error={touched.kdvOrani && errors.kdvOrani}
              >
                KDV Oranı
              </TextInput>
            </Box>
            <Box width={{ lg: "35%", "2xl": "30%" }} ml="17px">
              <DefaultSelect
                name={"tarexIsteniyorMu"}
                value={values.tarexIsteniyorMu}
                onChange={handleChange}
                data={[
                  { ad: "Evet", id: "true" },
                  { ad: "Hayır", id: "false" },
                ]}
                visableValue={"ad"}
                error={touched.tarexIsteniyorMu && errors.tarexIsteniyorMu}
              >
                Tarex İsteniyor Mu?
              </DefaultSelect>
              <DefaultSelect
                name={"tarimIsteniyorMu"}
                value={values.tarimIsteniyorMu}
                onChange={handleChange}
                data={[
                  { ad: "Evet", id: "true" },
                  { ad: "Hayır", id: "false" },
                ]}
                visableValue={"ad"}
                error={touched.tarimIsteniyorMu && errors.tarimIsteniyorMu}
              >
                Tarım İsteniyor Mu?
              </DefaultSelect>
              <TextInput
                name={"ihtisasGumruguVarMi"}
                value={values.ihtisasGumruguVarMi}
                onChange={handleChange}
                error={
                  touched.ihtisasGumruguVarMi && errors.ihtisasGumruguVarMi
                }
              >
                İhtisas Gümrüğü Var mı?
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

export default NewCustom;
