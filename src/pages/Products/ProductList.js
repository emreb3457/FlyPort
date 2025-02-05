import { Box } from "@chakra-ui/react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ListTable from "../../components/ListTable";
import useSWR from "swr";
import SkeletonComp from "../../components/Skeleton/Skeleton";
import React, { useEffect, useState } from "react";
import { sendRequest } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";
import { getProductTable, getProductRemove } from "../../api/api";
import { useSideBarData } from "../../context/SideBarContext";

const ProductList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [radioValue, setRadioValue] = React.useState({});
  const { updateId } = useSideBarData();

  const { data, mutate, error } = useSWR(
    ["getProductList", page],
    getProductTable
  );

  const loading = !error && !data;
  const Head = [
    {
      title: "ID",
      column: "id",
    },
    {
      title: "Ürün Tam Adı",
      column: "urunTamAd",
    },
    {
      title: "Kısa Adı",
      column: "urunKisaAd",
    },
    {
      title: "Kategori",
      column: "kategori",
    },
    {
      title: "İşlevi",
      column: "",
    },
    {
      title: "Özellik 1",
      column: "ozellik1",
    },
    {
      title: "Özellik 2",
      column: "ozellik2",
    },
    {
      title: "Özellik 3",
      column: "ozellik3",
    },
    {
      title: "GTip No",
      column: "gtipNo",
    },
  ];

  const removeProduct = async ({ radioValue, mutate }) => {
    if (radioValue) {
      const { status } = await sendRequest(
        getProductRemove("_", radioValue.id)
      );
      status && mutate();
    }
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
            navigate(routes.yeniurun);
          },
        }}
        funct3={{
          function: () => {
            removeProduct({ radioValue, mutate });
          },
        }}
      >
        Ürünler
      </BreadCrumb>
      <Box mt="20px" px={"38px"}>
        <ListTable
          id="ProductList"
          head={Head}
          row={data}
          radioValue={radioValue}
          radioSetValue={setRadioValue}
          link={false}
          select={true}
          detailFunction={(e) => {
            navigate(routes.urundetay + e.data.id);
            updateId({ id: e.data.id });
          }}
        />
      </Box>
    </Box>
  );
};
export default React.memo(ProductList);
