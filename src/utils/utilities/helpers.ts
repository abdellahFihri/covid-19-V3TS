import { CovidRequest } from "../../axios/axios";
import { Data, Response } from "../intefaces/interfaces";
import _ from "lodash";

export const getInitialStats = () => {
  function worldStat() {
    return CovidRequest.get("worldstat.php");
  }
  function countriesStat() {
    return CovidRequest.get("cases_by_country.php");
  }
  return Promise.all([worldStat(), countriesStat()]).then(function (
    results: Data[]
  ) {
    return results;
  });
};

export const selectedCountry = (selected: string) => {
  function countryStats() {
    return CovidRequest.get("latest_stat_by_country.php", {
      params: {
        country: `${selected}`,
      },
    });
  }
  function countryHistory() {
    return CovidRequest.get("cases_by_particular_country.php", {
      params: {
        country: `${selected}`,
      },
    });
  }
  return Promise.all([countryStats(), countryHistory()]).then(function (
    results: Data[]
  ) {
    return results;
  });
};

export const extractProps = (results: Data) => {
  const data: Data = _.pick(
    results,

    [
      "total_cases",
      "new_cases",
      "active_cases",
      "total_deaths",
      "new_deaths",
      "total_recovered",
      "serious_critical",
      "total_cases_per1m",
      "statistic_taken_at",
    ]
  );

  return data;
};

export const historyData = (filteredData: any[]) => {
  return [
    filteredData.map((day: Response) => day.total_cases.replace(/,/g, "")),
    filteredData.map((day: Response) => day.active_cases.replace(/,/g, "")),
    filteredData.map((day: Response) => day.total_recovered.replace(/,/g, "")),
    filteredData.map((day: Response) => day.serious_critical.replace(/,/g, "")),
    filteredData.map((day: Response) => day.total_deaths.replace(/,/g, "")),
    filteredData.map((day: Response) => day.record_date),
  ];
};
