import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ListTable from "../../components/Talepler/ProductListTable/ListTable";
import useSWR from "swr";
import { getCountryList } from "../../api/tanimlamalarApi";
import BasicModal from "../../helpers/Modal";
import SkeletonComp from "../../components/Skeleton/Skeleton";
import { useModalStatus } from "../../hooks/useModalStatus";
import { TextInput } from "../../components/Talepler/ProductDetailPage/MatchingProduct/MatchingProduct";

const CountryList = () => {
  const { clickfunt, isClick } = useModalStatus();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const { data, error } = useSWR(["_", page], getCountryList);
  console.clear();
  console.log(data);
  const loading = !error && !data;

  const Head = ["#", "ID", "Ad Orjinal", "Ad Türkçe", "Ad Ingilizce"];
  const DataHead = ["id", "adOrjinal", "adTurkce", "adIngilizce"];

  const NewCountryComp = () => {
    return (
      <Box py="30px">
        <TextInput>Ülke Adı</TextInput>
        <Button>Ekle</Button>
      </Box>
    );
  };

  return loading ? (
    <SkeletonComp />
  ) : (
    <Box>
      <BreadCrumb
        funct1={{
          title: "Yeni Ekle",
          function: () => clickfunt(),
        }}
        funct2={{
          title: "Düzenle",
          function: () => console.log("a"),
        }}
        funct3={{
          title: "Sil",
          function: () => console.log("a"),
        }}
      >
        Ülkelere Göre Maliyetleri
      </BreadCrumb>
      <Box mt="20px" px={"38px"}>
        <ListTable
          head={Head}
          dataHead={DataHead}
          row={data.data}
          page={page}
          totalRowCount={data.totalRowCount + 20}
          changePage={setPage}
          link={true}
          select={true}
        />
      </Box>
      <BasicModal
        click={isClick}
        title={"Yeni Ülke Ekle"}
        contentComponent={<NewCountryComp />}
      />
    </Box>
  );
};
export default CountryList;
