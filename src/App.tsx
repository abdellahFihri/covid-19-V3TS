import React, { Component } from "react";
import "./App.css";
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
import { CovidRequest } from "./axios/axios";
require("dotenv").config();

interface Props {}
interface State {
  initialState: any[];
  worldData: any[];
  chartData: any;
  countriesData: any[];
  filteredCountriesData: any[];
  countryHistory: any;
  selectedCountry: string;
  searchTerm: string;
  loading: boolean;
}

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
    this.setState({
      worldData: [],
      chartData: "",
      countriesData: [],
      filteredCountriesData: [],
      countryHistory: "",
      searchTerm: "",
      selectedCountry: "the world",
    });

    CovidRequest.get("worldstat.php")
      .then((response): void => {
        interface Response {
          [key: string]: string;
        }
        const data: Response = response.data;
        const {
          total_cases,
          new_cases,
          active_cases,
          total_deaths,
          new_deaths,
          total_recovered,
          serious_critical,
          total_cases_per_1m_population,
          statistic_taken_at,
        } = data;
        this.setState({ chartData: data });
        const dataArray: string[] = [
          total_cases,
          new_cases,
          active_cases,
          total_deaths,
          new_deaths,
          total_recovered,
          serious_critical,
          total_cases_per_1m_population,
          statistic_taken_at,
        ];
        const takeOffComma: string[] = dataArray.map((number: string) =>
          number.replace(/,/g, "")
        );

        this.setState({ worldData: takeOffComma, initialState: takeOffComma });
      })
      .catch((error): void => {
        console.log(error);
      });

    CovidRequest.get("cases_by_country.php")
      .then((response) => {
        // let worldData= response.data.countries_stat;
        const {
          data: { countries_stat },
        } = response;
        this.setState({
          countriesData: countries_stat,
          filteredCountriesData: countries_stat,
        });
      })
      .catch((error): void => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.request();

    document.title = `Covid 19 Stats in ${this.state.selectedCountry}`;
  }

  handleSelectedCountry = (id: string) => {
    this.setState({
      chartData: "",
      selectedCountry: id,
      countryHistory: "",
      loading: true,
    });

    let selected: string = id;

    CovidRequest.get("cases_by_particular_country.php", {
      params: {
        country: `${selected}`,
      },
    })
      .then((response) => {
        const getStat = response.data.stat_by_country;

        getStat.map(
          (item: { record_date: string | any[] }) =>
            (item.record_date = item.record_date.slice(0, 10))
        );

        let filteredData: any[] = _.uniqBy(getStat, "record_date");
        let allHistory: any[] = this.historyData(filteredData);

        this.setState({
          countryHistory: allHistory,
          selectedCountry: selected,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    CovidRequest.get("latest_stat_by_country.php", {
      params: {
        country: `${selected}`,
      },
    })
      .then((response) => {
        interface Data {
          [key: string]: any;
        }

        const data: Data = response.data.latest_stat_by_country[0];

        const {
          total_cases,
          new_cases,
          active_cases,
          total_deaths,
          new_deaths,
          total_recovered,
          serious_critical,
          total_cases_per1m,
        } = data;
        this.setState({ chartData: data });
        const dataArray: any[] = [
          total_cases,
          new_cases,
          active_cases,
          total_deaths,
          new_deaths,
          total_recovered,
          serious_critical,
          total_cases_per1m,
        ];
        const takeOffComma: number[] = dataArray.map((number) =>
          Number(number.replace(/,/g, ""))
        );

        this.setState({ worldData: takeOffComma });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleReset = () => {
    this.request();
  };

  handleChange = (event: { target: { value: string } }) => {
    interface dataArray {
      [key: string]: any;
    }
    let term: string = event.target.value;

    term.length ? (term = term[0].toUpperCase() + term.slice(1)) : (term = "");

    this.setState({ searchTerm: event.target.value });
    let arrayOfCountries: dataArray = this.state.countriesData;
    let filteredCountries: any[] = arrayOfCountries.filter(function (
      country: dataArray
    ) {
      return country.country_name.includes(term);
    });
    this.setState({ filteredCountriesData: filteredCountries });
  };
  private historyData(filteredData: any[]) {
    interface Day {
      [key: string]: string;
    }
    return [
      filteredData.map((day: Day) => day.total_cases.replace(/,/g, "")),
      filteredData.map((day: Day) => day.active_cases.replace(/,/g, "")),
      filteredData.map((day: Day) => day.total_recovered.replace(/,/g, "")),
      filteredData.map((day: Day) => day.serious_critical.replace(/,/g, "")),
      filteredData.map((day: Day) => day.total_deaths.replace(/,/g, "")),
      filteredData.map((day: Day) => day.record_date),
    ];
  }

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
        <div id="main-title"> visualization of statistics per country</div>

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
                    className="col-lg-12"
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
                              duration={1}
                              separator="."
                              useEasing={false}
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
                    title={`Deaths/Recovering ratio in ${selectedCountry}`}
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
                  <StatsCard
                    colSize={6}
                    title="Total deaths"
                    end={worldData[3]}
                  />
                  <StatsCard
                    colSize={6}
                    title="Total recovered"
                    end={worldData[5]}
                  />
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
