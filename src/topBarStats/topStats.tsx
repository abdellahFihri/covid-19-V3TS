import React from "react";
import { connect } from "react-redux";
import StatsCard from "../hoc/statsCard/card";
import style from "./topStats.module.scss";
interface Props {
  world: any;
}

const TopBarStats = (props: Props) => {
  const { statsCards } = props.world.world;
  return (
    <div className={style.statsBar}>
      {[
        // { title: "New cases", i: 1 },
        { title: "New cases", i: 1 },
        { title: "New deaths", i: 4 },
        // { title: "Total Deaths", i: 3 },
        // { title: "Total Recovered", i: 5 },
        { title: "Active cases", i: 2 },
        { title: "Total cases", i: 0 },
      ].map((card) => (
        <StatsCard
          key={card.i}
          colSize={3}
          title={card.title}
          end={statsCards[card.i]}
        />
      ))}
    </div>
  );
};
const mapStateToProps = (state: any) => {
  return {
    world: state.world,
  };
};

export default connect(mapStateToProps)(TopBarStats);
