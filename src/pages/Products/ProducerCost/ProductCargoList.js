import { Box } from "@chakra-ui/react";
import useSWR from "swr";
import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ProductMenu } from "../../../constants/MenuItems";
import { useSideBarData } from "../../../context/SideBarContext";
import { productCargoByProductId, productCargoRemove } from "../../../api/api";
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
    ["productCargoByProductId", location.state?.detayId],
    productCargoByProductId
  );

  const Head = [
    {
      title: "ID",
      column: "id",
    },
    {
      title: "Not",
      column: "urunDemonte",
    },
    {
      title: "Kap Tipi",
      column: "kargoOzellikleri[0].tasimaSekli",
    },
    {
      title: "Uzunluğu",
      render: (rowData) => (
        <p>
          {rowData.data?.kargoOzellikleri?.[0]?.uzunluk +
            " " +
            rowData.data?.kargoOzellikleri?.[0]?.uzunlukBirim}
        </p>
      ),
    },
    {
      title: "Genişliği",
      render: (rowData) => (
        <p>
          {rowData.data?.kargoOzellikleri?.[0]?.genislik +
            " " +
            rowData.data?.kargoOzellikleri?.[0]?.genislikBirim}
        </p>
      ),
    },
    {
      title: "Yüksekliği",
      render: (rowData) => (
        <p>
          {rowData.data?.kargoOzellikleri?.[0]?.yukseklik +
            " " +
            rowData.data?.kargoOzellikleri?.[0]?.yukseklikBirim}
        </p>
      ),
    },
    {
      title: "Koli Ağırlığı",
      column: "",
    },
    {
      title: "Koli İçi Adet",
      render: (rowData) => (
        <p>
          {rowData.data?.kargoOzellikleri?.[0]?.urunMiktari +
            " " +
            rowData.data?.kargoOzellikleri?.[0]?.urunMiktariBirim}
        </p>
      ),
    },
    {
      title: "Koli Hacmi",
      column: "",
    },
    {
      title: "Ürün Açıklaması",
      column: "kargoOzellikleri[0].parcaAciklama",
    },
  ];

  const removeCargo = async ({ radioValue, mutate }) => {
    const { status } = await sendRequest(
      productCargoRemove("_", radioValue.id)
    );
    status && mutate();
  };

  return (
    <Box>
      <BreadCrumb
        selectValue={radioValue}
        funct1={{
          title: "Yeni Ekle",
          function: () => {
            navigate(location.pathname + "/yeni", {
              state: { id: id, detayId: location.state?.detayId },
            });
          },
        }}
        funct2={{
          title: "Detay",
          function: () => {
            navigate("detay", {
              state: { detayId: radioValue.id, detay: radioValue },
            });
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
