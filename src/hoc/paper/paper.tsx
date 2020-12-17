import React from "react";
import style from "./paper.module.scss";
import List from "@material-ui/core/List";
import SortingArrows from "../sortingArrows/sortingArrows";
interface Props {
  children?: any;
  detailed: boolean;
  columns: string[];
  values?: string[];
  [key: string]: string | React.ReactNode;
}

const Paper = ({ children, columns, title, bar, values, detailed }: Props) => {
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
        <div className={style.tabhead}>
          {values && detailed
            ? ["name", ...values].map((val: string) => (
                <SortingArrows value={val} key={val} />
              ))
            : ""}
          {/* <SortingArrows />
          <SortingArrows />
          <SortingArrows />
          <SortingArrows />
          <SortingArrows />
          <SortingArrows />
          <SortingArrows /> */}
        </div>

        <div className={style.content}>
          <List>{children}</List>
        </div>
      </div>
    </div>
  );
};
export default Paper;
