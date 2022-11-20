import { Box } from "@chakra-ui/react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ListTable from "../../components/ListTable";
import useSWR from "swr";
import SkeletonComp from "../../components/Skeleton/Skeleton";
import React, { useState } from "react";
import { sendRequest } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";
import {
  getPriceResearchList,
  getPriceResearchRemove,
  getPriceResearchTable,
} from "../../api/api";

const PriceResearchList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [radioValue, setRadioValue] = React.useState({});

  const { data, mutate, error } = useSWR(
    ["getPriceResearchList", page],
    getPriceResearchTable
  );

  const loading = !error && !data;
  const Head = [
    {
      title: "ID",
      column: "id",
    },
    {
      title: "Kısa Adı",
      column: "kisaAdi",
    },
    {
      title: "Firma Ünvanı",
      column: "firmaUnvani",
    },

    {
      title: "Yetkili",
      column: "yetkili",
    },
    {
      title: "Firma Tipi",
      column: "firmaTipi",
    },
    {
      title: "E-mail",
      column: "email",
    },
    {
      title: "Ülke",
      column: "ulke",
    },
    {
      title: "Şehir",
      column: "sehir",
    },
  
  ];

  const removePriceResearch = async ({ radioValue, mutate }) => {
    const { status } = await sendRequest(getPriceResearchRemove("_", radioValue.id));
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
            navigate(routes.yenifiyat);
          },
        }}
        funct2={{
          title: "Detay",
          function: () => {
            navigate(routes.companydetail + radioValue.id);
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
