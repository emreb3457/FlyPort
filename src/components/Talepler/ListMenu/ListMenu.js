import { Box, Button, Text } from "@chakra-ui/react"
import { useState } from "react";
import { Link } from "react-router-dom";
import { menuItems } from "../../../constants/MenuItems";
import ListMenuItem from "./ListMenuItem";
const ListMenu = ({ children }) => {
    const [tab, setTab] = useState();
    const [tab2, setTab2] = useState();
    const [tab3, setTab3] = useState();
    const [tab4, setTab4] = useState();
    const [tab5, setTab5] = useState();
    const [tab6, setTab6] = useState();
    const [tab7, setTab7] = useState();
    return (
        <Box >
            <Box textAlign={"center"} fontSize="33px" p="17px" bg={"blue"}>{tab?.title && tab.title + " >>"}{tab2?.title && tab2.title + " >>"}{tab3?.title && tab3.title + " >>"}{tab4?.title && tab4.title + " >>"}{tab5?.title && tab5.title + " >>"}{tab6?.title && tab6.title + ">>"}</Box>
            <Box display={"flex"}>
                <ListMenuItem
                    items={menuItems}
                    display={window.location.pathname == "/" ? "none" : "inline-block"}
                    maxWidth={{ base: "200px", sm: "200px", md: "250px", lg: "250px", "2xl": "320px" }}
                    pr="20px"
                    w="100%"
                    minW="200px"
                    h="120vh"
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
                <Box w="100%">
                    {children}
                </Box>
            </Box>

        </Box>
    )
}
export default ListMenu