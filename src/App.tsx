import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.scss";
import NavBar from "./navbar/navbar";
import Ratio from "./ratioDonut/ratioDonut";
import MainPage from "./pages/mainPage";
import DetailedCountriesList from "./pages/DetailedCountriesListPage";
import TopStats from "./topBarStats/topStats";
import Spinner from "./hoc/spinner/spinner";
import CompareCountries from "./pages/compareCountriesPage";
import Container from "./hoc/container/container";

import ChartsContainer from "./mainChartContainer/mainChartContainer";
import CountriesList from "./countriesList/countriesList";
import Overlay from "./hoc/overlay/overlay";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectFirstRow,
  selectSelectedCountry,
  selectLoading,
} from "./redux/reducers/world/worldDataSelector";
import { fetchData } from "./redux/actions/index";
import GlobalRadar from "./globalRadar/globalRadar";
import { Props, State } from "./utils/intefaces/interfaces";
import { selectOverlay } from "./redux/reducers/overlay/overlaySelector";
import Footer from "./footer/footer";
import CompareRadar from "./compare/compareRadar";
import { selectFetchErrorMsg } from "./redux/reducers/fetchingError/fetchingErrorSelector";
import DataErr from "./hoc/noData/messageError";

require("dotenv").config();

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.myRef = React.createRef();
  }
  componentDidMount() {
    this.props.onFetchData();
  }
  myRef: any = React.createRef();
  executeScroll = () => this.myRef.current.scrollIntoView();
  render() {
    const { selectedCountry } = this.props;
    const { loading, overlay, fetchError } = this.props;

    return loading ? (
      <Spinner />
    ) : fetchError ? (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <DataErr errMsg={fetchError} iconFill="#ff0000" />
      </div>
    ) : (
      <div ref={this.myRef}>
        <NavBar />
        <Switch>
          <Container>
            {overlay ? <Overlay /> : ""}
            <div id="main-title">
              {" "}
              {`visualization of Covid-19 statistics in ${selectedCountry}`}
            </div>
            <Route exact path="/" component={MainPage} />
            <Route
              exact
              path="/countries-list"
              component={DetailedCountriesList}
            />
            <Route
              exact
              path="/compare-countries"
              component={CompareCountries}
            />
            {/* <Container>
          {overlay ? <Overlay /> : ""}

          <TopStats />

          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-3">
                <Ratio />
                <GlobalRadar />
              </div>
              <ChartsContainer />
              <div className="col-lg-3">
                <CountriesList executeScroll={this.executeScroll} />
                <CompareRadar />
              </div>
            </div>
          </div>
        </Container> */}

            {/* <div className="col-lg-12"> */}

            {/* <div id="footer">
            <span id="update"> Developed by Abdellah Fihri</span>
          </div>
        </div> */}
          </Container>
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapDispatchprops = (dispatch: any) => {
  return { onFetchData: () => dispatch(fetchData()) };
};

const mapStateToProps = createStructuredSelector({
  firstRow: selectFirstRow,
  selectedCountry: selectSelectedCountry,
  loading: selectLoading,
  overlay: selectOverlay,
  fetchError: selectFetchErrorMsg,
});

export default connect(mapStateToProps, mapDispatchprops)(App);
