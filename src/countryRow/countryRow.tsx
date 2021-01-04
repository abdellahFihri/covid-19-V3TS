import React, { FunctionComponent } from "react";
import style from "./countryRow.module.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { numberWithCommas, numFormatter } from "../utils/utilities/helpers";
import { fetchCountryData, setOverlay } from "../redux/actions/index";
import {
  listFiltering,
  selectFiltered,
} from "../redux/reducers/allCountries/allCountriesDataSelector";
import { createStructuredSelector } from "reselect";
import _ from "lodash";

interface Props {
  countriesStats: { [key: string]: number | string | null }[];
  selectedCountry: (arg0: string, arg1: string) => void;

  dispatch: any;
  filtered: any;
  executeScroll?: any;
  values: string[];
  filtering: any;
}

const CountryRow: FunctionComponent<Props> = (props) => {
  const { filtered, executeScroll, values, filtering } = props;

  const countriesList: any = _.orderBy(
    filtered,
    [filtering.value],
    [filtering.operator]
  );
  return countriesList.map((country: any, index: any) => {
    const extractValues = values.map((value: string) => country[`${value}`]);

    return (
      <div
        className={`${style.country} ${index % 2 !== 0 ? style.dark : ""}`}
        key={country.name}
        // style={{
        //   background: `linear-gradient(to right, transparent, #a0aef53c),  url(https://flagcdn.com/${country.iso3166a2.toLocaleLowerCase()}.svg)`,
        //   backgroundPosition: "center",
        //   backgroundSize: "cover",
        // }}
      >
        <span
          style={{
            display: "flex",

            width: "25%",
            height: "100%",
            alignItems: "center",
            justifyContent: "start",
            background: `linear-gradient(to left, transparent, white),  url(https://flagcdn.com/${country.iso3166a2.toLocaleLowerCase()}.svg)`,
            backgroundPosition: "center",
            backgroundSize: "cover",

            clipPath: "polygon(0 0, 100% 0%, 66% 100%, 0% 100%)",
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
                  if (executeScroll === "") {
                    return;
                  } else {
                    executeScroll();
                  }
                }}
                id={country.name}
              >
                <span className={style.span}>
                  {country.iso3166a3 ? country.iso3166a3 : country.name}
                </span>{" "}
              </button>
            </Link>
            {/* <div className={style.img}>
              <img
                src={`https://flagcdn.com/${country.iso3166a2.toLocaleLowerCase()}.svg`}
                width="40"
                alt=""
              />
            </div> */}
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
  filtering: listFiltering,
});
export default connect(mapStateToProps)(CountryRow);
