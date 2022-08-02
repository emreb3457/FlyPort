import { Box, Button, Text, Link as CLink } from "@chakra-ui/react"
import { Fragment, useState } from "react";
import { Link as RLink } from "react-router-dom";
import { menuItems } from "../../constants/MenuItems";
import colors from "../../theme/colors";

const ListMenuItem = ({ items, ...props }) => {
    const [tab, setTab] = useState(null)
    const [tab2, setTab2] = useState(null)
    const [tab3, setTab3] = useState(null)
    const [tab4, setTab4] = useState(null)
    const [tab5, setTab5] = useState(null)
    const [tab6, setTab6] = useState(null)

    const close1 = () => {
        setTab(null);
        setTab2(null);
        setTab3(null);
        setTab4(null);
        setTab5(null);
        setTab6(null);
    }

    const close2 = () => {
        setTab2(null);
        setTab3(null);
        setTab4(null);
        setTab5(null);
        setTab6(null);
    }

    const close3 = () => {
        setTab3(null);
        setTab4(null);
        setTab5(null);
        setTab6(null);
    }

    const close4 = () => {
        setTab4(null);
        setTab5(null);
        setTab6(null);
    }
    const close5 = () => {
        setTab5(null);
        setTab6(null);
    }
    return (
        <Fragment>
            <Box textAlign={"center"} fontSize="33px" p="17px" bg={"blue"}>{tab && tab + " >>"}{tab2 && tab2 + " >>"}{tab3 && tab3 + " >>"}{tab4 && tab4 + " >>"}{tab5 && tab5 + " >>"}{tab6 && tab6 + ">>"}</Box>

            <Box bg={colors.darkblue} {...props}>
                <ul style={{marginTop:"50px"}}>
                    {items.map((menu, index) => {
                        return (
                            <li className="menuItem" key={index} style={{ marginLeft: "12px" }}>
                                <CLink as={RLink} color={tab == menu.title ? colors.yellow : "white"} onClick={() => tab == menu.title ? close1() : setTab(menu.title)} to={`${menu.route}`}>{menu.title}</CLink >
                                {tab == menu.title &&
                                    <ul>
                                        {menu.submenu?.map((sub1, index) => {
                                            return (
                                                <li key={index}>
                                                    <CLink as={RLink} color={tab2 == sub1.title ? colors.yellow : "white"} onClick={() => tab2 == sub1.title ? close2() : setTab2(sub1.title)} to={`${menu.route}${sub1.route}`} style={{ marginLeft: "15px" }}>{sub1.title}</CLink >
                                                    {tab2 == sub1.title &&
                                                        <ul>
                                                            {sub1.submenu?.map((sub2, index) => {
                                                                return (
                                                                    <li key={index}>
                                                                        <CLink as={RLink} color={tab3 == sub2.title ? colors.yellow : "white"} onClick={() => tab3 == sub2.title ? close3() : setTab3(sub2.title)} to={`${menu.route}${sub1.route}${sub2.route}`} style={{ marginLeft: "30px" }}>{sub2.title}</CLink >
                                                                        {tab3 == sub2.title &&
                                                                            <ul>
                                                                                {sub2.submenu?.map((sub3, index) => {
                                                                                    return (
                                                                                        <li key={index}>
                                                                                            <CLink as={RLink} color={tab4 == sub3.title ? colors.yellow : "white"} onClick={() => tab4 == sub3.title ? close4() : setTab4(sub3.title)} to={`${menu.route}${sub1.route}${sub2.route}${sub3.route}`} style={{ marginLeft: "45px" }}>{sub3.title}</CLink >
                                                                                            {tab4 == sub3.title &&
                                                                                                <ul>
                                                                                                    {sub3.submenu?.map((sub4, index) => {
                                                                                                        return (
                                                                                                            <li key={index}>
                                                                                                                <CLink as={RLink} color={tab5 == sub4.title ? colors.yellow : "white"} onClick={() => tab5 == sub4.title ? close5() : setTab5(sub4.title)} to={`${menu.route}${sub1.route}${sub2.route}${sub3.route}${sub4.route}`} style={{ marginLeft: "60px" }}>{sub4.title}</CLink >
                                                                                                                {tab5 == sub4.title &&
                                                                                                                    <ul>
                                                                                                                        {sub4.submenu?.map((sub5, index) => {
                                                                                                                            return (
                                                                                                                                <li key={index}>
                                                                                                                                    <CLink as={RLink} color={tab6 == sub5.title ? colors.yellow : "white"} onClick={() => tab6 == sub5.title ? setTab6(null) : setTab6(sub5.title)} to={`${menu.route}${sub1.route}${sub2.route}${sub3.route}${sub4.route}${sub5.route}`} style={{ marginLeft: "75px" }}>{sub5.title}</CLink >
                                                                                                                                </li>
                                                                                                                            );
                                                                                                                        })}
                                                                                                                    </ul>
                                                                                                                }
                                                                                                            </li>
                                                                                                        );
                                                                                                    })}
                                                                                                </ul>
                                                                                            }
                                                                                        </li>
                                                                                    );
                                                                                })}
                                                                            </ul>
                                                                        }
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    }
                                                </li>
                                            );
                                        })}
                                    </ul>
                                }
                            </li>
                        );
                    })}
                </ul>
            </Box>
        </Fragment>
    )
}
export default ListMenuItem
