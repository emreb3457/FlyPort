import { Box, Text } from "@chakra-ui/react"
import { SelectInput, TextInput } from "../ProductDetailPage/MatchingProduct/MatchingProduct"

const CostomsTax = () => {
    return (
        <Box mt="20px">
            <Box display={"flex"}>
                <Box width={{ lg: "25%", "2xl": "20%" }}>
                    <TextInput>Çıkış Ülkesi</TextInput>
                    <TextInput>Varış Ülkesi</TextInput>
                    <TextInput>Teslim Şekli</TextInput>
                    <TextInput>GTİP NO</TextInput>
                    <TextInput>Ürün Adı</TextInput>
                </Box>
                <Box width={{ lg: "25%", "2xl": "20%" }} ml="90px">
                    <Box display={"flex"}>
                        <SelectInput pr="10px">Gözetim Türü</SelectInput>
                        <TextInput pl="10px">Gözetim Oranı</TextInput>
                    </Box>
                    <TextInput>Gümrük Vergisi Oranı</TextInput>
                    <TextInput>IGV Oranı</TextInput>
                    <TextInput>ÖTV Oranı</TextInput>
                    <Box display={"flex"}>
                        <SelectInput pr="10px">Damping Türü</SelectInput>
                        <TextInput pl="10px">Damping Oranı</TextInput>
                    </Box>
                    <TextInput>KDV Oranı</TextInput>
                    <Text>Yeni Ekle</Text>
                </Box>
                <Box width={{ lg: "25%", "2xl": "20%" }} ml="90px">
                    <SelectInput>Tarex İsteniyor mu?</SelectInput>
                    <SelectInput>Tarım İsteniyor mu?</SelectInput>
                    <SelectInput>İhtisas Gümrüğü Var mı?</SelectInput>
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
export default CostomsTax