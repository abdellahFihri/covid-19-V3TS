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

export const countryHistory = (data: any) => {
  return {
    type: "COUNTRY_HISTORY",
    payload: data,
  };
};
