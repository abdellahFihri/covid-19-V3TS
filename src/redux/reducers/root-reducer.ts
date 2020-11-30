import { combineReducers } from "redux";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

import getWorldData from "./world/worldDataReducer";
import getAllCountriesData from "./allCountries/allCountiesDataReducer";
import getMainChartHistory from "./mainChart/mainCHartHistoryReducer";
import getPeriod from "./period/setPeriodReducer";
import getCumulative from "./cumulative/cumulativeReducer";
import getCountryHistory from "./countryHistory/countryHistoryReducer";
import getOverlay from "./overlay/overLayReducer";
import getCountriesToCompare from "./comparableCountries/comparableCountriesReducer";
import getFetchingErrorMessage from "./fetchingError/fetchErrorReducer";

// const persistConfig = {
//   key: "root",
//   storage,
//   whiteList: ["period"],
// };

const rootReducer = combineReducers({
  world: getWorldData,
  allCountries: getAllCountriesData,
  mainChartHistory: getMainChartHistory,
  history: getCountryHistory,
  period: getPeriod,
  overlay: getOverlay,
  cumulative: getCumulative,
  countriesToCompare: getCountriesToCompare,
  fetchingDataError: getFetchingErrorMessage,
});

export default rootReducer;
