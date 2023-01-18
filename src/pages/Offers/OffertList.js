import { Box } from "@chakra-ui/react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ListTable from "../../components/ListTable";
import useSWR from "swr";
import SkeletonComp from "../../components/Skeleton/Skeleton";
import React, { useState } from "react";
import { sendRequest } from "../../utils/helpers";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { routes } from "../../constants/routes";
import { offerTable, offerRemove } from "../../api/api";

const OfferList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [page, setPage] = useState(0);
  const [radioValue, setRadioValue] = React.useState({});

  const { data, mutate, error } = useSWR(["getOfferList", page], offerTable);

  const loading = !error && !data;
  const Head = [
    {
      title: "ID",
      column: "id",
    },
    {
      title: "Taşıma Tipi",
      column: "tasimaTipiId",
    },
    {
      title: "GTİP",
      column: "urunKisaAd",
    },
    {
      title: "Miktar",
      column: "urunMiktari",
    },
    {
      title: "Birim",
      column: "olcuBirimiId",
    },
    {
      title: "Birim Maliyeti",
      column: "ozellik1",
    },
    {
      title: "T. Maliyet",
      column: "ozellik2",
    },
    {
      title: "Kar Oranı",
      column: "ozellik3",
    },
    {
      title: "Birim Teklifi",
      column: "gtipNo",
    },
    {
      title: "Teklif Toplamı",
      column: "gtipNo",
    },
    {
      title: "Geçerlilik Tarihi",
      column: "gtipNo",
    },
    {
      title: "Teklif Tarihi",
      column: "gtipNo",
    },
    {
      title: "Durum",
      column: "gtipNo",
    },
  ];

  const removeOffer = async ({ radioValue, mutate }) => {
    if (radioValue) {
      const { status } = await sendRequest(offerRemove("_", radioValue.id));
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
            navigate(location.pathname + "/yeni", { state: id });
          },
        }}
        funct2={{
          title: "Detay",
          function: () => {
            navigate(routes.urundetay + radioValue.id);
          },
        }}
        funct3={{
          function: () => {
            removeOffer({ radioValue, mutate });
          },
        }}
      >
        Teklifler
      </BreadCrumb>
      <Box mt="20px" px={"38px"}>
        <ListTable
          id="OfferList"
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
export default React.memo(OfferList);
