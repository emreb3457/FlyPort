import { TableContainer, Thead, Table, Tbody, Td, Tr, Th, Radio, RadioGroup, Box } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb/BreadCrumb"
import ListTable from "../components/ListTable"

const Logistics = () => {
    const navigate = useNavigate();
    const Head = [
        "#",
        "Taşıma Tipi",
        "Kalkış Limanı",
        "Varış Lİmanı",
        "Taşımacı",
        "Ürün Miktarı",
        "Hacim",
        "Ağırlık",
        "Taşıma Ücreti",
        "Döviz Cinsi",
        "USD Tutarı"
    ]

    const Row = [
        {
            "1": "Denizyolu",
            "2": "Ningbo Port",
            "3": "Ambarlı",
            "4": "X Trans",
            "5": "1.000 Adet",
            "6": "10 m3",
            "7": "100 kg",
            "8": "290",
            "9": "RMB",
            "10": "1.4"
        },

    ]
    return (
        <Box>
            <BreadCrumb
                funct1={{
                    title: "Yeni Ekle",
                    function: () => navigate("yenimaliyet")
                }}
                funct2={{
                    title: "Düzenle",
                    function: () => console.log("a")
                }}
                funct3={{
                    title: "Sil",
                    function: () => console.log("a")
                }}
            >Yurtdışı Taşıma</BreadCrumb>
            <Box mt="20px" px={"38px"}>
                <ListTable id="Logistis" head={Head} row={Row} link={true} />
            </Box>
        </Box>
    )
}
export default Logistics