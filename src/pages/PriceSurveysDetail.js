import { Box } from "@chakra-ui/react"
import { useState } from "react";
import { StyledButton } from "./ProductList";
import colors from "../theme/colors";
import ProductPrice from "../components/Talepler/PriceSurveyDetailpage/ProductPrice";
import BreadCrumb from "../components/BreadCrumb/BreadCrumb";
import ShippingPropert from "../components/Talepler/PriceSurveyDetailpage/ShippingProperty";

const PriceSurveysDetail = () => {
    const Tabs = [
        {
            title: "Ürün Fiyatı",
            comp: <ProductPrice />
        },
        {
            title: "Teknik Özellikleri",
            comp: <></>
        },
        {
            title: "Kargo Özellikleri",
            comp: <ShippingPropert />
        },
        // {
        //     title: "Ürün Sertifikaları",
        //     comp: <>e</>
        // },
        // {
        //     title: "Firma Bilgileri",
        //     comp: <>e</>
        // },
    ]
    const [activeTab, setActiveTab] = useState(Tabs[0]);
    return (
        <Box w="100%" >
            <BreadCrumb
                funct1={{
                    title: "Yeni Ekle",
                    function: () => console.log("a")
                }}
                funct2={{
                    title: "Düzenle",
                    function: () => console.log("a")
                }}
                funct3={{
                    title: "Sil",
                    function: () => console.log("a")
                }}
            >Üretici Teklifi</BreadCrumb>
            <Box display={"flex"} flexDirection="column" w="100%" >
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
export default PriceSurveysDetail