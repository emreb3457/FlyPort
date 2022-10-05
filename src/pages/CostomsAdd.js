
import { Text, Box } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import BreadCrumb from "../components/BreadCrumb/BreadCrumb"
import { TextInput, SelectInput } from "../components/Inputs/CustomInputs"

const CostomsAdd = () => {

    return (
        <Box>
            <BreadCrumb
            >
                Yeni Maliyet
            </BreadCrumb>
            <Box mt="20px" px={"38px"}>
                <Box display={"flex"}>
                    <Box width={{ lg: "25%", "2xl": "20%" }}>
                        <TextInput>İşlemi Yapan </TextInput>
                        <SelectInput>Tedarikçi Firma</SelectInput>
                        <SelectInput>Özel Kod</SelectInput>
                        <SelectInput>Gider Tipi</SelectInput>
                        <SelectInput >Gider Türü</SelectInput>
                        <TextInput>Açıklama</TextInput>
                    </Box>
                    <Box width={{ lg: "25%", "2xl": "20%" }} ml="50px">
                        <TextInput >Birim Fiyatı</TextInput>
                        <SelectInput >Doviz Cinsi</SelectInput>
                        <TextInput >KDV Oranı</TextInput>
                        <TextInput >KDV Dahil Tutar</TextInput>
                        <TextInput >Toplam Maliyet USD</TextInput>
                        <TextInput >GEçerlilik Tarihi</TextInput>
                    </Box>
                    <Box w="20%" ml={{ lg: "50px" }}>
                        <Text fontSize={"22px"}>Açıklama</Text>
                        <Box maxW="1000px" w="100%" h="251px" border={"1px solid #9B9696"} borderRadius="21px" mt="10px">
                            <Text></Text>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}
export default CostomsAdd