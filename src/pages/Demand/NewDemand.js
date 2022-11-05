import { Box, Input, Select, Text, Textarea } from "@chakra-ui/react";
import { useFormik } from "formik";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import {
  TextInput,
  SelectInput,
  DateInput,
} from "../../components/Inputs/CustomInputs";
import {
  arrayParse,
  arrayStringify,
  selectNitelikDeger,
  sendRequest,
} from "../../utils/helpers";
import { newDemandValidate } from "../../utils/validation";
import { getCompanyList, getCompany, getDemandInsert } from "../../api/api";
import useSWR from "swr";
import { getCountryList, getDeliveryList } from "../../api/DefinitionsApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";

const NewDemand = () => {
  const navigate = useNavigate();
  const [submitLoading, setSublitLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(999);
  const [companyId, setCompanyId] = useState();

  const { data: Country } = useSWR(
    ["getCountryList", page, limit],
    getCountryList
  );

  const { data: Company } = useSWR(
    ["getCompanyList", page, limit],
    getCompanyList
  );

  const { data: CompanyOfficial } = useSWR(
    ["getCompanyList", companyId],
    getCompany
  );

  const { errors, handleChange, handleSubmit, values, touched, setFieldValue } =
    useFormik({
      initialValues: {
        musteriId: Number,
        yetkiliId: Number,
        talepTuru: Number,
        istenilenUlkeId: Number,
        varisUlkesiId: Number,
        talepTarihi: "",
      },
      onSubmit: (values, { resetForm }) => {
        newDemondSubmit({ values });
      },
      validationSchema: newDemandValidate,
    });
  console.log(values);
  useEffect(() => {
    setCompanyId(values.musteriId);
  }, [values]);

  const newDemondSubmit = async ({ values }) => {
    setSublitLoading(true);
    const { status } = await sendRequest(
      getDemandInsert("", {
        ...values,
      })
    );
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
          <Box width={{ lg: "35%", "2xl": "30%" }} marginLeft="30px">
            <SelectInput
              name={"talepTuru"}
              value={values.Islenilen}
              onChange={handleChange}
              data={[
                { ad: "Ürün Tedarigi", id: 1 },
                { ad: "Taşıma", id: 2 },
                { ad: "Gümrükleme", id: 3 },
              ]}
              visableValue={"ad"}
              error={touched.Islenilen && errors.Islenilen}
            >
              Talep Türü
            </SelectInput>
            <SelectInput
              name={"istenilenUlkeId"}
              value={values.istenilenUlkeId}
              data={Country?.data}
              visableValue="adOrjinal"
              onChange={handleChange}
              error={touched.istenilenUlkeId && errors.istenilenUlkeId}
            >
              İstenen Ülke
            </SelectInput>
            <SelectInput
              name={"varisUlkesiId"}
              value={values.varisUlkesiId}
              data={Country?.data}
              visableValue="adOrjinal"
              onChange={handleChange}
              error={touched.varisUlkesiId && errors.varisUlkesiId}
            >
              Varış Ülkesi
            </SelectInput>
          </Box>
          <Box width={{ lg: "35%", "2xl": "30%" }} ml="17px">
            <SelectInput
              name={"musteriId"}
              value={values.musteriId}
              onChange={handleChange}
              data={Company?.data}
              visableValue={"kisaAdi"}
              error={touched.musteriId && errors.musteriId}
            >
              Müşteri
            </SelectInput>
            <SelectInput
              name={"yetkiliId"}
              value={values.yetkiliId}
              onChange={handleChange}
              data={CompanyOfficial?.firmaYetkilileri}
              visableValue={"email"}
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
