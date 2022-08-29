import { Box, Button } from "@chakra-ui/react"
import { useState } from "react";
import { StyledButton } from "./ProductList";
import colors from "../theme/colors";
import BreadCrumb from "../components/BreadCrumb/BreadCrumb";
import CostomsTax from "../components/Talepler/CostomsDetailPage/CostomsTax"
import Cif from "../components/Talepler/CostomsDetailPage/Cif";
import OtherCost from "../components/Talepler/CostomsDetailPage/OtherCost";
import CostAnalysis from "../components/Talepler/CostomsDetailPage/CostAnalysis";
import { useNavigate } from "react-router-dom";
import OffersDetail from "./OffersDetail";
const CostDetail = () => {
    const navigation = useNavigate();
    const Tabs = [
        {
            title: "Üretici Teklifi",
            comp: "<ProductPrice />"
        },
        {
            title: "Gümrük Vergileri",
            comp: <CostomsTax />
        },
        {
            title: "CIF Maliyetler",
            comp: <Cif />
        },
        {
            title: "Diğer Maliyetler",
            comp: <OtherCost />
        },
        {
            title: "Maliyet Analizi",
            comp: <CostAnalysis />
        },
        {
            title: "Teklif",
            comp: <OffersDetail/>
        }
    ]

    const Tabs2 = [
        {
            title: "Ürün GTİP",
            comp: "<ProductPrice />"
        },
        {
            title: "Önerilen",
            comp: ""
        },
        {
            title: "Karşılaştırma",
            comp: ""
        },
    ]
    const [activeTab, setActiveTab] = useState(Tabs[1]);
    const [activeTab2, setActiveTab2] = useState(Tabs2[0]);
    return (
        <Box w="100%" >
            <BreadCrumb

            >Maliyetleri</BreadCrumb>
            <Box display={"flex"} flexDirection="column" w="100%" >
                <Box display={"flex"}>
                    <Box w="90%" textAlign={"center"} mb="40px">
                        {Tabs2?.map(tab =>
                            <Button key={tab.title} mr="20px" px="80px" border={"solid 1px #9B9D9E"} borderRadius={"10px"} bg={tab.title == activeTab2.title ? colors.lightdarkblue : "white"} onClick={() => setActiveTab2(tab)} fontSize="18px" color={tab.title == activeTab2.title ? "white" : colors.lightdarkblue}>{tab.title}</Button>
                        )}
                    </Box>
                    <Button mr="20px" px="80px" borderRadius={"10px"} bg={colors.lightdarkblue} color="white">Onay iste</Button>
                </Box>
                <Box borderBottom={"1px solid black"} w="100%">
                    {Tabs?.map(tab =>
                        <StyledButton key={tab.title} mr="20px" onClick={() => setActiveTab(tab)} fontSize="22px" color={tab.title == activeTab.title ? colors.lightdarkblue : colors.gray}>{tab.title}</StyledButton>
                    )}
                </Box>
                <Box px="38px">
                    {activeTab.comp}
                </Box>
            </Box>
        </Box >
    )
}
export default CostDetail