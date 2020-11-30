import React from "react";
import { Spinner } from "reactstrap";
import style from "./spinner.module.scss";

const CircularUnderLoad = () => {
  return (
    <div className={style.container}>
      {" "}
      <div className={style.spinner}>
        <Spinner style={{ width: "3rem", height: "3rem", color: "#3F51B5" }} />{" "}
      </div>
      <span className={style.h6}>
        {" "}
        <h6>Fetching initial data</h6>
      </span>
    </div>
  );
};
export default CircularUnderLoad;
