import React from "react";
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";
import style from "./messageError.module.scss";
interface Props {
  errMsg: string;
  iconFill: string;
}
const DataErr: React.FunctionComponent<Props> = (props) => {
  const { errMsg, iconFill } = props;
  return (
    <div className={style.errorMsg}>
      <ReportProblemOutlinedIcon fontSize="large" style={{ color: iconFill }} />{" "}
      <span>{errMsg}</span>
    </div>
  );
};

export default DataErr;
