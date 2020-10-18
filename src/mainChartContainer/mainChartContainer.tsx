import React from "react";
import TryChart from "../chart/tryChart";
import TinyArea from "../chart/barCharts/areaChart/tinyAreaChart";

const ChartsContainer = () => {
  return (
    <div className="col-lg-6">
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
          <TryChart />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <TinyArea />
        </div>
        <div className="col-md-6">chart</div>
      </div>
    </div>
  );
};
export default ChartsContainer;
