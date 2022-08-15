import { TableContainer, Thead, Table, Tbody, Td, Tr, Th, Radio, RadioGroup, Box } from "@chakra-ui/react"
import BreadCrumb from "../components/BreadCrumb/BreadCrumb"
import ListTable from "../components/Talepler/ProductListTable/ListTable"

const Logistics = () => {

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
        <Box>
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
            >Yurtdışı Taşıma</BreadCrumb>
            <Box mt="20px" px={"38px"}>
                <ListTable head={Head} row={Row} link={true} />
            </Box>
        </Box>
    )
}
export default Logistics