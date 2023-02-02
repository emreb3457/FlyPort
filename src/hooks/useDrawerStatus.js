import { useState } from "react";

export const useDrawerStatus = () => {
  const [isClick, setClick] = useState(null);
  const [toggle, setToggle] = useState(false);

  const clickFunct = () => {
    setToggle(!toggle);
    setClick(toggle);
  };

  return {
    clickFunct,
    isClick,
  };
};
