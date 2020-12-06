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
    <div className={top >= 100 ? style.menu : style.hide}>
      <FontAwesomeIcon
        icon={faAngleDoubleUp}
        size="2x"
        onClick={() => props.executeScroll()}
      />
    </div>
  );
};
export default QuickMenu;
