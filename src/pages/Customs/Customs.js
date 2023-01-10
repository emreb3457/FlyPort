import { Box } from "@chakra-ui/react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ListTable from "../../components/ListTable";
import useSWR from "swr";
import SkeletonComp from "../../components/Skeleton/Skeleton";
import React, { useState } from "react";
import { sendRequest } from "../../utils/helpers";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { routes } from "../../constants/routes";
import { customRemove, getCustomTable } from "../../api/api";

const CustomList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [page, setPage] = useState(0);
  const [radioValue, setRadioValue] = React.useState({});

  const { data, mutate, error } = useSWR(["getCustomList", id], getCustomTable);

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
      title: "GTİP NO",
      column: "gTipNo",
    },
    {
      title: "Açıklama",
      column: "gTipNoAciklama",
    },
    {
      title: "Total Vergi Oranı",
      column: "",
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
      title: "İhtisas Gümrüğü?",
      column: "ihtisasGumruguVarMi",
    },
  ];

  const removeCustom = async ({ radioValue, mutate }) => {
    const { status } = await sendRequest(customRemove("_", radioValue.id));
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
            navigate(location.pathname + "/" + radioValue.id, {
              state: radioValue,
            });
          },
        }}
        funct3={{
          function: () => {
            removeCustom({ radioValue, mutate });
          },
        }}
      >
        Gümrükleme
      </BreadCrumb>
      <Box mt="20px" px={"38px"}>
        <ListTable
          id={"customList"}
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
export default CustomList;
