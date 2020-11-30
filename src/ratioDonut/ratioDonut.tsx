import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectRadarData,
  selectSelectedCountry,
  selectWorldRow,
} from "../redux/reducers/world/worldDataSelector";

import Infos from "../infos/infos";
import style from "./ratioDonut.module.scss";
import DonutChart from "../chart/pieChart/pieChart";

interface Props {
  worldRow: any;
  radarData: any;
  country: string;
}

const Ratio = (props: Props): JSX.Element => {
  const { worldRow, radarData, country } = props;
  return (
    <div className={style.ration}>
      <DonutChart
        data={radarData}
        title={`Death & recovery ration in ${country}`}
      />
      <Infos info1={worldRow.critical} info2={worldRow.active_cases} />
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  worldRow: selectWorldRow,
  radarData: selectRadarData,
  country: selectSelectedCountry,
});

export default connect(mapStateToProps)(Ratio);
