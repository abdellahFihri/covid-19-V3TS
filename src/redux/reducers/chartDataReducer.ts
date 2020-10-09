const INITIAL_STATE = {
  donut: {
    data: [],
    selectedCountry: "the world",
    labels: ["Active cases", "Recovered", "Deaths"],
  },
};
const getChartData = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case "CHART_DATA":
      return {
        ...state,
        donut: action.payload,
      };
    default:
      return state;
  }
};
export default getChartData;
