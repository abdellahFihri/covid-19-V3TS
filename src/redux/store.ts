import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import rootReducer from "./reducers/root-reducer";
const middlewares = [logger];

// export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(...middlewares)
    // other store enhancers if any
  )
);
export const persistor = persistStore(store);

export default { store, persistStore };
