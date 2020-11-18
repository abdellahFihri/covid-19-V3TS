import React from "react";
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";
import style from "./messageError.module.scss";
interface Props {
  errMsg: string;
  iconFill: string;
}
const DataErr = (props: Props) => {
  const { errMsg, iconFill } = props;
  return (
    <div className={style.errorMsg}>
      <ReportProblemOutlinedIcon fontSize="large" style={{ color: iconFill }} />{" "}
      <span>{errMsg}</span>
    </div>
  );
};

export default DataErr;
