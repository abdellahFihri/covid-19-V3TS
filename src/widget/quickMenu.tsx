import React, { useState } from "react";

import style from "./quickMenu.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";

const QuickMenu = (props: any) => {
  const [top, setTop] = useState(0);
  window.onscroll = function () {
    setTop(window.scrollY);
  };

  return (
    <div
      className={top >= 100 ? style.menu : style.hide}
      onClick={() => props.executeScroll()}
    >
      <FontAwesomeIcon icon={faAngleDoubleUp} size="2x" />
    </div>
  );
};
export default QuickMenu;
