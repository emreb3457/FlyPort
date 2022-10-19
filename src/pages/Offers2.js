import { Box } from "@chakra-ui/react"
import ListTable from "../components/ListTable"

const Offers2 = () => {
    const Head = [
        "#",
        "Talep No",
        "Teklif No",
        "Müşteri",
        "Sipariş Türü",
        "Teslim Şekli",
        "Taşıma Tipi",
        "Çıkış Gümrüğü",
        "Varış Gümrüğü",
        "Taşıyıcı",
        "Taşıt",
        "Hacim",
        "Miktar",
        "B. Satış Fiyatı",
        "T. Ciro",
        "T. Maliyet",
        "T. Kar",
        "M .Temsilcisi",
        "O. Temsilcisi",
        "S. Durumu",
        "B. Satış Fiyatı",
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
            <ListTable head={Head} row={Row} select={true} link={true} />
        </Box>
    )
}
export default Offers2