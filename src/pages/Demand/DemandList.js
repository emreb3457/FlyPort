import { Box } from "@chakra-ui/react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ListTable from "../../components/ListTable";
import useSWR from "swr";
import SkeletonComp from "../../components/Skeleton/Skeleton";
import React, { useState } from "react";
import { sendRequest } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";
import { getDemandList, getDemandRemove } from "../../api/api";

const DemandList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [radioValue, setRadioValue] = React.useState({});

  const { data, mutate, error } = useSWR(
    ["getDemandList", page],
    getDemandList
  );

  const loading = !error && !data;

  const Head = [
    {
      title: "ID",
      column: "id",
    },
    {
      title: "Tarih",
      column: "tarih",
    },
    {
      title: "Müşteri",
      column: "musteri",
    },

    {
      title: "Ürün",
      column: "urunTamAd",
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
      title: "İstenen Miktar",
      column: "miktar",
    },
    {
      title: "Üretici Ülkesi",
      column: "ureticiUlkesi",
    },
    {
      title: "Varış Ülkesi",
      column: "varisUlkesi",
    },
    {
      title: "Sorumlu",
      column: "sorumlu",
    },
    {
      title: "Kalan Süre",
      column: "kalanSure",
    },
  ];

  const removeDemand = async ({ radioValue, mutate }) => {
    const { status } = await sendRequest(
      getDemandRemove("_", JSON.parse(radioValue).id)
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
            navigate(routes.yenitalep);
          },
        }}
        funct3={{
          title: "Sil",
          function: () => {
            removeDemand({ radioValue, mutate });
          },
        }}
      >
        Talepler
      </BreadCrumb>
      <Box mt="20px" px={"38px"}>
        <ListTable
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
export default React.memo(DemandList);
