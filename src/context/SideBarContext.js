import React, { createContext, useContext, useReducer, useState } from "react";
import { menuItems } from "../constants/MenuItems";

const UPDATE = "UPDATE";

const Reducer = (state, action) => {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const initialState = {
  selectedSideBar: menuItems,
};

export const SideBarContext = createContext({});

export function SideBarContextProvider(props) {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const { selectedSideBar } = state;

  const updateSideBar = (payload) =>
    dispatch({
      type: UPDATE,
      payload,
    });

  return (
    <SideBarContext.Provider
      value={{
        selectedSideBar,
        updateSideBar,
      }}
    >
      {props.children}
    </SideBarContext.Provider>
  );
}

export const useSideBarData = () => useContext(SideBarContext);
