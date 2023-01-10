import { Box } from "@chakra-ui/react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ListTable from "../../components/ListTable";
import useSWR from "swr";
import SkeletonComp from "../../components/Skeleton/Skeleton";
import React, { useState } from "react";
import { sendRequest } from "../../utils/helpers";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";
import { getGtipTable, gtipRemove } from "../../api/api";

const GtipList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(0);
  const [radioValue, setRadioValue] = React.useState({});

  const { data, mutate, error } = useSWR(["getGtipList", page], getGtipTable);

  const loading = !error && !data;
  const Head = [
    {
      title: "ID",
      column: "id",
    },
    {
      title: "Menşel Ülkesi",
      column: "menseiUlkesi",
    },
    {
      title: "Çıkış Ülkesi",
      column: "cikisUlkesi",
    },
    {
      title: "Varış Ülkesi",
      column: "varisUlkesi",
    },
    {
      title: "GTİP No",
      column: "gTipNo",
    },
    {
      title: "Açıklama",
      column: "gTipNoAciklama",
    },
    {
      title: "Total Vergi Oranı",
      column: "ozellik2",
    },
    {
      title: "KDV",
      column: "kdvOrani",
    },
    {
      title: "Tarex",
      column: "tarexIsteniyorMu",
    },
    {
      title: "Tarım",
      column: "tarimIsteniyorMu",
    },
    {
      title: "İhtisas Gümrüğü",
      column: "ihtisasGumruguVarMi",
    },
    {
      title: "Güncelleme Tarihi",
      column: "x",
    },
    {
      title: "İşlem Yapan",
      column: "x",
    },
  ];

  const removeGtip = async ({ radioValue, mutate }) => {
    if (radioValue) {
      const { status } = await sendRequest(gtipRemove("_", radioValue.id));
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
            navigate(location.pathname + "/yeni");
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
            removeGtip({ radioValue, mutate });
          },
        }}
      >
        GTİP Listesi
      </BreadCrumb>
      <Box mt="20px" px={"38px"}>
        <ListTable
          id="GtipTable"
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
export default GtipList;
