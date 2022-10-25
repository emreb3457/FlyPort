import { Box,  Button } from "@chakra-ui/react"
import ListTable from "../components/ListTable"
const ProductList = () => {

    const Head = [
        "Sıra No",
        "Ürün Tam Adı",
        "Kısa Adı",
        "Kategori",
        "İşlevi",
        "Özellik",
        "Özellik1",
        "Talep Tarihi",
        "Kalan Süre"
    ]

    const Row = [
        {
            "1": "12 V Kablo",
            "2": "Kablo",
            "3": "Elektronik",
            "4": "İşlevi",
            "5": "12 V",
            "6": "1.5 m",
            "7": "12.12.2022",
            "8": "12.12.2022"
        },
        {
            "1": "12 V Kablo",
            "2": "Kablo",
            "3": "Elektronik",
            "4": "İşlevi",
            "5": "12 V",
            "6": "1.5 m",
            "7": "12.12.2022",
            "8": "12.12.2022"
        }
    ]


    return (
        <Box display={"flex"} flexDir="column" mt="20px" px={"38px"}>
            <Box display={"flex"} justifyContent="flex-end" mb="20px">
                <StyledButton>Yeni Ekle</StyledButton>
                <StyledButton>Düzenle</StyledButton>
                <StyledButton>Sil</StyledButton>
                <StyledButton>Excelden Aktar</StyledButton>
            </Box>
            <ListTable id="ProductList" head={Head} row={Row} link={true} />
        </Box>
    )
}

export const StyledButton = ({ children, ...props }) => {
    return (
        <Button bg="transparent" _hover={{}} {...props}>{children}</Button>
    )
}

export default ProductList