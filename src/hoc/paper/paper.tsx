import React from "react";
import style from "./paper.module.scss";
import List from "@material-ui/core/List";
interface Props {
  children?: any;
  columns: string[];
  [key: string]: string | React.ReactNode;
}

const Paper = ({ children, columns, title, bar }: Props) => {
  return (
    <div className="col-md-12">
      <div className={style.paper}>
        <span className={style.label}>
          <h6>{title}</h6>
        </span>
        {bar}
        <div className={style.tabhead}>
          {columns.map((col: string) => (
            <span key={col}>{col}</span>
          ))}
        </div>

        <div className={style.content}>
          <List>{children}</List>
        </div>
      </div>
    </div>
  );
};
export default Paper;
