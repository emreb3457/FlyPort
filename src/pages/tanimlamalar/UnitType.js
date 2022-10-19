import { Box, Button, Input } from "@chakra-ui/react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ListTable from "../../components/ListTable";
import useSWR from "swr";
import {
  getUnitTypeInsert,
  getUnitTypeRemove,
  getUnitTypeUpdate,
  getUnitTypeList,
} from "../../api/DefinitionsApi";
import BasicModal from "../../helpers/Modal";
import SkeletonComp from "../../components/Skeleton/Skeleton";
import { useModalStatus } from "../../hooks/useModalStatus";
import { TextInput } from "../../components/Inputs/CustomInputs";
import React, { useState } from "react";
import { useFormik } from "formik";
import { UnitTypeValidate } from "../../utils/validation";
import { sendRequest } from "../../utils/helpers";

const UnitType = () => {
  const { clickFunct, isClick } = useModalStatus();
  const [page, setPage] = useState(0);
  const [radioValue, setRadioValue] = React.useState({});
  const [submitType, setSubmitType] = React.useState("");

  const { data, mutate, error } = useSWR(
    ["getUnitType", page],
    getUnitTypeList
  );

  const { errors, handleChange, handleSubmit, values, setValues, touched } =
    useFormik({
      initialValues: {
        ad: "",
        aciklama: "",
      },
      onSubmit: (values, { resetForm }) => {
        submitType === "create"
          ? newCountrySubmit({ values, mutate, errors, setValues })
          : updateCountrySubmit({
              values,
              mutate,
              errors,
              setValues,
              id: JSON.parse(radioValue).id,
            });
        resetForm();
        document.getElementsByClassName("chakra-modal__close-btn")[0].click();
      },
      validationSchema: UnitTypeValidate,
    });

  const Head = [
    {
      title: "ID",
      column: "id",
    },
    {
      title: "Ad ",
      column: "ad",
    },
    {
      title: "Açıklama ",
      column: "aciklama",
    },
  ];

  const loading = !error && !data;

  const newCountrySubmit = async ({ values, mutate }) => {
    const { status } = await sendRequest(
      getUnitTypeInsert("", {
        ...values,
      })
    );
    status && mutate();
  };

  const updateCountrySubmit = async ({ values, mutate, id }) => {
    const { status } = await sendRequest(
      getUnitTypeUpdate("", {
        id,
        ...values,
      })
    );
    status && mutate();
  };

  const removeCountry = async ({ radioValue, mutate }) => {
    const { status } = await sendRequest(
      getUnitTypeRemove("_", JSON.parse(radioValue).id)
    );
    status && mutate();
  };

  const NewCountryComp = ({ handleChange, values, handleSubmit }) => {
    return (
      <form onSubmit={handleSubmit} style={{ padding: "10px 0" }}>
        <TextInput
          name={"ad"}
          value={values.ad}
          onChange={handleChange}
          error={touched.ad && errors.ad}
        >
          Ad
        </TextInput>
        <TextInput
          name={"aciklama"}
          value={values.aciklama}
          onChange={handleChange}
          error={touched.aciklama && errors.aciklama}
        >
          Acıklama
        </TextInput>
        <Button type="submit">Ekle</Button>
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
              ...radiovalue,
            });
            clickFunct();
          },
        }}
        funct3={{
          title: "Sil",
          function: () => {
            setSubmitType("delete");
            removeCountry({ radioValue, mutate });
          },
        }}
      >
        Birim Tipi
      </BreadCrumb>
      <Box mt="20px" px={"38px"}>
        <ListTable
          head={Head}
          row={data?.data}
          page={page}
          totalRowCount={data?.totalRowCount}
          changePage={setPage}
          radioValue={radioValue}
          radioSetValue={setRadioValue}
          link={false}
          select={true}
        />
      </Box>
      <BasicModal
        click={isClick}
        title={"Yeni Ülke Ekle"}
        formik={{ handleChange, handleSubmit, values }}
        component={NewCountryComp({ handleChange, values, handleSubmit })}
      />
    </Box>
  );
};
export default React.memo(UnitType);
