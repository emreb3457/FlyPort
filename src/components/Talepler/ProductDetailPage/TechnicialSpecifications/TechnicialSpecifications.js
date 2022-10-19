import { Flex, Box } from "@chakra-ui/react";
import { TextInput } from "../../../Inputs/CustomInputs";
export const TechnicialSpecifications = ({ detail }) => {
  return (
    <Flex flexDir={"column"}>
      {detail?.nitelikler?.map((data, index) => {
        const label = detail?.nitelikDegerleri.find(
          (y) => y.nitelikId === data.id
        );
        return (
          <Box key={index} display={"flex"}>
            <TextInput
              disabled={true}
              mr="10px"
              value={detail?.nitelikler[index].ad}
            >
              Teknik Özellik {index + 1}
            </TextInput>
            <TextInput disabled={true} mr="10px" value={label.ad} />
          </Box>
        );
      })}
    </Flex>
  );
};
