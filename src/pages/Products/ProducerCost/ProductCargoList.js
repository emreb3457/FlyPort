import { Box } from "@chakra-ui/react";
import useSWR from "swr";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ProductMenu } from "../../../constants/MenuItems";
import { useSideBarData } from "../../../context/SideBarContext";
import { productCargoByProductId, productCargoRemove } from "../../../api/api";
import SkeletonComp from "../../../components/Skeleton/Skeleton";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import ListTable from "../../../components/ListTable";
import { sendRequest } from "../../../utils/helpers";
import TabMenu from "../../../components/TabMenu";
import { UreticiFiyatiTabs } from "../../../constants/Tabs";

const ProductCargoList = () => {
  const { id } = useParams();
  const location = useLocation();
  const { updateSideBar, selectedSideBar } = useSideBarData();
  useEffect(() => {
    updateSideBar({ selectedSideBar: ProductMenu(id) });
  }, []);

  const navigate = useNavigate();
  const [radioValue, setRadioValue] = React.useState({});

  const { data, error, mutate } = useSWR(
    ["productCargoByProductId", id, location.state?.detayId],
    productCargoByProductId
  );

  const loading = !error && !data;
  const Head = [
    {
      title: "ID",
      column: "id",
    },
    {
      title: "Menşei Ülkesi",
      column: "menseiUlke",
    },
    {
      title: "Çıkış Ülkesi",
      column: "cikisUlke",
    },
    {
      title: "Varış Ülkesi",
      column: "varisUlke",
    },
    {
      title: "Gtip No",
      column: "gTipNo",
    },
    {
      title: "Total Vergi Oranı",
      column: "kdvOrani",
    },
  ];

  const removeCargo = async ({ radioValue, mutate }) => {
    const { status } = await sendRequest(
      productCargoRemove("_", radioValue.id)
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
            navigate(location.pathname + "/yeni", {
              state: id,
              detayId: location.state.detayId,
            });
          },
        }}
        funct2={{
          title: "Detay",
          function: () => {
            navigate("detay", { state: { detayId: radioValue.id } });
          },
        }}
        funct3={{
          function: () => {
            removeCargo({ radioValue, mutate });
          },
        }}
      >
        Kargo Özellikleri
      </BreadCrumb>
      <Box mt="20px" px={"38px"}>
        <TabMenu
          tabs={UreticiFiyatiTabs(id)}
          activeTab={1}
          onClick={(tab) => navigate(tab.route)}
        >
          <ListTable
            id="ProductList"
            head={Head}
            row={data}
            radioValue={radioValue}
            radioSetValue={setRadioValue}
            link={false}
            select={true}
          />
        </TabMenu>
      </Box>
    </Box>
  );
};
export default ProductCargoList;
