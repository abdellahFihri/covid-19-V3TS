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
  refactorChartData,
  filterHistory,
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
    // multiple concurrent http requests to get the inital data needed at the first render
    getInitialStats().then((results) => {
      console.log("resolved results ", results);

      chartData({
        data: refactorChartData(results[0]),
        selectedCountry: "the world",
      });
      allCountriesData({
        all: results[1],
        filter: results[1],
      });
      TodayWorldData({ worldRow: results[2], statsCards: results[2] });
      countryHistory("");
    });
    const { selectedCountry } = this.props.data.donut;
    document.title = `Covid 19 Stats in ${selectedCountry}`;
  }

  componentDidMount() {
    axios({
      method: "GET",
      url: "https://coronavirus-map.p.rapidapi.com/v1/summary/latest",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "coronavirus-map.p.rapidapi.com",
        "x-rapidapi-key": "aea18ae159mshb7fb100058a7a96p1f2a4fjsnaef89ac713ae",
        useQueryString: true,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    this.request();
  }

  handleSelectedCountry = (id: string) => {
    const { chartData, TodayWorldData, countryHistory } = this.props;
    let world = this.props.world.world.worldRow;
    window.scrollTo(0, this.myRef.current.offsetTop);
    let selected: string = id;
    countryHistory({ countryHistory: "", loading: true });
    // this.setState({
    //   loading: true,
    // });
    // http call to fetch data from  multiple concurrent requests
    selectedCountryData(selected).then((results: any) => {
      chartData({
        data: refactorChartData(results[0]),
        selectedCountry: selected,
      });

      TodayWorldData({ worldRow: world, statsCards: results[1] });
      countryHistory({
        countryHistory: filterHistory(results[2].data.stat_by_country),
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

        {!statsCards.length ? (
          <Spinner />
        ) : (
          <Container>
            <TopStats />
            <div className="row">
              <div className="col-lg-3">
                <CountriesList
                  handleReset={this.handleReset}
                  handleSelectedCountry={this.handleSelectedCountry}
                />
              </div>
              <div className="col-lg-6">
                <div className="row">
                  {countryHistory ? (
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
                  )}
                </div>
              </div>
              <div className="col-sm-3" ref={this.myRef}>
                <Ratio />
              </div>
            </div>
          </Container>
        )}
        <div id="footer">
          <span id="update"> Last updated: {statsCards[8]}</span>
          <span id="update"> Developed by Abdellah Fihri</span>
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
