import { Box, Text, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertModal from "../../helpers/AlertModal";
import colors from "../../theme/colors";

const BreadCrumb = ({
  children,
  funct,
  funct1,
  funct2,
  funct3,
  loading,
  selectValue,
  ...props
}) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    Object.keys(selectValue).length > 0 && setVisible(true);
  }, [selectValue]);
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
      {...props}
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
        {funct && (
          <StyledButton loading={loading} funct={funct?.function}>
            {funct?.title}
          </StyledButton>
        )}
        {funct1 && (
          <StyledButton loading={loading} funct={funct1?.function}>
            {funct1?.title}
          </StyledButton>
        )}
        {visible && funct2 && (
          <StyledButton loading={loading} funct={funct2?.function}>
            {funct2?.title}
          </StyledButton>
        )}
        {visible && funct3 && <AlertModal removeFunction={funct3.function} />}
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
