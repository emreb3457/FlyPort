import { Box } from "@chakra-ui/react";
import colors from "../theme/colors";
import { StyledButton } from "./BreadCrumb/BreadCrumb";

const TabMenu = ({ tabs, onClick, children, activeTab, visible }) => {
  return (
    <Box display={"flex"} flexDirection="column" pl={{ sm: "71px" }}>
      <Box borderBottom={"1px solid black"} display={visible && "none"}>
        {tabs?.map((tab, index) => (
          <StyledButton
            key={index}
            onClick={() => index !== activeTab && onClick(tab)}
            fontSize="22px"
            color={index === activeTab ? colors.lightdarkblue : colors.gray}
          >
            {tab.title}
          </StyledButton>
        ))}
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};
export default TabMenu;
