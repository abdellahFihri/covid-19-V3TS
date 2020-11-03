import React from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  // YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { numberWithCommas } from "../../../utils/utilities/helpers";
import style from "./tinyAreaChart.module.scss";

const TinyArea = (props: any) => {
  // const { year, month, week } = props.history.history;
  const { history, keyData, filling, stroke,title } = props;
  const chartData = React.useMemo(() => history, [history]);
  console.log("cdata in tyniy area", chartData);
  return (
    <div className={style.tinyArea} style={{ width: "100%", height: 150 }}>
      <p>{title}</p>
      <ResponsiveContainer>
        <AreaChart
          syncId={props.sync}
          data={chartData}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            // vertical={false}
            // horizontal={false}
          />
          <XAxis
            hide={true}
            dataKey="date"
            tickFormatter={function (value: string) {
              const d = new Date(value);

              const mo = new Intl.DateTimeFormat("en", {
                month: "short",
              }).format(d);
              const da = new Intl.DateTimeFormat("en", {
                day: "2-digit",
              }).format(d);
              return `${da}/${mo}`;
            }}
          />
          <Tooltip  formatter={(value)=> numberWithCommas(value)} />
          <Legend align="right" verticalAlign="top" iconType='circle' />
          <Area
            dot={false}
            dataKey={keyData}
            stroke={stroke}
            fill={filling}
            fillOpacity={0.5}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
export default TinyArea;
