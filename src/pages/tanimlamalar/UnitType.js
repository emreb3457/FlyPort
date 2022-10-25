import { Box, Button, Input } from "@chakra-ui/react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ListTable from "../../components/ListTable";
import useSWR from "swr";
import {
  getUnitTypeInsert,
  getUnitTypeRemove,
  getUnitTypeUpdate,
  getUnitTypeList,
  getUnitTypeTable,
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

  const { data, mutate, error } = useSWR(["getUnitType"], getUnitTypeTable);

  const { errors, handleChange, handleSubmit, values, setValues, touched } =
    useFormik({
      initialValues: {
        ad: "",
        aciklama: "",
      },
      onSubmit: (values, { resetForm }) => {
        submitType === "create"
          ? newUnitTypeSubmit({ values, mutate, errors, setValues })
          : updateUnitTypeSubmit({
              values,
              mutate,
              errors,
              setValues,
              id: radioValue.id,
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

  const newUnitTypeSubmit = async ({ values, mutate }) => {
    const { status } = await sendRequest(
      getUnitTypeInsert("", {
        ...values,
      })
    );
    status && mutate();
  };

  const updateUnitTypeSubmit = async ({ values, mutate, id }) => {
    const { status } = await sendRequest(
      getUnitTypeUpdate("", {
        id,
        ...values,
      })
    );
    status && mutate();
  };

  const removeUnitType = async ({ radioValue, mutate }) => {
    const { status } = await sendRequest(getUnitTypeRemove("_", radioValue.id));
    status && mutate();
  };

  const NewUnitTypeComp = ({ handleChange, values, handleSubmit }) => {
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
            removeUnitType({ radioValue, mutate });
          },
        }}
      >
        Birim Tipi
      </BreadCrumb>
      <Box mt="20px" px={"38px"}>
        <ListTable
          id="UnitType"
          head={Head}
          row={data}
          radioValue={radioValue}
          radioSetValue={setRadioValue}
          link={false}
          select={true}
        />
      </Box>
      <BasicModal
        click={isClick}
        title={submitType === "create" ? "Yeni Birim Tipi" : "Güncelle"}
        formik={{ handleChange, handleSubmit, values }}
        component={NewUnitTypeComp({ handleChange, values, handleSubmit })}
      />
    </Box>
  );
};
export default React.memo(UnitType);
