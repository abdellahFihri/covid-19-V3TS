import React, { FunctionComponent } from "react";
import style from "./countryRow.module.scss";
import { connect } from "react-redux";
import {numberWithCommas} from "../utils/utilities/helpers";
// import { findIso } from "../utils/utilities/helpers";
interface Props {
  countriesStats: any;
  selectedCountry: (arg0: string, arg1: string) => void;
}

const CountryRow: FunctionComponent<Props> = (props) => {
  const { filter } = props.countriesStats.allCountriesStats;
  return filter.map((country: any) => {
    // console.log("findIso ", findIso(country.country_name));
    return (
      <div className={style.country} key={country.name}>
        
        <button
          className={style.button}
          onClick={() => props.selectedCountry(country.name, country.iso3166a2)}
          id={country.name}
        >
          <span className={style.span}>
            {country.iso3166a3 ? country.iso3166a3 : country.name}
          </span>{" "}
        </button>
        <div className={style.img}>
          <img
            src={`https://www.countryflags.io/${country.iso3166a2}/flat/32.png`}
            alt=""
          />
        </div>

        {[country.total_cases, country.deaths, country.recovered].map((end) => {
          return (
            <span key={end} className={style.end}>
              {numberWithCommas(end)}
            </span>
          );
        })}
      </div>
    );
  });
};
const mapStateToProps = (state: any) => {
  return {
    countriesStats: state.allCountries,
  };
};

export default connect(mapStateToProps)(CountryRow);
