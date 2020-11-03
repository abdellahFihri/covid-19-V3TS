import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import getChartData from "./chartDataReducer";
import getWorldData from "./worldDataReducer";
import getAllCountriesData from "./allCountiesDataReducer";
import getMainChartHistory from "./mainCHartHistoryReducer";
import getPeriod from "./setPeriodReducer";

import getCountryHistory from "./countryHistoryReducer";
import getOverlay from "./overLayReducer";


// import addUserReducer from './addUserReducer';
// import CurrentUser from './current-user';
// import adminUiCols from './admin-ui-cols-reducer';
// import usersCols from './users-cols-reducer';

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["users"],
};

const rootReducer = combineReducers({
  data: getChartData,
  world: getWorldData,
  allCountries: getAllCountriesData,
mainChartHistory:getMainChartHistory,
  history: getCountryHistory,
  period: getPeriod,
  overlay:getOverlay

});

export default persistReducer(persistConfig, rootReducer);
