import { Box, Text, Button } from "@chakra-ui/react"
import { useState } from "react"
import ImageComp from "../components/Talepler/ImageComp/ImageComp"
import DesiredProduct from "../components/Talepler/ProductDetailPage/DesiredProduct/DesiredProduct"
import MatchingProduct from "../components/Talepler/ProductDetailPage/MatchingProduct/MatchingProduct"
import colors from "../theme/colors"
import { StyledButton } from "./ProductList"

const ProductDetail = () => {

    const Tabs = [
        {
            title: "İstenen Ürün",
            comp: <DesiredProduct />
        },
        {
            title: "Eşleşen ürün",
            comp: <MatchingProduct />
        },
        {
            title: "Teknik Özellikleri",
            comp: <MatchingProduct />
        },
        {
            title: "Keywords",
            comp: <>d</>
        },
        {
            title: "İstenen Belgeler",
            comp: <>e</>
        },
    ]
    const [activeTab, setActiveTab] = useState(Tabs[0]);
    return (
        <Box display={"flex"} mt="20px">
            <ImageComp />
            <Box display={"flex"} flexDirection="column" pl={{ sm: "71px" }}>
                <Box borderBottom={"1px solid black"}>
                    {Tabs?.map(tab =>
                        <StyledButton key={tab.title} onClick={() => setActiveTab(tab)} fontSize="22px" color={tab.title == activeTab.title ? colors.lightdarkblue : colors.gray}>{tab.title}</StyledButton>
                    )}
                </Box>
                <Box>
                    {activeTab.comp}
                </Box>
            </Box>
        </Box >
    )
}

export default ProductDetail