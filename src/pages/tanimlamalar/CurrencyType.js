import { Box, Button, Input } from "@chakra-ui/react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ListTable from "../../components/ListTable";
import useSWR from "swr";
import {
  getCurrencyTypeInsert,
  getCurrencyTypeRemove,
  getCurrencyTypeTable,
  getCurrencyTypeUpdate,
} from "../../api/DefinitionsApi";
import BasicModal from "../../helpers/Modal";
import SkeletonComp from "../../components/Skeleton/Skeleton";
import { useModalStatus } from "../../hooks/useModalStatus";
import { TextInput } from "../../components/Inputs/CustomInputs";
import React, { useMemo, useState } from "react";
import { useFormik } from "formik";
import { CurrencyTypeValidate } from "../../utils/validation";
import { sendRequest } from "../../utils/helpers";

const CurrencyTypeList = () => {
  const { clickFunct, isClick } = useModalStatus();
  const [page, setPage] = useState(0);
  const [radioValue, setRadioValue] = React.useState({});
  const [submitType, setSubmitType] = React.useState("");

  const { data, mutate, error } = useSWR(
    ["getCurrencyType"],
    getCurrencyTypeTable
  );

  const { errors, handleChange, handleSubmit, values, touched, setValues } =
    useFormik({
      initialValues: {
        ad: "",
        aciklama: "",
      },
      onSubmit: (values, { resetForm }) => {
        submitType === "create"
          ? newCurrencyTypeSubmit({ values, mutate })
          : updateCurrencyTypeSubmit({
              values,
              mutate,
              id: radioValue.id,
            });

        resetForm();
        document.getElementsByClassName("chakra-modal__close-btn")[0].click();
      },
      validationSchema: CurrencyTypeValidate,
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

  const newCurrencyTypeSubmit = async ({ values, mutate }) => {
    const { status } = await sendRequest(
      getCurrencyTypeInsert("", {
        ...values,
      })
    );
    status && mutate();
  };

  const updateCurrencyTypeSubmit = async ({ values, mutate, id }) => {
    const { status } = await sendRequest(
      getCurrencyTypeUpdate("", {
        id,
        ...values,
      })
    );
    status && mutate();
  };

  const removeCurrencyType = async ({ radioValue }) => {
    if (radioValue) {
      const { status } = await sendRequest(
        getCurrencyTypeRemove("_", radioValue.id)
      );
      status && mutate();
    }
  };

  const NewCurrencyTypeComp = ({ handleChange, values, handleSubmit }) => {
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
            removeCurrencyType({ radioValue, mutate });
          },
        }}
      >
        Döviz Cinsi
      </BreadCrumb>
      <Box mt="20px" px={"38px"}>
        <ListTable
          id="CurrencyType"
          head={Head}
          row={data}
          radioValue={radioValue}
          radioSetValue={setRadioValue}
          link={false}
        />
      </Box>
      <BasicModal
        click={isClick}
        title={submitType === "create" ? "Döviz Cinsi Ekle" : "Güncelle"}
        formik={{ handleChange, handleSubmit, values }}
        component={NewCurrencyTypeComp({ handleChange, values, handleSubmit })}
      />
    </Box>
  );
};
export default React.memo(CurrencyTypeList);
