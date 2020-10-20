import { WorldRequest } from "../../axios/axios";
import { Data, Response } from "../intefaces/interfaces";
// import lookup from "country-code-lookup";
// import countryList, { getCode } from "country-list";
// import { missingCountries } from "../data/correctedCountries";
// import axios from "axios";
import _ from "lodash";

require("dotenv").config();

// const missingFlags = (land: any, landsArray: any) => {
//   let term: string = land;
//   const arr: any = landsArray;
//   let result: any = arr.filter(function (country: any) {
//     return country.name.includes(term);
//   });

//   if (result[0]) {
//     return result[0].code;
//   }
// };

// export const getInitialStats = () => {
//   function worldStat() {
//     return CovidRequest.get("worldstat.php");
//   }
//   function countriesStat() {
//     return CovidRequest.get("cases_by_country.php");
//   }
//   return Promise.all([worldStat(), countriesStat()]).then(function (
//     results: Data[]
//   ) {
//     const data: Data = extractProps(results[0].data);
//     const {
//       data: { countries_stat },
//     } = results[1];
//     // removing commas from the values
//     const dataArray: string[] = Object.values(data).map((val: string) =>
//       val.replace(/,/g, "")
//     );
//     return [data, countries_stat, dataArray];
//   });
// };
export const getInitialStats = async () => {
  function worldStats() {
    return WorldRequest.get("summary/latest");
  }

  function allSpots() {
    return WorldRequest.get("spots/summary");
  }
  const world: any = await worldStats();
  const worldSummary: any = extractProps(world.data.data.summary);
  const worldDaily: any = extractProps(world.data.data.change);
  const regions: any = world.data.data.regions;
  let countriesArray: any[] = [];
  _.forEach(regions, function (key, value) {
    countriesArray.push(extractProps(key));
    return countriesArray;
  });
  // console.log("countries array ", countriesArray);
  const worldData: any[] = [worldSummary, worldDaily];

  const worldHistory: any = await allSpots();
  let worldHistoryArr: any[] = [];
  _.forEach(worldHistory.data.data, function (key, value) {
    key.date = value;
    worldHistoryArr.push(key);

    return worldHistoryArr;
  });
  // console.log("world combined", worldData);
  // console.log;
  return [worldData, countriesArray, worldHistoryArr];
};
export const selectedCountryData = async (selected: string) => {
  // function countryStats() {
  //   return CovidRequest.get("latest_stat_by_country.php", {
  //     params: {
  //       country: `${selected}`,
  //     },
  //   });
  // const data: Data = extractProps(results[0].data.latest_stat_by_country[0]);
  // iterate in data object to remove the commas from the values
  // const dataArray: any[] = Object.values(data).map((val) =>
  //   val.replace(/,/g, "")
  // );
  function summaryCountry() {
    return WorldRequest.get("summary/region", {
      params: {
        region: `${selected.toLocaleLowerCase()}`,
      },
    });
  }
  function AllYear() {
    return WorldRequest.get("spots/year", {
      params: {
        region: `${selected.toLocaleLowerCase()}`,
      },
    });
  }
  function AllMonth() {
    return WorldRequest.get("spots/month", {
      params: {
        region: `${selected.toLocaleLowerCase()}`,
      },
    });
  }
  function AllWeek() {
    return WorldRequest.get("spots/week", {
      params: {
        region: `${selected.toLocaleLowerCase()}`,
      },
    });
  }
  let year = await AllYear();
  let week = await AllWeek();
  let month = await AllMonth();
  let selectedCountry = await summaryCountry();

  return [
    selectedCountry.data.data,
    ...[week, month, year].map((res) =>
      _.reverse(refactorResponseData(res.data.data))
    ),
  ];
};

export const extractProps = (results: Data) => {
  const data: Data = _.pick(
    results,

    [
      "name",
      "iso3166a2",

      "total_cases",
      // "new_cases",
      "active_cases",
      // "total_deaths",
      "deaths",
      // "new_deaths",
      // "total_recovered",
      "recovered",
      // "serious_critical",
      "critical",
      "tested",
      "change",
      // "total_cases_per_1m_population",
      // "total_cases_per1m",
      // "statistic_taken_at",
      // "record_date",
    ]
  );

  return data;
};

// export const refactorChartData = (data: any) => {
//   const { active_cases, total_recovered, total_deaths } = data;
//   const dataArray = [
//     active_cases,
//     total_recovered,
//     total_deaths,
//   ].map((number) => parseFloat(number.replace(/,/g, "")));
//   return dataArray;
// };

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

// export const findIso = (country: string) => {
//   let iso: any;
//   !lookup.byCountry(country)
//     ? (iso = getCode(country))
//     : (iso = lookup.byCountry(country).iso2);
//   if (!iso && lookup.byInternet(country)) {
//     iso = lookup.byInternet(country).iso2;
//   }
//   if (!iso && lookup.byFips(country)) {
//     iso = lookup.byFips(country).iso2;
//   }

//   if (!iso) {
//     let code: any;
//     if (missingFlags(country, missingCountries)) {
//       code = missingFlags(country, missingCountries);
//       console.log("code in se fun ", code);
//       iso = lookup.byIso(code);
//       !iso ? (iso = code) : (iso = lookup.byIso(code).iso2);
//       console.log("iso in func 2", iso);

//       return iso;
//     }
//     if (missingFlags(country, countryList.getData())) {
//       code = missingFlags(country, countryList.getData());
//       iso = lookup.byIso(code).iso2;
//       return iso;
//     }
//   }

//   return iso;
// };
export const indexing = (total: number, added: number) => {
  let value: number;
  total > added
    ? (value = (added * 100) / total)
    : (value = (total * 100) / added);
  return Math.round(value * 100) / 100;
};

const refactorResponseData = (res: any) => {
  let refactored: any = [];
  _.forEach(res, function (key, value) {
    key.date = value;
    refactored.push(key);
    return refactored;
  });
  // console.log("refactored", refactored);
  return refactored;
};

export const extractDifferences = (data: any, prop: string) => {
  // let comparableArr = data.map((el: any) => el[`${prop}`]);
  let comparableArr = data;

  let mockUpArr = [
    {
      total_cases: 0,
      deaths: 0,
      recovered: 0,
      critical: 0,
      tested: 0,
      date: "01/20/2020",
      death_ratio: 0,
      recovery_ratio: 0,
    },
    ...comparableArr,
  ];

  let i: number;
  let difference: any[] = [];
  for (i = 0; i < comparableArr.length; ++i) {
    let diff = mockUpArr[i][`${prop}`] - comparableArr[i][`${prop}`];
    let newPeriod = { date: mockUpArr[i].date, [`${prop}`]: diff };
    difference.push(newPeriod);
  }
  // difference = _.remove(difference, function (n) {
  //   return n >= 0;
  // });
  // return _.dropRight(_.reverse(difference));
  return _.remove(_.dropRight(_.reverse(difference)), function (n) {
    return n[`${prop}`] > 0;
  });
};

// export const getDaily = (data: any, prop: string) => {
//   return _.remove(
//     extractDifferences(_.dropRight(_.reverse(data), 1), prop),
//     function (n) {
//       return n[`${prop}`] > 0;
//     }
//   );
// };
