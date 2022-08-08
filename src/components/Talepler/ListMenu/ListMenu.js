import { Box, Button, Text } from "@chakra-ui/react"
import { useState } from "react";
import { Link } from "react-router-dom";
import { menuItems } from "../../../constants/MenuItems";
import ListMenuItem from "./ListMenuItem";
const ListMenu = ({ children }) => {

    return (
        <Box >
            <ListMenuItem items={menuItems} display="inline-block" maxWidth={{ base: "120px", sm: "200px", md: "250px", lg: "300px", "2xl": "320px" }} w="100%" h="120vh" />
            <Box display={"inline-block"} px={"38px"} position="absolute" w="77%">
                {children}
            </Box>
        </Box>
    )
}
export default ListMenu