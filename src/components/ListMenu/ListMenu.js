import { Box, Button, Text } from "@chakra-ui/react"
import { useState } from "react";
import { Link } from "react-router-dom";
import { menuItems } from "../../constants/MenuItems";
import colors from "../../theme/colors";
import ListMenuItem from "./ListMenuItem";
const ListMenu = ({ children }) => {

    return (
        <Box >
            <ListMenuItem items={menuItems} display="inline-block" maxWidth="322px" minWidth="322px" h="100vh" />
            <Box display={"inline-block"} px={"38px"}>
                {children}
            </Box>
        </Box>
    )
}
export default ListMenu