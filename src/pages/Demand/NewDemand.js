import { Box, Input, Select, Text, Textarea } from "@chakra-ui/react";
import { useFormik } from "formik";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import {
  TextInput,
  SelectInput,
  DateInput,
  DefaultSelect,
} from "../../components/Inputs/CustomInputs";
import {
  arrayParse,
  arrayStringify,
  selectNitelikDeger,
  sendRequest,
} from "../../utils/helpers";
import { newDemandValidate } from "../../utils/validation";
import {
  getCompanyOfficialTable,
  getDemandInsert,
  getCompanyTable,
} from "../../api/api";
import useSWR from "swr";
import {
  getCountryList,
  getCountryTable,
  getDeliveryList,
} from "../../api/DefinitionsApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";

const NewDemand = () => {
  const navigate = useNavigate();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(999);
  const [companyId, setCompanyId] = useState();

  const { errors, handleChange, handleSubmit, values, touched, setFieldValue } =
    useFormik({
      initialValues: {
        musteriId: "",
        yetkiliId: "",
        talepTuru: "",
        istenilenUlkeId: "",
        varisUlkesiId: "",
        talepTarihi: "",
      },
      onSubmit: (values, { resetForm }) => {
        newDemondSubmit({ values });
      },
      validationSchema: newDemandValidate,
    });

  const { data: Country } = useSWR(
    ["getCountryTable", page, limit],
    getCountryTable
  );

  const { data: Company } = useSWR(
    ["getCompanyTable", page, limit],
    getCompanyTable
  );

  const { data: CompanyOfficial } = useSWR(
    ["getCompanyOfficialTable", values?.musteriId],
    getCompanyOfficialTable
  );

  useEffect(() => {
    setCompanyId(values.musteriId);
  }, [values]);

  const newDemondSubmit = async ({ values }) => {
    setSubmitLoading(true);
    const { status } = await sendRequest(
      getDemandInsert("", {
        ...values,
      })
    );
    if (status) {
      setSubmitLoading(false);
      navigate(routes.talepler);
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
        Yeni Talep
      </BreadCrumb>

      <form onSubmit={handleSubmit}>
        <Box display={["block", "block", "block", "flex"]} mt="20px" px="50px">
          <Box width={{ lg: "35%", "2xl": "30%" }} marginLeft="30px">
            <DefaultSelect
              name={"talepTuru"}
              value={values.talepTuru}
              onChange={handleChange}
              data={[
                { ad: "Ürün Tedarigi", id: 1 },
                { ad: "Taşıma", id: 2 },
                { ad: "Gümrükleme", id: 3 },
              ]}
              visableValue={"ad"}
              error={touched.talepTuru && errors.talepTuru}
            >
              Talep Türü
            </DefaultSelect>
            <SelectInput
              name={"istenilenUlkeId"}
              value={values.istenilenUlkeId}
              data={Country}
              visableValue="adOrjinal"
              onChange={setFieldValue}
              error={touched.istenilenUlkeId && errors.istenilenUlkeId}
            >
              İstenen Ülke
            </SelectInput>
            <SelectInput
              name={"varisUlkesiId"}
              value={values.varisUlkesiId}
              data={Country}
              visableValue="adOrjinal"
              onChange={setFieldValue}
              error={touched.varisUlkesiId && errors.varisUlkesiId}
            >
              Varış Ülkesi
            </SelectInput>
          </Box>
          <Box width={{ lg: "35%", "2xl": "30%" }} ml="17px">
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
              name={"yetkiliId"}
              value={values.yetkiliId}
              onChange={setFieldValue}
              data={CompanyOfficial}
              visableValue={"ad"}
              error={touched.yetkiliId && errors.yetkiliId}
            >
              Yetkili
            </SelectInput>
            <DateInput
              name="talepTarihi"
              value={values.talepTarihi}
              onChange={handleChange}
              error={touched.talepTarihi && errors.talepTarihi}
            >
              Geçerlilik Tarihi
            </DateInput>
          </Box>
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
