import { Box, Button, Input } from "@chakra-ui/react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ListTable from "../../components/ListTable";
import useSWR from "swr";
import {
  getDeliveryInsert,
  getDeliveryList,
  getDeliveryRemove,
  getDeliveryTable,
  getDeliveryUpdate,
} from "../../api/DefinitionsApi";
import BasicModal from "../../helpers/Modal";
import SkeletonComp from "../../components/Skeleton/Skeleton";
import { useModalStatus } from "../../hooks/useModalStatus";
import { TextInput } from "../../components/Inputs/CustomInputs";
import React, { useState } from "react";
import { useFormik } from "formik";
import { countryValidate, DeliveryTypeValidate } from "../../utils/validation";
import { sendRequest } from "../../utils/helpers";

const DeliveryType = () => {
  const { clickFunct, isClick } = useModalStatus();
  const [page, setPage] = useState(0);
  const [radioValue, setRadioValue] = React.useState({});
  const [submitType, setSubmitType] = React.useState("");

  const { data, mutate, error } = useSWR(
    ["getDelivery", page],
    getDeliveryTable
  );

  const { errors, handleChange, handleSubmit, values, touched, setValues } =
    useFormik({
      initialValues: {
        ad: "",
        aciklama: "",
      },
      onSubmit: (values, { resetForm }) => {
        submitType === "create"
          ? newDeliverySubmit({ values, mutate })
          : updateDeliverySubmit({
              values,
              mutate,
              id: radioValue.id,
            });

        resetForm();
        document.getElementsByClassName("chakra-modal__close-btn")[0].click();
      },
      validationSchema: DeliveryTypeValidate,
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
      title: "Açıklama",
      column: "aciklama",
    },
  ];

  const loading = !error && !data;

  const newDeliverySubmit = async ({ mutate }) => {
    const { status } = await sendRequest(getDeliveryInsert("", { ...values }));
    status && mutate();
  };

  const updateDeliverySubmit = async ({ mutate, id }) => {
    const { status } = await sendRequest(
      getDeliveryUpdate("", {
        id,
        ...values,
      })
    );
    status && mutate();
  };

  const removeDelivery = async ({ radioValue, mutate }) => {
    if (radioValue) {
      const { status } = await sendRequest(
        getDeliveryRemove("_", radioValue.id)
      );
      status && mutate();
    }
  };

  const NewDeliveryComp = ({ handleChange, values, handleSubmit }) => {
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
            removeDelivery({ radioValue, mutate });
          },
        }}
      >
        Taşıma Tipi
      </BreadCrumb>
      <Box mt="20px" px={"38px"}>
        <ListTable id="DeliveryType"
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
        title={submitType === "create" ? "Yeni Taşıma Tipi" : "Güncelle"}
        formik={{ handleChange, handleSubmit, values }}
        component={NewDeliveryComp({ handleChange, values, handleSubmit })}
      />
    </Box>
  );
};
export default React.memo(DeliveryType);
