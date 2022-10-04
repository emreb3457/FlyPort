import { Box, Button, Input } from "@chakra-ui/react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ListTable from "../../components/Talepler/ProductListTable/ListTable";
import useSWR from "swr";
import { getCountryInsert, getCountryList } from "../../api/DefinitionsApi";
import BasicModal from "../../helpers/Modal";
import SkeletonComp from "../../components/Skeleton/Skeleton";
import { useModalStatus } from "../../hooks/useModalStatus";
import { TextInput } from "../../components/Talepler/ProductDetailPage/MatchingProduct/MatchingProduct";
import React, { useState } from "react";
import { useFormik } from "formik";
import { countryValidate } from "../../utils/validation";
import { sendRequest } from "../../utils/helpers";

const newCountrySubmit = async ({ values, mutate, errors, setValues }) => {
  const { status } = await sendRequest(
    getCountryInsert("", {
      aciklama: values.aciklama,
      adOrjinal: values.adOrjinal,
      adTurkce: values.adTurkce,
      adIngilizce: values.adIng,
    }),
    {
      errors,
      setValues,
    }
  );
  status && mutate();
};

export const NewCountryComp = ({ handleChange, values, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} style={{ padding: "10px 0" }}>
      <TextInput
        name={"adOrjinal"}
        value={values.adOrjinal}
        onChange={handleChange}
      >
        Orjinal Ad
      </TextInput>
      <TextInput
        name={"adTurkce"}
        value={values.adTurkce}
        onChange={handleChange}
      >
        Türkçe Ad
      </TextInput>
      <TextInput name={"adIng"} value={values.adIng} onChange={handleChange}>
        Ingilizce Ad
      </TextInput>
      <TextInput
        name={"aciklama"}
        value={values.aciklama}
        onChange={handleChange}
      >
        Acıklama
      </TextInput>
      <Button
        type="submit"
        onClick={() =>
          document.getElementsByClassName("chakra-modal__close-btn")[0].click()
        }
      >
        Ekle
      </Button>
    </form>
  );
};

const CountryList = () => {
  const { clickFunct, isClick } = useModalStatus();
  const [page, setPage] = useState(0);
  const { data, mutate, error } = useSWR(["_", page], getCountryList);

  const { errors, handleChange, handleSubmit, values, setValues } = useFormik({
    initialValues: {
      adTurkce: "",
      adOrjinal: "",
      adIng: "",
      aciklama: "",
    },
    onSubmit: (values, { resetForm }) => {
      newCountrySubmit({ values, mutate, errors, setValues });
      resetForm();
    },
    countryValidate,
  });

  const loading = !error && !data;

  const Head = ["#", "ID", "Ad Orjinal", "Ad Türkçe", "Ad Ingilizce"];
  const DataHead = ["id", "adOrjinal", "adTurkce", "adIngilizce"];

  return loading ? (
    <SkeletonComp />
  ) : (
    <Box>
      <BreadCrumb
        funct1={{
          title: "Yeni Ekle",
          function: () => clickFunct(),
        }}
        funct2={{
          title: "Düzenle",
          function: () => console.log("a"),
        }}
        funct3={{
          title: "Sil",
          function: () => console.log("a"),
        }}
      >
        Ülkelere Göre Maliyetleri
      </BreadCrumb>
      <Box mt="20px" px={"38px"}>
        <ListTable
          head={Head}
          dataHead={DataHead}
          row={data?.data}
          page={page}
          totalRowCount={data.totalRowCount}
          changePage={setPage}
          link={true}
          select={true}
        />
      </Box>
      <BasicModal
        click={isClick}
        title={"Yeni Ülke Ekle"}
        formik={{ handleChange, handleSubmit, values }}
        component={NewCountryComp({ handleChange, values, handleSubmit })}
      />
    </Box>
  );
};
export default React.memo(CountryList);
