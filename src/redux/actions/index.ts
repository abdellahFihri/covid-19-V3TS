import { getInitialStats,selectedCountryData } from "../../utils/utilities/helpers";

export const chartData = (data: any) => {
  return {
    type: "CHART_DATA",
    payload: data,
  };
};

export const TodayWorldData = (data: any) => {
  return {
    type: "WORLD_DATA",
    payload: data,
  };
};

export const allCountriesData = (data: any) => {
  return {
    type: "ALL_COUNTRIES-DATA",
    payload: data,
  };
};



export const mainChartHistory = (data: any) => {
  return {
    type: "MAIN_CHART_HISTORY",
    payload:data,
  }
  
}

export const setPeriod = (data: any) => {
  return {
    type: "SET_PERIOD",
    payload:data,
  }
  
}


export const fetchData = () => {
  return async (dispatch: any) => {
    const results = await getInitialStats();
    dispatch({ type: 'FETCH_DATA', data: results });
  }
}
 

export const fetchCountryData = (country:any) => {
  return async (dispatch: any) => {
    const results = await selectedCountryData(country.name);
    dispatch({ type: 'FETCH_COUNTRY_DATA', payload: { data: results, iso: country.iso,selectedCountry:country.name } });
  }
}