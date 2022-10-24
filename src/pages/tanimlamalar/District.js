import { Box, Button, Input } from "@chakra-ui/react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ListTable from "../../components/ListTable";
import useSWR from "swr";
import {
  getDistrictInsert,
  getDistrictList,
  getDistrictRemove,
  getDistrictUpdate,
  getCityList,
} from "../../api/DefinitionsApi";
import BasicModal from "../../helpers/Modal";
import SkeletonComp from "../../components/Skeleton/Skeleton";
import { useModalStatus } from "../../hooks/useModalStatus";
import { SelectInput, TextInput } from "../../components/Inputs/CustomInputs";
import React, { useState } from "react";
import { useFormik } from "formik";
import { districtValidate } from "../../utils/validation";
import { sendRequest } from "../../utils/helpers";

const DistrictList = () => {
  const { clickFunct, isClick } = useModalStatus();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(999);
  const [radioValue, setRadioValue] = React.useState({});
  const [submitType, setSubmitType] = React.useState("");

  const { data, mutate, error } = useSWR(
    ["getDistrict", page],
    getDistrictList
  );
  const { data: citydata } = useSWR(["getCity", page, limit], getCityList);

  const { errors, handleChange, handleSubmit, values, setValues, touched } =
    useFormik({
      initialValues: {
        adTurkce: "",
        adOrjinal: "",
        adIngilizce: "",
        aciklama: "",
        sehirId: Number,
      },
      onSubmit: (values, { resetForm }) => {
        submitType === "create"
          ? newDistrictSubmit({ values, mutate, errors, setValues })
          : updateDistrictSubmit({
              values,
              mutate,
              errors,
              setValues,
              id: radioValue.id,
            });
        resetForm();
        document.getElementsByClassName("chakra-modal__close-btn")[0].click();
      },
      validationSchema: districtValidate,
    });

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

  const loading = !error && !data;

  const newDistrictSubmit = async ({ values, mutate }) => {
    const { status } = await sendRequest(
      getDistrictInsert("", {
        ...values,
      })
    );
    status && mutate();
  };

  const updateDistrictSubmit = async ({ values, mutate, id }) => {
    const { status } = await sendRequest(
      getDistrictUpdate("", {
        id,
        ...values,
      })
    );
    status && mutate();
  };

  const removeDistrict = async ({ radioValue, mutate }) => {
    if (radioValue) {
      const { status } = await sendRequest(
        getDistrictRemove("_", radioValue.id)
      );
      status && mutate();
    }
  };

  const NewDistrictComp = ({ handleChange, values, handleSubmit, data }) => {
    return (
      <form onSubmit={handleSubmit} style={{ padding: "10px 0" }}>
        <TextInput
          name={"adOrjinal"}
          value={values.adOrjinal}
          onChange={handleChange}
          error={touched.adOrjinal && errors.adOrjinal}
        >
          Orjinal Ad
        </TextInput>
        <TextInput
          name={"adTurkce"}
          value={values.adTurkce}
          onChange={handleChange}
          error={touched.adTurkce && errors.adTurkce}
        >
          Türkçe Ad
        </TextInput>
        <TextInput
          name={"adIngilizce"}
          value={values.adIngilizce}
          onChange={handleChange}
          error={touched.adIngilizce && errors.adIngilizce}
        >
          Ingilizce Ad
        </TextInput>
        <SelectInput
          name={"sehirId"}
          value={values.sehirId}
          onChange={handleChange}
          data={data}
          visableValue={"adOrjinal"}
          error={touched.sehirId && errors.sehirId}
        >
          Şehir
        </SelectInput>
        <TextInput
          name={"aciklama"}
          value={values.aciklama}
          onChange={handleChange}
          error={touched.aciklama && errors.aciklama}
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
            removeDistrict({ radioValue, mutate });
          },
        }}
      >
        İlçeler
      </BreadCrumb>
      <Box mt="20px" px={"38px"}>
        <ListTable
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
        title={submitType === "create" ? "Yeni İlçe" : "Güncelle"}
        formik={{ handleChange, handleSubmit, values }}
        component={NewDistrictComp({
          handleChange,
          values,
          handleSubmit,
          data: citydata?.data,
        })}
      />
    </Box>
  );
};
export default React.memo(DistrictList);
