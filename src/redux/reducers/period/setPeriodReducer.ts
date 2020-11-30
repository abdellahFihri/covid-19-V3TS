import _ from "lodash";
const INITIAL_STATE = {
  periodTimeRange: "",
  countryPeriod: false,
  period: "",
};

const getPeriod = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case "SET_PERIOD":
      return Object.assign({}, state, {
        period: action.payload.period,
        periodTimeRange: action.payload.periodRange,
      });
    case "FETCH_DATA":
      return Object.assign({}, state, {
        period: _.takeRight(_.orderBy(action.data[2], ["date"], ["asc"]), 32),
      });
    case "FETCH_COUNTRY_DATA":
      return Object.assign({}, state, {
        period: action.payload.data[1],
        countryPeriod: true,
        periodTimeRange: "month",
      });
    case "FETCH_COUNTRY_DATE_PERIOD":
      return Object.assign({}, state, {
        period: action.payload.data,
      });
    default:
      return state;
  }
};
export default getPeriod;
