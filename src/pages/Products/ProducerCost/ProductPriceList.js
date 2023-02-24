import { Box } from "@chakra-ui/react";
import useSWR from "swr";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ProductMenu } from "../../../constants/MenuItems";
import { useSideBarData } from "../../../context/SideBarContext";
import { productPriceRemove, productPriceTable } from "../../../api/api";
import { sendRequest } from "../../../utils/helpers";
import SkeletonComp from "../../../components/Skeleton/Skeleton";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import { routes } from "../../../constants/routes";
import ListTable from "../../../components/ListTable";

const ProductPriceList = () => {
  const { id } = useParams();
  const location = useLocation();
  const { updateSideBar, selectedSideBar } = useSideBarData();
  useEffect(() => {
    updateSideBar({ selectedSideBar: ProductMenu(id) });
  }, []);

  const navigate = useNavigate();
  const [radioValue, setRadioValue] = React.useState({});

  const { data, error, mutate } = useSWR(
    ["productCustomsTable", id || 1, location.state?.ulkeId || 1],
    productPriceTable
  );

  const loading = !error && !data;
  const Head = [
    {
      title: "ID",
      column: "id",
    },
    {
      title: "Üretici",
      column: "firmaUnvan",
    },
    {
      title: "Ülkesi",
      column: "urunMenseiUlke",
    },
    {
      title: "Teklif A. Tarihi",
      column: "urunTeklifTarihi",
    },
  ];

  const removePrice = async ({ radioValue, mutate }) => {
    const { status } = await sendRequest(
      productPriceRemove("_", radioValue.id)
    );
    status && mutate();
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
            navigate(location.pathname + "/yeni", { state: id });
          },
        }}
        funct2={{
          title: "Detay",
          function: () => {
            navigate("" + radioValue.id, { state: { detay: radioValue } });
          },
        }}
        funct3={{
          function: () => {
            removePrice({ radioValue, mutate });
          },
        }}
      >
        Üretici Fiyatları
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
        />
      </Box>
    </Box>
  );
};
export default ProductPriceList;
