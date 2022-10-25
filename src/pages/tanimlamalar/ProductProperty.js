import { Box, Button, Input } from "@chakra-ui/react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ListTable from "../../components/ListTable";
import useSWR from "swr";
import {
  getProductPropertyInsert,
  getProductPropertyList,
  getProductPropertyRemove,
  getProductPropertyUpdate,
} from "../../api/DefinitionsApi";
import BasicModal from "../../helpers/Modal";
import SkeletonComp from "../../components/Skeleton/Skeleton";
import { useModalStatus } from "../../hooks/useModalStatus";
import { TextInput } from "../../components/Inputs/CustomInputs";
import React, { useState } from "react";
import { useFormik } from "formik";
import { ProductPropertyValidate } from "../../utils/validation";
import { sendRequest } from "../../utils/helpers";

const ProductProperty = () => {
  const { clickFunct, isClick } = useModalStatus();
  const [page, setPage] = useState(0);
  const [radioValue, setRadioValue] = React.useState({});
  const [submitType, setSubmitType] = React.useState("");

  const { data, mutate, error } = useSWR(
    ["getProductProperty", page],
    getProductPropertyList
  );

  const { errors, handleChange, handleSubmit, values, touched, setValues } =
    useFormik({
      initialValues: {
        ad: "",
        aciklama: "",
      },
      onSubmit: (values, { resetForm }) => {
        submitType === "create"
          ? newProductPropertySubmit({ values, mutate })
          : updateProductPropertySubmit({
              values,
              mutate,
              id: radioValue.id,
            });

        resetForm();
        document.getElementsByClassName("chakra-modal__close-btn")[0].click();
      },
      validationSchema: ProductPropertyValidate,
    });

  const Head = [
    {
      title: "ID",
      column: "nitelikId",
    },
    {
      title: "Ad ",
      column: "ad",
    },
  ];

  const loading = !error && !data;

  const newProductPropertySubmit = async ({ values, mutate }) => {
    const { status } = await sendRequest(
      getProductPropertyInsert("", {
        ...values,
      })
    );
    status && mutate();
  };

  const updateProductPropertySubmit = async ({ values, mutate, id }) => {
    const { status } = await sendRequest(
      getProductPropertyUpdate("", {
        id,
        ...values,
      })
    );
    status && mutate();
  };

  const removeProductProperty = async ({ radioValue, mutate }) => {
    if (radioValue) {
      const { status } = await sendRequest(
        getProductPropertyRemove("_", radioValue.id)
      );
      status && mutate();
    }
  };

  const NewProductPropertyComp = ({ handleChange, values, handleSubmit }) => {
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
            removeProductProperty({ radioValue, mutate });
          },
        }}
      >
        Nitelik
      </BreadCrumb>
      <Box mt="20px" px={"38px"}>
        <ListTable id="ProductionProp"
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
        title={submitType === "create" ? "Yeni Nitelik Değer" : "Güncelle"}
        formik={{ handleChange, handleSubmit, values }}
        component={NewProductPropertyComp({
          handleChange,
          values,
          handleSubmit,
        })}
      />
    </Box>
  );
};
export default React.memo(ProductProperty);
