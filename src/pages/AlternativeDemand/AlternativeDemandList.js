import { Box } from "@chakra-ui/react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ListTable from "../../components/ListTable";
import useSWR from "swr";
import SkeletonComp from "../../components/Skeleton/Skeleton";
import React, { useState } from "react";
import { sendRequest } from "../../utils/helpers";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";
import { getAlternativeDemandTable, getDemandRemove } from "../../api/api";
const AlternativeDemandList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [radioValue, setRadioValue] = React.useState({});

  const { data, mutate, error } = useSWR(
    ["getAlternativeDemandTable", location.state],
    getAlternativeDemandTable
  );

  const loading = !error && !data;

  const Head = [
    {
      title: "ID",
      column: "id",
    },
    {
      title: "Tarih",
      column: "talepTarihi",
    },
    {
      title: "Müşteri",
      column: "musteriAd",
    },

    {
      title: "Ürün",
      column: "urun",
    },
    {
      title: "Özellik 1",
      column: "ozellik1",
    },
    {
      title: "İstenen Miktar",
      column: "miktar",
    },
    {
      title: "Üretici Ülkesi",
      column: "nerden",
    },
    {
      title: "Varış Ülkesi",
      column: "nereye",
    },
    {
      title: "Sorumlu",
      column: "talepEden",
    },
  ];

  const removeDemand = async ({ radioValue, mutate }) => {
    const { status } = await sendRequest(getDemandRemove("_", radioValue.id));
    status && mutate();
  };

  return loading ? (
    <SkeletonComp />
  ) : (
    <Box>
      <BreadCrumb
        funct1={{
          title: "Detay",
          function: () => {
            navigate("/talepler/alternatifler/" + radioValue.id);
          },
        }}
        funct3={{
          function: () => {
            removeDemand({ radioValue, mutate });
          },
        }}
      >
        Alternatifler
      </BreadCrumb>
      <Box mt="20px" px={"38px"}>
        <ListTable
          id="AlternativeList"
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
export default React.memo(AlternativeDemandList);
