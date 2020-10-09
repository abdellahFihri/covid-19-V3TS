const INITIAL_STATE = {
  countryHistory: "",
};

const getCountryHistory = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case "COUNTRY_HISTORY":
      return {
        ...state,
        countryHistory: action.payload,
      };
    default:
      return state;
  }
};
export default getCountryHistory;
