import { Box, Text } from "@chakra-ui/react";
import colors from "../../../../theme/colors";

export const DesiredProduct = ({ detail }) => {
  return (
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
