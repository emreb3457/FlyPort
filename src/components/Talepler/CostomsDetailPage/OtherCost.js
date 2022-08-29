import { Box, Text } from "@chakra-ui/react"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { SelectInput, TextInput } from "../ProductDetailPage/MatchingProduct/MatchingProduct";
import ListTable from "../ProductListTable/ListTable";


const OtherCost = () => {
    const navigate = useNavigate();
    const [detail, setDetail] = useState("")
    const Head = [
        "#",
        "ID",
        "Gider Tipi",
        "Gider Kalemi",
        "Açıklama",
        "Tutar",
        "Doviz Cinsi",
        "USD Tutarı",

    ]

    const Row = [
        {
            "1": "112",
            "2": "Açık Gider",
            "3": "Gümrük giderleri",
            "4": "Liu GaiGai",
            "5": "4000",
            "6": "USD",
            "7": "400",

        },
        {
            "1": "112",
            "2": "Açık Gider",
            "3": "Gümrük giderleri",
            "4": "Liu GaiGai",
            "5": "4000",
            "6": "USD",
            "7": "400",

        },
        {
            "1": "112",
            "2": "Açık Gider",
            "3": "Gümrük giderleri",
            "4": "Liu GaiGai",
            "5": "4000",
            "6": "USD",
            "7": "400",

        },
    ]
    return (
        <Box>
            <Box mt="20px" px={"38px"}>
                <ListTable head={Head} row={Row} link={true} select={true} />
            </Box>
        </Box>
    )
}
export default OtherCost