import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import StatsCard from "../hoc/statsCard/card";
import style from "./countersFragment.module.scss";
import TinyBar from "../chart/barCharts/barChart/tinyBarChart";
import TinyLine from "../chart/barCharts/lineChart/tinyLineChart";
import TinyArea from "../chart/barCharts/areaChart/tinyAreaChart";

import _ from "lodash";

interface Props {
  world: any;
}
const CountersFragment = (props: Props) => {
  const { statsCards, worldRow, worldHistory } = props.world.world;
  let shortHistory = _.takeRight(worldHistory, 30);
  // const [val, setVal] = useState(statsCards);
  // const [world, setWorld] = useState(worldRow);
  // const [tinyChart, setTinyChart] = useState(shortHistory);

  console.log("top nav rerendered ");
  return (
    <div className={`col-lg-12 ${style.counters}`}>
      {[
        // { title: "New cases", i: 1 },
        {
          title: "New cases",
          i: statsCards.total_cases,
          y: worldRow.total_cases,
          chart: <TinyBar data={shortHistory} />,
        },
        {
          title: "New deaths",
          i: statsCards.deaths,
          y: worldRow.deaths,
          chart: <TinyArea data={shortHistory} />,
        },
        // { title: "Total Deaths", i: 3 },
        // { title: "Total Recovered", i: 5 },
        {
          title: "New active cases",
          i: statsCards.active_cases,
          y: worldRow.active_cases,
          chart: <TinyLine data={shortHistory} />,
        },
        {
          title: "Total cases",
          i: worldRow.total_cases,
          y: statsCards.total_cases,
        },
      ].map((card) => (
        <StatsCard
          key={Math.random()}
          colSize={3}
          title={card.title}
          end={card.i}
          new={card.y}
          chart={card.chart}
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

export default connect(mapStateToProps)(CountersFragment);
