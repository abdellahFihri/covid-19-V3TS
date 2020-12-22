import { Typography } from "@material-ui/core";
import React from "react";
import { Helmet } from "react-helmet";
import CountriesList from "../countriesList/countriesList";
import style from "./DetailedCountriesListPage.module.scss";
const DetailedCountriesList: React.FunctionComponent = () => (
  <React.Fragment>
    <Helmet>
      <html lang="en" />
      <meta charSet="utf-8" />
      <title>Covid-19 detailed countries list</title>
      <meta
        name="description"
        content="A page showing detailed covid-19 data for each country including number of total cases, deaths, active, critical and tests"
      />
      <meta
        content="covid 19 statistics, covid-19 dashboard, corona virus dashboard, covid 19 list of countries, countries detailed list, covid-19 countries list,all infected countries list, corona virus,corona virus full countries list"
        name="keywords"
      />
    </Helmet>
    <div id="main-title"> Detailed countries list</div>
    <Typography
      style={{
        padding: "0  10% 0 10%",
        fontSize: "14px",
        textAlign: "center",
        color: "#898989",
        lineHeight: "30px",
      }}
    >
      This is an expanded list of countries containing covid-19 totals for each
      country, use the quick search bar to find a specific country.
      <br />
      If the country name is clicked, you will be redirected to the country
      dashboard containing more detailed data.
    </Typography>
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
