import React from "react";

import CountersFragment from "./countersFragment";
import style from "./topStats.module.scss";

const TopBarStats = ({ children }: any) => {
  console.log("top nav rerendered ");
  return (
    <div className={style.statsBar}>
      <CountersFragment>{children}</CountersFragment>
    </div>
  );
};

export default TopBarStats;
