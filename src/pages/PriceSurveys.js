import { Box } from "@chakra-ui/react"
import ListTable from "../components/ListTable"

const PriceSurveys = () => {
    const Head = [
        "#",
        "ID",
        "Üretici",
        "Ülkesi",
        "Teklif A. Tarihi",
        "Miktar",
        "Birim Fiyatı",
        "Para Birimi",
        "Güncel USD",
        "Geçerlilik Tarihi"
    ]

    const Row = [
        {
            "1": "112",
            "2": "China",
            "3": "12.12.2022",
            "4": "Liu GaiGai",
            "5": "1",
            "6": "300",
            "7": "RMB",
            "8": "290",
            "9": "12.12.2022"
        },
        {
            "1": "112",
            "2": "China",
            "3": "12.12.2022",
            "4": "Liu GaiGai",
            "5": "1",
            "6": "300",
            "7": "RMB",
            "8": "290",
            "9": "12.12.2022"
        },
        {
            "1": "112",
            "2": "China",
            "3": "12.12.2022",
            "4": "Liu GaiGai",
            "5": "1",
            "6": "300",
            "7": "RMB",
            "8": "290",
            "9": "12.12.2022"
        },

    ]
    return (
        <Box mt="20px" px={"38px"}>
            <ListTable id="PriceSurveys" head={Head} row={Row} select={true} link={true} />
        </Box>
    )
}
export default PriceSurveys