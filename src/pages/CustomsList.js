import { Box } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import BreadCrumb from "../components/BreadCrumb/BreadCrumb"
import ListTable from "../components/ListTable"

const CostList = () => {
    const navigate = useNavigate();
    const Head = [
        "#",
        "ID",
        "Çıkış Ülkesi",
        "Varış Ülkesi",
        "GTİP NO",
        "Teslim Şekli",
        "Taşıma Tipi",
        "İstenen Miktar",
        "Birim Maliyeti",
        "Onaylayan",
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
            >Ülkelere Göre Maliyetleri</BreadCrumb>
            <Box mt="20px" px={"38px"}>
                <ListTable id="CustosList" head={Head} row={Row} link={true} select={true} />
            </Box>
        </Box>
    )
}
export default CostList