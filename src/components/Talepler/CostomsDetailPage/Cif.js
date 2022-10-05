
import { Box, Text } from "@chakra-ui/react"
import { SelectInput, TextInput } from "../../Inputs/CustomInputs"

const Cif = () => {
    return (
        <Box mt="20px">
            <Box display={"flex"}>
                <Box width={{ lg: "25%", "2xl": "20%" }}>
                    <Text fontSize={"22px"} >Sevkiyat Bilgileri</Text>
                    <TextInput disabled={true} >Çıkış Ülkesi</TextInput>
                    <TextInput disabled={true} >Varış Ülkesi</TextInput>
                    <TextInput disabled={true} >Teslim Şekli</TextInput>
                    <TextInput disabled={true} >Taşıma Tipi</TextInput>
                    <Box display={"flex"}>
                        <TextInput pr="10px" disabled={true} >Ürün Miktarı</TextInput>
                        <TextInput pl="10px" disabled={true} >Ölçü Birimi</TextInput>
                    </Box>
                    <TextInput disabled={true} >Toplam Ağırlık</TextInput>
                </Box>
                <Box width={{ lg: "25%", "2xl": "20%" }} ml={{ lg: "80px" }}>
                    <Text fontSize={"22px"} >Diğer Detaylar</Text>
                    <TextInput disabled={true} >GTİP NO</TextInput>
                    <TextInput disabled={true} >Ürün Adı</TextInput>
                    <TextInput disabled={true} >1. Birim Fiyatı</TextInput>
                    <TextInput disabled={true} >Tamlam Mal Bedeli</TextInput>
                    <TextInput disabled={true} >Lojistik Maliyeti</TextInput>
                    <TextInput disabled={true} >Toplam CIF Maliyet</TextInput>
                </Box>
                <Box width={{ lg: "25%", "2xl": "20%" }} ml={{ lg: "80px" }}>
                    <Text fontSize={"22px"} >Gümrük Vergileri</Text>
                    <TextInput disabled={true} >Gözetim Tutarı</TextInput>
                    <TextInput disabled={true} >Gümrük Vergisi Tutarı</TextInput>
                    <TextInput disabled={true} >IGV Tutarı</TextInput>
                    <TextInput disabled={true} >ÖTV Tutarı</TextInput>
                    <TextInput disabled={true} >Damping Tutarı</TextInput>
                    <TextInput disabled={true} >KDV Tutarı</TextInput>
                </Box>
            </Box>
        </Box>
    )
}
export default Cif