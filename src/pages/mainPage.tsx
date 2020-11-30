import React from "react";
import Container from "../hoc/container/container";
import TopStats from "../topBarStats/topStats";
import Ratio from "../ratioDonut/ratioDonut";
import GlobalRadar from "../globalRadar/globalRadar";
import ChartsContainer from "../mainChartContainer/mainChartContainer";
import CountriesList from "../countriesList/countriesList";

const MainPage = () => {
  const columns: string[] = ["Country", "Cases", "Deaths", "Recovered"];
  const values: string[] = ["total_cases", "deaths", "recovered"];
  return (
    <Container>
      <TopStats />

      <div className="col-lg-12">
        <div className="row">
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-6">
                <CountriesList
                  // executeScroll={this.executeScroll}
                  cols={columns}
                  vals={values}
                />
                {/* <CompareRadar /> */}
              </div>
              <div className="col-lg-6">
                <Ratio />
              </div>
              <div className="col-lg-12">
                <GlobalRadar />
              </div>
            </div>
          </div>
          <ChartsContainer />
        </div>
      </div>
    </Container>
  );
};
export default MainPage;
