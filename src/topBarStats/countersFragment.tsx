import React from "react";
import { connect } from "react-redux";
import StatsCard from "../hoc/statsCard/card";
import { createStructuredSelector } from "reselect";
import { selectStatsCards } from "../redux/reducers/world/worldDataSelector";
import { selectWorldRow } from "../redux/reducers/world/worldDataSelector";
import { selectMonth } from "../redux/reducers/mainChart/mainChartHistorySelector";
import style from "./countersFragment.module.scss";

import TinyLine from "../chart/barCharts/lineChart/tinyLineChart";

import { extractDifferences } from "../utils/utilities/helpers";
import _ from "lodash";
type data = { [key: string]: number | string | null }[];
interface Props {
  world: data;
  history: data;
  statsCards: any;
  worldRow: any;
  month: data;
}
const CountersFragment: React.FunctionComponent<Props> = (props) => {
  const { statsCards, worldRow, month } = props;

  let shortHistory = _.takeRight(month, 15);

  return (
    <div className={`col-lg-12 ${style.counters}`}>
      <div className="row">
        {[
          {
            title: "New cases",
            i: statsCards.total_cases,
            y: worldRow.total_cases,
            delay: 0,
            chart: (
              <TinyLine
                history={extractDifferences(
                  _.reverse(shortHistory),
                  "total_cases"
                )}
                keyData="total_cases"
                filling="#8884d8"
                sync=""
                XaxisHide={true}
                height={100}
              />
            ),
          },
          {
            title: "New deaths",
            i: statsCards.deaths,
            y: worldRow.deaths,
            delay: 0.5,
            chart: (
              <TinyLine
                history={extractDifferences(shortHistory, "deaths")}
                keyData="deaths"
                filling="#b72429"
                sync=""
                XaxisHide={true}
                height={100}
              />
            ),
          },

          {
            title: "New recovered",
            i: statsCards.recovered,
            y: worldRow.recovered,
            delay: 1,
            chart: (
              <TinyLine
                history={extractDifferences(shortHistory, "recovered")}
                keyData="recovered"
                filling="#28a745"
                sync=""
                XaxisHide={true}
                height={100}
              />
            ),
          },
          {
            title: "Total cases",
            i: worldRow.total_cases,
            y: statsCards.total_cases,
            delay: 1.5,
            chart: (
              <TinyLine
                history={_.drop(_.reverse(shortHistory), 2)}
                keyData="total_cases"
                filling="#8884d8"
                sync=""
                XaxisHide={true}
                height={100}
              />
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
            delay={card.delay}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  statsCards: selectStatsCards,
  worldRow: selectWorldRow,
  month: selectMonth,
});

export default connect(mapStateToProps)(CountersFragment);
