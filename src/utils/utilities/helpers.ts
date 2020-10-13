import { CovidRequest, WorldRequest } from "../../axios/axios";
import { Data, Response } from "../intefaces/interfaces";
import lookup from "country-code-lookup";
import countryList, { getCode } from "country-list";
import { missingCountries } from "../data/correctedCountries";

import _ from "lodash";

require("dotenv").config();

const missingFlags = (land: any, landsArray: any) => {
  let term: string = land;
  const arr: any = landsArray;
  let result: any = arr.filter(function (country: any) {
    return country.name.includes(term);
  });

  if (result[0]) {
    return result[0].code;
  }
};

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
    const data: Data = extractProps(results[0].data);
    const {
      data: { countries_stat },
    } = results[1];
    // removing commas from the values
    const dataArray: string[] = Object.values(data).map((val: string) =>
      val.replace(/,/g, "")
    );
    return [data, countries_stat, dataArray];
  });
};

export const selectedCountryData = (selected: string) => {
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
    const data: Data = extractProps(results[0].data.latest_stat_by_country[0]);
    // iterate in data object to remove the commas from the values
    const dataArray: any[] = Object.values(data).map((val) =>
      val.replace(/,/g, "")
    );
    return [data, dataArray, results[1]];
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
      "total_cases_per_1m_population",
      "total_cases_per1m",
      "statistic_taken_at",
      "record_date",
    ]
  );

  return data;
};

export const refactorChartData = (data: any) => {
  const { active_cases, total_recovered, total_deaths } = data;
  const dataArray = [
    active_cases,
    total_recovered,
    total_deaths,
  ].map((number) => parseFloat(number.replace(/,/g, "")));
  return dataArray;
};

export const historyData = (filteredData: any[]) => {
  const toSlice: any[] = [
    filteredData.map((day: Response) => day.total_cases.replace(/,/g, "")),
    // filteredData.map((day: Response) => day.new_cases.replace(/,/g, "")),
    filteredData.map((day: Response) => day.active_cases.replace(/,/g, "")),
    // filteredData.map((day: Response) => day.new_cases.replace(/,/g, "")),
    filteredData.map((day: Response) => day.total_recovered.replace(/,/g, "")),
    filteredData.map((day: Response) => day.serious_critical.replace(/,/g, "")),
    // filteredData.map((day: Response) => day.serious_critical.replace(/,/g, "")),
    filteredData.map((day: Response) => day.total_deaths.replace(/,/g, "")),
    // filteredData.map((day: Response) => day.new_deaths.replace(/,/g, "")),
    filteredData.map((day: Response) => day.record_date),
  ];

  // return toSlice.map((el) => _.take(el, 30));
  return toSlice;
};

export const filterHistory = (data: any) => {
  data.map(
    (item: { record_date: string | any[] }) =>
      (item.record_date = item.record_date.slice(0, 10))
  );
  // removing duplicate objects by defining record date as unique key
  return historyData(_.uniqBy(data, "record_date"));
};

export const findIso = (country: string) => {
  let iso: any;
  !lookup.byCountry(country)
    ? (iso = getCode(country))
    : (iso = lookup.byCountry(country).iso2);
  if (!iso && lookup.byInternet(country)) {
    iso = lookup.byInternet(country).iso2;
  }
  if (!iso && lookup.byFips(country)) {
    iso = lookup.byFips(country).iso2;
  }

  if (!iso) {
    let code: any;
    if (missingFlags(country, missingCountries)) {
      code = missingFlags(country, missingCountries);
      console.log("code in se fun ", code);
      iso = lookup.byIso(code);
      !iso ? (iso = code) : (iso = lookup.byIso(code).iso2);
      console.log("iso in func 2", iso);

      return iso;
    }
    if (missingFlags(country, countryList.getData())) {
      code = missingFlags(country, countryList.getData());
      iso = lookup.byIso(code).iso2;
      return iso;
    }
  }

  return iso;
};
