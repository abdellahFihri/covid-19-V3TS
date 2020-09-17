import React, { Component } from "react";
import "./App.scss";
import Chart from "./chart/chart";
import Donut from "./chart/donut";
import Paper from "./hoc/paper/paper";
import Infos from "./infos/infos";
import NavBar from "./navbar/bar";
import Spinner from "./hoc/spinner/spinner";
import _ from "lodash";
import CountUp from "react-countup";
import Container from "./hoc/container/container";
import StatsCard from "./hoc/statsCard/card";
import SearchBar from "./hoc/searchbar/searchbar";
import {
  getInitialStats,
  selectedCountry,
  extractProps,
  historyData,
} from "./utils/utilities/helpers";
import { Data, Props, State } from "./utils/intefaces/interfaces";
require("dotenv").config();

class App extends Component<Props, State> {
  state: State = {
    initialState: [],
    worldData: [],
    chartData: "",
    countriesData: [],
    countryHistory: "",
    filteredCountriesData: [],
    selectedCountry: "the world",
    searchTerm: "",
    loading: false,
  };

  request() {
    // to be called on componentDidMount() and on reset
    this.setState({
      selectedCountry: "the world",
    });
    // multiple concurrent http requests to get the inital data needed at the first render
    getInitialStats().then((results) => {
      // returns selected fields from response.data object
      const data: Data = extractProps(results[0].data);
      const {
        data: { countries_stat },
      } = results[1];
      // removing commas from the values
      const dataArray: string[] = Object.values(data).map((number: string) =>
        number.replace(/,/g, "")
      );

      this.setState({
        worldData: dataArray,
        initialState: dataArray,
        chartData: data,
        countriesData: countries_stat,
        filteredCountriesData: countries_stat,
      });
    });
  }

  componentDidMount() {
    // executes the intial http request to fetch data as the app renders
    this.request();
    document.title = `Covid 19 Stats in ${this.state.selectedCountry}`;
  }

  handleSelectedCountry = (id: string) => {
    let selected: string = id;
    this.setState({
      chartData: "",
      selectedCountry: selected,
      countryHistory: "",
      loading: true,
    });
    // http call to fetch data from  multiple concurrent requests
    selectedCountry(selected).then((results) => {
      const data: Data = extractProps(
        results[0].data.latest_stat_by_country[0]
      );
      // iterate in data object to remove the commas from the values
      const dataArray: any[] = Object.values(data).map((number) =>
        Number(number.replace(/,/g, ""))
      );

      const getStat = results[1].data.stat_by_country;
      // iterates in data response to make the dates more readble
      getStat.map(
        (item: { record_date: string | any[] }) =>
          (item.record_date = item.record_date.slice(0, 10))
      );
      // removing duplicate objects by defining record date as unique key
      let allHistory: any[] = historyData(_.uniqBy(getStat, "record_date"));

      this.setState({
        countryHistory: allHistory,
        selectedCountry: selected,
        worldData: dataArray,
        chartData: data,
        loading: false,
      });
    });

    document.title = `Covid 19 Stats in ${selected}`;
  };

  handleReset = () => {
    // performs the intial request on world selection
    this.request();
  };

  handleChange = (event: { target: { value: string } }) => {
    // quick search for countries
    let term: string = event.target.value;

    term.length ? (term = term[0].toUpperCase() + term.slice(1)) : (term = "");

    this.setState({ searchTerm: event.target.value });
    let arrayOfCountries: Data = this.state.countriesData;
    // filtering and returning a new array with countries matching the search term
    let filteredCountries: any[] = arrayOfCountries.filter(function (
      country: Data
    ) {
      return country.country_name.includes(term);
    });
    this.setState({
      searchTerm: event.target.value,
      filteredCountriesData: filteredCountries,
    });
  };

  render() {
    const {
      worldData,
      initialState,
      chartData,
      selectedCountry,
      filteredCountriesData,
    } = this.state;

    return (
      <div>
        <NavBar />
        <div id="main-title">
          {" "}
          visualization of Covid-19 statistics per country
        </div>

        {!worldData.length ? (
          <Spinner />
        ) : (
          <Container>
            <div className="row">
              <div className="col-lg-3">
                <div className="row">
                  <StatsCard
                    colSize={6}
                    title="Total cases"
                    end={worldData[0]}
                  />
                  <StatsCard colSize={6} title="New cases" end={worldData[1]} />
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
                              end={Number(initialState[i])}
                              duration={3}
                              separator="."
                              useEasing={true}
                            />
                          </span>
                        );
                      })}
                    </div>
                    {filteredCountriesData.length ? (
                      filteredCountriesData.map((country) => {
                        return (
                          <div className="country" key={Math.random()}>
                            <a
                              href="#donut"
                              onClick={() =>
                                this.handleSelectedCountry(country.country_name)
                              }
                              id={country.country_name}
                            >
                              <span>{country.country_name}</span>{" "}
                            </a>

                            {[
                              country.cases,
                              country.deaths,
                              country.total_recovered,
                            ].map((end) => {
                              return (
                                <span key={Math.random()} className="end">
                                  {end.replace(/,/g, ".")}
                                </span>
                              );
                            })}
                          </div>
                        );
                      })
                    ) : (
                      <Spinner />
                    )}
                  </Paper>
                </div>
              </div>
              <div id="donut" className="col-lg-4">
                {chartData ? (
                  <Donut
                    data={chartData}
                    labels={["Active cases", "Recovered", "Deaths"]}
                    title={`Death/Recovery ratio in ${selectedCountry}`}
                  />
                ) : (
                  <Spinner />
                )}
                <div className="row">
                  <Infos
                    info1={
                      worldData[6] < worldData[2]
                        ? worldData[6]
                        : Number(worldData[2])
                    }
                    info2={worldData[7]}
                    info3={worldData[4]}
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
                      end={worldData[card.i]}
                    />
                  ))}
                </div>
                <div className="row">
                  {this.state.countryHistory ? (
                    <Container>
                      <Chart
                        country=""
                        data={this.state.countryHistory}
                        title={`Evolution of COVID-19 in ${this.state.selectedCountry}`}
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
          <span id="update">
            {" "}
            Last updated: {worldData[8] || this.state.chartData.record_date}
          </span>
          <span id="update"> Developed by Abdellah Fihri</span>
        </div>
      </div>
    );
  }
}

export default App;
