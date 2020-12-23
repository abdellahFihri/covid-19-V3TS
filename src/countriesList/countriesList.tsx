import React, { useState, FunctionComponent } from "react";
import { connect } from "react-redux";
import SearchBar from "../hoc/searchbar/searchbar";
import Paper from "../hoc/paper/paper";
import Spinner from "../hoc/spinner/spinner";
import CountryRow from "../countryRow/countryRow";
import {
  allCountriesData,
  fetchData,
  setOverlay,
  setSearchTerm,
} from "../redux/actions";
import { Data } from "../utils/intefaces/interfaces";
import { createStructuredSelector } from "reselect";
import {
  selectAll,
  selectFiltered,
} from "../redux/reducers/allCountries/allCountriesDataSelector";
import { selectFirstRow } from "../redux/reducers/world/worldDataSelector";
import { numFormatter } from "../utils/utilities/helpers";
import { Link } from "react-router-dom";
import style from "./countriesList.module.scss";

interface Props {
  allCountriesData: (arg0: any) => void;
  cols: string[];
  detailed: boolean;
  vals: string[];
  countriesStats: any;
  world: { [key: string]: number | string | null }[];
  all: { [key: string]: number | string | null }[];
  filter: any;
  filtering: any;
  firstRow: any;
  dispatch: any;
  executeScroll?: any;
  fetchData: () => void;
  setOverlay: (arg0: boolean, arg1: string, arg2: string) => void;
  setSearchTerm: (arg0: string) => void;
}

const CountriesList: FunctionComponent<Props> = (props) => {
  const {
    firstRow,
    executeScroll,
    cols,
    vals,
    detailed,
    all,
    filter,
    fetchData,
    setOverlay,
    setSearchTerm,
  } = props;

  const [term, setTerm] = useState("");
  const handleChange = (event: { target: { value: string } }) => {
    const { allCountriesData } = props;
    // quick search for countries
    let term: string = event.target.value;

    term.length ? (term = term[0].toUpperCase() + term.slice(1)) : (term = "");

    setTerm(event.target.value);
    setSearchTerm(event.target.value);
    let arrayOfCountries: any = all;
    // filtering and returning a new array with countries matching the search term
    let filteredCountries: any[] = arrayOfCountries.filter(function (
      country: Data
    ) {
      return country.name.includes(term);
    });

    setTerm(event.target.value);
    setSearchTerm(event.target.value);
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
        values={vals}
        detailed={detailed}
      >
        {!detailed ? (
          <div className={style.country}>
            <Link to="/">
              <span
                id="world"
                style={{ color: "#5068e0", fontWeight: "bold" }}
                onClick={() => {
                  setOverlay(true, "", "The world");
                  fetchData();
                  executeScroll();
                }}
              >
                The globe
              </span>{" "}
            </Link>
            {[firstRow.total_cases, firstRow.deaths, firstRow.recovered].map(
              (i) => {
                return (
                  <span
                    key={i}
                    className={style.end}
                    style={{ fontWeight: "bolder" }}
                  >
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
            executeScroll={executeScroll ? executeScroll : ""}
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
  setSearchTerm,
})(CountriesList);
