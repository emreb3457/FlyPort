import { Box, Button, Text } from "@chakra-ui/react"
import { Fragment, useState } from "react";
import { StyledButton } from "./ProductList";
import colors from "../theme/colors";
import BreadCrumb from "../components/BreadCrumb/BreadCrumb";
import { useNavigate } from "react-router-dom";
import ThisOffer from "../components/Talepler/Offers/ThisOffer";
import OtherOffers from "../components/Talepler/Offers/OtherOffers";
const Offers = () => {
    const navigation = useNavigate();

    const Tabs = [
        {
            title: "Bu Talep İçin",
            comp: <ThisOffer />
        },
        {
            title: "Diğer Talep İçin Verilen Teklifler",
            comp: <OtherOffers />
        },
        {
            title: "Tümü",
            comp: ""
        },
    ]
    const [activeTab, setActiveTab] = useState(Tabs[0]);
    return (
        <Box w="100%" >
            <BreadCrumb

            >Maliyetleri</BreadCrumb>
            <Box display={"flex"} flexDirection="column" w="100%" >
                <Box display={"flex"}>
                    <Box w="90%" textAlign={"start"} mb="40px" ml="40px">
                        {Tabs?.map(tab =>
                            <Button key={tab.title} mr="15px" px={{ lg: "5px", "2xl": "20px" }} bg={"white"} onClick={() => setActiveTab(tab)} fontSize="18px" color={tab.title == activeTab.title ? colors.lightdarkblue : "#707070"}>{tab.title}</Button>
                        )}
                    </Box>
                    {
                        activeTab.title == Tabs[0].title &&
                        <Fragment>
                            <Button px={{ lg: "30px", "2xl": "40px" }} borderRadius={"10px"} bg={"white"} color="black">Teklif Koşulları</Button>
                            <Button px={{ lg: "30px", "2xl": "40px" }} borderRadius={"10px"} bg={"white"} color="black">Gönderilen</Button>
                            <Button px={{ lg: "30px", "2xl": "40px" }} borderRadius={"10px"} bg={"white"} color="black">Onaylanan</Button>
                            <Button px={{ lg: "30px", "2xl": "40px" }} borderRadius={"10px"} bg={"white"} color="black">Anlaşma</Button>
                        </Fragment>
                    }
                    <Button px={{ lg: "30px", "2xl": "40px" }} borderRadius={"10px"} bg={"white"} color="black">Teklif Oluştur</Button>
                    <Button px={{ lg: "30px", "2xl": "40px" }} borderRadius={"10px"} bg={"white"} color="black">Toplu Teklif</Button>
                </Box>
                <Box px="38px">
                    {activeTab.comp}
                </Box>
                {
                    activeTab.title == Tabs[1].title &&
                    <Box display={"flex"} justifyContent="center" mt={{ lg: "90px" }}>
                        <Text px="40px" borderRadius={"10px"} bg={"white"} color="black">Teklif Koşulları</Text>
                        <Text px="40px" borderRadius={"10px"} bg={"white"} color="black">Gönderilen</Text>
                        <Text px="40px" borderRadius={"10px"} bg={"white"} color="black">Onaylanan</Text>
                        <Text px="40px" borderRadius={"10px"} bg={"white"} color="black">Anlaşma</Text>
                    </Box>
                }
            </Box>
        </Box >
    )
}
export default Offers