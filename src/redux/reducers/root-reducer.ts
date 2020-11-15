import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import getWorldData from "./worldDataReducer";
import getAllCountriesData from "./allCountiesDataReducer";
import getMainChartHistory from "./mainCHartHistoryReducer";
import getPeriod from "./setPeriodReducer";
import getCumulative from "./cumulativeReducer";
import getCountryHistory from "./countryHistoryReducer";
import getOverlay from "./overLayReducer";
import getCountriesToCompare from "./comparableCountriesReducer";





const persistConfig = {
  key: "root",
  storage,
  whitelist: ["users"],
};

const rootReducer = combineReducers({
  
  world: getWorldData,
  allCountries: getAllCountriesData,
mainChartHistory:getMainChartHistory,
  history: getCountryHistory,
  period: getPeriod,
  overlay: getOverlay,
  cumulative: getCumulative,
  countriesToCompare:getCountriesToCompare

});

export default persistReducer(persistConfig, rootReducer);
