import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import NavLinks from "./navbar/navbar";
import MainPage from "./pages/mainPage";
import DetailedCountriesList from "./pages/DetailedCountriesListPage";
import Spinner from "./hoc/spinner/spinner";
import CompareCountries from "./pages/compareCountriesPage";
import Container from "./hoc/container/container";
import Overlay from "./hoc/overlay/overlay";
import DataErr from "./hoc/noData/messageError";
import NotFound from "./pages/notFound";
import Footer from "./footer/footer";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectFirstRow,
  selectSelectedCountry,
  selectLoading,
} from "./redux/reducers/world/worldDataSelector";
import { fetchData } from "./redux/actions/index";
import { Props } from "./utils/intefaces/interfaces";
import { selectOverlay } from "./redux/reducers/overlay/overlaySelector";
import { selectFetchErrorMsg } from "./redux/reducers/fetchingError/fetchingErrorSelector";
import "./App.scss";

const App: React.FunctionComponent<Props> = (props) => {
  const { loading, overlay, fetchError, selectedCountry, onFetchData } = props;

  useEffect(() => {
    onFetchData();
  }, [onFetchData]);

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
    <div className="App">
      {overlay ? <Overlay /> : ""}
      <NavLinks />

      <Container>
        <Switch>
          <Route exact path="/" render={() => <MainPage />} />
          <Route
            exact
            path={`/${selectedCountry}`}
            render={() => <MainPage />}
          />
          <Route path="/countries-list" component={DetailedCountriesList} />
          <Route path="/compare-countries" component={CompareCountries} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Container>

      <Footer />
    </div>
  );
};

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
