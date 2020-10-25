const INITIAL_STATE = {
  allCountriesStats: [],
};
const getAllCountriesData = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case "ALL_COUNTRIES-DATA":
      return {
        ...state,
        allCountriesStats: action.payload,
      };
    default:
      return state;
  }
};
export default getAllCountriesData;
