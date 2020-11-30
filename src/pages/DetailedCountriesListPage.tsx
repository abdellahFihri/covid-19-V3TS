import React from "react";
import Container from "../hoc/container/container";
import CountriesList from "../countriesList/countriesList";

const DetailedCountriesList = () => (
  <Container>
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
    />
  </Container>
);
export default DetailedCountriesList;
