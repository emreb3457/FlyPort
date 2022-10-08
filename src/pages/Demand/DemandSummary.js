import { Box, Skeleton, Stack, Text } from "@chakra-ui/react";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useSWR from "swr";
import { getTalepList } from "../../api/talepApi";
import SkeletonComp from "../../components/Skeleton/Skeleton";
const DemandSummary = () => {
  return (
    <Box display={"flex"} mt="40px" px={"38px"}>
      <>
        <Box w="40%" mr="100px">
          <Label label={"Talep No: "} borderTop="1px solid #707070">
            123456
          </Label>
          <Label label={"Talep Tarihi: "}></Label>
          <Label label={"Müşteri: "}></Label>
          <Label label={"Yetkili: "}></Label>
          <Label label={"TalepAlan Kişi: "}></Label>
          <Label label={"Talep Türü "}></Label>
          <Label label={"Alternetif Sayısı: "}></Label>
          <Label label={"İstenilen Ülke: "}></Label>
          <Label label={"Varış Ülkesi: "}></Label>
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
