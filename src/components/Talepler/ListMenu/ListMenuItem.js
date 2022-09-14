import { Box, Button, Text, Link as CLink } from "@chakra-ui/react"
import { Fragment, useEffect, useState } from "react";
import { Link as RLink } from "react-router-dom";
import { menuItems } from "../../../constants/MenuItems";
import colors from "../../../theme/colors";

const ListMenuItem =
    ({ items,
        tab,
        tab2,
        tab3,
        tab4,
        tab5,
        tab6,
        tab7,
        setTab,
        setTab2,
        setTab3,
        setTab4,
        setTab5,
        setTab6,
        setTab7,
        ...props
    }) => {
        const path = window.location.pathname.split("/");

        useEffect(() => {

            //Sayfayı yenilediğimizde seçili alanların kaybolmaması için
            setTab(menuItems.find(x =>
                x.route == path[1]
            ))
            let Tab = menuItems.find(x => x.route == path[1])
            setTab2(
                Tab?.submenu?.filter(x => x.route == path[2])[0]
            )

            let Tab2 = Tab?.submenu?.filter(x => x.route == path[2])[0]
            setTab3(
                Tab2?.submenu?.filter(x => x.route == path[3])[0]
            )
            
            let Tab3 = Tab2?.submenu?.filter(x => x.route == path[3])[0]
            setTab4(
                Tab3?.submenu?.filter(x => x.route == path[4])[0]
            )

            let Tab4 = Tab3?.submenu?.filter(x => x.route == path[4])[0]
            setTab5(
                Tab4?.submenu?.filter(x => x.route == path[5])[0]
            )
            let Tab5 = Tab4?.submenu?.filter(x => x.route == path[5])[0]
            setTab6(
                Tab5?.submenu?.filter(x => x.route == path[6])[0]
            )

        }, [])

        tab?.submenu?.filter(x =>
            x.route == path[2] && setTab2[x]
        )
        tab2?.submenu?.filter(x =>
            x.route == path[3] && setTab3[x]
        )
        tab3?.submenu?.filter(x =>
            x.route == path[4] && setTab4[x]
        )
        tab4?.submenu?.filter(x =>
            x.route == path[5] && setTab5[x]
        )
        tab5?.submenu?.filter(x =>
            x.route == path[6] && setTab6[x]
        )
        tab6?.submenu?.filter(x =>
            x.route == path[7] && setTab7[x]
        )
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


                <Box bg={colors.darkblue} {...props}>
                    <ul style={{ marginTop: "50px" }}>
                        {items.map((menu, index) => {
                            return (
                                <li className="menuItem" key={index} style={{ marginLeft: "12px" }}>
                                    <CLink as={RLink} color={tab?.route == menu.route ? colors.yellow : "white"} onClick={() => tab?.route == menu.route ? close1() : setTab(menu)} to={`/${menu.route}`}>{menu.title}</CLink >
                                    {tab?.title == menu.title &&
                                        <ul>
                                            {menu.submenu?.map((sub1, index) => {
                                                return (
                                                    <li key={index}>
                                                        <CLink as={RLink} color={tab2?.route == sub1.route ? colors.yellow : "white"} onClick={() => tab2?.route == sub1.route ? close2() : setTab2(sub1)} to={`/${menu.route}/${sub1.route}`} style={{ marginLeft: "15px" }}>{sub1.title}</CLink >
                                                        {tab2?.route == sub1.route &&
                                                            <ul>
                                                                {sub1.submenu?.map((sub2, index) => {
                                                                    return (
                                                                        <li key={index}>
                                                                            <CLink as={RLink} color={tab3?.route == sub2?.route ? colors.yellow : "white"} onClick={() => tab3?.route == sub2.route ? close3() : setTab3(sub2)} to={`/${menu.route}/${sub1.route}/${sub2.route}`} style={{ marginLeft: "30px" }}>{sub2.title}</CLink >
                                                                            {tab3?.route == sub2.route &&
                                                                                <ul>
                                                                                    {sub2.submenu?.map((sub3, index) => {
                                                                                        return (
                                                                                            <li key={index}>
                                                                                                <CLink as={RLink} color={tab4?.route == sub3.route ? colors.yellow : "white"} onClick={() => tab4?.route == sub3.route ? close4() : setTab4(sub3)} to={`/${menu.route}/${sub1.route}/${sub2.route}/${sub3.route}`} style={{ marginLeft: "45px" }}>{sub3.title}</CLink >
                                                                                                {tab4?.route == sub3.route &&
                                                                                                    <ul>
                                                                                                        {sub3.submenu?.map((sub4, index) => {
                                                                                                            return (
                                                                                                                <li key={index}>
                                                                                                                    <CLink as={RLink} color={tab5?.route == sub4.route ? colors.yellow : "white"} onClick={() => tab5?.route == sub4.route ? close5() : setTab5(sub4)} to={`/${menu.route}/${sub1.route}/${sub2.route}/${sub3.route}/${sub4.route}`} style={{ marginLeft: "60px" }}>{sub4.title}</CLink >
                                                                                                                    {tab5?.route == sub4.route &&
                                                                                                                        <ul>
                                                                                                                            {sub4.submenu?.map((sub5, index) => {
                                                                                                                                return (
                                                                                                                                    <li key={index}>
                                                                                                                                        <CLink as={RLink} color={tab6?.route == sub5.route ? colors.yellow : "white"} onClick={() => tab6?.route == sub5.route ? setTab6(null) : setTab6(sub5)} to={`/${menu.route}/${sub1.route}/${sub2.route}/${sub3.route}/${sub4.route}/${sub5.route}`} style={{ marginLeft: "75px" }}>{sub5.title}</CLink >
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
