import React from "react";
import TryChart from "../chart/tryChart";
import TinyArea from "../chart/barCharts/areaChart/tinyAreaChart";
import TinyBar from "../chart/barCharts/barChart/tinyBarChart";
import MainBarChart from "../chart/barCharts/mainBarChart/BarChart";
import { connect } from "react-redux";
import _ from "lodash";
import { extractDifferences } from "../utils/utilities/helpers";

interface Props {
  history: any;
}
const ChartsContainer = (props: Props) => {
  const { year, month, week } = props.history.history;
  //   console.log(
  //     "DFFERENCE YEAR",
  //     extractDifferences(_.reverse(month), "total_cases")
  //   );
  let shortHistory = _.dropRight(_.reverse(year), 1);
  return (
    <div className="col-lg-6" style={{ backgroundColor: "white" }}>
      <div className="row">
        <div className="col-md-8">
          <h6>Cases and recovered overview</h6>
          <span>
            Presenting the global contamination and revovery index in country
          </span>
        </div>

        <div className="col-md-4"></div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          {shortHistory.length > 31 ? (
            <TryChart
              history={extractDifferences(shortHistory, "total_cases")}
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
          { param: "tested", filling: "#964FFF" },
          { param: "deaths", filling: "#b5002a" },
        ].map((rec: any) => (
          <div className="col-md-6">
            {shortHistory.length > 31 ? (
              <TinyArea
                history={extractDifferences(shortHistory, rec.param)}
                keyData={rec.param}
                sync="main"
                filling={rec.filling}
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
const mapStateToProps = (state: any) => {
  return {
    world: state.world,
    history: state.history,
  };
};

export default connect(mapStateToProps)(ChartsContainer);
