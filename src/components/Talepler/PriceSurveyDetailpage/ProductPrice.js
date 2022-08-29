import { Box, Button, Select, Text, Input, Heading } from "@chakra-ui/react"
import { Fragment, useState } from "react"
import { SelectInput, TextInput } from "../ProductDetailPage/MatchingProduct/MatchingProduct"

const ProductPrice = () => {

    return (
        <Box mt="20px">
            <Heading size="md" mb="57px">Firma Adı</Heading>
            <Box display={"flex"}>
                <Box width={{ lg: "35%", "2xl": "30%" }}>
                    <SelectInput>İstenilen Ürünün Aynısı mı? </SelectInput>
                    <TextInput>Üreticinin Bulunduğu Şehir</TextInput>
                    <SelectInput>Teslim Şekli</SelectInput>
                    <SelectInput>Ücretlendirmeye Esas Miktar Birimi</SelectInput>
                    <Box display={"flex"}>
                        <TextInput pr="10px">Hazır Olan Miktar</TextInput>
                        <TextInput pl="10px">Miktar Birimi</TextInput>
                    </Box>
                    <TextInput >İstenilen Miktar İçin Hazırlık Süresi</TextInput>
                </Box>
                <Box width={{ lg: "35%", "2xl": "30%" }} ml="90px">
                    <TextInput >1 Birim Fiyatı</TextInput>
                    <TextInput >Doviz Cinsi</TextInput>
                    <TextInput >Teklifin Alındığı Tarih</TextInput>
                    <TextInput >Teklifin Geçerlilik Tarihi</TextInput>
                </Box>
                <Box w="20%" ml={{ lg: "66px" }}>
                    <Text fontSize={"22px"}>Açıklama</Text>
                    <Box maxW="1000px" w="100%" h="251px" border={"1px solid #9B9696"} borderRadius="21px" mt="10px">
                        <Text></Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}


export default ProductPrice