import React from "react";
import { Spinner } from "reactstrap";
import style from "./spinner.module.scss";
interface Props {
  title?: string;
  style?: any;
}
const CircularUnderLoad: React.FunctionComponent<Props> = ({ title }) => {
  return (
    <div className={style.container}>
      {" "}
      <div className={style.spinner}>
        <Spinner style={{ width: "3rem", height: "3rem", color: "#3F51B5" }} />{" "}
      </div>
      <span className={style.h6}>
        {" "}
        <h6>{title}</h6>
      </span>
    </div>
  );
};
export default CircularUnderLoad;
