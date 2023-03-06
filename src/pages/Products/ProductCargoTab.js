import { Box, Text } from "@chakra-ui/react";
import useSWR from "swr";
import React from "react";
import ListTable from "../../components/ListTable";
import TabMenu from "../../components/TabMenu";
import { UreticiFiyatiTabs } from "../../constants/Tabs";
import { getShippingProductList } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";

const ProductCargoTab = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [radioValue, setRadioValue] = React.useState({});

  const { data, error, mutate } = useSWR(
    ["getShippingProductList", id],
    getShippingProductList
  );

  const Head = [
    {
      title: "ID",
      column: "id",
    },
    {
      title: "Üretici",
      column: "ureticiFirmaAdi",
    },
    {
      title: "Taşıma Kabı",
      render: (rowData) => (
        <td>
          {rowData.data?.kargoOzellikleri?.map((item) => {
            return (
              <Text padding={2}>
                {item?.tasimaKap}
                <hr />
              </Text>
            );
          })}
        </td>
      ),
    },
    {
      title: "Kap İçi Ürün Miktarı",
      render: (rowData) => (
        <td>
          {rowData.data?.kargoOzellikleri?.map((item) => {
            return (
              <Text padding={2}>
                {item?.urunMiktari}
                <hr />
              </Text>
            );
          })}
        </td>
      ),
    },
    {
      title: "Uzunluk cm",
      render: (rowData) => (
        <td>
          {rowData.data?.kargoOzellikleri?.map((item) => {
            return (
              <Text padding={2}>
                {item?.uzunluk + " " + item?.uzunlukBirim}
                <hr />
              </Text>
            );
          })}
        </td>
      ),
    },
    {
      title: "Genişlik cm",
      render: (rowData) => (
        <td>
          {rowData.data?.kargoOzellikleri?.map((item) => {
            return (
              <Text padding={2}>
                {item?.genislik + " " + item?.genislikBirim}
                <hr />
              </Text>
            );
          })}
        </td>
      ),
    },
    {
      title: "Yükseklik cm",
      render: (rowData) => (
        <td>
          {rowData.data?.kargoOzellikleri?.map((item) => {
            return (
              <Text padding={2}>
                {item?.yukseklik + " " + item?.yukseklikBirim}
                <hr />
              </Text>
            );
          })}
        </td>
      ),
    },
    {
      title: "Ağırlık",
      render: (rowData) => (
        <td>
          {rowData.data?.urunFiyat?.map((item) => {
            return (
              <Text padding={2}>
                {item?.birimAgirlik + " " + item?.birimAgirlikBirim}
                <hr />
              </Text>
            );
          })}
        </td>
      ),
    },
  ];

  return (
    <Box>
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
export default ProductCargoTab;
