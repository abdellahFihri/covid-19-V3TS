import React from "react";
import { numFormatter } from "../../utils/utilities/helpers";
import style from "./shortNumber.module.scss";
interface Props {
  title: string;
  value: number;
}

const ShortenedNum: React.FunctionComponent<Props> = ({ title, value }) => {
  return (
    <div className={style.shortNumber}>
      <span>{title}</span>
      <div className={style.global}>
        <span> {numFormatter(value)}</span>
        {` (${value.toLocaleString()})`}
      </div>
    </div>
  );
};

export default ShortenedNum;
