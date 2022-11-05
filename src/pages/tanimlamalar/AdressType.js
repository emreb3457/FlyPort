import { Box, Button, Input } from "@chakra-ui/react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ListTable from "../../components/ListTable";
import useSWR from "swr";
import {
  getAdressTypeInsert,
  getAdressTypeRemove,
  getAdressTypeTable,
  getAdressTypeUpdate,
} from "../../api/DefinitionsApi";
import BasicModal from "../../helpers/Modal";
import SkeletonComp from "../../components/Skeleton/Skeleton";
import { useModalStatus } from "../../hooks/useModalStatus";
import { TextInput } from "../../components/Inputs/CustomInputs";
import React, { useMemo, useState } from "react";
import { useFormik } from "formik";
import { AdressTypeValidate } from "../../utils/validation";
import { sendRequest } from "../../utils/helpers";

const AdressTypeList = () => {
  const { clickFunct, isClick } = useModalStatus();
  const [page, setPage] = useState(0);
  const [radioValue, setRadioValue] = React.useState({});
  const [submitType, setSubmitType] = React.useState("");

  const { data, mutate, error } = useSWR(["getAdressType"], getAdressTypeTable);

  const { errors, handleChange, handleSubmit, values, touched, setValues } =
    useFormik({
      initialValues: {
        ad: "",
        aciklama: "",
      },
      onSubmit: (values, { resetForm }) => {
        submitType === "create"
          ? newAdressTypeSubmit({ values, mutate })
          : updateAdressTypeSubmit({
              values,
              mutate,
              id: radioValue.id,
            });

        resetForm();
        document.getElementsByClassName("chakra-modal__close-btn")[0].click();
      },
      validationSchema: AdressTypeValidate,
    });

  const loading = !error && !data;

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
      title: "Açıklama",
      column: "aciklama",
    },
  ];

  const newAdressTypeSubmit = async ({ values, mutate }) => {
    const { status } = await sendRequest(
      getAdressTypeInsert("", {
        ...values,
      })
    );
    status && mutate();
  };

  const updateAdressTypeSubmit = async ({ values, mutate, id }) => {
    const { status } = await sendRequest(
      getAdressTypeUpdate("", {
        id,
        ...values,
      })
    );
    status && mutate();
  };

  const removeAdressType = async ({ radioValue }) => {
    if (radioValue) {
      const { status } = await sendRequest(
        getAdressTypeRemove("_", radioValue.id)
      );
      status && mutate();
    }
  };

  const NewAdressTypeComp = ({ handleChange, values, handleSubmit }) => {
    return (
      <form onSubmit={handleSubmit} style={{ padding: "10px 0" }}>
        <TextInput
          name={"ad"}
          value={values.ad}
          onChange={handleChange}
          error={touched?.ad && errors.ad}
        >
          Ad
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
            removeAdressType({ radioValue, mutate });
          },
        }}
      >
        Adres Tipi
      </BreadCrumb>
      <Box mt="20px" px={"38px"}>
        <ListTable
          id="AdressType"
          head={Head}
          row={data}
          radioValue={radioValue}
          radioSetValue={setRadioValue}
          link={false}
        />
      </Box>
      <BasicModal
        click={isClick}
        title={submitType === "create" ? "Adres Tipi Ekle" : "Güncelle"}
        formik={{ handleChange, handleSubmit, values }}
        component={NewAdressTypeComp({ handleChange, values, handleSubmit })}
      />
    </Box>
  );
};
export default React.memo(AdressTypeList);
