import { Box, Skeleton } from "@chakra-ui/react";
import { useState } from "react";
import { StyledButton } from "../ProductList";
import colors from "../../theme/colors";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import { useParams } from "react-router-dom";
import CompanyInfermation from "../../components/Company/CompanyInfermation";
import useSWR from "swr";
import { getCompany } from "../../api/api";
const Tabs = [
  {
    title: "Özet Bilgi",
    comp: <CompanyInfermation />,
  },
  {
    title: "Firma Bilgileri",
    comp: <CompanyInfermation />,
  },
  {
    title: "Adresleri",
    comp: "<Cif />",
  },
  {
    title: "Yetkili Kişiler",
    comp: "<OtherCost />",
  },
  {
    title: "Sektörel Bilgileri",
    comp: "<CostAnalysis />",
  },
  {
    title: "Alinan Teklifler",
    comp: "<OffersDetail />",
  },
  {
    title: "Verilen Teklifler",
    comp: "ffersDetail />",
  },
  {
    title: "Ürünleri",
    comp: "<OffersDetail />",
  },
];

const CompanyDetail = () => {
  const { id } = useParams();
  const { data, error } = useSWR(["getProduct", id ?? null], getCompany);
  const [activeTab, setActiveTab] = useState(Tabs[0]);
  const loading = !data && !error;
  return loading ? (
    <Skeleton />
  ) : (
    <Box w="100%">
      <BreadCrumb
        funct1={{ title: "Kaydet" }}
        funct2={{ title: "Düzenle" }}
        funct3={{ title: "Sil" }}
      >
        Firmalar
      </BreadCrumb>
      <Box display={"flex"} flexDirection="column" w="100%">
        <Box borderBottom={"1px solid black"} w="100%">
          {Tabs?.map((tab) => (
            <StyledButton
              key={tab.title}
              mr="20px"
              onClick={() => setActiveTab(tab)}
              fontSize="22px"
              color={
                tab.title == activeTab.title
                  ? colors.lightdarkblue
                  : colors.gray
              }
            >
              {tab.title}
            </StyledButton>
          ))}
        </Box>
        <Box px="38px">{activeTab?.comp}</Box>
      </Box>
    </Box>
  );
};
export default CompanyDetail;
