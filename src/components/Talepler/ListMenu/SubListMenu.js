import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import colors from "../../../theme/colors";

const SubListMenu = ({ k, item, currentPath, isActive }) => {
  const [activeTab, setActiveTab] = useState(!!isActive);

  return (
    <>
      <Box cursor={"pointer"} onClick={() => setActiveTab((prev) => !prev)}>
        <Text fontSize={"20px"} color={isActive ? colors.yellow : "white"}>
          {item.name}
        </Text>
      </Box>
      <Box pl="10px" display={activeTab ? "block" : "none"}>
        <ul>
          {item.children?.map((childrenItem) => {
            const { name, path, key } = childrenItem;
            const isActive = currentPath?.includes(path);

            return (
              <li key={key}>
                {path && (
                  <Link to={path}>
                    <Text
                      fontSize={"20px"}
                      color={isActive ? colors.yellow : "white"}
                    >
                      {name}
                    </Text>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </Box>
    </>
  );
};

export default SubListMenu;
