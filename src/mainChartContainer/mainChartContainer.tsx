import React from "react";
import InitialChart from "../chart/initialChart";

import MainBarChart from "../chart/barCharts/mainBarChart/BarChart";
import ShortenedNum from "../hoc/shortNumber/shortNumber";
import { createStructuredSelector } from "reselect";
import {
  selectMonth,
  selectWeek,
  selectYear,
} from "../redux/reducers/mainChart/mainChartHistorySelector";
import { selectCumulative } from "../redux/reducers/cumulative/cumulativeSelector";
import Switch from "@material-ui/core/Switch";
import {
  selectWorldRow,
  selectSelectedCountry,
  selectIso,
} from "../redux/reducers/world/worldDataSelector";
import { setPeriod, setCumulative } from "../redux/actions/index";
import { selectPeriod } from "../redux/reducers/period/periodSelector";
import { connect } from "react-redux";

import _ from "lodash";
import { extractDifferences } from "../utils/utilities/helpers";
import style from "./mainChartContainer.module.scss";
import { Button, ButtonGroup, Col, Row } from "reactstrap";
import TinyLine from "../chart/barCharts/lineChart/tinyLineChart";
import CovidDatePicker from "../hoc/datePicker/DatePicker";
// import { ButtonGroup } from "@material-ui/core";

interface Props {
  history: any;
  world: any;
  year: any;
  worldRow: any;
  selectedCountry: string;
  iso: string;
  month: any;
  week: any;
  selectedPeriod: any;
  setPeriod: any;
  cumulative: boolean;
  setCumulative: any;
}
const ChartsContainer: React.FunctionComponent<Props> = (props) => {
  const {
    year,
    month,
    week,
    selectedPeriod,
    setPeriod,
    worldRow,
    selectedCountry,
    iso,
    cumulative,
    setCumulative,
  } = props;

  const yearPeriod = React.useMemo(() => year, [year]);
  const monthPeriod = React.useMemo(() => month, [month]);
  const weekPeriod = React.useMemo(() => week, [week]);
  const chartPeriod = React.useMemo(() => selectedPeriod, [selectedPeriod]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCumulative();
  };
  const selectPeriod = (period: string) => {
    switch (period) {
      case "week":
        setPeriod({ period: weekPeriod, periodRange: "week" });
        break;
      case "month":
        setPeriod({ period: monthPeriod, periodRange: "month" });
        break;
      case "year":
        setPeriod({ period: yearPeriod, periodRange: "year" });
        break;
    }
  };

  let shortHistory = _.reverse(_.dropRight(chartPeriod, 1));

  return (
    <Col lg={6}>
      <div className={style.container}>
        <div className={style.header}>
          <Row>
            <Col className={style.main} md={6}>
              <h6>Cases and recovered overview in {selectedCountry}</h6>
              <span>
                Presenting the global contamination and revovery indexes
              </span>
            </Col>
            <div className={` ${style.image} col-md-6`}>
              <div style={{ width: "70%" }}>
                <CovidDatePicker country={selectedCountry} />
              </div>
              <img
                src={`https://flagcdn.com/${iso.toLocaleLowerCase()}.svg`}
                width="80"
                alt=""
              />
            </div>
          </Row>
          <Row>
            <Col md={6}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                {[
                  { title: "Total cases", value: worldRow.total_cases },
                  { title: "Total recovered", value: worldRow.recovered },
                ].map((item) => (
                  <div key={item.title}>
                    <ShortenedNum title={item.title} value={item.value} />
                  </div>
                ))}
              </div>
            </Col>

            <Col className={style.buttons} md={6}>
              <ButtonGroup size="sm">
                {["week", "month", "year"].map((period: string) => (
                  <Button
                    outline
                    key={period}
                    color="primary"
                    size="sm"
                    onClick={() => selectPeriod(period)}
                  >
                    {period}
                  </Button>
                ))}
              </ButtonGroup>
              <span className={style.toggle}>
                {`${cumulative ? "cumulative" : "periodic"}`}
                <div>
                  <Switch
                    checked={cumulative}
                    onChange={handleChange}
                    color="primary"
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                </div>
              </span>
            </Col>
          </Row>
        </div>
        <Row>
          <Col md={12}>
            {shortHistory.length > 31 ? (
              <InitialChart
                history={
                  !cumulative
                    ? ["total_cases", "recovered"].map((rec: any) =>
                        extractDifferences(shortHistory, rec)
                      )
                    : _.reverse(shortHistory)
                }
                keyData="total_cases"
                sync="main"
                cumulative={cumulative}
              />
            ) : (
              <MainBarChart
                history={
                  !cumulative
                    ? ["total_cases", "recovered"].map((rec: any) =>
                        extractDifferences(shortHistory, rec)
                      )
                    : _.reverse(shortHistory)
                }
                keyData="total_cases"
                sync="main"
                cumulative={cumulative}
                filling="#5068e0"
              />
            )}
          </Col>
        </Row>
        <Row>
          {[
            {
              param: "tested",
              title: "Total tests",
              chartTitle: "Periodic rate tests",
              global: worldRow.tested,
              filling: "#1d89e8",
              stroke: "#ff7b00",
            },
            {
              param: "deaths",
              title: "Total deaths",
              global: worldRow.deaths,
              chartTitle: "Periodic rate of deaths",
              filling: "#b72429",
              stroke: "#d62d33",
            },
          ].map((rec: any) => (
            <Col md={6} key={rec.param}>
              <Row>
                <Col md={6}>
                  <ShortenedNum title={rec.title} value={rec.global} />
                </Col>

                <Col md={12}>
                  <TinyLine
                    history={
                      !cumulative
                        ? extractDifferences(shortHistory, rec.param)
                        : _.reverse(shortHistory)
                    }
                    keyData={rec.param}
                    sync="main"
                    title={rec.chartTitle}
                    filling={rec.filling}
                    height={260}
                    XaxisHide={false}
                  />
                </Col>
              </Row>
            </Col>
          ))}
        </Row>
      </div>
    </Col>
  );
};
const mapStateToProps = createStructuredSelector({
  year: selectYear,
  month: selectMonth,
  week: selectWeek,

  worldRow: selectWorldRow,
  selectedCountry: selectSelectedCountry,
  iso: selectIso,
  selectedPeriod: selectPeriod,
  cumulative: selectCumulative,
});

export default connect(mapStateToProps, { setPeriod, setCumulative })(
  ChartsContainer
);
