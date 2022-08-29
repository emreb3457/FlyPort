import { Box } from "@chakra-ui/react"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import ListTable from "../ProductListTable/ListTable";

const OtherOffers = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (document.querySelector("html")) document.querySelector("html").style.width = "fit-content";

        return () => document.querySelector("html").style.width = "inherit";
    }, [])
    const Head = [
        "#",
        "ID",
        "Miktar",
        "Nereden?",
        "Nereye?",
        "Teşlim Şekli",
        "Taşıma Tipi",
        "GTİP",
        "Birim Maliyeti",
        "T.Maliyet",
        "Kar Oranı",
        "Birim Teklifi",
        "Geçerlilik Tarihi",
        "Teklif Tarihi",
        "Durum"
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
            "9": "12.12.2022",
            "10": "12.12.2022"
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
            "9": "12.12.2022",
            "10": "12.12.2022"
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
            "9": "12.12.2022",
            "10": "12.12.2022"
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
export default OtherOffers