import React, { useState } from "react";

import style from "./mainPageSpeedDial.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faAngleDoubleUp,
  faList,
  faChartPie,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

const MainPageSpeedDial = ({ scroll }: any) => {
  const [extendMenu, setExtendMenu] = useState("none");
  function toggleExtend() {
    setExtendMenu(`${extendMenu === "open" ? "close" : "open"}`);
  }

  return (
    <div
      className={style.container}
      onMouseLeave={() => setExtendMenu("close")}
    >
      <div
        className={
          extendMenu === "open" ? style.speedDialOpen : style.speedDial
        }
        onClick={toggleExtend}
      >
        <FontAwesomeIcon icon={faPlus} size="1x" />
      </div>
      <span className={style[`${extendMenu}`]}>
        {[
          { i: faAngleDoubleUp, shortCut: "toTop" },
          { i: faList, shortCut: "toList" },
          { i: faChartPie, shortCut: "toRatio" },
          { i: faChartLine, shortCut: "toMainChart" },
        ].map((btn: { [key: string]: any }) => (
          <div onClick={() => scroll(btn.shortCut)} key={btn.shortCut}>
            {" "}
            <FontAwesomeIcon icon={btn.i} size="2x" />
          </div>
        ))}
      </span>
    </div>
  );
};
export default MainPageSpeedDial;
