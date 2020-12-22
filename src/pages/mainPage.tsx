import React from "react";
import Container from "../hoc/container/container";
import TopStats from "../topBarStats/topStats";
import Ratio from "../ratioDonut/ratioDonut";
import GlobalRadar from "../globalRadar/globalRadar";
import ChartsContainer from "../mainChartContainer/mainChartContainer";
import CountriesList from "../countriesList/countriesList";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectSelectedCountry } from "../redux/reducers/world/worldDataSelector";
import { Col, Row } from "reactstrap";

interface Props {
  selectedCountry: string;
}
const MainPage: React.FunctionComponent<Props> = ({ selectedCountry }) => {
  const columns: string[] = ["Country", "Cases", "Deaths", "Recovered"];
  const values: string[] = ["total_cases", "deaths", "recovered"];
  return (
    <Container>
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <title>{`Covid-19 data dashboard for ${selectedCountry}`}</title>
        <meta
          name="description"
          content="A dashboard presenting a rich detailed visualisation of covid-19 data  in the world or in a specific country,including the history by year, month or week, or simply by setting a specific date, and the death/recovery ratio."
        />
        <meta
          content="covid 19 statistics, covid-19 dashboard, corona virus dashboard, covid 19 list of countries, live data, covid-19 countries list, all infected countries list, corona virus,covid-19 charts, corona virus graphics, corona virus death ration, corona virus live data, covid 19 live update, covid 19 recovered ratio"
          name="keywords"
        />
        <meta name="theme-color" content="#7382e2" />
      </Helmet>
      <div id="main-title">
        {" "}
        {`visualization of Covid-19 statistics in ${selectedCountry}`}
      </div>
      <TopStats />

      <Col lg={12}>
        <Row>
          <Col lg={6}>
            <Row>
              <Col lg={6}>
                <CountriesList
                  // executeScroll={this.executeScroll}
                  cols={columns}
                  vals={values}
                  detailed={false}
                />
              </Col>
              <Col lg={6}>
                <Ratio />
              </Col>
              <Col lg={12}>
                <GlobalRadar />
              </Col>
            </Row>
          </Col>
          <ChartsContainer />
        </Row>
      </Col>
    </Container>
  );
};
const mapStateToProps = createStructuredSelector({
  selectedCountry: selectSelectedCountry,
});
export default connect(mapStateToProps)(MainPage);
