import { Box, Text, Input, Select } from "@chakra-ui/react";
import colors from "../../../../theme/colors";
import { SelectInput, TextInput } from "../../../Inputs/CustomInputs";

const MatchingProduct = () => {
  return (
    <Box mt="20px">
      <Box display={"flex"}>
        <Box width={{ lg: "35%", "2xl": "30%" }}>
          <TextInput>Ürünün Tam Adı</TextInput>
          <TextInput>Kısa Adı</TextInput>
          <SelectInput>Genel Kategori</SelectInput>
          <SelectInput>Alt Kategori</SelectInput>
          <SelectInput>Fly Kategori</SelectInput>
        </Box>
        <Box width={{ lg: "35%", "2xl": "30%" }} ml="17px">
          <SelectInput>Teknik Özellik 1</SelectInput>
          <SelectInput>Teknik Özellik 2</SelectInput>
          <SelectInput>Teknik Özellik 3</SelectInput>
          <SelectInput>Teknik Özellik 4</SelectInput>
          <SelectInput>Yeni Ekle</SelectInput>
        </Box>
        <Box width={{ lg: "35%", "2xl": "30%" }} ml="3px">
          <TextInput> </TextInput>
          <TextInput> </TextInput>
          <TextInput> </TextInput>
          <TextInput> </TextInput>
        </Box>
      </Box>
      <Box mt="40px">
        <Text fontSize={"22px"}>Açıklama</Text>
        <Box
          maxW="1000px"
          w="100%"
          h="444px"
          border={"1px solid #9B9696"}
          borderRadius="21px"
          mt="10px"
        >
          <Text></Text>
        </Box>
      </Box>
    </Box>
  );
};


export default MatchingProduct;
