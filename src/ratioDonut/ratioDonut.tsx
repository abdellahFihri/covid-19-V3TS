import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {selectWorldRow} from "../redux/reducers/worldDataSelector"
import Donut from "../chart/donut";
import Infos from "../infos/infos";
import style from "./ratioDonut.module.scss";

interface Props {
  worldRow: any;
}

const Ratio = (props: Props): JSX.Element => {
  const { worldRow } = props
  return (
    <div className={style.ration}>
      <Donut />
      <Infos info1={worldRow.critical} info2={worldRow.active_cases} />
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  worldRow:selectWorldRow
})

export default connect(mapStateToProps)(Ratio);
