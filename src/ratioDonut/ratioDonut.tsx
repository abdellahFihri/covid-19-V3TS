import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectRadarData,
  selectWorldRow,
} from "../redux/reducers/worldDataSelector";
// import Donut from "../chart/donut";
import Infos from "../infos/infos";
import style from "./ratioDonut.module.scss";
import DonutChart from "../chart/pieChart/pieChart";

interface Props {
  worldRow: any;
  radarData: any;
}

const Ratio = (props: Props): JSX.Element => {
  const { worldRow, radarData } = props;
  return (
    <div className={style.ration}>
      <DonutChart data={radarData} title="title" />
      <Infos info1={worldRow.critical} info2={worldRow.active_cases} />
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  worldRow: selectWorldRow,
  radarData: selectRadarData,
});

export default connect(mapStateToProps)(Ratio);
