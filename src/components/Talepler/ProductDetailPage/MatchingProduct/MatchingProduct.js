import { Box, Text, Input, Select } from "@chakra-ui/react"
import colors from "../../../../theme/colors"


const MatchingProduct = () => {

    return (
        <Box mt="20px">
            <Box display={"flex"}>
                <Box w="30%">
                    <TextInput>Ürünün Tam Adı</TextInput>
                    <TextInput>Kısa Adı</TextInput>
                    <SelectInput>Genel Kategori</SelectInput>
                    <SelectInput>Alt Kategori</SelectInput>
                    <SelectInput>Fly Kategori</SelectInput>
                </Box>
                <Box w="30%" ml="17px">
                    <SelectInput>Teknik Özellik 1</SelectInput>
                    <SelectInput>Teknik Özellik 2</SelectInput>
                    <SelectInput>Teknik Özellik 3</SelectInput>
                    <SelectInput>Teknik Özellik 4</SelectInput>
                    <SelectInput>Yeni Ekle</SelectInput>
                </Box>
                <Box w="30%" ml="3px">
                    <TextInput> </TextInput>
                    <TextInput> </TextInput>
                    <TextInput> </TextInput>
                    <TextInput> </TextInput>
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

export const TextInput = ({ label, children, ...props }) => {
    return (
        <Box py="10px" fontSize={"18px"} w="100%" {...props}>
            <Text mr="5px" color={"#232F3D"}>{children ? children : " "}</Text>
            <Input h="54px" borderColor={"#D6D6D6"} />
        </Box>
    )
}

export const SelectInput = ({ label, children, ...props }) => {
    return (
        <Box py="10px" fontSize={"18px"} w="100%" {...props}>
            <Text mr="5px" color={"#232F3D"}>{children ? children : " "}</Text>
            <Select h="54px" borderColor={"#D6D6D6"}>
                <option>a</option>
                <option>b</option>
            </Select>
        </Box>
    )
}
export default MatchingProduct