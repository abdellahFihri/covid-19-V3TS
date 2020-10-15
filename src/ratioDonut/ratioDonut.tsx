import React from "react";
import { connect } from "react-redux";
import Donut from "../chart/donut";
import Infos from "../infos/infos";
import style from "./ratioDonut.module.scss";

interface Props {
  world: any;
}

const Ratio = (props: Props): JSX.Element => {
  const { worldRow } = props.world.world;
  return (
    <div className={style.ration}>
      <Donut />
      <Infos info1={worldRow.critical} info2={worldRow.tested} />
    </div>
  );
};
const mapStateToProps = (state: any) => {
  return {
    world: state.world,
  };
};
export default connect(mapStateToProps)(Ratio);
