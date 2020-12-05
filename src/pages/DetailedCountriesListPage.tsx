import React from "react";

import CountriesList from "../countriesList/countriesList";
import style from "./DetailedCountriesListPage.module.scss";
const DetailedCountriesList: React.FunctionComponent = () => (
  <React.Fragment>
    <div id="main-title"> Detailed countries list</div>
    <div className={style.listContainer}>
      <div className={style.countriesTable}>
        <CountriesList
          cols={[
            "Country",
            "Cases",
            "Deaths",
            "Recovered",
            "Active",
            "Critical",
            "Tested",
          ]}
          vals={[
            "total_cases",
            "deaths",
            "recovered",
            "active_cases",
            "critical",
            "tested",
          ]}
          detailed={true}
        />
      </div>
    </div>
  </React.Fragment>
);
export default DetailedCountriesList;
