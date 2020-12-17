const INITIAL_STATE = {
  allCountriesStats: [],
  listFiltering: {
    operator: "desc",
    value: "total_cases",
  },
};
const getAllCountriesData = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case "FETCH_DATA":
      return Object.assign({}, state, {
        allCountriesStats: { all: action.data[1], filter: action.data[1] },
      });
    case "ALL_COUNTRIES-DATA":
      return {
        ...state,
        allCountriesStats: action.payload,
      };
    case "SET_FILTER":
      return Object.assign({}, state, {
        listFiltering: {
          operator: action.payload.operator,
          value: action.payload.value,
        },
      });
    default:
      return state;
  }
};
export default getAllCountriesData;
