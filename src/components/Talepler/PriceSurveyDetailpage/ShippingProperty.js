import { Box, Button, Select, Text, Input, Heading } from "@chakra-ui/react"
import { Fragment, useState } from "react"
import { SelectInput, TextInput } from "../ProductDetailPage/MatchingProduct/MatchingProduct"
import colors from "../../../theme/colors"
const ShippingPropert = () => {

    return (
        <Box mt="20px">
            <Box textAlign={"center"}>
                <Button bg={colors.lightdarkblue} color="white" px="40px" fontSize={"20px"} _hover={{}}>Benzer Ürünleri Göster</Button>
            </Box>

            <Heading size="md" mb="27px" fontSize={"26px"} color={colors.lightdarkblue}>Kargo Bilgileri</Heading>
            <Box display={"flex"}>
                <Box w="30%">
                    <SelectInput>Ürün Ne İle Taşınıyor? </SelectInput>
                    <Box display={"flex"}>
                        <TextInput pr="10px">Uzunluğu</TextInput>
                        <TextInput pl="10px"></TextInput>
                    </Box>
                    <Box display={"flex"}>
                        <TextInput pr="10px">Genişliği</TextInput>
                        <TextInput pl="10px"></TextInput>
                    </Box>
                    <Box display={"flex"}>
                        <TextInput pr="10px">Yüksekliği</TextInput>
                        <TextInput pl="10px"></TextInput>
                    </Box>
                    <Box display={"flex"}>
                        <TextInput pr="10px">Birim Ağırlığı</TextInput>
                        <TextInput pl="10px"></TextInput>
                    </Box>
                    <Box display={"flex"}>
                        <TextInput pr="10px">Koli İçindeki Ürün Miktarı</TextInput>
                        <TextInput pl="10px"></TextInput>
                    </Box>
                    <TextInput >Toplam M3</TextInput>
                    <TextInput >Toplam Ağırlık</TextInput>
                </Box>
            </Box>
        </Box>
    )
}


export default ShippingPropert