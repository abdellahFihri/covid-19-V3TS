import React from "react";
import Container from "../hoc/container/container";
import CompareRadar from "../compare/compareRadar";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Col, Row } from "reactstrap";
import MixedChart from "../chart/mixedChart/mixedBarChart";
import {
  selectCountryName_1,
  selectCountryName_2,
  selectHistory_1,
  selectHistory_2,
  selectIso_1,
  selectIso_2,
} from "../redux/reducers/comparableCountries/comparableCountriesSelector";
import TinyLine from "../chart/barCharts/lineChart/tinyLineChart";
import style from "./compareCountriesPage.module.scss";

interface Props {
  iso1: string;
  iso2: String;
  country1: string;
  country2: string;
  history1: any;
  history2: any;
}
const CompareCountries: React.FunctionComponent<Props> = ({
  iso1,
  iso2,
  country1,
  country2,
  history1,
  history2,
}) => {
  return (
    <Container>
      {/* <NavLinks /> */}
      <div id="main-title"> Compare total and history between 2 countries</div>
      <Row>
        <Col lg={5}>
          <Row>
            {" "}
            <CompareRadar />
          </Row>
        </Col>
        {history1.length ? (
          <Col lg={7} className={style.charts}>
            <Row>
              <Col>
                <MixedChart data={history1} country={country1} iso={iso1} />{" "}
              </Col>
            </Row>
            <Row className={style.deaths}>
              <Col lg={8} center="true">
                <TinyLine
                  history={history1}
                  keyData="deaths"
                  sync="main"
                  title="deaths registered"
                  filling="#d62d33"
                  height={260}
                  marginTop={20}
                  XaxisHide={false}
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <MixedChart data={history2} country={country2} iso={iso2} />
              </Col>
            </Row>
            <Row className={style.deaths}>
              <Col lg={8}>
                <TinyLine
                  history={history2}
                  keyData="deaths"
                  sync="main"
                  title="deaths registered"
                  filling="#d62d33"
                  height={260}
                  marginTop={20}
                  XaxisHide={false}
                />
              </Col>
            </Row>
          </Col>
        ) : (
          ""
        )}
      </Row>

      {/* <Footer /> */}
    </Container>
  );
};
const mapStateToProps = createStructuredSelector({
  iso1: selectIso_1,
  iso2: selectIso_2,
  country1: selectCountryName_1,
  country2: selectCountryName_2,
  history1: selectHistory_1,
  history2: selectHistory_2,
});
export default connect(mapStateToProps)(CompareCountries);
