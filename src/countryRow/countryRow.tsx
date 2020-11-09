import React, { FunctionComponent } from "react";
import style from "./countryRow.module.scss";
import { connect } from "react-redux";
import { numberWithCommas } from "../utils/utilities/helpers";
import { fetchCountryData,setOverlay } from "../redux/actions/index";
// import { findIso } from "../utils/utilities/helpers";
interface Props {
  countriesStats: any;
  selectedCountry: (arg0: string, arg1: string) => void;
  onFetchCountryData: any;
  dispatch: any;
}

const CountryRow: FunctionComponent<Props> = (props) => {
  const { filter } = props.countriesStats.allCountriesStats;
  return filter.map((country: any,index:any) => {
    // console.log("findIso ", findIso(country.country_name));
    return (
      <div className={`${style.country} ${index % 2!==0?style.dark:''}`} key={country.name}>
        
        <button
          className={style.button}
          onClick={() => {props.dispatch(setOverlay(true, country.iso3166a2,country.name))
            props.dispatch(fetchCountryData({ name: country.name, iso: country.iso3166a2 }))
          }}
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

        {[{ val: country.total_cases, i: 0 }, { val: country.deaths, i: 1 }, { val:country.recovered,i:2 }].map((end) => {
          return (
            <span key={end.i} className={style.end}>
              {numberWithCommas(end.val)}
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
// const mapDispatchprops = (dispatch:any) => {
//   return { onFetchCountryData: () => dispatch(fetchCountryData()) }
// }


export default connect(mapStateToProps)(CountryRow);
