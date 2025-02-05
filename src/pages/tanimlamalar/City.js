import { Box, Button, Input } from "@chakra-ui/react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ListTable from "../../components/ListTable";
import useSWR from "swr";
import {
  getCityInsert,
  getCityList,
  getCityRemove,
  getCityTable,
  getCityUpdate,
  getCountryList,
  getCountryTable,
} from "../../api/DefinitionsApi";
import BasicModal from "../../helpers/Modal";
import SkeletonComp from "../../components/Skeleton/Skeleton";
import { useModalStatus } from "../../hooks/useModalStatus";
import { SelectInput, TextInput } from "../../components/Inputs/CustomInputs";
import React, { useState } from "react";
import { useFormik } from "formik";
import { cityValidate } from "../../utils/validation";
import { sendRequest } from "../../utils/helpers";
import { SelectBox } from "devextreme-react";

const CityList = () => {
  const { clickFunct, isClick } = useModalStatus();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(999);
  const [radioValue, setRadioValue] = React.useState({});
  const [submitType, setSubmitType] = React.useState("");

  const { data, mutate, error } = useSWR(["getCity", page], getCityTable);
  const { data: countrydata } = useSWR(
    ["getCountry", page, limit],
    getCountryTable
  );

  const {
    errors,
    handleChange,
    handleSubmit,
    values,
    setValues,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      adTurkce: "",
      adOrjinal: "",
      adIngilizce: "",
      aciklama: "",
      ulkeId: Number,
    },
    onSubmit: (values, { resetForm }) => {
      submitType === "create"
        ? newCitySubmit({ values, mutate })
        : updateCitySubmit({
            values,
            mutate,
            id: radioValue.id,
          });
      resetForm();
      document.getElementsByClassName("chakra-modal__close-btn")[0].click();
    },
    validationSchema: cityValidate,
  });

  const Head = [
    {
      title: "ID",
      column: "id",
    },
    {
      title: "Orjinal",
      column: "adOrjinal",
    },
    {
      title: "Ad Türkçe",
      column: "adTurkce",
    },
    {
      title: "Ad Ingilizce",
      column: "adIngilizce",
    },
  ];

  const loading = !error && !data;

  const newCitySubmit = async ({ values, mutate }) => {
    const { status } = await sendRequest(
      getCityInsert("", {
        ...values,
      })
    );
    status && mutate();
  };

  const updateCitySubmit = async ({ values, mutate, id }) => {
    const { status } = await sendRequest(
      getCityUpdate("", {
        id,
        ...values,
      })
    );
    status && mutate();
  };

  const removeCity = async ({ radioValue, mutate }) => {
    if (radioValue) {
      const { status } = await sendRequest(getCityRemove("_", radioValue.id));
      status && mutate();
    }
  };

  const NewCityComp = ({
    handleChange,
    setFieldValue,
    values,
    handleSubmit,
    data,
  }) => {
    return (
      <form onSubmit={handleSubmit} style={{ padding: "10px 0" }}>
        <TextInput
          name={"adOrjinal"}
          value={values.adOrjinal}
          onChange={handleChange}
          error={touched.adOrjinal && errors.adOrjinal}
        >
          Orjinal Ad
        </TextInput>
        <TextInput
          name={"adTurkce"}
          value={values.adTurkce}
          onChange={handleChange}
          error={touched.adTurkce && errors.adTurkce}
        >
          Türkçe Ad
        </TextInput>
        <TextInput
          name={"adIngilizce"}
          value={values.adIngilizce}
          onChange={handleChange}
          error={touched.adIngilizce && errors.adIngilizce}
        >
          Ingilizce Ad
        </TextInput>
        <SelectInput
          name={"ulkeId"}
          value={values.ulkeId}
          onChange={setFieldValue}
          data={data}
          visableValue={"adOrjinal"}
          error={touched.ulkeId && errors.ulkeId}
        >
          Ülke
        </SelectInput>
        <TextInput
          name={"aciklama"}
          value={values.aciklama}
          onChange={handleChange}
          error={touched.aciklama && errors.aciklama}
        >
          Acıklama
        </TextInput>
        <Button type="submit">
          {" "}
          {submitType === "create" ? "Ekle" : "Güncelle"}
        </Button>
      </form>
    );
  };

  return loading ? (
    <SkeletonComp />
  ) : (
    <Box>
      <BreadCrumb
        selectValue={radioValue}
        funct1={{
          title: "Yeni Ekle",
          function: () => {
            setSubmitType("create");
            clickFunct();
          },
        }}
        funct2={{
          title: "Düzenle",
          function: () => {
            setSubmitType("update");
            setValues({
              ...radioValue,
            });
            clickFunct();
          },
        }}
        funct3={{
          function: () => {
            removeCity({ radioValue, mutate });
          },
        }}
      >
        Şehirler
      </BreadCrumb>
      <Box mt="20px" px={"38px"}>
        <ListTable
          id="City"
          head={Head}
          row={data}
          radioValue={radioValue}
          radioSetValue={setRadioValue}
          link={false}
        />
      </Box>
      <BasicModal
        click={isClick}
        title={submitType === "create" ? "Yeni Şehir" : "Güncelle"}
        formik={{ handleChange, handleSubmit, values }}
        component={NewCityComp({
          handleChange,
          values,
          handleSubmit,
          setFieldValue,
          data: countrydata,
        })}
      />
    </Box>
  );
};
export default React.memo(CityList);
