import { Box, Button, Input } from "@chakra-ui/react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ListTable from "../../components/ListTable";
import useSWR from "swr";
import {
  getCompanyAdressInsert,
  getCompanyAdressRemove,
  getCompanyAdressTable,
  getCompanyAdressUpdate,
  getCompanyOfficialList,
} from "../../api/api";
import BasicModal from "../../helpers/Modal";
import SkeletonComp from "../../components/Skeleton/Skeleton";
import { useModalStatus } from "../../hooks/useModalStatus";
import { SelectInput, TextInput } from "../../components/Inputs/CustomInputs";
import React, { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import { newCompanyAdressValidate } from "../../utils/validation";
import { sendRequest } from "../../utils/helpers";
import {
  getAdressTypeList,
  getCityList,
  getCountryList,
  getDistrictList,
  getAdressTypeTable,
  getCountryTable,
  getCityTable,
  getDistrictTable,
} from "../../api/DefinitionsApi";

const newCompanyAdressSubmit = async ({ values, mutate, id }) => {
  const { status } = await sendRequest(
    getCompanyAdressInsert("", {
      ...values,
      firmaId: id,
    })
  );
  status && mutate();
};

const updateCompanyAdressSubmit = async ({ values, mutate, id }) => {
  const { status } = await sendRequest(
    getCompanyAdressInsert("", {
      firmaId: id,
      ...values,
    })
  );
  status && mutate();
};

const removeCompanyAdress = async ({ radioValue, mutate }) => {
  if (radioValue) {
    const { status } = await sendRequest(
      getCompanyAdressRemove("_", radioValue.id)
    );
    status && mutate();
  }
};
const CompanyAdress = ({ setFunctions, item }) => {
  const { clickFunct, isClick } = useModalStatus();
  const [page, setPage] = useState(0);
  const [radioValue, setRadioValue] = React.useState({});
  const [submitType, setSubmitType] = React.useState("");

  const { data, mutate, error } = useSWR(
    ["getCompanyAdress", item?.id],
    getCompanyAdressTable
  );

  const { data: AdresTipi } = useSWR(
    ["getAdressTypeTable"],
    getAdressTypeTable
  );
  const {
    errors,
    handleChange,
    handleSubmit,
    values,
    touched,
    setValues,
    setFieldValue,
  } = useFormik({
    initialValues: {
      adresTipiId: "",
      adres: "",
      ulkeId: "",
      sehirId: "",
      ilceId: "",
      yetkiliAd: "",
      yetkiliSoyad: "",
      yetkiliEmail: "",
      yetkiliIletisim: "",
    },
    onSubmit: (values, { resetForm }) => {
      submitType === "create"
        ? newCompanyAdressSubmit({ values, id: item?.id, mutate })
        : updateCompanyAdressSubmit({
            values,
            mutate,
            id: radioValue.id,
          });

      resetForm();
      document.getElementsByClassName("chakra-modal__close-btn")[0].click();
    },
    validationSchema: newCompanyAdressValidate,
  });

  const { data: Adress } = useSWR(
    ["getCompanyAdressTable", item?.id],
    getCompanyAdressTable
  );
  const { data: Ulke } = useSWR(["getCountryTable"], getCountryTable);

  const { data: Sehir } = useSWR(["getCityTable", values.ulkeId], getCityTable);

  const { data: Ilce } = useSWR(
    ["getDistrictTable", values.sehirId],
    getDistrictTable
  );

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
          radioValue?.id && clickFunct();
        },
      },
      remove: {
        title: "Sil",
        function: () => removeCompanyAdress({ radioValue, mutate }),
      },
    });
  });
  useEffect(() => {}, [values]);
  const loading = !error && !data;
  const Head = [
    {
      title: "ID",
      column: "id",
    },
    {
      title: "Adres Tipi",
      column: "adresTipi",
    },
    {
      title: "Ülke",
      column: "ulke",
    },
    {
      title: "Şehir",
      column: "sehir",
    },
    {
      title: "İlçe",
      column: "ilce",
    },
    {
      title: "Adres",
      column: "adres",
    },
    {
      title: "Yetkili Adı",
      column: "yetkiliAd",
    },
    {
      title: "Yetkili Soyadı",
      column: "yetkiliSoyad",
    },
    {
      title: "Yetkili E-mail",
      column: "yetkiliEmail",
    },
    {
      title: "Yetkili İletişim",
      column: "yetkiliIletisim",
    },
  ];
  const NewCompanyAdressComp = ({ handleChange, values, handleSubmit }) => {
    return (
      <form onSubmit={handleSubmit} style={{ padding: "10px 0" }}>
        <SelectInput
          name={"adresTipiId"}
          value={values.adresTipiId}
          onChange={setFieldValue}
          data={AdresTipi}
          visableValue={"ad"}
          error={touched.adresTipiId && errors.adresTipiId}
        >
          Adres Tipi
        </SelectInput>
        <SelectInput
          name={"ulkeId"}
          value={values.ulkeId}
          onChange={setFieldValue}
          data={Ulke}
          visableValue={"adOrjinal"}
          error={touched.ulkeId && errors.ulkeId}
        >
          Ülke
        </SelectInput>
        <SelectInput
          name={"sehirId"}
          value={values.sehirId}
          onChange={setFieldValue}
          data={Sehir}
          visableValue={"adOrjinal"}
          error={touched.sehirId && errors.sehirId}
        >
          Şehir
        </SelectInput>
        <SelectInput
          name={"ilceId"}
          value={values.ilceId}
          onChange={setFieldValue}
          data={Ilce}
          visableValue={"adOrjinal"}
          error={touched.ilceId && errors.ilceId}
        >
          İlçe
        </SelectInput>
        <TextInput
          name={"adres"}
          value={values.adres}
          onChange={handleChange}
          error={touched?.adres && errors.adres}
        >
          Adres
        </TextInput>
        <TextInput
          name={"yetkiliAd"}
          value={values.yetkiliAd}
          onChange={handleChange}
          error={touched?.yetkiliAd && errors.yetkiliAd}
        >
          Yetkili Adı
        </TextInput>
        <TextInput
          name={"yetkiliSoyad"}
          value={values.yetkiliSoyad}
          onChange={handleChange}
          error={touched?.yetkiliSoyad && errors.yetkiliSoyad}
        >
          Yetkili Soyadı
        </TextInput>
        <TextInput
          name={"yetkiliEmail"}
          value={values.yetkiliEmail}
          onChange={handleChange}
          error={touched?.yetkiliEmail && errors.yetkiliEmail}
        >
          Yetkili Email
        </TextInput>
        <TextInput
          name={"yetkiliIletisim"}
          value={values.yetkiliIletisim}
          onChange={handleChange}
          error={touched?.yetkiliIletisim && errors.yetkiliIletisim}
        >
          Yetkili İletisim
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
          id="CompanyAdress"
          head={Head}
          row={Adress}
          radioValue={radioValue}
          radioSetValue={setRadioValue}
          link={false}
        />
      </Box>
      <BasicModal
        click={isClick}
        title={submitType === "create" ? "Yeni Adres Ekle" : "Güncelle"}
        formik={{ handleChange, handleSubmit, values }}
        component={NewCompanyAdressComp({ handleChange, values, handleSubmit })}
      />
    </Box>
  );
};
export default React.memo(CompanyAdress);
