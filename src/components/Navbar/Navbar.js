// import { Box, Button } from "@chakra-ui/react"
// import { useEffect, useState } from "react"
// import { pageWidth } from "../../theme/style"
// import NavbarLink from "./NavbarLink"

// const Navbar = () => {
//     const [select, setSelect] = useState(null);

//     useEffect(() => {
//         setSelect(window.location.pathname)
//     }, [])
//     const NavLink = [
//         {
//             name: "My MoonPets",
//             to: "/"
//         },
//         {
//             name: "Marketplace",
//             to: "/b"
//         }
//     ]
//     return (
//         <Box maxW={pageWidth} margin="auto" mb="31px" pt="20px">
//             <Box
//                 display="flex"
//                 flex="1"
//                 flexDirection="row"
//                 justifyContent="space-between"
//                 alignItems={{ base: "unset", md: "center" }}
//                 ml="460px"
//             >
//                 <Box>
//                     {NavLink.map((data,index) =>
//                         <NavbarLink key={index} onClick={() => setSelect(data.to)} selected={select == data.to && true} to={data.to}>{data.name}</NavbarLink>
//                     )}
//                 </Box>
//             </Box>
//         </Box>
//     )

// }
// export default Navbar