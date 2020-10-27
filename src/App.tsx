import React, { Component } from "react";
import "./App.scss";
// import Chart from "./chart/chart";
// import Donut from "./chart/donut";
import Ratio from "./ratioDonut/ratioDonut";
// import Infos from "./infos/infos";
// import NavBar from "./navbar/bar";
import TopStats from "./topBarStats/topStats";
import Spinner from "./hoc/spinner/spinner";
// import axios from "axios";
import _ from "lodash";
// import TryChart from "./chart/tryChart";

import Container from "./hoc/container/container";
// import StatsCard from "./hoc/statsCard/card";
import ChartsContainer from "./mainChartContainer/mainChartContainer";
import CountriesList from "./countriesList/countriesList";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {selectFirstRow,selectSelectedCountry,selectLoading} from "./redux/reducers/worldDataSelector"
import {
  chartData,
  TodayWorldData,
  allCountriesData,
  countryHistory,
  mainChartHistory,
  setPeriod
} from "./redux/actions";

import {
  getInitialStats,
  selectedCountryData,
  // refactorChartData,
  // filterHistory,
  // extractDifferences,
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
      // chartData,
      TodayWorldData,
      countryHistory,
      mainChartHistory,
      selectedCountry,
      setPeriod
    } = this.props;

    // multiple concurrent http requests to get the inital data needed at the first render
    getInitialStats().then((results) => {
      // console.log("resolved results ", results);

      // chartData({
      //   data: results[0][0],
      //   selectedCountry: "the world",
      // });
      allCountriesData({
        all: results[1],
        filter: results[1],
      });
      TodayWorldData({
        firstRow: results[0][0],
        worldRow: results[0][0],
        statsCards: results[0][1],
        selectedCountry: "the world",
        iso: "",
        loading:false
      });
      mainChartHistory({
        yearHistory: _.orderBy(results[2],['total_cases'],['asc']),
        monthHistory:_.orderBy( _.take(results[2], 32),['total_cases'],['asc']),
        weekHistory: _.orderBy( _.take(results[2], 9),['total_cases'],['asc'])
        
      })
      countryHistory({
        year: _.orderBy(results[2], ["date"], ["asc"]),
        week: _.takeRight(_.orderBy(results[2], ["date"], ["asc"]), 8),
        month: _.takeRight(_.orderBy(results[2], ["date"], ["asc"]), 31),
      });
      setPeriod({
        // period: _.orderBy(results[2], ["date"], ["asc"]),
        period: _.takeRight(_.orderBy(results[2], ["date"], ["asc"]), 31),
      })
    });
   
    document.title = `Covid 19 Stats in ${selectedCountry}`;
  }

  componentDidMount() {
    console.log("remounted !");
    this.request();
  }

  handleSelectedCountry = (id: string, isoCode: string) => {
    const { TodayWorldData, countryHistory,firstRow ,mainChartHistory,setPeriod} = this.props;
    let worldStat = firstRow;
    // console.log("all countries in handle", this.props.countriesStats.allCountriesStats.filter);
    window.scrollTo(0, this.myRef.current.offsetTop);
    let selected: string = id;
    // let country: any = _.find(
    //   this.props.countriesStats.allCountriesStats.filter,
    //   { name: id }
    // );
    // console.log("the found country ", country);
    // countryHistory({ countryHistory: "", loading: true });
    // this.setState({
    //   loading: true,
    // });
    // http call to fetch data from  multiple concurrent requests

    selectedCountryData(selected).then((results: any) => {
      console.log("results in slected country in app ", results);
      // extractDifferences(results, "deaths");
      TodayWorldData({
        firstRow: worldStat,
        worldRow: results[0].summary,
        statsCards: results[0].change,
        selectedCountry: selected,
        iso: isoCode,
        loading:false
      });
      // chartData({
      //   data: results[0].summary,
      //   selectedCountry: selected,
      // });
      countryHistory({
        week: results[1],
        month: results[2],
        year: results[3],
        
      });
      mainChartHistory({
        yearHistory: results[3],
        monthHistory:results[2],
        weekHistory: results[1],
        
      })
      setPeriod({
        period: _.orderBy(results[2],['date','total_cases'],['asc','asc']),
      })
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
    const { selectedCountry } = this.props;
    // const { selectedCountry } = this.props.data.donut;
    const { loading } = this.props;
    // console.log("world data ", worldRow);

    return loading ? (
      <Spinner />
    ) : (
      <div>
        <div id="main-title">
          {" "}
          {`visualization of Covid-19 statistics in ${selectedCountry}`}
        </div>

        <Container>
          <TopStats />

          <div className="col-lg-12">
            <div className="row">
              {/* <div className="col-lg-6"> */}
              {/* <div className="row"> */}
              {/* <TryChart /> */}
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
              {/* </div> */}
              {/* </div> */}
              <ChartsContainer />
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

        <div className="col-lg-12">
          <div id="footer">
            
            <span id="update"> Developed by Abdellah Fihri</span>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  firstRow:selectFirstRow,
  selectedCountry: selectSelectedCountry,
  loading:selectLoading,
  
})
// const mapStateToProps = (state: any) => {
//   return {
//     data: state.data,
//     world: state.world,
//     countriesStats: state.allCountries,
//     history: state.history,
//   };
// };

export default connect(mapStateToProps, {
  chartData,
  TodayWorldData,
  allCountriesData,
  countryHistory,
  mainChartHistory,
  setPeriod
})(App);
