import React, { FunctionComponent } from "react";
import style from "./countryRow.module.scss";
import { connect } from "react-redux";
import { numberWithCommas, numFormatter } from "../utils/utilities/helpers";
import { fetchCountryData, setOverlay } from "../redux/actions/index";
import { selectFiltered } from "../redux/reducers/allCountries/allCountriesDataSelector";
import { createStructuredSelector } from "reselect";
// import { findIso } from "../utils/utilities/helpers";
interface Props {
  countriesStats: any;
  selectedCountry: (arg0: string, arg1: string) => void;
  onFetchCountryData: any;
  dispatch: any;
  filtered: any;
  executeScroll: any;
  values: string[];
}

const CountryRow: FunctionComponent<Props> = (props) => {
  const { filtered, executeScroll, values } = props;

  return filtered.map((country: any, index: any) => {
    const extractValues = values.map((value: string) => country[`${value}`]);
    // console.log("findIso ", findIso(country.country_name));
    return (
      <div
        className={`${style.country} ${index % 2 !== 0 ? style.dark : ""}`}
        key={country.name}
      >
        <span
          style={{
            display: "flex",
            width: "25%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", width: "65px" }}>
            <button
              className={style.button}
              onClick={() => {
                props.dispatch(
                  setOverlay(true, country.iso3166a2, country.name)
                );
                props.dispatch(
                  fetchCountryData({
                    name: country.name,
                    iso: country.iso3166a2,
                  })
                );
                // executeScroll();
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
          </div>
        </span>

        {extractValues.map((end) => {
          return (
            <span key={end} className={`${style.end} endFull`}>
              {extractValues.length > 3
                ? numberWithCommas(end)
                : numFormatter(end)}
            </span>
          );
        })}
      </div>
    );
  });
};

const mapStateToProps = createStructuredSelector({
  filtered: selectFiltered,
});
export default connect(mapStateToProps)(CountryRow);
