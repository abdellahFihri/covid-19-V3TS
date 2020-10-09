import React, { Component } from "react";
import "./App.scss";
import Chart from "./chart/chart";
import Donut from "./chart/donut";
import Paper from "./hoc/paper/paper";
import Infos from "./infos/infos";
import NavBar from "./navbar/bar";
import Spinner from "./hoc/spinner/spinner";
import CountUp from "react-countup";
import Container from "./hoc/container/container";
import StatsCard from "./hoc/statsCard/card";
import SearchBar from "./hoc/searchbar/searchbar";
import CountryRow from "./countryRow/countryRow";
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
  extractProps,
  refactorChartData,
  filterHistory,
} from "./utils/utilities/helpers";
import { Data, Props, State } from "./utils/intefaces/interfaces";
require("dotenv").config();

class App extends Component<Props, State> {
  myRef: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      searchTerm: "",
      loading: false,
    };
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
      // returns selected fields from response.data object
      const data: Data = extractProps(results[0].data);
      const {
        data: { countries_stat },
      } = results[1];
      allCountriesData({
        all: countries_stat,
        filter: countries_stat,
      });
      // removing commas from the values
      const dataArray: string[] = Object.values(data).map((number: string) =>
        number.replace(/,/g, "")
      );
      chartData({
        data: refactorChartData(data),
        selectedCountry: "the world",
      });
      TodayWorldData({ worldRow: dataArray, statsCards: dataArray });
      countryHistory("");
    });
    const { selectedCountry } = this.props.data.donut;
    document.title = `Covid 19 Stats in ${selectedCountry}`;
  }

  componentDidMount() {
    this.request();
  }

  handleSelectedCountry = (id: string) => {
    const { chartData, TodayWorldData, countryHistory } = this.props;
    let world = this.props.world.world.worldRow;
    window.scrollTo(0, this.myRef.current.offsetTop);
    let selected: string = id;
    countryHistory("");
    this.setState({
      loading: true,
    });
    // http call to fetch data from  multiple concurrent requests
    selectedCountryData(selected).then((results: any) => {
      const data: Data = extractProps(
        results[0].data.latest_stat_by_country[0]
      );
      chartData({
        data: refactorChartData(data),
        selectedCountry: selected,
      });
      // iterate in data object to remove the commas from the values
      const dataArray: any[] = Object.values(data).map((number) =>
        number.replace(/,/g, "")
      );

      TodayWorldData({ worldRow: world, statsCards: dataArray });
      countryHistory(filterHistory(results[1].data.stat_by_country));
      this.setState({
        loading: false,
      });
    });

    document.title = `Covid 19 Stats in ${selected}`;
  };

  handleReset = () => {
    // performs the intial request on world selection
    this.request();
    document.title = "Covid-19 Stats in the world";
  };

  handleChange = (event: { target: { value: string } }) => {
    const { allCountriesData } = this.props;
    // quick search for countries
    let term: string = event.target.value;

    term.length ? (term = term[0].toUpperCase() + term.slice(1)) : (term = "");

    this.setState({ searchTerm: event.target.value });

    let arrayOfCountries: Data = this.props.countriesStats.allCountriesStats
      .all;
    // filtering and returning a new array with countries matching the search term
    let filteredCountries: any[] = arrayOfCountries.filter(function (
      country: Data
    ) {
      return country.country_name.includes(term);
    });

    this.setState({
      searchTerm: event.target.value,
    });

    allCountriesData({
      all: arrayOfCountries,
      filter: filteredCountries,
    });
  };

  render() {
    const { worldRow, statsCards } = this.props.world.world;
    const { selectedCountry } = this.props.data.donut;
    const { countryHistory } = this.props.history;
    console.log("world data ", worldRow);
    const { filter } = this.props.countriesStats.allCountriesStats;

    return (
      <div>
        <NavBar />
        <div id="main-title">
          {" "}
          {`visualization of Covid-19 statistics in ${selectedCountry}`}
        </div>

        {!statsCards.length ? (
          <Spinner />
        ) : (
          <Container>
            <div className="row">
              <div className="col-lg-3">
                <div className="row">
                  <StatsCard
                    colSize={6}
                    title="Total cases"
                    end={statsCards[0]}
                  />
                  <StatsCard
                    colSize={6}
                    title="New cases"
                    end={statsCards[1]}
                  />
                </div>
                <div className="row">
                  <Paper
                    className="col-lg-12 "
                    title="Countries Summary"
                    bar={
                      <SearchBar
                        placeholder="Country quick search"
                        value={this.state.searchTerm}
                        onChange={this.handleChange}
                      />
                    }
                    col1="Country"
                    col2="Cases"
                    col3="Deaths"
                    col4="Recovered"
                  >
                    <div className="country">
                      <span id="world" onClick={this.handleReset}>
                        The world
                      </span>{" "}
                      {[0, 3, 5].map((i) => {
                        return (
                          <span key={i} className="end">
                            <CountUp
                              className="countEnd"
                              end={Number(worldRow[i])}
                              duration={3}
                              separator="."
                              useEasing={true}
                            />
                          </span>
                        );
                      })}
                    </div>
                    {filter.length ? (
                      <CountryRow
                        selectedCountry={this.handleSelectedCountry}
                      />
                    ) : (
                      <Spinner />
                    )}
                  </Paper>
                </div>
              </div>
              <div className="col-lg-4" ref={this.myRef}>
                <Donut />

                <div className="row">
                  <Infos
                    info1={
                      statsCards[6] < statsCards[2]
                        ? statsCards[6]
                        : Number(statsCards[2])
                    }
                    info2={statsCards[7]}
                    info3={statsCards[4]}
                  />
                </div>
              </div>
              <div className="col-lg-5">
                <div className="row">
                  {[
                    { title: "Total Deaths", i: 3 },
                    { title: "Total Recovered", i: 5 },
                  ].map((card) => (
                    <StatsCard
                      key={card.i}
                      colSize={6}
                      title={card.title}
                      end={statsCards[card.i]}
                    />
                  ))}
                </div>
                <div className="row">
                  {countryHistory ? (
                    <Container>
                      <Chart
                        country=""
                        // data={countryHistory}
                        title={`Evolution of COVID-19 in ${selectedCountry}`}
                      />
                    </Container>
                  ) : this.state.loading ? (
                    <Spinner />
                  ) : (
                    ""
                  )}
                </div>
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
