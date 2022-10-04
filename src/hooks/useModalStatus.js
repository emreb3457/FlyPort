import { useState } from "react";

export const useModalStatus = () => {
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
