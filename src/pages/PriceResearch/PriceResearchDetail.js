import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { StyledButton } from "../ProductList";
import colors from "../../theme/colors";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { getPriceResearch, getShipping } from "../../api/api";
import SkeletonComp from "../../components/Skeleton/Skeleton";

import ProductPrice from "../../components/Talepler/PriceSurveyDetailpage/ProductPrice";
import ShippingProperty from "../../components/Talepler/PriceSurveyDetailpage/ShippingProperty";
const Tabs = [
  {
    title: "Ürün Fiyatı",
    comp: ProductPrice,
  },
  {
    title: "Teknik Özellikleri",
    comp: <></>,
  },
  {
    title: "Kargo Özellikleri",
    comp: ShippingProperty,
  },
  {
    title: "Ürün Sertifikaları",
    comp: <></>,
  },
  {
    title: "Firma Bilgileri",
    comp: "<CostAnalysis />",
  },
];

const PriceResearchDetail = () => {
  const { detayId } = useParams();
  const [activeTab, setActiveTab] = useState(Tabs[0]);
  const [selectFunction, setSelectFunction] = useState({});
  
  const { data: priceResarchDetail, error } = useSWR(
    ["getPriceResearch", detayId],
    getPriceResearch
  );

  const { data: Shipping, mutate } = useSWR(
    ["getShipping", detayId],
    getShipping
  );

  const newObj = { ...priceResarchDetail, shipping: Shipping };
  useEffect(() => {}, [selectFunction]);
  const loading = !priceResarchDetail && !error;
  return loading ? (
    <SkeletonComp />
  ) : (
    <Box w="100%">
      <BreadCrumb
        funct1={
          activeTab.title === "Firma Bilgileri"
            ? {
                title: selectFunction?.create?.title,
                function: () => {
                  selectFunction?.create?.function();
                },
              }
            : {
                title: selectFunction?.create?.title,
                function: () => {
                  selectFunction?.create?.function();
                },
              }
        }
        funct2={{
          title: selectFunction?.update?.title,
          function: () => {
            selectFunction?.update?.function();
          },
        }}
        funct3={
          selectFunction?.remove && {
            function: () => {
              selectFunction?.remove?.function();
            },
          }
        }
      >
        Fiyat Araştırma
      </BreadCrumb>

      <Box display={"flex"} flexDirection="column" w="100%" mt="20px">
        <Box borderBottom={"1px solid black"} w="100%">
          {Tabs?.map((tab) => (
            <StyledButton
              key={tab.title}
              mr="20px"
              onClick={() => setActiveTab(tab)}
              fontSize="22px"
              color={
                tab.title === activeTab.title
                  ? colors.lightdarkblue
                  : colors.gray
              }
            >
              {tab.title}
            </StyledButton>
          ))}
        </Box>
        <Box px="38px">
          {<activeTab.comp item={newObj} setFunctions={setSelectFunction} />}
        </Box>
      </Box>
    </Box>
  );
};
export default PriceResearchDetail;
