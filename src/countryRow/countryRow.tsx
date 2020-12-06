import React, { FunctionComponent } from "react";
import style from "./countryRow.module.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { numberWithCommas, numFormatter } from "../utils/utilities/helpers";
import { fetchCountryData, setOverlay } from "../redux/actions/index";
import { selectFiltered } from "../redux/reducers/allCountries/allCountriesDataSelector";
import { createStructuredSelector } from "reselect";
// import { findIso } from "../utils/utilities/helpers";
interface Props {
  countriesStats: { [key: string]: number | string | null }[];
  selectedCountry: (arg0: string, arg1: string) => void;

  dispatch: any;
  filtered: any;
  executeScroll: any;
  values: string[];
}

const CountryRow: FunctionComponent<Props> = (props) => {
  const {
    filtered,
    // executeScroll,
    values,
  } = props;

  return filtered.map((country: any, index: any) => {
    const extractValues = values.map((value: string) => country[`${value}`]);

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
            <Link to={`/${country.name}`}>
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
            </Link>
            <div className={style.img}>
              <img
                src={`https://flagcdn.com/${country.iso3166a2.toLocaleLowerCase()}.svg`}
                width="40"
                alt=""
              />
              {/* <img
                src={`https://flagcdn.com/16x12/${country.iso3166a2}.png`}
                srcSet={`https://flagcdn.com/32x24/${country.iso3166a2}.png 2x,
    https://flagcdn.com/48x36/${country.iso3166a2}.png 3x`}
                alt="South Africa"
                height="16"
                width="16"
              /> */}
            </div>
          </div>
        </span>

        {extractValues.map((end) => {
          return (
            <span key={Math.random()} className={`${style.end} endFull`}>
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
