import { Box, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { getDemand } from "../../api/api";
import SkeletonComp from "../../components/Skeleton/Skeleton";

const DemandSummary = () => {
  const { id } = useParams();
  const { data: Detail, error } = useSWR(["getDemand", id], getDemand);
  const loading = !error && !Detail;
  console.log(Detail);
  return loading ? (
    <SkeletonComp />
  ) : (
    <Box display={"flex"} mt="40px" px={"38px"}>
      <>
        <Box w="40%" mr="100px">
          <Label label={"Talep No: "} borderTop="1px solid #707070">
            {Detail?.talepAd}
          </Label>
          <Label label={"Talep Tarihi: "}></Label>
          <Label label={"Müşteri: "}> {Detail?.musteriAd}</Label>
          <Label label={"Yetkili: "}> {Detail?.talepEden}</Label>
          <Label label={"TalepAlan Kişi: "}></Label>
          <Label label={"Talep Türü "}></Label>
          <Label label={"Alternetif Sayısı: "}></Label>
          <Label label={"İstenilen Ülke: "}>{Detail?.nerden}</Label>
          <Label label={"Varış Ülkesi: "}>{Detail?.nereye}</Label>
        </Box>
        <Box w="40%">
          <Label
            label={"Talep Alma Tarihi "}
            borderTop="1px solid #707070"
          ></Label>
          <Label label={"Ürün Sayısı: "}></Label>
          <Label label={"Kalan Süre: "}></Label>
        </Box>
      </>
    </Box>
  );
};
const Label = ({ label, children, ...props }) => {
  return (
    <Box
      display={"flex"}
      borderBottom={"1px solid #707070"}
      py="12px"
      fontSize={"17px"}
      w="100%"
      {...props}
    >
      <Text mr="5px">{label}</Text>
      <Text>{children}</Text>
    </Box>
  );
};
export default DemandSummary;
