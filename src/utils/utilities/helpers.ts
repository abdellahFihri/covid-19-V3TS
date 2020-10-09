import { CovidRequest } from "../../axios/axios";
import { Data, Response } from "../intefaces/interfaces";
import lookup from "country-code-lookup";
import countryList, { getCode } from "country-list";
import { missingCountries } from "../data/correctedCountries";

import _ from "lodash";

require("dotenv").config();

const missingFlags = (land: any, isoCode: any, landsArray: any) => {
  let term: string = land;
  const arr: any = landsArray;
  let result: any = arr.filter(function (country: any) {
    return country.name.includes(term);
  });

  if (result[0]) {
    // console.log("result", result[0].code);
    // isoCode = lookup.byIso(result[0].code).iso2;
    // console.log("isoCode ", isoCode);
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
    return results;
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
    console.log("history ", results);
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
  // if (!iso && country.length <= 3) {
  //   let code: string;
  //   switch (country) {
  //     case "UAE":
  //       code = lookup.byIso("AE").country;
  //       break;
  //     case "DRC":
  //       code = lookup.byIso("CD").country;
  //       break;
  //     case "CAR":
  //       code = lookup.byIso("CF").country;
  //       break;
  //     default:
  //       code = lookup.byIso(country).country;
  //   }
  //   iso = lookup.byCountry(code).iso2;
  // }

  if (!iso) {
    // let term: string = country;
    // const arr: any = countryList.getData();
    // let result: any = arr.filter(function (country: any) {
    //   return country.name.includes(term);
    // });

    // if (result[0]) {
    //   console.log("result", result[0].code);
    //   iso = lookup.byIso(result[0].code).iso2;
    //   console.log("iso ", iso);
    //   return iso;
    // }
    // if (result.length) {
    //   console.log(result[0])
    // }
    // console.log(
    //   "first fun flag ",
    //   missingFlags(country, iso, countryList.getData())
    // );
    // if (!missingFlags(country, iso, countryList.getData())) {
    //   missingFlags(country, iso, missingCountries);
    // }
    // console.log(
    //   "first func ",
    //   missingFlags(country, iso, countryList.getData())
    // );
    // console.log("missn countries ", missingCountries);
    // return missingFlags(country, iso, missingCountries) === undefined
    //   ? missingFlags(country, iso, countryList.getData())
    //   : // : missingFlags(country, iso, countryList.getData());
    //     missingFlags(country, iso, missingCountries);
    let code: any;
    if (
      // missingFlags(country, iso, countryList.getData()) === undefined &&
      missingFlags(country, iso, missingCountries)
    ) {
      code = missingFlags(country, iso, missingCountries);
      console.log("code in se fun ", code);
      iso = lookup.byIso(code);
      !iso ? (iso = code) : (iso = lookup.byIso(code).iso2);
      console.log("iso in func 2", iso);
      // iso = lookup.byIso(code.toString()).iso2;
      return iso;
    }
    if (missingFlags(country, iso, countryList.getData())) {
      code = missingFlags(country, iso, countryList.getData());
      iso = lookup.byIso(code).iso2;
      return iso;
    }
  }
  // if (iso === undefined || iso === null) {
  //   console.log("missin", missingCountries);
  //   return missingFlags(country, iso, missingCountries);
  // }
  // console.log("sec function", missingFlags(country, iso, missingCountries));
  return iso;
};

// [korea diamon prinvess channel islands faeroe islands carabean ntherlands st vincent grenadines st barth sint piere miquelon vatican zaandam
/* */
