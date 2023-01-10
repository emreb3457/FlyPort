import { Box, Select, Text, Textarea } from "@chakra-ui/react";
import { Form, useFormik } from "formik";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import {
  TextInput,
  SelectInput,
  DefaultSelect,
} from "../../components/Inputs/CustomInputs";
import {
  arrayParse,
  arrayStringify,
  selectNitelikDeger,
  sendRequest,
} from "../../utils/helpers";
import {} from "../../utils/validation";
import { getGtipInsert, gtipUpdate } from "../../api/api";
import useSWR from "swr";
import {
  getChildrenCategoryTable,
  getPublicCategoryTable,
  getCategoryTable,
  getCountryTable,
} from "../../api/DefinitionsApi";
import { useEffect, useMemo, useState } from "react";
import ImageComp from "../../components/Talepler/ImageComp/ImageComp";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const NewGtip = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(999);
  const [deger, setDeger] = useState([]);
  const [imageURLS, setImageURLs] = useState([]);

  const { data: Country, mutate } = useSWR(
    ["getCountryTable"],
    getCountryTable
  );

  const initialData = useMemo(() => {
    if (state) {
      return {
        ...state,
      };
    } else {
      return {};
    }
  }, [state]);

  const { errors, handleChange, handleSubmit, values, touched, setFieldValue } =
    useFormik({
      initialValues: initialData,
      onSubmit: (values, { resetForm }) => {
        newGtipSubmit({ values });
      },
    });

  const newGtipSubmit = async ({ values }) => {
    setSubmitLoading(true);
    const { status } = await sendRequest(
      id
        ? gtipUpdate("", {
            ...values,
            id,
            tarexIsteniyorMu: values.tarexIsteniyorMu === "true",
            tarimIsteniyorMu: values.tarimIsteniyorMu === "true",
            ihtisasGumruguVarMi: values.ihtisasGumruguVarMi === "true",
          })
        : getGtipInsert("", {
            ...values,
            tarexIsteniyorMu: values.tarexIsteniyorMu === "true",
            tarimIsteniyorMu: values.tarimIsteniyorMu === "true",
            ihtisasGumruguVarMi: values.ihtisasGumruguVarMi === "true",
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
            document.getElementById("addGtip").click();
          },
        }}
      >
        Yeni Gümrük GTİP Tanımlama
      </BreadCrumb>
      <form onSubmit={handleSubmit}>
        <Box display={"flex"} mt="20px" px="50px">
          <Box width={{ lg: "35%", "2xl": "30%" }} marginLeft="30px">
            <SelectInput
              name={"menseiUlkesiId"}
              value={values?.menseiUlkesiId}
              onChange={setFieldValue}
              data={Country}
              visableValue={"adOrjinal"}
              error={touched.menseiUlkesiId && errors.menseiUlkesiId}
            >
              Menşei Ülkesi
            </SelectInput>
            <SelectInput
              name={"cikisUlkesiId"}
              value={values?.cikisUlkesiId}
              onChange={setFieldValue}
              data={Country}
              visableValue={"adOrjinal"}
              error={touched.cikisUlkesiId && errors.cikisUlkesiId}
            >
              Çıkış Ülkesi
            </SelectInput>

            <SelectInput
              name={"varisUlkesiId"}
              value={values?.varisUlkesiId}
              onChange={setFieldValue}
              data={Country}
              visableValue={"adOrjinal"}
              error={touched.varisUlkesiId && errors.varisUlkesiId}
            >
              Varış Ülkesi
            </SelectInput>
            <TextInput
              name={"gTipNo"}
              value={values?.gTipNo}
              onChange={handleChange}
              error={touched.gTipNo && errors.gTipNo}
            >
              GTİP NO
            </TextInput>
            <TextInput
              name={"gTipNoAciklama"}
              value={values?.gTipNoAciklama}
              onChange={handleChange}
              error={touched.gTipNoAciklama && errors.gTipNoAciklama}
            >
              GTİP NO Açıklama
            </TextInput>
          </Box>
          <Box width={{ lg: "35%", "2xl": "30%" }} ml="17px">
            <Box display={"flex"} alignItems="end">
              <TextInput
                pr="10px"
                name={"gozetimTuru"}
                value={values?.gozetimTuru}
                onChange={handleChange}
                error={touched.gozetimTuru && errors.gozetimTuru}
              >
                Gözetim Türü
              </TextInput>
              <TextInput
                pr="10px"
                name={"gozetimOrani"}
                value={values?.gozetimOrani}
                onChange={handleChange}
                type="number"
                error={touched.gozetimOrani && errors.gozetimOrani}
              >
                Gözetim Oranı
              </TextInput>
            </Box>
            <TextInput
              name={"gumrukVergisiOrani"}
              value={values?.gumrukVergisiOrani}
              onChange={handleChange}
              type="number"
              error={touched.gumrukVergisiOrani && errors.gumrukVergisiOrani}
            >
              Gümrük Vergisi Oranı
            </TextInput>
            <TextInput
              name={"igvOrani"}
              value={values?.igvOrani}
              onChange={handleChange}
              type="number"
              error={touched.igvOrani && errors.igvOrani}
            >
              IGV Oranı
            </TextInput>
            <TextInput
              name={"otvOrani"}
              value={values?.otvOrani}
              onChange={handleChange}
              type="number"
              error={touched.otvOrani && errors.otvOrani}
            >
              ÖTV Oranı
            </TextInput>
            <Box display={"flex"} alignItems="end">
              <TextInput
                pr="10px"
                name={"dampingTuru"}
                value={values?.dampingTuru}
                onChange={handleChange}
                error={touched.dampingTuru && errors.dampingTuru}
              >
                Damping Türü
              </TextInput>
              <TextInput
                pr="10px"
                name={"dampingOrani"}
                value={values?.dampingOrani}
                onChange={handleChange}
                type="number"
                error={touched.dampingOrani && errors.dampingOrani}
              >
                Damping Oranı
              </TextInput>
            </Box>
            <TextInput
              name={"kdvOrani"}
              value={values?.kdvOrani}
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
            <DefaultSelect
              name={"ihtisasGumruguVarMi"}
              value={values?.ihtisasGumruguVarMi}
              onChange={handleChange}
              data={[
                { ad: "Evet", id: "true" },
                { ad: "Hayır", id: "false" },
              ]}
              visableValue={"ad"}
              error={touched.ihtisasGumruguVarMi && errors.ihtisasGumruguVarMi}
            >
              İhtisas Gümrüğü Var Mı?
            </DefaultSelect>
          </Box>
        </Box>

        <button
          id="addGtip"
          type="submit"
          style={{ visibility: "hidden" }}
        ></button>
      </form>
    </Box>
  );
};

export default NewGtip;
