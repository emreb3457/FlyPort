import { Box, Text } from "@chakra-ui/react"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { SelectInput, TextInput } from "../../Inputs/CustomInputs";
import ListTable from "../../ListTable";


const CostAnalysis = () => {
    const navigate = useNavigate();
    const [detail, setDetail] = useState("")
    const Head = [
        "#",
        "Maliyet Konusu",
        "Tedarikçi",
        "Top. Maliyet",
        "Doviz Cinsi",
        "USD Bazında",
        "Teklif Alan",
        "Alınan Tarih",
        "Geçerlilik Tarihi",
        "Onaylayan",
    ]

    const Row = [
        {
            "1": "Sigorta",
            "2": "Ak Sigorta",
            "3": "60",
            "4": "USD",
            "5": "60",
            "6": "Emre Altıntaş",
            "7": "27.07.2001",
            "8": "27.07.2001",
            "9": "Emre Altındaş",
        },
        {
            "1": "Sigorta",
            "2": "Ak Sigorta",
            "3": "60",
            "4": "USD",
            "5": "60",
            "6": "Emre Altıntaş",
            "7": "27.07.2001",
            "8": "27.07.2001",
            "9": "Emre Altındaş",
        },
        {
            "1": "Sigorta",
            "2": "Ak Sigorta",
            "3": "60",
            "4": "USD",
            "5": "60",
            "6": "Emre Altıntaş",
            "7": "27.07.2001",
            "8": "27.07.2001",
            "9": "Emre Altındaş",
        },
    ]
    return (
        <Box>
            <Box mt="20px" px={"38px"}>
                <ListTable id="CostAnalysis" head={Head} row={Row} />
                <Box display={"flex"} justifyContent="end" mt={{ lg: "80px" }}>
                    <Box width={{ lg: "35%", "2xl": "30%" }} >
                        <Label label={"Taşıma Tipi: "} >123456</Label>
                        <Label label={"Birim Maliyeti: "}></Label>
                        <Label label={"Birim Teklif: "}></Label>
                        <Label label={"Birim Karı: "}></Label>
                    </Box>
                    <Box width={{ lg: "35%", "2xl": "30%" }}>
                        <Label label={"Toplam Ürün Miktarı "} ></Label>
                        <Label label={"Toplam Maliyet: "}></Label>
                        <Label label={"Toplam Teklif: "}></Label>
                        <Label label={"Toplam Kar: "}></Label>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
export default CostAnalysis

const Label = ({ label, children, ...props }) => {
    return (
        <Box display={"flex"} py="12px" fontSize={"17px"} w="100%" {...props}>
            <Text mr="5px">{label}</Text><Text>{children}</Text>
        </Box>
    )
}