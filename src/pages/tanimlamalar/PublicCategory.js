import { Box, Button, Input } from "@chakra-ui/react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ListTable from "../../components/ListTable";
import useSWR from "swr";
import {
  getPublicCategoryInsert,
  getPublicCategoryList,
  getPublicCategoryRemove,
  getPublicCategoryTable,
  getPublicCategoryUpdate,
} from "../../api/DefinitionsApi";
import BasicModal from "../../helpers/Modal";
import SkeletonComp from "../../components/Skeleton/Skeleton";
import { useModalStatus } from "../../hooks/useModalStatus";
import { TextInput } from "../../components/Inputs/CustomInputs";
import React, { useState } from "react";
import { useFormik } from "formik";
import { PublicCategoryValidate } from "../../utils/validation";
import { sendRequest } from "../../utils/helpers";

const PublicCategory = () => {
  const { clickFunct, isClick } = useModalStatus();
  const [page, setPage] = useState(0);
  const [radioValue, setRadioValue] = React.useState({});
  const [submitType, setSubmitType] = React.useState("");

  const { data, mutate, error } = useSWR(
    ["getPublicCategory", page],
    getPublicCategoryTable
  );

  const { errors, handleChange, handleSubmit, values, touched, setValues } =
    useFormik({
      initialValues: {
        ad: "",
        aciklama: "",
      },
      onSubmit: (values, { resetForm }) => {
        submitType === "create"
          ? newPublicCategorySubmit({ values, mutate })
          : updatePublicCategorySubmit({
              values,
              mutate,
              id: radioValue.id,
            });

        resetForm();
        document.getElementsByClassName("chakra-modal__close-btn")[0].click();
      },
      validationSchema: PublicCategoryValidate,
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

  const newPublicCategorySubmit = async ({ values, mutate }) => {
    const { status } = await sendRequest(
      getPublicCategoryInsert("", {
        ...values,
      })
    );
    status && mutate();
  };

  const updatePublicCategorySubmit = async ({ values, mutate, id }) => {
    const { status } = await sendRequest(
      getPublicCategoryUpdate("", {
        id,
        ...values,
      })
    );
    status && mutate();
  };

  const removePublicCategory = async ({ radioValue, mutate }) => {
    if (radioValue) {
      const { status } = await sendRequest(
        getPublicCategoryRemove("_", radioValue.id)
      );
      status && mutate();
    }
  };

  const NewPublicCategoryComp = ({ handleChange, values, handleSubmit }) => {
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
            removePublicCategory({ radioValue, mutate });
          },
        }}
      >
        Genel Kategori
      </BreadCrumb>
      <Box mt="20px" px={"38px"}>
        <ListTable
          id="PublicCategory"
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
        title={submitType === "create" ? "Yeni Genel Kategori" : "Güncelle"}
        formik={{ handleChange, handleSubmit, values }}
        component={NewPublicCategoryComp({
          handleChange,
          values,
          handleSubmit,
        })}
      />
    </Box>
  );
};
export default React.memo(PublicCategory);
