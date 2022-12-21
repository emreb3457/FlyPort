import { Box } from "@chakra-ui/react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ListTable from "../../components/ListTable";
import useSWR from "swr";
import SkeletonComp from "../../components/Skeleton/Skeleton";
import React, { useState } from "react";
import { sendRequest } from "../../utils/helpers";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { routes } from "../../constants/routes";
import {
  getPriceResearchList,
  getPriceResearchRemove,
  getPriceResearchTable,
} from "../../api/api";

const PriceResearchList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [page, setPage] = useState(0);
  const [radioValue, setRadioValue] = React.useState({});

  const { data, mutate, error } = useSWR(
    ["getPriceResearchList", id],
    getPriceResearchTable
  );

  const loading = !error && !data;
  const Head = [
    {
      title: "ID",
      column: "id",
    },
    {
      title: "Üretici",
      column: "uretici",
    },
    {
      title: "Ülkesi",
      column: "ulkesi",
    },

    {
      title: "Teklifin A. Tarihi",
      column: "teklifAlinmaTarih",
    },
    {
      title: "Teklif Alan Kişi",
      column: "teklifAlanKisi",
    },
    {
      title: "Miktar",
      column: "miktar",
    },
    {
      title: "Birim Fiyatı",
      column: "birimFiyati",
    },
    {
      title: "Para Birimi",
      column: "paraBirimi",
    },
    {
      title: "Güncel USD",
      column: "sehir",
    },
    {
      title: "Geçerlilik Tarihi",
      column: "gecerlilikTarihi",
    },
  ];

  const removePriceResearch = async ({ radioValue, mutate }) => {
    const { status } = await sendRequest(
      getPriceResearchRemove("_", radioValue.id)
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
            navigate(location.pathname + "/yeni", { state: id });
          },
        }}
        funct2={{
          title: "Detay",
          function: () => {
            navigate(location.pathname + "/" + radioValue.id);
          },
        }}
        funct3={{
          function: () => {
            removePriceResearch({ radioValue, mutate });
          },
        }}
      >
        Fiyat Araştırma
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
export default React.memo(PriceResearchList);
