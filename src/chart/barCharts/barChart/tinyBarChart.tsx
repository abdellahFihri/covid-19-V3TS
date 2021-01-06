import React from "react";
import {
  BarChart,
  Bar,
  Tooltip,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  numberWithCommas,
  numFormatter,
  timeFormatter,
} from "../../../utils/utilities/helpers";
import style from "./tinyBarChart.module.scss";

const TinyBar = (props: any) => {
  const { history, sync, keyData, filling } = props;
  const chartData = React.useMemo(() => history, [history]);
  const syncID = React.useMemo(() => sync, [sync]);
  const data = React.useMemo(() => keyData, [keyData]);
  const chartFilling = React.useMemo(() => filling, [filling]);
  return (
    <div className={style.barChart} style={{ width: "100%", height: 200 }}>
      <p>{props.title}</p>
      <ResponsiveContainer>
        <BarChart syncId={syncID} data={chartData}>
          <XAxis
            hide={false}
            dataKey="date"
            tickFormatter={function (value: string) {
              return timeFormatter(value);
            }}
          />
          <YAxis
            hide={props.YaxisHide}
            dataKey={data}
            tickFormatter={function (value) {
              return numFormatter(value);
            }}
          />
          <Bar dataKey={data} fill={chartFilling} animationDuration={500} />
          <Tooltip formatter={(value: any) => numberWithCommas(value)} />
          <Legend
            align="center"
            verticalAlign="top"
            iconType="circle"
            iconSize={13}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default TinyBar;
