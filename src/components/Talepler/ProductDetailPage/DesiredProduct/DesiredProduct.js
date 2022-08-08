import { Box, Text } from "@chakra-ui/react"
import colors from "../../../../theme/colors"


const DesiredProduct = () => {

    return (
        <Box mt="20px">
            <Box display={"flex"}>
                <Box w="50%">
                    <Label label={"İstenen:"}>Ürün Tedariği</Label>
                    <Label label={"Nereden:"}>Chine</Label>
                    <Label label={"Nereye:"}>Türkiye</Label>
                    <Label label={"T. Şekli:"}>Kapı Teslim</Label>
                    <Label label={"İst. Miktar:"}>1.000 Adet</Label>
                    <Label label={"Kategori:"}>Elektronik</Label>
                    <Label label={"Ürün Adı:"}>USB Kablo</Label>
                    <Label label={"Özellik 1:"}>12 V</Label>
                    <Label label={"Özellik 2:"}>Ürün Tedariği</Label>
                </Box>
                <Box w="50%">
                    <Label label={"Müşteri:"}>Teknosa AŞ</Label>
                    <Label label={"Yetkili:"}>Tolgay Özdemir</Label>
                    <Label label={"Telep Eden:"}>Test</Label>
                    <Label label={"E-mail:"}>test@test.com</Label>
                    <Label label={"Telefon:"}>000000000</Label>
                </Box>
            </Box>
            <Box mt="40px">
                <Text fontSize={"22px"}>Açıklama</Text>
                <Box maxW="1000px" w="100%" h="444px" border={"1px solid #9B9696"} borderRadius="21px" mt="10px">
                    <Text></Text>
                </Box>
            </Box>

        </Box>
    )
}

const Label = ({ label, children, ...props }) => {
    return (
        <Box display={"flex"} py="10px" fontSize={"18px"} w="100%" {...props}>
            <Text mr="5px" color={colors.gray}>{label}</Text><Text>{children}</Text>
        </Box>
    )
}
export default DesiredProduct