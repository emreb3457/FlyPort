import { Box, Button, Input } from "@chakra-ui/react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ListTable from "../../components/ListTable";
import useSWR from "swr";
import {
  getCompanyAdressInsert,
  getCompanyAdressRemove,
  getCompanyAdressTable,
  getCompanyAdressUpdate,
} from "../../api/api";
import BasicModal from "../../helpers/Modal";
import SkeletonComp from "../../components/Skeleton/Skeleton";
import { useModalStatus } from "../../hooks/useModalStatus";
import { SelectInput, TextInput } from "../../components/Inputs/CustomInputs";
import React, { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import { newCompanyAdressValidate } from "../../utils/validation";
import { sendRequest } from "../../utils/helpers";
import {
  getCityList,
  getCountryList,
  getDistrictList,
} from "../../api/DefinitionsApi";

const newCompanyAdressSubmit = async ({ values, mutate }) => {
  const { status } = await sendRequest(
    getCompanyAdressInsert("", {
      ...values,
    })
  );
  status && mutate();
};

const updateCompanyAdressSubmit = async ({ values, mutate, id }) => {
  const { status } = await sendRequest(
    getCompanyAdressUpdate("", {
      id,
      ...values,
    })
  );
  status && mutate();
};

const removeCompanyAdress = async ({ radioValue, mutate }) => {
  if (radioValue) {
    const { status } = await sendRequest(
      getCompanyAdressRemove("_", radioValue.id)
    );
    status && mutate();
  }
};
const CompanyAdress = ({ setFunctions }) => {
  const { clickFunct, isClick } = useModalStatus();
  const [page, setPage] = useState(0);
  const [radioValue, setRadioValue] = React.useState({});
  const [submitType, setSubmitType] = React.useState("");

  const { data, mutate, error } = useSWR(
    ["getCompanyAdress"],
    getCompanyAdressTable
  );

  const { data: Ulke } = useSWR(["getCountryList"], getCountryList);

  const { data: Sehir } = useSWR(["getCityList"], getCityList);

  const { data: Ilce } = useSWR(["getDistrictList"], getDistrictList);

  const { errors, handleChange, handleSubmit, values, touched, setValues } =
    useFormik({
      initialValues: {
        ad: "",
        ulkeId: Number,
        sehirId: Number,
        ilceId: Number,
        yetkiliId: Number,
        firmaId: Number,
      },
      onSubmit: (values, { resetForm }) => {
        submitType === "create"
          ? newCompanyAdressSubmit({ values, mutate })
          : updateCompanyAdressSubmit({
              values,
              mutate,
              id: radioValue.id,
            });

        resetForm();
        document.getElementsByClassName("chakra-modal__close-btn")[0].click();
      },
      validationSchema: newCompanyAdressValidate,
    });
  console.log(radioValue);
  useEffect(() => {
    setFunctions({
      create: {
        title: "Yeni Ekle",
        function: () => {
          setSubmitType("create");
          clickFunct();
        },
      },
      update: {
        title: "Düzenle",
        function: () => {
          setSubmitType("update");
          setValues({
            ...radioValue,
          });
          clickFunct();
        },
      },
      remove: {
        title: "Sil",
        function: () => removeCompanyAdress({ radioValue, mutate }),
      },
    });
  });

  const loading = !error && !data;
  const Head = [
    {
      title: "ID",
      column: "id",
    },
    {
      title: "Adres Tipi",
      column: "ad",
    },
    {
      title: "Ülke",
      column: "ulkeAd",
    },
    {
      title: "Şehir",
      column: "sehirAd",
    },
    {
      title: "Yetkili",
      column: "yetkili",
    },
    {
      title: "Yetkili E-mail",
      column: "yetkiliemail",
    },
    {
      title: "Yetkili İletişim",
      column: "yetkilino",
    },
  ];
  const NewCompanyAdressComp = ({ handleChange, values, handleSubmit }) => {
    return (
      <form onSubmit={handleSubmit} style={{ padding: "10px 0" }}>
        <TextInput
          name={"ad"}
          value={values.ad}
          onChange={handleChange}
          error={touched?.ad && errors.ad}
        >
          Adres Tipi
        </TextInput>
        <SelectInput
          name={"ulkeId"}
          value={values.ulkeId}
          onChange={handleChange}
          data={Ulke?.data}
          visableValue={"adOrjinal"}
          error={touched.ulkeId && errors.ulkeId}
        >
          Ülke
        </SelectInput>
        <SelectInput
          name={"sehirId"}
          value={values.sehirId}
          onChange={handleChange}
          data={Sehir?.data}
          visableValue={"adOrjinal"}
          error={touched.sehirId && errors.sehirId}
        >
          Şehir
        </SelectInput>
        <SelectInput
          name={"ilceId"}
          value={values.ilceId}
          onChange={handleChange}
          data={Ilce?.data}
          visableValue={"adOrjinal"}
          error={touched.ilceId && errors.ilceId}
        >
          İlçe
        </SelectInput>
        <SelectInput
          name={"ilceId"}
          value={values.ilceId}
          onChange={handleChange}
          data={Ilce?.data}
          visableValue={"adOrjinal"}
          error={touched.ilceId && errors.ilceId}
        >
          Yetkili
        </SelectInput>
        <Button type="submit">
          {submitType === "create" ? "Ekle" : "Güncelle"}
        </Button>
      </form>
    );
  };

  return loading ? (
    <SkeletonComp />
  ) : (
    <Box>
      <Box mt="20px" px={"38px"}>
        <ListTable
          id="CompanyAdress"
          head={Head}
          row={data}
          radioValue={radioValue}
          radioSetValue={setRadioValue}
          link={false}
        />
      </Box>
      <BasicModal
        click={isClick}
        title={submitType === "create" ? "Yeni Adres Ekle" : "Güncelle"}
        formik={{ handleChange, handleSubmit, values }}
        component={NewCompanyAdressComp({ handleChange, values, handleSubmit })}
      />
    </Box>
  );
};
export default React.memo(CompanyAdress);
