import { Box, Text, Input, Select } from "@chakra-ui/react"
import { SelectInput, TextInput } from "../components/Talepler/ProductDetailPage/MatchingProduct/MatchingProduct"
import colors from "../theme/colors"


const OffersDetail = () => {

    return (
        <Box mt="20px">
            <Box display={"flex"}>
                <Box w="20%">
                    <TextInput>Teklif No</TextInput>
                    <TextInput>Ürünün Adı</TextInput>
                    <Box display={"flex"}>
                        <TextInput pr="10px" >Ürün Miktarı</TextInput>
                        <TextInput pl="10px" >Ölçü Birimi</TextInput>
                    </Box>
                    <TextInput>Hizmet Türü</TextInput>
                    <TextInput>Teşlim Şekli</TextInput>
                    <TextInput>Taşıma Tipi</TextInput>
                    <TextInput>Çıkış Ülkesi</TextInput>
                    <TextInput>Varış Ülkesi</TextInput>
                </Box>
                <Box w="20%" ml="17px">
                    <SelectInput>Müşteri</SelectInput>
                    <SelectInput>Müşteri Yetkilisi</SelectInput>
                    <SelectInput>Teklifin Geçerlilik Süresi</SelectInput>
                    <SelectInput>Teklif Türü</SelectInput>
                    <SelectInput>Teklif Durumu</SelectInput>
                </Box>
                <Box w="40%" ml="90px">
                    <Box display={"flex"}>
                        <TextInput w="70%" pr="10px" bg={colors.yavruagizi} >Toplam Maliyet</TextInput>
                        <TextInput w="30%" pl="10px" bg={colors.yavruagizi}>Birim Maliyet</TextInput>
                    </Box>
                    <Box display={"flex"} mb="40px">
                        <TextInput w="70%" pr="10px" bg={colors.yavruagizi}>Birim Maliyet</TextInput>
                        <TextInput w="30%" pl="10px" bg={colors.yavruagizi}>Birim Maliyet</TextInput>
                    </Box>
                    <TextInput bg={colors.lightgreen}>Satış Kar Oranı</TextInput>
                    <TextInput bg={colors.lightgreen}>Toplam Kar Oranı</TextInput>
                    <Box display={"flex"}>
                        <TextInput w="70%" pr="10px" bg={colors.lightgreen}>Toplam Satış Tutarı</TextInput>
                        <TextInput w="30%" pl="10px" bg={colors.lightgreen}>Döviz Cinsi</TextInput>
                    </Box>
                    <Box display={"flex"}>
                        <TextInput w="70%" pr="10px" bg={colors.lightgreen}>Birim Satış Tutarı</TextInput>
                        <TextInput w="30%" pl="10px" bg={colors.lightgreen}>Döviz Cinsi</TextInput>
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}
export default OffersDetail