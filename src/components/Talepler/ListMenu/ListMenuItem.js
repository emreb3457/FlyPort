import { Box, Button, Text, Link as CLink } from "@chakra-ui/react";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Link, Link as RLink, useLocation, useRoutes } from "react-router-dom";
import { PRODUCT_SIDEBAR, SIDEBAR } from "../../../constants/other";
import { useSideBarData } from "../../../context/SideBarContext";
import colors from "../../../theme/colors";
import SubListMenu from "./SubListMenu";

const ListMenuItem = ({ ...props }) => {
  const { pathname } = useLocation();
  const { id } = useSideBarData();

  const activeTab = useMemo(() => {
    if (pathname?.includes("urun-detay")) {
      return PRODUCT_SIDEBAR(id);
    } else {
      return SIDEBAR;
    }
  }, [pathname]);

  return (
    <Box pl="10px" {...props}>
      <ul>
        {activeTab.map((item, k) => {
          const { name, path, type, key } = item;
          console.log(path)
          const isActive = pathname?.includes(path);

          if (type === "submenu") {
            return (
              <SubListMenu
                key={k}
                item={item}
                currentPath={pathname}
                isActive={isActive}
              />
            );
          }
          return (
            <li key={key}>
              {path ? (
                <Link to={path}>
                  <Text
                    fontSize={"20px"}
                    color={isActive ? colors.yellow : "white"}
                  >
                    {name}
                  </Text>
                </Link>
              ) : (
                <>
                  <Text
                    fontSize={"20px"}
                    color={isActive ? colors.yellow : "white"}
                  >
                    {name}
                  </Text>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </Box>
  );
};
export default ListMenuItem;
