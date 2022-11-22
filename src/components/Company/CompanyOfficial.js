import { Box, Button, Input } from "@chakra-ui/react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ListTable from "../../components/ListTable";
import useSWR from "swr";
import {
  getCompanyOfficialInsert,
  getCompanyOfficialRemove,
  getCompanyOfficialTable,
} from "../../api/api";
import BasicModal from "../../helpers/Modal";
import SkeletonComp from "../../components/Skeleton/Skeleton";
import { useModalStatus } from "../../hooks/useModalStatus";
import { SelectInput, TextInput } from "../../components/Inputs/CustomInputs";
import React, { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import { newCompanyOfficialValidate } from "../../utils/validation";
import { sendRequest } from "../../utils/helpers";

const newCompanyOfficialSubmit = async ({ values, mutate, id }) => {
  const { status } = await sendRequest(
    getCompanyOfficialInsert("", {
      ...values,
      firmaId: id,
    })
  );
  status && mutate();
};

const updateCompanyOfficialSubmit = async ({ values, mutate, id }) => {
  const { status } = await sendRequest(
    getCompanyOfficialInsert("", {
      id,
      ...values,
    })
  );
  status && mutate();
};

const removeCompanyOfficial = async ({ radioValue, mutate }) => {
  if (radioValue) {
    const { status } = await sendRequest(
      getCompanyOfficialRemove("_", radioValue.id)
    );
    status && mutate();
  }
};
const CompanyOfficial = ({ setFunctions, item }) => {
  const { clickFunct, isClick } = useModalStatus();
  const [page, setPage] = useState(0);
  const [radioValue, setRadioValue] = React.useState({});
  const [submitType, setSubmitType] = React.useState("");

  const { data, mutate, error } = useSWR(
    ["getCompanyOfficial", item?.id],
    getCompanyOfficialTable
  );

  const { errors, handleChange, handleSubmit, values, touched, setValues } =
    useFormik({
      initialValues: {
        ad: "",
        soyad: "",
        gorev: "",
        email: "",
        gsm: "",
        weChat: "",
        digerIletisim: "",
      },
      onSubmit: (values, { resetForm }) => {
        submitType === "create"
          ? newCompanyOfficialSubmit({ values, mutate, id: item?.id })
          : updateCompanyOfficialSubmit({
              values,
              mutate,
              id: radioValue.id,
            });

        resetForm();
        document.getElementsByClassName("chakra-modal__close-btn")[0].click();
      },
      validationSchema: newCompanyOfficialValidate,
    });

  useEffect(() => {
    setFunctions({
      create: {
        title: "Yeni Ekle",
        function: () => {
          setSubmitType("create");
          clickFunct();
        },
      },
      update: {
        title: "Düzenle",
        function: () => {
          setSubmitType("update");
          setValues({
            ...radioValue,
          });
          clickFunct();
        },
      },
      remove: {
        title: "Sil",
        function: () => removeCompanyOfficial({ radioValue, mutate }),
      },
    });
  });

  const loading = !error && !data;
  const Head = [
    {
      title: "ID",
      column: "id",
    },
    {
      title: "Adı",
      column: "ad",
    },
    {
      title: "Soyadı",
      column: "soyad",
    },
    {
      title: "Görevi",
      column: "gorev",
    },
    {
      title: "E-mail",
      column: "email",
    },
    {
      title: "GSM",
      column: "gsm",
    },
    {
      title: "WeChat",
      column: "weChat",
    },
    {
      title: "Diğer İletişim",
      column: "digerIletisim",
    },

  ];
  const NewCompanyOfficialComp = ({ handleChange, values, handleSubmit }) => {
    return (
      <form onSubmit={handleSubmit} style={{ padding: "10px 0" }}>
        <TextInput
          name={"ad"}
          value={values.ad}
          onChange={handleChange}
          error={touched?.ad && errors.ad}
        >
          Adı
        </TextInput>
        <TextInput
          name={"soyad"}
          value={values.soyad}
          onChange={handleChange}
          error={touched?.soyad && errors.soyad}
        >
          Soyadı
        </TextInput>
        <TextInput
          name={"gorev"}
          value={values.gorev}
          onChange={handleChange}
          error={touched?.gorev && errors.gorev}
        >
          Görevi
        </TextInput>
        <TextInput
          name={"email"}
          value={values.email}
          onChange={handleChange}
          error={touched?.email && errors.email}
        >
          E-mail
        </TextInput>
        <TextInput
          name={"gsm"}
          value={values.gsm}
          onChange={handleChange}
          error={touched?.gsm && errors.gsm}
        >
          GSM
        </TextInput>
        <TextInput
          name={"weChat"}
          value={values.weChat}
          onChange={handleChange}
          error={touched?.weChat && errors.weChat}
        >
          WeChat
        </TextInput>
        <TextInput
          name={"digerIletisim"}
          value={values.digerIletisim}
          onChange={handleChange}
          error={touched?.digerIletisim && errors.digerIletisim}
        >
          Diğer İletişim
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
      <Box mt="20px" px={"38px"}>
        <ListTable
          id="CompanyOfficial"
          head={Head}
          row={data}
          radioValue={radioValue}
          radioSetValue={setRadioValue}
          link={false}
        />
      </Box>
      <BasicModal
        click={isClick}
        title={submitType === "create" ? "Yeni Yetkili Ekle" : "Güncelle"}
        formik={{ handleChange, handleSubmit, values }}
        component={NewCompanyOfficialComp({
          handleChange,
          values,
          handleSubmit,
        })}
      />
    </Box>
  );
};
export default React.memo(CompanyOfficial);
