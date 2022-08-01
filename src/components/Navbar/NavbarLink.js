// import React from 'react';
// import { Link as CLink } from '@chakra-ui/layout';
// import { Link as RLink } from 'react-router-dom';
// import colors from '../../theme/colors';
// import { fontSizes } from '../../theme/style';

// const NavbarLink = ({ to = '', children = '', selected, ...props }) => {
//     return (
//         <CLink
//             color={selected ? colors.primery : colors.secondary}
//             fontSize={fontSizes.medium}
//             as={RLink}
//             to={to}
//             fontWeight="400"
//             marginX={'16px'}
//             pb="6px"
//             textTransform="capitalize"
//             borderBottom={selected && "2px solid #45D9FC"}
//             _hover={{
//                 textDecor: "none"
//             }}
//             {...props}
//         >
//             {children}
//         </CLink>
//     );
// };

// export default NavbarLink;