import { Flex, Box, Button, Text, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { keywordInsert, keywordList } from "../../../../api/api";
import { sendRequest } from "../../../../utils/helpers";
const Keywords = ({ detail }) => {
  const [keyword, setKeyword] = useState("");
  const { id } = useParams();
  const { data, mutate, error } = useSWR(
    ["keywordList", detail.id || id],
    keywordList
  );
  const addKeyword = async () => {
    const { status } = await sendRequest(
      keywordInsert("", { urunId: detail.id, ad: keyword })
    );
    setKeyword("");
    mutate();
  };
  return (
    <Box>
      <Flex w="40%" gap={"10px"} mt="30px">
        <Input value={keyword} onChange={(x) => setKeyword(x.target.value)} />
        <Button onClick={() => addKeyword()}>Ekle</Button>
      </Flex>

      <Flex mt="20px">
        {data?.data?.map((item) => {
          return (
            <Box borderRadius={"20px"} border="1px solid grey" p="8px" mr="5px">
              {item?.anahtarKelime}
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
};
export default Keywords;
