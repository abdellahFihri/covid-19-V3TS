import {
  comparedCountriesHistory,
  getInitialStats,
  selectedCountryData,
  selectedCountryDate,
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
export const setTableFilter = (data: any) => {
  return {
    type: "SET_FILTER",
    payload: data,
  };
};

export const fetchData = () => {
  return async (dispatch: any) => {
    try {
      const results = await getInitialStats();

      dispatch({ type: "FETCH_DATA", data: results });
    } catch (err) {
      dispatch({ type: "ERROR", data: err });
    }
  };
};

export const fetchCountryData = (country: any) => {
  return async (dispatch: any) => {
    try {
      const results = await selectedCountryData(country.name);
      dispatch({
        type: "FETCH_COUNTRY_DATA",
        payload: {
          data: results,
          iso: country.iso,
          selectedCountry: country.name,
        },
      });
    } catch (err) {
      dispatch({ type: "ERROR", data: err });
    }
  };
};
export const fetchCountrySelectedDate = (data: any) => {
  return async (dispatch: any) => {
    try {
      const results = await selectedCountryDate(
        data.selectedCountry,
        data.date,
        data.period
      );
      dispatch({
        type: "FETCH_COUNTRY_DATE_PERIOD",
        payload: {
          data: results,
        },
      });
    } catch (err) {
      dispatch({ type: "ERROR", data: err });
    }
  };
};

export const setSearchTerm = (data: string) => {
  return {
    type: "SEARCH_TERM",
    payload: data,
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

export const setPeriodTimeRange = (data: string) => {
  return {
    type: "SET_TIME_RANGE",
    payload: data,
  };
};

export const setComparable = (data: any) => {
  return async (dispatch: any) => {
    try {
      const results = await comparedCountriesHistory(data.country.name);
      dispatch({
        type: `${data.id === "first" ? "SET_OPTION_1" : "SET_OPTION_2"}`,
        payload: data.country,
        history: results,
      });
    } catch (err) {
      dispatch({ type: "ERROR", data: err });
    }
  };
};
