import React from "react";
import style from "./paper.module.scss";
import List from "@material-ui/core/List";
interface Props {
  children?: any;
  [key: string]: string | React.ReactNode;
}

const Paper = ({ children, col1, col2, col3, col4, title, bar }: Props) => {
  return (
    <div className="col-md-12">
      <div className={style.paper}>
        <span className={style.label}>{title}</span>
        {bar}
        <div className={style.tabhead}>
          <span> {col1}</span> <span>{col2} </span> <span>{col3} </span>{" "}
          <span>{col4} </span>{" "}
        </div>

        <div className={style.content}>
          <List>{children}</List>
        </div>
      </div>
    </div>
  );
};
export default Paper;
