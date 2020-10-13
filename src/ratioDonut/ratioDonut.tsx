import React from "react";
import { connect } from "react-redux";
import Donut from "../chart/donut";
import Infos from "../infos/infos";
import style from "./ratioDonut.module.scss";

interface Props {
  world: any;
}

const Ratio = (props: Props): JSX.Element => {
  const { statsCards } = props.world.world;
  return (
    <div className={style.ration}>
      <Donut />
      <Infos
        info1={
          statsCards[6] < statsCards[2] ? statsCards[6] : Number(statsCards[2])
        }
        info2={statsCards[7]}
        info3={statsCards[4]}
      />
    </div>
  );
};
const mapStateToProps = (state: any) => {
  return {
    world: state.world,
  };
};
export default connect(mapStateToProps)(Ratio);
