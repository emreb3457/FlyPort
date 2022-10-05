import { Text, Box } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import BreadCrumb from "../components/BreadCrumb/BreadCrumb"
import { TextInput, SelectInput } from "../components/Inputs/CustomInputs"

const LogisticsAdd = () => {


    return (
        <Box>
            <BreadCrumb

            >
                Deneme Firmasının Teklifi
            </BreadCrumb>
            <Box mt="20px" px={"38px"}>
                <Box display={"flex"}>
                    <Box width={{ lg: "25%", "2xl": "20%" }}>
                        <Text fontSize={"22px"} >Teklif Veren Firma</Text>
                        <TextInput >Taşıyıcı Firma</TextInput>
                        <TextInput >Yetkili Kişi</TextInput>
                        <TextInput >Teklif Alan Kişi</TextInput>
                    </Box>
                    <Box width={{ lg: "25%", "2xl": "20%" }} ml="40px">
                        <Text fontSize={"22px"} >Taşıma Detayı</Text>
                        <TextInput >Yükleme Yeri</TextInput>
                        <TextInput >Teslim Yeri</TextInput>
                        <TextInput >Taşıma Tipi</TextInput>
                        <TextInput >Taşıma Statüsü</TextInput>
                        <TextInput >Taşıma Miktari</TextInput>
                        <TextInput >Araç Tipi</TextInput>
                    </Box>
                    <Box width={{ lg: "25%", "2xl": "20%" }} ml={{ lg: "40px" }}>
                        <Text fontSize={"22px"} >Taşıma Detayı</Text>
                        <TextInput >Toplam Tutar</TextInput>
                        <TextInput >Döviz Cinsi</TextInput>
                        <TextInput >Geçerlilik Tarihi</TextInput>
                        <TextInput >Taşıma Statüsü</TextInput>
                        <TextInput >Taşıma Miktarı</TextInput>
                        <TextInput >Ataç Tipi</TextInput>
                        <Text fontSize={"22px"} color="#818181">Anlaşma Koşulları</Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
export default LogisticsAdd