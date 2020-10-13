const INITIAL_STATE = {
  history: {
    countryHistory: "",
    loading: false,
  },
};

const getCountryHistory = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case "COUNTRY_HISTORY":
      return {
        ...state,
        history: action.payload,
      };
    default:
      return state;
  }
};
export default getCountryHistory;
