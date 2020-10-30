import React, { Component } from "react";
import "./App.scss";

import Ratio from "./ratioDonut/ratioDonut";

import TopStats from "./topBarStats/topStats";
import Spinner from "./hoc/spinner/spinner";


import Container from "./hoc/container/container";

import ChartsContainer from "./mainChartContainer/mainChartContainer";
import CountriesList from "./countriesList/countriesList";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {selectFirstRow,selectSelectedCountry,selectLoading} from "./redux/reducers/worldDataSelector"
import {

  fetchData,
  
} from "./redux/actions";


import { Props, State } from "./utils/intefaces/interfaces";
require("dotenv").config();

class App extends Component<Props, State> {
  myRef: any;

  constructor(props: Props) {
    super(props);

    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.props.onFetchData()
  }

  render() {
    const { selectedCountry } = this.props;
    const { loading } = this.props;
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
              <ChartsContainer />
              <div className="col-lg-3">
                <CountriesList
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

const mapDispatchprops = (dispatch:any) => {
  return { onFetchData: () => dispatch(fetchData()) }
}

const mapStateToProps = createStructuredSelector({
  firstRow:selectFirstRow,
  selectedCountry: selectSelectedCountry,
  loading:selectLoading,
  
})


export default connect(mapStateToProps,
  mapDispatchprops

)(App);
