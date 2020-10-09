import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import getChartData from "./chartDataReducer";
import getWorldData from "./worldDataReducer";
import getAllCountriesData from "./allCountiesData";

import getCountryHistory from "./countryHistoryReducer";

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

  history: getCountryHistory,
});

export default persistReducer(persistConfig, rootReducer);