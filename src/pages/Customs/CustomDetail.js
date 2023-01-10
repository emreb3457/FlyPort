import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { StyledButton } from "../ProductList";
import colors from "../../theme/colors";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import useSWR from "swr";
import { getCustomDetail } from "../../api/api";
import CostomsTax from "../../components/Talepler/CostomsDetailPage/CostomsTax";
import Cif from "../../components/Talepler/CostomsDetailPage/Cif";
import SkeletonComp from "../../components/Skeleton/Skeleton";

const Tabs = [
  {
    title: "Gümrük Vergileri",
    comp: CostomsTax,
  },
  {
    title: "CIF Maliyetler",
    comp: Cif,
  },
  {
    title: "Diğer Maliyetler",
    comp: "CustomAdress",
  },
  {
    title: "Maliyet Analizi",
    comp: "CustomOfficial",
  },
  {
    title: "Teklif",
    comp: "<CostAnalysis />",
  },
];

const CustomDetail = () => {
  const { detayId, id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(Tabs[0]);
  const [selectFunction, setSelectFunction] = useState({});

  const { data: customDetail, error } = useSWR(
    ["getCustomDetail", detayId],
    getCustomDetail
  );

  useEffect(() => {}, [selectFunction]);

  useEffect(() => {
    if (!detayId || error) navigate(-1);
  }, []);

  const loading = !customDetail && !error;
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
        Gümrükleme
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
          {
            <activeTab.comp
              item={customDetail}
              setFunctions={setSelectFunction}
            />
          }
        </Box>
      </Box>
      {/* <BasicModal
        click={isClick}
        title={"Yeni Ülke Ekle"}
        formik={{ handleChange, handleSubmit, values }}
        component={NewCountryComp({ handleChange, values, handleSubmit })}
      /> */}
    </Box>
  );
};
export default CustomDetail;
