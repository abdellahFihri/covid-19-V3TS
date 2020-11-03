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
} from "recharts";
import {
  numFormatter,
  timeFormatter,
  merging,
  numberWithCommas,
} from "../../../utils/utilities/helpers";

import style from "./BarChart.module.scss";
const MainBarChart = (props: any) => {
  const { history, sync, filling } = props;
  const chartData = React.useMemo(() => merging(history), [history]);
  const syncID = React.useMemo(() => sync, [sync]);
  const chartFilling = React.useMemo(() => filling, [filling]);

  console.log("THE TOTAL", chartData);
  return (
    <div className={style.barChart} style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <ComposedChart
          width={500}
          height={400}
          data={chartData}
          syncId={syncID}
          margin={{
            top: 20,
            right: 0,
            bottom: 20,
            left: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
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
          />
          <Tooltip  formatter={(value)=> numberWithCommas(value)} />
          <Legend align="right" verticalAlign="top" iconType='circle' iconSize={13} />
          <Bar
            dataKey="total_cases"
            background={false}
            name="Total cases"
            fill={chartFilling}
          />
          <Line
            type="monotone"
            strokeWidth={3}
            name="Recovered"
            dataKey="recovered"
            stroke="#70c96d"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
export default MainBarChart;
