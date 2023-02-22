import { Box } from "@chakra-ui/react";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import ListTable from "../../../components/ListTable";
import useSWR from "swr";
import SkeletonComp from "../../../components/Skeleton/Skeleton";
import React, { useEffect, useState } from "react";
import { sendRequest } from "../../../utils/helpers";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { routes } from "../../../constants/routes";
import { offerTable, offerRemove } from "../../../api/api";
import { useSideBarData } from "../../../context/SideBarContext";
import { ProductMenu } from "../../../constants/MenuItems";

const OfferList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [radioValue, setRadioValue] = React.useState({});
  const { updateSideBar } = useSideBarData();

  useEffect(() => {
    updateSideBar({ selectedSideBar: ProductMenu(id) });
  }, []);

  const { data, mutate, error } = useSWR(["getOfferList", id], offerTable);

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
      column: "gtip",
    },
    {
      title: "Miktar",
      column: "miktar",
    },
    {
      title: "Birim",
      column: "birim.ad",
    },
    {
      title: "Birim Maliyeti",
      column: "birimMaliyet",
    },
    {
      title: "T. Maliyet",
      column: "tMaliyet",
    },
    {
      title: "Kar Oranı",
      column: "karOrani",
    },
    {
      title: "Birim Teklifi",
      column: "birimTelifi",
    },
    {
      title: "Teklif Toplamı",
      column: "teklifToplami",
    },
    {
      title: "Geçerlilik Tarihi",
      column: "teklifGecerlilikSuresi",
    },
    {
      title: "Teklif Tarihi",
      column: "teklifTarihi",
    },
    {
      title: "Durum",
      column: "durum",
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
