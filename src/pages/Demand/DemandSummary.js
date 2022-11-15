import { Box, Text } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { getDemand } from "../../api/api";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import SkeletonComp from "../../components/Skeleton/Skeleton";
import { routes } from "../../constants/routes";

const DemandSummary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: Detail, error } = useSWR(["getDemand", id], getDemand);
  const loading = !error && !Detail;

  const demandType = [
    { ad: "Ürün Tedarigi", id: 1 },
    { ad: "Taşıma", id: 2 },
    { ad: "Gümrükleme", id: 3 },
  ];
  return loading ? (
    <SkeletonComp />
  ) : (
    <>
      <BreadCrumb
        funct1={{
          title: "Alternatif Ekle",
          function: () => {
            navigate(routes.yeniAlternatif, { state: id });
          },
        }}
        funct2={{
          title: "Alternatif Listele",
          function: () => {
            navigate(routes.alternatif, { state: id });
          },
        }}
      >
        Talep Detay
      </BreadCrumb>

      <Box display={"flex"} mt="40px" px={"38px"}>
        <>
          <Box w="40%" mr="100px">
            <Label label={"Talep No: "} borderTop="1px solid #707070">
              {Detail?.talepAd}
            </Label>
            <Label label={"Talep Tarihi: "}>{Detail?.talepTarihi}</Label>
            <Label label={"Müşteri: "}> {Detail?.musteriAd}</Label>
            <Label label={"Yetkili: "}> {Detail?.talepEden}</Label>
            <Label label={"Talep Alan Kişi: "}>{Detail?.musteriAd}</Label>
            <Label label={"Talep Türü: "}>
              {demandType.find((data) => data.id === Detail?.talepTuru).ad}
            </Label>
            <Label label={"İstenilen Ülke: "}>{Detail?.nerden}</Label>
            <Label label={"Varış Ülkesi: "}>{Detail?.nereye}</Label>
          </Box>
          <Box w="40%">
            <Label label={"Talep Alma Tarihi: "} borderTop="1px solid #707070">
              {Detail?.talepTarihi}
            </Label>
            <Label label={"Ürün Sayısı: "}>{Detail?.alternatifSayisi}</Label>
            <Label label={"Geçerlilik Tarihi: "}>{Detail?.kalanSure}</Label>
          </Box>
        </>
      </Box>
    </>
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
