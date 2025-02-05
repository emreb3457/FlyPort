import { Box } from "@chakra-ui/react";
import useSWR from "swr";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSideBarData } from "../../../context/SideBarContext";
import { productCustomsTable, productCustomsRemove } from "../../../api/api";
import { sendRequest } from "../../../utils/helpers";
import SkeletonComp from "../../../components/Skeleton/Skeleton";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import { routes } from "../../../constants/routes";
import ListTable from "../../../components/ListTable";

const ProductCustomsDutie = () => {
  const { id } = useParams();
  const location = useLocation();

  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [radioValue, setRadioValue] = React.useState({});

  const { data, mutate, error } = useSWR(
    ["productCustomsTable", id],
    productCustomsTable
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

  const removeDuties = async ({ radioValue, mutate }) => {
    const { status } = await sendRequest(
      productCustomsRemove("_", radioValue.id)
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
            navigate(location.pathname + "/uretici-fiyat/yeni", {
              state: { id: id },
            });
          },
        }}
        funct2={{
          title: "Üretici Fiyatları",
          function: () => {
            navigate(location.pathname + "/uretici-fiyat", {
              state: { ulkeId: radioValue.menseiUlkeId },
            });
          },
        }}
        funct3={{
          function: () => {
            removeDuties({ radioValue, mutate });
          },
        }}
      >
        Bölgelere Göre Maliyetler
      </BreadCrumb>
      <Box mt="20px" px={"38px"}>
        <ListTable
          id="ProductList"
          head={Head}
          row={data}
          radioValue={radioValue}
          radioSetValue={setRadioValue}
          link={false}
          select={true}
          detailFunction={(e) =>
            navigate(location.pathname + "/uretici-fiyat", {
              state: { ulkeId: e.data.menseiUlkeId },
            })
          }
        />
      </Box>
    </Box>
  );
};
export default React.memo(ProductCustomsDutie);
