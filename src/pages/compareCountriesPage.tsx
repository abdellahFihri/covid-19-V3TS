import React from "react";
import Container from "../hoc/container/container";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Col, Row } from "reactstrap";
import MixedChart from "../chart/mixedChart/mixedBarChart";
import ShortenedNum from "../hoc/shortNumber/shortNumber";
import {
  selectCountryData_1,
  selectCountryData_2,
  selectCountryName_1,
  selectCountryName_2,
  selectHistory_1,
  selectHistory_2,
  selectIso_1,
  selectIso_2,
} from "../redux/reducers/comparableCountries/comparableCountriesSelector";
import TinyLine from "../chart/barCharts/lineChart/tinyLineChart";
import { Helmet } from "react-helmet";
import style from "./compareCountriesPage.module.scss";
import { Typography } from "@material-ui/core";
import CompareRadar from "../compare/compareRadar";

interface Props {
  iso1: string;
  iso2: String;
  country1: string;
  country2: string;
  history1: any;
  history2: any;
  comparable_1: { [key: string]: number | string | null }[];
  comparable_2: { [key: string]: number | string | null }[];
}
const CompareCountries: React.FunctionComponent<Props> = ({
  iso1,
  iso2,
  country1,
  country2,
  history1,
  history2,
  comparable_1,
  comparable_2,
}) => {
  return (
    <React.Fragment>
      <Helmet>
        <html lang="en" />
        <title>{`Compare Covid-19 data between ${
          country1 ? `${country1} and ` : "countries"
        } ${country2 ? country2 : "..."}`}</title>
        <meta
          name="Covid-19 countries comparator"
          content="A page to compare covid-19 data between countries with data visualization and graphics"
        />
      </Helmet>

      <div id="main-title">
        {" "}
        Compare covid-19 totals and history between two countries
      </div>
      <Typography
        style={{
          padding: "0  10% 0 10%",
          fontSize: "14px",
          textAlign: "center",
          color: "#898989",
          lineHeight: "30px",
        }}
      >
        Choose countries you want to compare from the countries selectors bellow
        or simply type in the country name, at the end of the selection a
        graphic radar will render a visualization of covid-19 total, active and
        critical cases for each country, along with the total number of deaths
        and the total number of recovered.
        <br />
        Also at the end of the countries selection, a mixed bar chart will
        visualize the periodic total cases and recovered and a line chart to
        visualize the covid-19 deaths since the beginning of the pandemic
        outbreak.
      </Typography>
      <Container container-fluid>
        <Row>
          <Col lg={5}>
            <CompareRadar />
          </Col>
          <Col lg={7} className={style.col}>
            <div className={style.charts}>
              {" "}
              {[
                {
                  data: history1,
                  country: country1,
                  iso: iso1,
                  compare: comparable_1,
                  key: "A",
                },
                {
                  data: history2,
                  country: country2,
                  iso: iso2,
                  compare: comparable_2,
                  key: "B",
                },
              ].map((country: any) => (
                <React.Fragment key={country.key}>
                  <div className={style.shortNums}>
                    <div className={style.country}>
                      <span>{country.country}</span>
                      <img
                        src={`https://flagcdn.com/${country.iso.toLocaleLowerCase()}.svg`}
                        width="40"
                        alt=""
                      />
                    </div>
                    {country.compare.length
                      ? [
                          { i: 4, title: "Total cases" },
                          { i: 3, title: "Recovered" },
                        ].map((val: { i: number; title: string }) => (
                          <ShortenedNum
                            key={val.i}
                            title={val.title}
                            value={country.compare[val.i][`${country.key}`]}
                          />
                        ))
                      : ""}
                  </div>
                  <MixedChart data={country.data} />
                  <div className={style.shortNums}>
                    {country.compare.length ? (
                      <ShortenedNum
                        title="Total deaths"
                        value={country.compare[2][`${country.key}`]}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className={style.deaths}>
                    <TinyLine
                      history={country.data}
                      keyData="deaths"
                      sync="main"
                      title="deaths registered"
                      filling="#d62d33"
                      height={260}
                      marginTop={20}
                      XaxisHide={false}
                    />
                  </div>
                </React.Fragment>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};
const mapStateToProps = createStructuredSelector({
  iso1: selectIso_1,
  iso2: selectIso_2,
  country1: selectCountryName_1,
  country2: selectCountryName_2,
  history1: selectHistory_1,
  history2: selectHistory_2,
  comparable_1: selectCountryData_1,
  comparable_2: selectCountryData_2,
});
export default connect(mapStateToProps)(CompareCountries);
