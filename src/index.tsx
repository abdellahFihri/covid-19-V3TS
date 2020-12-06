import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
// import { PersistGate } from "redux-persist/integration/react";
import {
  store,
  // persistor
} from "./redux/store";
import { Provider } from "react-redux";
import "./index.scss";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode> */}
      {/* </PersistGate> */}
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
