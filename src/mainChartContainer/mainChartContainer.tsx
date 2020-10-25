import React from "react";
import TryChart from "../chart/tryChart";
import TinyArea from "../chart/barCharts/areaChart/tinyAreaChart";
import TinyBar from "../chart/barCharts/barChart/tinyBarChart";
import MainBarChart from "../chart/barCharts/mainBarChart/BarChart";
import { createStructuredSelector } from "reselect";
import { selectYear } from "../redux/reducers/HistorySelector";
import {selectWorldRow,selectSelectedCountry,selectIso} from "../redux/reducers/worldDataSelector"
import { connect } from "react-redux";
import _ from "lodash";
import { extractDifferences, numFormatter } from "../utils/utilities/helpers";
import style from "./mainChartContainer.module.scss";

interface Props {
  history: any;
  world: any;
  year: any;
  worldRow: any;
  selectedCountry: string;
  iso: string;
}
const ChartsContainer = (props: Props) => {
  const { year} = props
  const { worldRow, selectedCountry, iso } = props

  let shortHistory = _.reverse(year);
  return (
    <div className="col-lg-6" >
      <div className="row">
        <div className="col-md-8">
          <h6>Cases and recovered overview in {selectedCountry}</h6>
          <span>Presenting the global contamination and revovery indexes</span>
        </div>

        <div className="col-md-4">
          {" "}
          <span
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {" "}
            <img
              src={`https://www.countryflags.io/${iso}/flat/64.png`}
              alt=""
            />{" "}
          </span>{" "}
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <span>Global cases</span>
          <div className={style.global}>
            <span> {numFormatter(worldRow.total_cases)}</span>
            {` (${worldRow.total_cases})`}
          </div>
        </div>
        <div className="col-md-4">
          <span>Global Recovered</span>
          <div className={style.global}>
            {" "}
            <span>{numFormatter(worldRow.recovered)} </span>
            {` (${worldRow.recovered})`}{" "}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          {shortHistory.length > 31 ? (
            <TryChart
              history={["total_cases", "recovered"].map((rec: any) =>
                extractDifferences(shortHistory, rec)
              )}
              keyData="total_cases"
              sync="main"
            />
          ) : (
            <MainBarChart
              history={["total_cases", "recovered"].map((rec: any) =>
                extractDifferences(shortHistory, rec)
              )}
              keyData="total_cases"
              sync="main"
              filling="#1d89e8"
            />
          )}
        </div>
      </div>
      <div className="row">
        {[
          {
            param: "tested",
            param2: "critical",
            filling: "#ed760e",
            stroke: "ff7b00",
          },
          {
            param: "deaths",
            param2: "deaths",
            filling: "#ea0e3d",
            stroke: "#d65c0a",
          },
        ].map((rec: any) => (
          <div className="col-md-6" key={rec.param}>
            {shortHistory.length > 31 ? (
              <TinyArea
                history={extractDifferences(shortHistory, rec.param)}
                keyData={rec.param}
                sync="main"
                filling={rec.filling}
                stroke={rec.stroke}
              />
            ) : (
              <TinyBar
                history={extractDifferences(shortHistory, rec.param)}
                keyData={rec.param}
                sync="main"
                filling={rec.filling}
              />
            )}
          </div>
        ))}
        {/* <div className="col-md-6">
          <TinyArea
            history={extractDifferences(shortHistory, "tested")}
            keyData="tested"
          />
        </div> */}
        {/* <div className="col-md-6">
          <TinyArea
            history={extractDifferences(shortHistory, "deaths")}
            keyData="deaths"
          />
        </div> */}
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  year: selectYear,
  worldRow: selectWorldRow,
  selectedCountry: selectSelectedCountry,
  iso:selectIso
})

// const mapStateToProps = (state: any) => {
//   return {
//     world: state.world,
//     history: state.history,
//   };
// };

export default connect(mapStateToProps)(ChartsContainer);
