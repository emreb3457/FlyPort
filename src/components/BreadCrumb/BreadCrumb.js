import { Box, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import colors from "../../theme/colors";

const BreadCrumb = ({ children, funct1, funct2, funct3, loading }) => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      justifyContent={"space-between"}
      w="100%"
      h="71px"
      bg={colors.darkyellow}
      alignItems="center"
      px="30px"
      mb="40px"
    >
      <Box
        display={"flex"}
        alignItems="baseline"
        onClick={() => navigate(-1)}
        cursor="pointer"
      >
        <Text fontWeight={"bold"} fontSize="33px">
          ←
        </Text>
        <Text fontWeight={"bold"} fontSize="25px">
          Geri Dön
        </Text>
      </Box>
      <Text fontWeight={"bold"} fontSize="33px">
        {children}
      </Text>
      <Box>
        {funct1 && (
          <StyledButton loading={loading} funct={funct1?.function}>
            {funct1?.title}
          </StyledButton>
        )}
        {funct2 && (
          <StyledButton loading={loading} funct={funct2?.function}>
            {funct2?.title}
          </StyledButton>
        )}
        {funct3 && (
          <StyledButton loading={loading} funct={funct3?.function}>
            {funct3?.title}
          </StyledButton>
        )}
      </Box>
    </Box>
  );
};
export const StyledButton = ({ children, funct, loading, ...props }) => {
  return (
    <Button
      onClick={funct}
      bg="transparent"
      fontSize={"22px"}
      isLoading={loading}
      _hover={{}}
      {...props}
    >
      {children}
    </Button>
  );
};
export default BreadCrumb;
