import { Box, Button, Input } from "@chakra-ui/react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ListTable from "../../components/Talepler/ProductListTable/ListTable";
import useSWR from "swr";
import {
  getCityInsert,
  getCityList,
  getCityRemove,
  getCityUpdate,
  getCountryList,
} from "../../api/DefinitionsApi";
import BasicModal from "../../helpers/Modal";
import SkeletonComp from "../../components/Skeleton/Skeleton";
import { useModalStatus } from "../../hooks/useModalStatus";
import { SelectInput, TextInput } from "../../components/Inputs/CustomInputs";
import React, { useState } from "react";
import { useFormik } from "formik";
import { cityValidate } from "../../utils/validation";
import { sendRequest } from "../../utils/helpers";

const CityList = () => {
  const { clickFunct, isClick } = useModalStatus();
  const [page, setPage] = useState(0);
  const [radioValue, setRadioValue] = React.useState({});
  const [submitType, setSubmitType] = React.useState("");

  const { data, mutate, error } = useSWR(["city", page], getCityList);
  const { data: countrydata } = useSWR(["country", page], getCountryList);

  const { errors, handleChange, handleSubmit, values, setValues } = useFormik({
    initialValues: {
      adTurkce: "",
      adOrjinal: "",
      adIng: "",
      aciklama: "",
      ulkeId: Number,
    },
    onSubmit: (values, { resetForm }) => {
      submitType === "create"
        ? newCitySubmit({ values, mutate, errors, setValues })
        : updateCitySubmit({
            values,
            mutate,
            errors,
            setValues,
            id: JSON.parse(radioValue).id,
          });
      resetForm();
    },
    validationSchema: cityValidate,
  });

  const loading = !error && !data;

  const Head = ["#", "ID", "Ad Orjinal", "Ad Türkçe", "Ad Ingilizce"];
  const DataHead = ["id", "adOrjinal", "adTurkce", "adIngilizce"];

  const newCitySubmit = async ({ values, mutate, errors, setValues }) => {
    const { status } = await sendRequest(
      getCityInsert("", {
        aciklama: values.aciklama,
        adOrjinal: values.adOrjinal,
        adTurkce: values.adTurkce,
        adIngilizce: values.adIng,
        ulkeId: values.ulkeId,
      }),
      {
        errors,
        setValues,
      }
    );
    status && mutate();
  };

  const updateCitySubmit = async ({
    values,
    mutate,
    errors,
    setValues,
    id,
  }) => {
    const { status } = await sendRequest(
      getCityUpdate("", {
        id,
        aciklama: values.aciklama,
        adOrjinal: values.adOrjinal,
        adTurkce: values.adTurkce,
        adIngilizce: values.adIng,
        ulkeId: values.ulkeId,
      }),
      {
        errors,
        setValues,
      }
    );
    status && mutate();
  };

  const removeCity = async ({ radioValue, mutate }) => {
    const { status } = await sendRequest(
      getCityRemove("_", JSON.parse(radioValue).id)
    );
    status && mutate();
  };

  const NewCityComp = ({ handleChange, values, handleSubmit, data }) => {
    return (
      <form onSubmit={handleSubmit} style={{ padding: "10px 0" }}>
        <TextInput
          name={"adOrjinal"}
          value={values.adOrjinal}
          onChange={handleChange}
        >
          Orjinal Ad
        </TextInput>
        <TextInput
          name={"adTurkce"}
          value={values.adTurkce}
          onChange={handleChange}
        >
          Türkçe Ad
        </TextInput>
        <TextInput name={"adIng"} value={values.adIng} onChange={handleChange}>
          Ingilizce Ad
        </TextInput>
        <SelectInput
          name={"ulkeId"}
          value={values.ulkeId}
          onChange={handleChange}
          data={data}
          visableValue={"adOrjinal"}
        >
          Ülke
        </SelectInput>
        <TextInput
          name={"aciklama"}
          value={values.aciklama}
          onChange={handleChange}
        >
          Acıklama
        </TextInput>
        <Button
          type="submit"
          onClick={() =>
            document
              .getElementsByClassName("chakra-modal__close-btn")[0]
              .click()
          }
        >
          Ekle
        </Button>
      </form>
    );
  };

  return loading ? (
    <SkeletonComp />
  ) : (
    <Box>
      <BreadCrumb
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
            const radiovalue = JSON.parse(radioValue);
            setValues({
              adTurkce: radiovalue.adTurkce,
              adIng: radiovalue.adIngilizce,
              adOrjinal: radiovalue.adOrjinal,
              aciklama: radiovalue.aciklama,
              ulkeId: radiovalue.ulkeId,
            });
            clickFunct();
          },
        }}
        funct3={{
          title: "Sil",
          function: () => {
            setSubmitType("delete");
            removeCity({ radioValue, mutate });
          },
        }}
      >
        Şehirler
      </BreadCrumb>
      <Box mt="20px" px={"38px"}>
        <ListTable
          head={Head}
          dataHead={DataHead}
          row={data?.data}
          page={page}
          totalRowCount={data.totalRowCount}
          changePage={setPage}
          radioValue={radioValue}
          radioSetValue={setRadioValue}
          link={true}
          select={true}
        />
      </Box>
      <BasicModal
        click={isClick}
        title={"Yeni Ülke Ekle"}
        formik={{ handleChange, handleSubmit, values }}
        component={NewCityComp({
          handleChange,
          values,
          handleSubmit,
          data: countrydata?.data,
        })}
      />
    </Box>
  );
};
export default React.memo(CityList);
