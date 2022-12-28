import { Box } from "@chakra-ui/react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ListTable from "../../components/ListTable";
import useSWR from "swr";
import SkeletonComp from "../../components/Skeleton/Skeleton";
import React, { useState } from "react";
import { sendRequest } from "../../utils/helpers";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { routes } from "../../constants/routes";
import { getLogisticsTable, logisticRemove } from "../../api/api";

const LogisticsTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [radioValue, setRadioValue] = React.useState({});

  const { data, mutate, error } = useSWR(
    ["getLogisticsTable", id],
    getLogisticsTable
  );

  const loading = !error && !data;
  const Head = [
    {
      title: "ID",
      column: "id",
    },
    {
      title: "Taşıma Tipi",
      column: "tasimaTipi",
    },
    {
      title: "Kalkış Limanı",
      column: "yuklemeYeri",
    },
    {
      title: "Varış Limanı",
      column: "teslimYeri",
    },
    {
      title: "Taşımacı",
      column: "teklifAlanKisi",
    },
    {
      title: "Ürün Miktarı",
      column: "tasimaMiktari",
    },
    {
      title: "Taşıma Ücreti",
      column: "toplamTutar",
    },
    {
      title: "Doviz Cinsi",
      column: "dovizCinsi",
    },
    {
      title: "USD Tutarı",
      column: "usdTutari",
    },
  ];

  const removeLogistics = async ({ radioValue, mutate }) => {
    const { status } = await sendRequest(logisticRemove("_", radioValue.id));
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
            navigate(location.pathname + "/yeni", { state: id });
          },
        }}
        funct2={{
          title: "Detay",
          function: () => {
            navigate(location.pathname + "/" + radioValue.id, {
              state: radioValue,
            });
          },
        }}
        funct3={{
          function: () => {
            removeLogistics({ radioValue, mutate });
          },
        }}
      >
        Lojistik
      </BreadCrumb>
      <Box mt="20px" px={"38px"}>
        <ListTable
          id="LogisticsTable"
          head={Head}
          row={data}
          radioValue={radioValue}
          radioSetValue={setRadioValue}
          link={true}
          select={true}
        />
      </Box>
    </Box>
  );
};
export default LogisticsTable;
