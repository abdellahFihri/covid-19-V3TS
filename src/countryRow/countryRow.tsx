import React, { FunctionComponent } from "react";
import style from "./countryRow.module.scss";
import { connect } from "react-redux";
import { findIso } from "../utils/utilities/helpers";
interface Props {
  countriesStats: any;
  selectedCountry: (arg0: string) => void;
}

const CountryRow: FunctionComponent<Props> = (props) => {
  const { filter } = props.countriesStats.allCountriesStats;
  return filter.map((country: any) => {
    // console.log("findIso ", findIso(country.country_name));
    return (
      <div className={style.country} key={Math.random()}>
        <button
          className={style.button}
          onClick={() => props.selectedCountry(country.country_name)}
          id={country.country_name}
        >
          <span className={style.span}>{country.country_name}</span>{" "}
        </button>

        {[country.cases, country.deaths, country.total_recovered].map((end) => {
          return (
            <span key={Math.random()} className={style.end}>
              {end.replace(/,/g, ".")}
            </span>
          );
        })}
        <div className={style.img}>
          <img
            src={`https://www.countryflags.io/${findIso(
              country.country_name
            )}/flat/32.png`}
            alt=""
          />
        </div>
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
