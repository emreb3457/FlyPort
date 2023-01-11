import { Box } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { DemandMenu, menuItems } from "../../../constants/MenuItems";
import ListMenuItem from "./ListMenuItem";
const ListMenu = ({ children }) => {
  const MenuNames = {
    Home: "home",
    Demand: "demand",
    Cost: "cost",
    Offer: "offer",
  };

  const [tab, setTab] = useState();
  const [tab2, setTab2] = useState();
  const [tab3, setTab3] = useState();
  const [tab4, setTab4] = useState();
  const [tab5, setTab5] = useState();
  const [tab6, setTab6] = useState();
  const [tab7, setTab7] = useState();
  const [selectMenu, setMenuItems] = useState(MenuNames.Home);
  const location = useLocation();
  useMemo(() => {
    location.pathname.split("/").includes("gorevler") &&
      setMenuItems(MenuNames.Demand);
    location.pathname.split("/").includes("maliyetler") &&
      setMenuItems(MenuNames.Cost);
    location.pathname.split("/").includes("teklif") &&
      setMenuItems(MenuNames.Offer);
  }, [location.pathname]);

  const visableMenuItems = useMemo(() => {
    switch (selectMenu) {
      case MenuNames.Offer:
        return DemandMenu(location?.state || location.pathname.split("/")[2]);
      case MenuNames.Cost:
        return DemandMenu(location?.state || location.pathname.split("/")[2]);
      case MenuNames.Demand:
        return DemandMenu(location?.state || location.pathname.split("/")[2]);

      default:
        return menuItems;
    }
  }, [selectMenu]);
  return (
    <Box>
      <Box textAlign={"center"} fontSize="33px" p="17px" bg={"blue"}>
        {tab?.title && tab.title + " >>"}
        {tab2?.title && tab2.title + " >>"}
        {tab3?.title && tab3.title + " >>"}
        {tab4?.title && tab4.title + " >>"}
        {tab5?.title && tab5.title + " >>"}
        {tab6?.title && tab6.title + ">>"}
      </Box>
      <Box height={"100vh"} display={"flex"}>
        <ListMenuItem
          items={visableMenuItems}
          display={location.pathname === "/" ? "none" : "inline-block"}
          maxWidth={{
            base: "200px",
            sm: "200px",
            md: "250px",
            lg: "250px",
            "2xl": "320px",
          }}
          pr="20px"
          w="100%"
          minW="200px"
          minH="100vh"
          tab={tab}
          tab2={tab2}
          tab3={tab3}
          tab4={tab4}
          tab5={tab5}
          tab6={tab6}
          tab7={tab7}
          setTab={setTab}
          setTab2={setTab2}
          setTab3={setTab3}
          setTab4={setTab4}
          setTab5={setTab5}
          setTab6={setTab6}
          setTab7={setTab7}
        />

        <Box w={"calc(100vw - 240px)"}>{children}</Box>
      </Box>
    </Box>
  );
};
export default ListMenu;
