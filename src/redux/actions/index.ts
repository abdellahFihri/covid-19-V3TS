import {
  getInitialStats,
  selectedCountryData,
} from "../../utils/utilities/helpers";

export const allCountriesData = (data: any) => {
  return {
    type: "ALL_COUNTRIES-DATA",
    payload: data,
  };
};

export const setPeriod = (data: any) => {
  return {
    type: "SET_PERIOD",
    payload: data,
  };
};

export const fetchData = () => {
  return async (dispatch: any) => {
    const results = await getInitialStats();
    dispatch({ type: "FETCH_DATA", data: results });
  };
};

export const fetchCountryData = (country: any) => {
  return async (dispatch: any) => {
    const results = await selectedCountryData(country.name);
    dispatch({
      type: "FETCH_COUNTRY_DATA",
      payload: {
        data: results,
        iso: country.iso,
        selectedCountry: country.name,
      },
    });
  };
};

export const setOverlay = (overlay: boolean, iso: string, country: string) => {
  return {
    type: "SET_OVERLAY",
    payload: { overlay, iso, country },
  };
};

export const setCumulative = () => {
  return {
    type: "SET_CUMULATIVE",
  };
};

export const setComparable = (data: any) => {
  return {
    type: `${data.id === "first" ? "SET_OPTION_1" : "SET_OPTION_2"}`,
    payload: data.country,
  };
};
