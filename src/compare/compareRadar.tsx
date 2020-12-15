import * as React from "react";
import style from "./compareRadar.module.scss";
import ComboBox from "../hoc/autoComplete/autoComplete";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {
  selectRadarData,
  selectSelectedCountry,
} from "../redux/reducers/world/worldDataSelector";

import { mergeRadarData } from "../utils/utilities/helpers";

import {
  selectIso_1,
  selectIso_2,
  selectCountryData_1,
  selectCountryData_2,
  selectCountryName_1,
  selectCountryName_2,
} from "../redux/reducers/comparableCountries/comparableCountriesSelector";
import { lazy, Suspense } from "react";
import { Spinner } from "reactstrap";
interface Props {
  comparable_1: { [key: string]: number | string | null }[];
  comparable_2: { [key: string]: number | string | null }[];
  country_1: string;
  country_2: string;
  iso1: string;
  iso2: string;
}
const RadarRatio = lazy(() => import("../chart/radar/radar"));
const CompareRadar: React.FunctionComponent<Props> = (props) => {
  const {
    comparable_1,
    comparable_2,
    country_1,
    country_2,
    iso1,
    iso2,
  } = props;
  const mergedData = React.useMemo(
    () => mergeRadarData(comparable_1, comparable_2),
    [comparable_1, comparable_2]
  );

  return (
    <div className={style.compareRadar}>
      <h6>Compare countries </h6>
      <div className={style.comboBox}>
        <ComboBox id="first" label="Option 1" />
        <ComboBox id="second" label="Option 2" />
      </div>
      {mergedData.length ? (
        <Suspense
          fallback={
            <div className={style.spinner}>
              {" "}
              <Spinner
                style={{ width: "3rem", height: "3rem", color: "#3F51B5" }}
              />{" "}
            </div>
          }
        >
          <RadarRatio
            data={mergedData}
            comparable={comparable_2 ? true : false}
            country1={country_1}
            country2={country_2}
            iso1={iso1}
            iso2={iso2}
            filling2="#1d89e8"
          />
        </Suspense>
      ) : (
        ""
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  radarData: selectRadarData,
  country: selectSelectedCountry,
  comparable_1: selectCountryData_1,
  comparable_2: selectCountryData_2,
  country_1: selectCountryName_1,
  country_2: selectCountryName_2,
  iso1: selectIso_1,
  iso2: selectIso_2,
});
export default connect(mapStateToProps)(CompareRadar);
