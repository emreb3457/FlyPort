import { Box, Button, Input } from "@chakra-ui/react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ListTable from "../../components/ListTable";
import useSWR from "swr";
import {
  getCountryInsert,
  getCountryList,
  getCountryRemove,
  getCountryUpdate,
} from "../../api/DefinitionsApi";
import BasicModal from "../../helpers/Modal";
import SkeletonComp from "../../components/Skeleton/Skeleton";
import { useModalStatus } from "../../hooks/useModalStatus";
import { TextInput } from "../../components/Inputs/CustomInputs";
import React, { useMemo, useState } from "react";
import { useFormik } from "formik";
import { countryValidate } from "../../utils/validation";
import { sendRequest } from "../../utils/helpers";

const CountryList = () => {
  const { clickFunct, isClick } = useModalStatus();
  const [page, setPage] = useState(0);
  const [radioValue, setRadioValue] = React.useState({});
  const [submitType, setSubmitType] = React.useState("");

  const { data, mutate, error } = useSWR(["getCountry"], getCountryList);

  const { errors, handleChange, handleSubmit, values, touched, setValues } =
    useFormik({
      initialValues: {
        adTurkce: "",
        adOrjinal: "",
        adIngilizce: "",
        aciklama: "",
      },
      onSubmit: (values, { resetForm }) => {
        submitType === "create"
          ? newCountrySubmit({ values, mutate })
          : updateCountrySubmit({
              values,
              mutate,
              id: radioValue.id,
            });

        resetForm();
        document.getElementsByClassName("chakra-modal__close-btn")[0].click();
      },
      validationSchema: countryValidate,
    });

  const loading = !error && !data;

  const Head = [
    {
      title: "ID",
      column: "id",
    },
    {
      title: "Ad Orjinal",
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

  const newCountrySubmit = async ({ values, mutate }) => {
    const { status } = await sendRequest(
      getCountryInsert("", {
        ...values,
      })
    );
    status && mutate();
  };

  const updateCountrySubmit = async ({ values, mutate, id }) => {
    const { status } = await sendRequest(
      getCountryUpdate("", {
        id,
        ...values,
      })
    );
    status && mutate();
  };

  const removeCountry = async ({ radioValue }) => {
    if (radioValue) {
      const { status } = await sendRequest(
        getCountryRemove("_", radioValue.id)
      );
      status && mutate();
    }
  };

  const NewCountryComp = ({ handleChange, values, handleSubmit }) => {
    return (
      <form onSubmit={handleSubmit} style={{ padding: "10px 0" }}>
        <TextInput
          name={"adOrjinal"}
          value={values.adOrjinal}
          onChange={handleChange}
          error={touched?.adOrjinal && errors.adOrjinal}
        >
          Orjinal Ad
        </TextInput>
        <TextInput
          name={"adTurkce"}
          value={values.adTurkce}
          onChange={handleChange}
          error={touched?.adTurkce && errors.adTurkce}
        >
          Türkçe Ad
        </TextInput>
        <TextInput
          name={"adIngilizce"}
          value={values.adIngilizce}
          onChange={handleChange}
          error={touched?.adIngilizce && errors.adIngilizce}
        >
          Ingilizce Ad
        </TextInput>
        <TextInput
          name={"aciklama"}
          value={values.aciklama}
          onChange={handleChange}
          error={touched?.aciklama && errors.aciklama}
        >
          Acıklama
        </TextInput>
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
            setValues({
              ...radioValue,
            });
            clickFunct();
          },
        }}
        funct3={{
          function: () => {
            removeCountry({ radioValue, mutate });
          },
        }}
      >
        Ülkeler
      </BreadCrumb>
      <Box mt="20px" px={"38px"}>
        <ListTable
          head={Head}
          row={data}
          radioValue={radioValue}
          radioSetValue={setRadioValue}
          link={false}
        />
      </Box>
      <BasicModal
        click={isClick}
        title={submitType === "create" ? "Yeni Ülke Ekle" : "Güncelle"}
        formik={{ handleChange, handleSubmit, values }}
        component={NewCountryComp({ handleChange, values, handleSubmit })}
      />
    </Box>
  );
};
export default React.memo(CountryList);
