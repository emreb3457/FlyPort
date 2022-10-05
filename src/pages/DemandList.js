import { Box } from "@chakra-ui/react";
import ListTable from "../components/Talepler/ProductListTable/ListTable";
import useSWR from "swr";
import { getTalepList } from "../api/talepApi";
import SkeletonComp from "../components/Skeleton/Skeleton";
const DemandList = () => {
  const { data, error } = useSWR("getTalep", getTalepList);
  console.log(data);
  
  const loading = !error && !data;
  const Head = [
    "#",
    "ID",
    "Tarih",
    "Müşteri",
    "Ürün",
    "Teknik Özellik",
    "İstenen Miktar",
    "Üretici Ülkesi",
    "Varış Ülkesi",
    "Sorumlu",
    "Kalan Süre",
  ];

  const Row = [
    {
      1: "112",
      2: "01.11.2021",
      3: "12.12.2022",
      4: "Liu GaiGai",
      5: "1",
      6: "300",
      7: "RMB",
      8: "290",
      9: "12.12.2022",
    },
    {
      1: "112",
      2: "China",
      3: "12.12.2022",
      4: "Liu GaiGai",
      5: "1",
      6: "300",
      7: "RMB",
      8: "290",
      9: "12.12.2022",
    },
    {
      1: "112",
      2: "China",
      3: "12.12.2022",
      4: "Liu GaiGai",
      5: "1",
      6: "300",
      7: "RMB",
      8: "290",
      9: "12.12.2022",
    },
  ];
  return (
    <Box mt="20px" px={"38px"}>
      <ListTable head={Head} row={Row} select={true} link={true} />
    </Box>
  );
};
export default DemandList;
