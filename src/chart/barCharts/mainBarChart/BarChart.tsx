import React from "react";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Line,
  Brush,
} from "recharts";
import {
  numFormatter,
  timeFormatter,
  merging,
  numberWithCommas,
} from "../../../utils/utilities/helpers";

import style from "./BarChart.module.scss";
const MainBarChart = (props: any) => {
  const { history, sync, filling, cumulative } = props;
  const chartData = React.useMemo(
    () => (cumulative ? history : merging(history)),
    [history, cumulative]
  );
  const syncID = React.useMemo(() => sync, [sync]);
  const chartFilling = React.useMemo(() => filling, [filling]);

  console.log("THE TOTAL", chartData);
  return (
    <div className={style.barChart} style={{ width: "100%", height: 500 }}>
      <ResponsiveContainer>
        <ComposedChart
          data={chartData}
          syncId={syncID}
          margin={{
            top: 5,
            right: 0,
            bottom: 5,
            left: 0,
          }}
        >
          <CartesianGrid strokeDasharray="2 2" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={function (value: string) {
              return timeFormatter(value);
            }}
            tickSize={4}
          />
          <YAxis
            dataKey="total_cases"
            tickFormatter={function (value: number) {
              return numFormatter(value);
            }}
            tickSize={4}
            yAxisId="left"
            label={{
              value: "Total cases",

              offset: 13,
              position: "top",
            }}
          />
          <YAxis
            dataKey="recovered"
            tickFormatter={function (value: number) {
              return numFormatter(value);
            }}
            tickSize={4}
            orientation="right"
            yAxisId="right"
            label={{
              value: "Recovered",
              angle: 90,
              offset: 13,
              position: "insideBottom",
            }}
            hide={true}
          />
          <Tooltip formatter={(value) => numberWithCommas(value)} />
          <Legend
            align="center"
            verticalAlign="top"
            iconType="circle"
            height={30}
            iconSize={13}
          />
          <Bar
            dataKey="total_cases"
            background={false}
            name="Total cases"
            fill={chartFilling}
            yAxisId="left"
            animationDuration={500}
          />
          <Line
            type="monotone"
            strokeWidth={3}
            name="Recovered"
            dataKey="recovered"
            stroke="#70c96d"
            yAxisId="right"
            animationDuration={500}
            animationBegin={500}
          />
          <Brush
            dataKey="date"
            height={40}
            data={chartData}
            tickFormatter={function (value: string) {
              return timeFormatter(value);
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
export default MainBarChart;
