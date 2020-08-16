import React from "react";
// import CircularProgress from '@material-ui/core/CircularProgress';
import { Spinner } from "reactstrap";
import style from "./spinner.module.scss";

const CircularUnderLoad = () => {
  return (
    <div className={style.spinner}>
      {" "}
      <Spinner
        style={{ width: "3rem", height: "3rem", color: "#3F51B5" }}
      />{" "}
    </div>
  );
};
export default CircularUnderLoad;
