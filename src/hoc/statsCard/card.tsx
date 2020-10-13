import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import { Badge } from "reactstrap";

import style from "./card.module.scss";

interface Props {
  colSize: number;
  title: string;
  end: string;
  description?: string;
}

const StatsCard = (props: Props) => {
  const [end, setEnd] = useState(props.end);
  const [description, setDescription] = useState(props.description);
  useEffect(() => {
    setEnd(props.end);
  }, [props.end]);
  useEffect(() => {
    setDescription(props.description);
  }, [props.description]);

  return (
    <div className={`col-md-${props.colSize}`}>
      <div className={style.card}>
        <div className="content">
          {props.end ? (
            <CountUp
              className={style.countup}
              end={Number(end)}
              duration={2}
              separator="."
              useEasing={true}
            />
          ) : (
            <span className={style.countup}>--</span>
          )}
          <div className={style.label}>
            <span> {props.title}</span>
          </div>
          <Badge color="danger" pill>
            +0.5%
          </Badge>
        </div>
        <span className={style.description}>{description}</span>
      </div>
    </div>
  );
};
export default StatsCard;
