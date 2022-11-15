import { Box, Text } from "@chakra-ui/react";
import colors from "../../../../theme/colors";

export const DesiredProduct = ({ detail, page }) => {
  const currentPage = page;

  const demandType = [
    { ad: "Ürün Tedarigi", id: 1 },
    { ad: "Taşıma", id: 2 },
    { ad: "Gümrükleme", id: 3 },
  ];

  const Productdetail = (
    <Box mt="20px">
      <Box display={"flex"}>
        <Box w="50%">
          <Label label={"Ürün Adı:"}>{detail?.urunAdi}</Label>
          <Label label={"Genel Kategori:"}>{detail?.genelKategori}</Label>
          <Label label={"Alt Kategori:"}>{detail?.altKategori}</Label>
          <Label label={"Fly Kategori:"}>{detail?.flyKategori}</Label>
        </Box>
        <Box w="50%">
          {detail?.nitelikler?.map((x, index) => {
            const label = detail?.nitelikDegerleri.find(
              (y) => y.nitelikId === x.id
            );
            return (
              <Label key={index} label={"Özellik" + (index + 1) + ":"}>
                {detail?.nitelikler[index].ad + " " + label.ad}
              </Label>
            );
          })}
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
          <Text padding={"10px"}>{detail?.aciklama}</Text>
        </Box>
      </Box>
    </Box>
  );
  
  const AlternativeDetail = (
    <Box mt="20px">
      <Box display={"flex"}>
        <Box w="50%">
          <Label label={"İstenen:"}>
            {demandType.find((data) => data.id === detail?.istenen)?.ad}
          </Label>
          <Label label={"Nereden:"}>{detail?.nereden}</Label>
          <Label label={"Nereye:"}>{detail?.nereye}</Label>
          <Label label={"Teslimat Şekli:"}>{detail?.teslimSekli}</Label>
          <Label label={"İstenen Miktar:"}>{detail?.miktar}</Label>
          <Label label={"Kategori:"}>{detail?.kategori}</Label>
          <Label label={"Ürün Adı:"}>{detail?.urunAdi}</Label>
          <Label label={"Özellik 1:"}>{detail?.ozellik1}</Label>
        </Box>
        <Box w="50%">
          <Label label={"Müşteri:"}>{detail?.musteri}</Label>
          <Label label={"Yetkili:"}>{detail?.yetkili}</Label>
          {/* <Label label={"Talep Eden:"}>{detail?.talepEden}</Label> */}
          <Label label={"E-mail:"}>{detail?.talepEden}</Label>
          <Label label={"Telefon:"}>{detail?.gsm}</Label>
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
          <Text padding={"10px"}>{detail?.aciklama}</Text>
        </Box>
      </Box>
    </Box>
  );
  return currentPage === "alternative" ? AlternativeDetail : Productdetail;
};

const Label = ({ label, children, ...props }) => {
  return (
    <Box display={"flex"} py="10px" fontSize={"18px"} w="100%" {...props}>
      <Text mr="5px" color={colors.gray}>
        {label}
      </Text>
      <Text>{children}</Text>
    </Box>
  );
};
