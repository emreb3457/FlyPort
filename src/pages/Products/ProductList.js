import { Box, Button, Input } from "@chakra-ui/react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ListTable from "../../components/Talepler/ProductListTable/ListTable";
import useSWR from "swr";
import BasicModal from "../../helpers/Modal";
import SkeletonComp from "../../components/Skeleton/Skeleton";
import { useModalStatus } from "../../hooks/useModalStatus";
import { TextInput } from "../../components/Inputs/CustomInputs";
import React, { useState } from "react";
import { useFormik } from "formik";
import { countryValidate } from "../../utils/validation";
import { sendRequest } from "../../utils/helpers";
import {
  getTalepInsert,
  getTalepList,
  getTalepRemove,
  getTalepUpdate,
} from "../../api/talepApi";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";
import { getProductList, getProductRemove } from "../../api/api";

const ProductList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [radioValue, setRadioValue] = React.useState({});
  const [submitType, setSubmitType] = React.useState("");

  const { data, mutate, error } = useSWR(
    ["getProductList", page],
    getProductList
  );

  const loading = !error && !data;
  const Head = [
    "#",
    "ID",
    "Ürün Tam Adı",
    "Kısa Adı",
    "Kategori",
    "İşlevi",
    "Özellik 1",
    "Özellik 2",
    "Özellik 3",
    "GTip No",
    "Kayıtlı Üretici",
    "Sipariş Sayısı",
  ];
  const DataHead = [
    "id",
    "urunTamAd",
    "urunKisaAd",
    "kategori",
    "boş",
    "ozellik1",
    "ozellik2",
    "ozellik3",
    "gtipNo",
  ];

  const removeProduct = async ({ radioValue, mutate }) => {
    const { status } = await sendRequest(
      getProductRemove("_", JSON.parse(radioValue).id)
    );
    status && mutate();
  };

  return loading ? (
    <SkeletonComp />
  ) : (
    <Box>
      <BreadCrumb
        funct1={{
          title: "Yeni Ekle",
          function: () => {
            navigate(routes.yeniurun);
          },
        }}
        funct3={{
          title: "Sil",
          function: () => {
            setSubmitType("delete");
            removeProduct({ radioValue, mutate });
          },
        }}
      >
        Ürünler
      </BreadCrumb>
      <Box mt="20px" px={"38px"}>
        <ListTable
          head={Head}
          dataHead={DataHead}
          row={data?.data}
          page={page}
          totalRowCount={data?.totalRowCount}
          changePage={setPage}
          radioValue={radioValue}
          radioSetValue={setRadioValue}
          link={true}
          select={true}
        />
      </Box>
    </Box>
  );
};
export default React.memo(ProductList);
