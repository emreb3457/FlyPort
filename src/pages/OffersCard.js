import { Box, Text } from "@chakra-ui/react"
import { pageWidth } from "../theme/style"
const OffersCard = () => {

    return (
        <Box display={"flex"} mt="40px" px={"38px"}>
            <Box w="40%" mr="100px">
                <Label label={"Sipariş No: "} borderTop="1px solid #707070">123456</Label>
                <Label label={"Sipariş Tarihi: "}></Label>
                <Label label={"Müşteri: "}></Label>
                <Label label={"Yetkili: "}></Label>
                <Label label={"Maliyet Sorumlusu: "}></Label>
                <Label label={"Teklif Veren "}></Label>
                <Label label={"Teklifi Onaylayan: "}></Label>
                <Label label={"M. Temsilcisi: "}></Label>
                <Label label={"O. Temsilcisi: "}></Label>
            </Box>
            <Box w="40%">
                <Label label={"Ürün Çeşidi "} borderTop="1px solid #707070"></Label>
                <Label label={"Üretici Sayısı: "}></Label>
                <Label label={"Toplam Gelir: "}></Label>
                <Label label={"Toplam Gider: "}></Label>
                <Label label={"Toplam Kar: "}></Label>
                <Label label={"Kar Marjı: "}></Label>
            </Box>

        </Box>
    )
}
const Label = ({ label, children, ...props }) => {
    return (
        <Box display={"flex"} borderBottom={"1px solid #707070"} py="12px" fontSize={"17px"} w="100%" {...props}>
            <Text mr="5px">{label}</Text><Text>{children}</Text>
        </Box>
    )
}
export default OffersCard