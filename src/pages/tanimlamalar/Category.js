import { Box, Button, Input } from "@chakra-ui/react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ListTable from "../../components/ListTable";
import useSWR from "swr";
import {
  getCategoryInsert,
  getCategoryList,
  getCategoryRemove,
  getCategoryUpdate,
  getChildrenCategoryList,
} from "../../api/DefinitionsApi";
import BasicModal from "../../helpers/Modal";
import SkeletonComp from "../../components/Skeleton/Skeleton";
import { useModalStatus } from "../../hooks/useModalStatus";
import { SelectInput, TextInput } from "../../components/Inputs/CustomInputs";
import React, { useState } from "react";
import { useFormik } from "formik";
import { CategoryValidate } from "../../utils/validation";
import { sendRequest } from "../../utils/helpers";

const Category = () => {
  const { clickFunct, isClick } = useModalStatus();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(999);
  const [radioValue, setRadioValue] = React.useState({});
  const [submitType, setSubmitType] = React.useState("");

  const { data, mutate, error } = useSWR(
    ["getCategory", page],
    getCategoryList
  );

  const { data: PublicCategory } = useSWR(
    ["getPublicCategory", page, limit],
    getChildrenCategoryList
  );

  const { errors, handleChange, handleSubmit, values, touched, setValues } =
    useFormik({
      initialValues: {
        ad: "",
        aciklama: "",
        altKategoriId: "",
      },
      onSubmit: (values, { resetForm }) => {
        submitType === "create"
          ? newCategorySubmit({ values, mutate })
          : updateCategorySubmit({
              values,
              mutate,
              id: JSON.parse(radioValue).id,
            });

        resetForm();
        document.getElementsByClassName("chakra-modal__close-btn")[0].click();
      },
      validationSchema: CategoryValidate,
    });

  const loading = !error && !data;

  const Head = [
    {
      title: "ID",
      column: "id",
    },
    {
      title: "Ad",
      column: "ad",
    },
    {
      title: "Kategori",
      column: "altKAtegoriAd",
    },
    {
      title: "Açıklama",
      column: "aciklama",
    },
  ];

  const newCategorySubmit = async ({ values, mutate }) => {
    const { status } = await sendRequest(
      getCategoryInsert("", {
        ...values,
      })
    );
    status && mutate();
  };

  const updateCategorySubmit = async ({ values, mutate, id }) => {
    const { status } = await sendRequest(
      getCategoryUpdate("", {
        id,
        ...values,
      })
    );
    status && mutate();
  };

  const removeCategory = async ({ radioValue, mutate }) => {
    const { status } = await sendRequest(
      getCategoryRemove("_", JSON.parse(radioValue).id)
    );
    status && mutate();
  };

  const NewCategoryComp = ({ handleChange, values, handleSubmit, data }) => {
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
        <SelectInput
          name={"altKategoriId"}
          value={values.altKategoriId}
          onChange={handleChange}
          data={data}
          visableValue={"ad"}
          error={touched.altKategoriId && errors.altKategoriId}
        >
          Alt Kategori
        </SelectInput>
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
            removeCategory({ radioValue, mutate });
          },
        }}
      >
        Kategori
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
        title={"Yeni Kategori"}
        formik={{ handleChange, handleSubmit, values }}
        component={NewCategoryComp({
          handleChange,
          values,
          handleSubmit,
          data: PublicCategory?.data,
        })}
      />
    </Box>
  );
};
export default React.memo(Category);
