import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.scss";
import NavLinks from "./navbar/navbar";

import MainPage from "./pages/mainPage";
import DetailedCountriesList from "./pages/DetailedCountriesListPage";

import Spinner from "./hoc/spinner/spinner";
import CompareCountries from "./pages/compareCountriesPage";
import Container from "./hoc/container/container";

import Overlay from "./hoc/overlay/overlay";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectFirstRow,
  selectSelectedCountry,
  selectLoading,
} from "./redux/reducers/world/worldDataSelector";
import { fetchData } from "./redux/actions/index";

import { Props, State } from "./utils/intefaces/interfaces";
import { selectOverlay } from "./redux/reducers/overlay/overlaySelector";
import Footer from "./footer/footer";

import { selectFetchErrorMsg } from "./redux/reducers/fetchingError/fetchingErrorSelector";
import DataErr from "./hoc/noData/messageError";

import NotFound from "./pages/notFound";
import QuickMenu from "./widget/quickMenu";

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
  executeScroll = () => {
    this.myRef.current.scrollIntoView();
    console.log("scroll fired");
  };
  render() {
    const { selectedCountry } = this.props;
    const { loading, overlay, fetchError } = this.props;

    return loading ? (
      <Spinner title="Fetching initial data" />
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
      <div className="App" ref={this.myRef}>
        {overlay ? <Overlay /> : ""}
        <NavLinks />

        <Container>
          <QuickMenu executeScroll={this.executeScroll} />

          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path={`/${selectedCountry}`} component={MainPage} />
            <Route path="/countries-list" component={DetailedCountriesList} />
            <Route path="/compare-countries" component={CompareCountries} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Container>

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
