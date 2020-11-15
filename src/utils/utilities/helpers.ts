import { regionHistory, WorldRequest } from "../../axios/axios";
// import { Data } from "../intefaces/interfaces";


import _ from "lodash";

require("dotenv").config();

export const getInitialStats = async () => {
  function worldStats() {
    return WorldRequest.get("summary/latest");
  }

  function allSpots() {
    return WorldRequest.get("spots/summary");
  }
  const world: any = await worldStats();
  const worldSummary: any = world.data.data.summary;
  const worldDaily: any = world.data.data.change;
  const regions: any = world.data.data.regions;
  let countriesArray: any[] = [];
  _.forEach(regions, function (key, value) {
    countriesArray.push(key);
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

  return [worldData, countriesArray, worldHistoryArr];
};
export const selectedCountryData = async (selected: string) => {

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

  let year = await AllYear();
  let month = await AllMonth();
  
  let selectedCountry = await summaryCountry();

  return [
    selectedCountry.data.data,
    ...[ month, year].map((res) =>
      _.reverse(refactorResponseData(res.data.data))
    ),
  ];
};



export const indexing = (total: number, added: number) => {
  let value: number;
  total > added
    ? (value = (added * 100) / total)
    : (value = (total * 100) / added);
  return Math.round(value * 100) / 100;
};

export const refactorResponseData = (res: any) => {
  let refactored: any = [];
  _.forEach(res, function (key, value) {
    key.date = value;
    refactored.push(key);
    return refactored;
  });
  // console.log("refactored", refactored);
  return refactored;
};
export const refactorRadar = (res: any,initial:string) => {
  let refactored: any = [];
  _.forEach(res, function (key, value) {
    // key = value;
    refactored.push({ [`${initial}`]:key,subject:value.replace(/_/g,' ').split(' ')[0]});
    return refactored;
  });
  // console.log("refactored", refactored);
  // return _.orderBy(refactored, [`${initial}`], ['desc']);

  let unnecessaryWords = ['iso3166a2', 'iso3166a3', 'tested','recovery','death','name','change','iso3166numeric'];
  
  let betterWords =  _.orderBy(refactored, ['subject', 'desc']).filter(function (el: any) {
    return !unnecessaryWords.includes(el.subject)
  })
  return betterWords
  
  // return refactored;
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
 
  difference = _.dropRight(difference);
  difference = _.reverse(difference);
  difference= _.remove(difference, function (n) {
      return n[`${prop}`] > -1 
  });
  return difference
};


export const numFormatter = (value: number) => {
  if (value >= 1000000000) {
    return (value / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
  }
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return value;
};

export const timeFormatter = (value: any) => {
  const d = new Date(value);

  const mo = new Intl.DateTimeFormat("en", {
    month: "short",
  }).format(d);
  const da = new Intl.DateTimeFormat("en", {
    day: "2-digit",
  }).format(d);
  return `${da}/${mo}`;
};

export const reverseData = (data: any) => {
  return _.reverse(data)
}

export const  merging = (history:any) => {
  let total2: any[] = [];

  for (let i = 0; i < history[1].length; i++) {
    if (!history[1][i].date || !history[0][i]) {
      continue;
    }
    let merge = {
      date: history[0][i].date,
      total_cases: history[0][i].total_cases,
      recovered: history[1][i].recovered,
    };
    total2.push(merge);
  }
  return total2;
};


export const mergeRadarData = (country1: any, country2: any) => {
  let total2: any[] = [];

  for (let i = 0; i < country1.length; i++) {
    if (!country2 || country1[i].subject!==country2[i].subject ) {
      continue;
    }
    let merge = Object.assign({}, country1[i], country2[i])
    total2.push(merge);
  }
  return total2;
 
  // let unnecessaryWords = ['iso3166a2', 'iso3166a3', 'tested','recovery ratio','death ratio','name','change','iso3166numeric'];
  
  // let betterWords = total2.filter(function (el: any) {
  //   return !unnecessaryWords.includes(el.subject)
  // })
  // return betterWords
}

export const  numberWithCommas = (x:any) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}