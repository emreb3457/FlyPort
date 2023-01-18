import { Flex, Box, Button, Text, Input } from "@chakra-ui/react";
import { useState } from "react";
import useSWR from "swr";
import { keywordInsert, keywordList } from "../../../../api/api";
import { sendRequest } from "../../../../utils/helpers";
const Keywords = ({ detail }) => {
  const [keyword, setKeyword] = useState("");

  const { data, error } = useSWR(["keywordList"], keywordList);
  const addKeyword = async () => {
    const { status } = await sendRequest(
      keywordInsert("", { urunId: detail.id, ad: keyword })
    );
  };
  console.log(data);
  return (
    <Box>
      <Flex w="40%" gap={"10px"} mt="30px">
        <Input onChange={(x) => setKeyword(x.target.value)} />
        <Button onClick={() => addKeyword()}>Ekle</Button>
      </Flex>

      <Flex mt="20px">
        <Box borderRadius={"20px"} border="1px solid grey" p="8px">
          Keyword
        </Box>
      </Flex>
    </Box>
  );
};
export default Keywords;
