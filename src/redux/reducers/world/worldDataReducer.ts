const INITIAL_STATE = {
  firstRow: "",
  worldRow: "",
  statsCards: "",
  selectedCountry: "",
  iso: "",
  loading: true,
};
const getWorldData = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case "FETCH_DATA":
      return Object.assign({}, state, {
        firstRow: action.data[0][0],
        worldRow: action.data[0][0],
        statsCards: action.data[0][1],
        selectedCountry: "The world",
        iso: "",
        loading: false,
      });
    case "FETCH_COUNTRY_DATA":
      return Object.assign({}, state, {
        worldRow: action.payload.data[0].summary,
        statsCards: action.payload.data[0].change,
        selectedCountry: action.payload.selectedCountry,
        iso: action.payload.iso,
        loading: false,
      });
    case "ERROR":
      return Object.assign({}, state, {
        loading: false,
      });
    default:
      return state;
  }
};
export default getWorldData;
