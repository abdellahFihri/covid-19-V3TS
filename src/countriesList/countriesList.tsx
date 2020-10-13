import React, { useState, FunctionComponent } from "react";
import { connect } from "react-redux";
import SearchBar from "../hoc/searchbar/searchbar";
import Paper from "../hoc/paper/paper";
import Spinner from "../hoc/spinner/spinner";
import CountryRow from "../countryRow/countryRow";
import CountUp from "react-countup";
import { allCountriesData } from "../redux/actions";
import { Data } from "../utils/intefaces/interfaces";
interface Props {
  allCountriesData: (arg0: any) => void;
  handleReset: () => void;
  countriesStats: any;
  world: any;
  handleSelectedCountry: (arg0: string) => void;

  // worldRow:any
}

const CountriesList: FunctionComponent<Props> = (props) => {
  const { worldRow } = props.world.world;
  const { filter } = props.countriesStats.allCountriesStats;
  const [term, setTerm] = useState("");
  const handleChange = (event: { target: { value: string } }) => {
    const { allCountriesData } = props;
    // quick search for countries
    let term: string = event.target.value;

    term.length ? (term = term[0].toUpperCase() + term.slice(1)) : (term = "");

    setTerm(event.target.value);

    let arrayOfCountries: Data = props.countriesStats.allCountriesStats.all;
    // filtering and returning a new array with countries matching the search term
    let filteredCountries: any[] = arrayOfCountries.filter(function (
      country: Data
    ) {
      return country.country_name.includes(term);
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
        col1="Country"
        col2="Cases"
        col3="Deaths"
        col4="Recovered"
      >
        <div className="country">
          <span id="world" onClick={props.handleReset}>
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
          <CountryRow selectedCountry={props.handleSelectedCountry} />
        ) : (
          <Spinner />
        )}
      </Paper>
    </div>
  );
};
const mapStateToProps = (state: any) => {
  return {
    countriesStats: state.allCountries,
    world: state.world,
  };
};

export default connect(mapStateToProps, { allCountriesData })(CountriesList);
