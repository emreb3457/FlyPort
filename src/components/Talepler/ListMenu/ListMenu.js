import { Box } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSideBarData } from "../../../context/SideBarContext";
import colors from "../../../theme/colors";
import ListMenuItem from "./ListMenuItem";

const ListMenu = ({ children }) => {
  const location = useLocation();

  return (
    <Box>
      <Box textAlign={"center"} fontSize="33px" p="6px" bg={"blue"}></Box>
      <Box height={"100vh"} display={"flex"}>
        <ListMenuItem
          display={location.pathname === "/" ? "none" : "inline-block"}
          bg={colors.darkblue}
          maxWidth={{
            base: "140px",
            md: "190px",
            lg: "190px",
            "2xl": "210px",
          }}
          pr="20px"
          w="100%"
          minW="200px"
          minH="100vh"
        />

        <Box w={"calc(100vw - 200px)"} overflow="auto">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
export default ListMenu;
