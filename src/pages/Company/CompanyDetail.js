import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { StyledButton } from "../ProductList";
import colors from "../../theme/colors";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import { useParams } from "react-router-dom";
import CompanyInfermation from "../../components/Company/CompanyInfermation";
import useSWR from "swr";
import { getCompany, getCompanyRemove } from "../../api/api";
import CompanySummary from "../../components/Company/CompanySummary";
import SkeletonComp from "../../components/Skeleton/Skeleton";
import CompanyAdress from "../../components/Company/CompanyAdress";
import CompanyOfficial from "../../components/Company/CompanyOfficial";
const Tabs = [
  {
    title: "Özet Bilgi",
    comp: CompanySummary,
  },
  {
    title: "Firma Bilgileri",
    comp: CompanyInfermation,
  },
  {
    title: "Adresleri",
    comp: CompanyAdress,
  },
  {
    title: "Yetkili Kişiler",
    comp: CompanyOfficial,
  },
  // {
  //   title: "Sektörel Bilgileri",
  //   comp: "<CostAnalysis />",
  // },
  // {
  //   title: "Alinan Teklifler",
  //   comp: "<OffersDetail />",
  // },
  // {
  //   title: "Verilen Teklifler",
  //   comp: "ffersDetail />",
  // },
  // {
  //   title: "Ürünleri",
  //   comp: "<OffersDetail />",
  // },
];

const CompanyDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(Tabs[0]);
  const [selectFunction, setSelectFunction] = useState({});

  const { data: companyDetail, error } = useSWR(["getCompany", id], getCompany);
  // const NewCountryComp = ({ handleChange, values, handleSubmit }) => {
  //   return (
  //     <form onSubmit={handleSubmit} style={{ padding: "10px 0" }}>
  //       <TextInput
  //         name={"adOrjinal"}
  //         value={values.adOrjinal}
  //         onChange={handleChange}
  //         error={touched?.adOrjinal && errors.adOrjinal}
  //       >
  //         Orjinal Ad
  //       </TextInput>
  //       <TextInput
  //         name={"adTurkce"}
  //         value={values.adTurkce}
  //         onChange={handleChange}
  //         error={touched?.adTurkce && errors.adTurkce}
  //       >
  //         Türkçe Ad
  //       </TextInput>
  //       <TextInput
  //         name={"adIngilizce"}
  //         value={values.adIngilizce}
  //         onChange={handleChange}
  //         error={touched?.adIngilizce && errors.adIngilizce}
  //       >
  //         Ingilizce Ad
  //       </TextInput>
  //       <TextInput
  //         name={"aciklama"}
  //         value={values.aciklama}
  //         onChange={handleChange}
  //         error={touched?.aciklama && errors.aciklama}
  //       >
  //         Acıklama
  //       </TextInput>
  //       <Button type="submit">Ekle</Button>
  //     </form>
  //   );
  // };

  useEffect(() => {}, [selectFunction]);
  const loading = !companyDetail && !error;
  return loading ? (
    <SkeletonComp />
  ) : (
    <Box w="100%">
      {activeTab !== Tabs[0] && (
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
          Firmalar
        </BreadCrumb>
      )}

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
              item={companyDetail}
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
export default CompanyDetail;
