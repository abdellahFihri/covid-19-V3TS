import React from "react";
import CountUp from "react-countup";
import { Badge } from "reactstrap";

import { indexing } from "../../utils/utilities/helpers";
import style from "./card.module.scss";

interface Props {
  colSize: number;
  title: string;
  end: number;
  new: number;
  chart: any;
  delay: number;

  description?: string;
}

const StatsCard: React.FunctionComponent<Props> = (props) => {
  return (
    <div className={`col-md-${props.colSize}`}>
      <div className={style.card}>
        <div className={style.content}>
          <CountUp
            className={style.countup}
            end={props.end}
            duration={2}
            separator=","
            useEasing={true}
            delay={props.delay}
          />

          <div className={style.label}>
            <span> {props.title}</span>
          </div>
          <Badge
            className={style.badge}
            color={`${
              props.end <= 0
                ? "success"
                : props.end > 0 && props.title === "New recovered"
                ? "success"
                : "danger"
            }`}
            pill
          >
            {indexing(props.new, props.end) > 0
              ? `+ ${indexing(props.new, props.end)}`
              : indexing(props.new, props.end)}
            %
          </Badge>
        </div>
        <div style={{ width: "70%" }}>{props.chart}</div>
        <span className={style.description}>{props.description}</span>
      </div>
    </div>
  );
};
export default StatsCard;
