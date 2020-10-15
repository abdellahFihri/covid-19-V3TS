import React, { Component } from "react";
import "./App.scss";
import Chart from "./chart/chart";
import Donut from "./chart/donut";
import Ratio from "./ratioDonut/ratioDonut";
import Infos from "./infos/infos";
import NavBar from "./navbar/bar";
import TopStats from "./topBarStats/topStats";
import Spinner from "./hoc/spinner/spinner";
import axios from "axios";
import _ from "lodash";
import TryChart from "./chart/tryChart";

import Container from "./hoc/container/container";
import StatsCard from "./hoc/statsCard/card";

import CountriesList from "./countriesList/countriesList";
import { connect } from "react-redux";
import {
  chartData,
  TodayWorldData,
  allCountriesData,
  countryHistory,
} from "./redux/actions";

import {
  getInitialStats,
  selectedCountryData,
  // refactorChartData,
  filterHistory,
  extractDifferences,
} from "./utils/utilities/helpers";
import { Props, State } from "./utils/intefaces/interfaces";
require("dotenv").config();

class App extends Component<Props, State> {
  myRef: any;

  constructor(props: Props) {
    super(props);

    this.myRef = React.createRef();
  }

  // to be called on componentDidMount() and on reset
  request() {
    const {
      allCountriesData,
      chartData,
      TodayWorldData,
      countryHistory,
    } = this.props;

    // console.log("getinitial ", getInitialStats());
    // multiple concurrent http requests to get the inital data needed at the first render
    getInitialStats().then((results) => {
      console.log("resolved results ", results);

      chartData({
        data: results[0][0],
        selectedCountry: "the world",
      });
      allCountriesData({
        all: results[1],
        filter: results[1],
      });
      TodayWorldData({
        firstRow: results[0][0],
        worldRow: results[0][0],
        statsCards: results[0][1],
        worldHistory: _.orderBy(results[2], ["date"], ["asc"]),
      });
      countryHistory("");
    });
    const { selectedCountry } = this.props.data.donut;
    document.title = `Covid 19 Stats in ${selectedCountry}`;
  }

  componentDidMount() {
    console.log("remounted !");
    this.request();
  }

  handleSelectedCountry = (id: string) => {
    const { chartData, TodayWorldData, countryHistory } = this.props;
    let worldStat = this.props.world.world.firstRow;
    // console.log("all countries in handle", this.props.countriesStats.allCountriesStats.filter);
    window.scrollTo(0, this.myRef.current.offsetTop);
    let selected: string = id;
    let country: any = _.find(
      this.props.countriesStats.allCountriesStats.filter,
      { name: id }
    );
    console.log("the found country ", country);
    countryHistory({ countryHistory: "", loading: true });
    // this.setState({
    //   loading: true,
    // });
    // http call to fetch data from  multiple concurrent requests
    chartData({
      data: country,
      selectedCountry: selected,
    });

    TodayWorldData({
      firstRow: worldStat,
      worldRow: country,
      statsCards: country.change,
    });
    selectedCountryData(selected).then((results: any) => {
      console.log("results in slected country in app ", results);
      extractDifferences(results);
      countryHistory({
        countryHistory: results,
        loading: false,
      });
      // this.setState({
      //   loading: false,
      // });
    });

    document.title = `Covid 19 Stats in ${selected}`;
  };

  handleReset = () => {
    // performs the intial request on world selection
    this.request();
    document.title = "Covid-19 Stats in the world";
  };

  render() {
    const { worldRow, statsCards } = this.props.world.world;
    const { selectedCountry } = this.props.data.donut;
    const { countryHistory, loading } = this.props.history.history;
    console.log("world data ", worldRow);

    return (
      <div>
        {/* <NavBar /> */}
        <div id="main-title">
          {" "}
          {`visualization of Covid-19 statistics in ${selectedCountry}`}
        </div>

        {!statsCards ? (
          <Spinner />
        ) : (
          <Container>
            <TopStats />

            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-6">
                  <div className="row">
                    <TryChart />
                    {/* {countryHistory ? (
                      <Container>
                        <Chart
                          country=""
                          title={`Evolution of COVID-19 in ${selectedCountry}`}
                        />
                      </Container>
                    ) : loading ? (
                      <Spinner />
                    ) : (
                      ""
                    )} */}
                  </div>
                </div>
                <div className="col-lg-3">
                  <CountriesList
                    handleReset={this.handleReset}
                    handleSelectedCountry={this.handleSelectedCountry}
                  />
                </div>
                <div className="col-lg-3" ref={this.myRef}>
                  <Ratio />
                </div>
              </div>
            </div>
          </Container>
        )}
        <div className="col-lg-12">
          <div id="footer">
            <span id="update"> Last updated: {statsCards[8]}</span>
            <span id="update"> Developed by Abdellah Fihri</span>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    data: state.data,
    world: state.world,
    countriesStats: state.allCountries,
    history: state.history,
  };
};

export default connect(mapStateToProps, {
  chartData,
  TodayWorldData,
  allCountriesData,
  countryHistory,
})(App);
