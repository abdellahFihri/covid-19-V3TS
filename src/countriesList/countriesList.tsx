import React, { useState, FunctionComponent } from "react";
import { connect } from "react-redux";
import SearchBar from "../hoc/searchbar/searchbar";
import Paper from "../hoc/paper/paper";
import Spinner from "../hoc/spinner/spinner";
import CountryRow from "../countryRow/countryRow";
import { allCountriesData, fetchData, setOverlay } from "../redux/actions";
import { Data } from "../utils/intefaces/interfaces";
import { createStructuredSelector } from "reselect";
import {
  selectAll,
  selectFiltered,
} from "../redux/reducers/allCountries/allCountriesDataSelector";
import { selectFirstRow } from "../redux/reducers/world/worldDataSelector";
import { numFormatter } from "../utils/utilities/helpers";

interface Props {
  allCountriesData: (arg0: any) => void;
  cols: string[];
  vals: string[];
  countriesStats: any;
  world: any;
  all: any;
  filter: any;
  firstRow: any;
  dispatch: any;
  executeScroll: any;
  fetchData: () => void;
  setOverlay: (arg0: boolean, arg1: string, arg2: string) => void;
}

const CountriesList: FunctionComponent<Props> = (props) => {
  const { firstRow, executeScroll, cols, vals } = props;
  const { all, filter, fetchData, setOverlay } = props;
  console.log("COLMNS IN COUNTRIES LIST", cols);
  const [term, setTerm] = useState("");
  const handleChange = (event: { target: { value: string } }) => {
    const { allCountriesData } = props;
    // quick search for countries
    let term: string = event.target.value;

    term.length ? (term = term[0].toUpperCase() + term.slice(1)) : (term = "");

    setTerm(event.target.value);

    let arrayOfCountries: any = all;
    // filtering and returning a new array with countries matching the search term
    let filteredCountries: any[] = arrayOfCountries.filter(function (
      country: Data
    ) {
      return country.name.includes(term);
    });

    setTerm(event.target.value);

    allCountriesData({
      all: arrayOfCountries,
      filter: filteredCountries,
    });
  };

  return (
    <div className="row">
      <Paper
        className="col-lg-12 "
        title="Countries Summary"
        bar={
          <SearchBar
            placeholder="Country quick search"
            value={term}
            onChange={handleChange}
          />
        }
        columns={cols}
      >
        {cols.length < 3 ? (
          <div className="country">
            <span
              id="world"
              style={{ color: "#5068e0", fontWeight: "bold" }}
              onClick={() => {
                setOverlay(true, "", "The world");
                fetchData();
                // executeScroll();
              }}
            >
              The globe
            </span>{" "}
            {[firstRow.total_cases, firstRow.deaths, firstRow.recovered].map(
              (i) => {
                return (
                  <span
                    key={i}
                    className="end"
                    style={{ fontWeight: "bolder" }}
                  >
                    {/* <CountUp
                    className="countEnd"
                    end={i}
                    duration={3}
                    separator=","
                    useEasing={true}
                  /> */}
                    {numFormatter(i)}
                  </span>
                );
              }
            )}
          </div>
        ) : (
          ""
        )}
        {filter.length ? (
          <CountryRow
            // executeScroll={() => executeScroll()}
            values={vals}
          />
        ) : (
          <Spinner />
        )}
      </Paper>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  all: selectAll,
  filter: selectFiltered,
  firstRow: selectFirstRow,
});

export default connect(mapStateToProps, {
  allCountriesData,
  fetchData,
  setOverlay,
})(CountriesList);
