import { useState } from "react";

export const useModalStatus = () => {
  const [isClick, setClick] = useState(null);
  const [toggle, setToggle] = useState(false);

  const clickfunt = () => {
    setToggle(!toggle);
    setClick(toggle);
  };

  return {
    clickfunt,
    isClick,
  };
};
