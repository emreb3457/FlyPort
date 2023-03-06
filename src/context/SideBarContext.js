import React, { createContext, useContext, useReducer } from "react";

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
  id: "",
};

export const SideBarIdContext = createContext({});

export function SideBarIdContextProvider(props) {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const { id } = state;

  const updateId = (payload) =>
    dispatch({
      type: UPDATE,
      payload,
    });

  return (
    <SideBarIdContext.Provider
      value={{
        id,
        updateId,
      }}
    >
      {props.children}
    </SideBarIdContext.Provider>
  );
}

export const useSideBarData = () => useContext(SideBarIdContext);
