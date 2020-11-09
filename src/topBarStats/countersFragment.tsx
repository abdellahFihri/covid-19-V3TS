import React from "react";
import { connect } from "react-redux";
import StatsCard from "../hoc/statsCard/card";
import { createStructuredSelector } from "reselect";
import { selectStatsCards } from "../redux/reducers/worldDataSelector";
import { selectWorldRow } from "../redux/reducers/worldDataSelector";
import { selectMonth } from "../redux/reducers/mainChartHistorySelector";
import style from "./countersFragment.module.scss";
// import TinyBar from "../chart/barCharts/barChart/tinyBarChart";
import TinyLine from "../chart/barCharts/lineChart/tinyLineChart";
// import TinyArea from "../chart/barCharts/areaChart/tinyAreaChart";
import { extractDifferences } from "../utils/utilities/helpers";
import _ from "lodash";

interface Props {
  world: any;
  history: any;
  statsCards:any;
  worldRow: any;
  month: any;
}
const CountersFragment = (props: Props) => {
  const { statsCards, worldRow, month } = props;
  // const { year } = props.history;
  console.log("PROPS", props);
  let shortHistory = _.takeRight(month, 16);

  // const [val, setVal] = useState(statsCards);
  // const [world, setWorld] = useState(worldRow);

  return (
    <div className={`col-lg-12 ${style.counters}`}>
      <div className="row">
        {[
          // { title: "New cases", i: 1 },
          {
            title: "New cases",
            i: statsCards.total_cases,
            y: worldRow.total_cases,
            chart: (
              <TinyLine
                history={extractDifferences(
                  _.reverse(shortHistory),
                  "total_cases"
                )}
                keyData="total_cases"
                filling="#8884d8"
                sync=''
                XaxisHide={true}
                height={60}
              />
            ),
          },
          {
            title: "New deaths",
            i: statsCards.deaths,
            y: worldRow.deaths,
            chart: (
              <TinyLine
                history={extractDifferences(shortHistory, "deaths")}
                keyData="deaths"
                filling="#b72429"
                sync=''
                XaxisHide={true}
                height={60}
              />
            ),
          },
          // { title: "Total Deaths", i: 3 },
          // { title: "Total Recovered", i: 5 },
          {
            title: "New recovered",
            i: statsCards.recovered,
            y: worldRow.recovered,
            chart: (
              <TinyLine
                history={extractDifferences(shortHistory, "recovered")}
                keyData="recovered"
                filling="#28a745"
                sync=''
                XaxisHide={true}
                height={60}
              />
            ),
          },
          {
            title: "Total cases",
            i: worldRow.total_cases,
            y: statsCards.total_cases,
            chart: (
              <TinyLine history={_.drop(_.reverse(shortHistory),2)} keyData="total_cases"   filling="#8884d8"
                sync=''
                XaxisHide={true}
                height={60}/>
            ),
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
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  //using selectors prevents component from rerendering if the data is unchanged

  statsCards: selectStatsCards,
  worldRow: selectWorldRow,
  month:selectMonth
  
});


export default connect(mapStateToProps)(CountersFragment);
