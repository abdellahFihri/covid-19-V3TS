import React from "react";
import _, { unionBy } from "lodash";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Line,
} from "recharts";
import { numFormatter, timeFormatter,merging } from "../../../utils/utilities/helpers";

import style from "./BarChart.module.scss"
const MainBarChart = (props: any) => {
  //   const total: any[] = [...props.history[0]];
  const { history, sync, filling } = props;
  const chartData = React.useMemo(() =>  merging(history), [history])
  const syncID = React.useMemo(() => sync, [sync])
  const chartFilling = React.useMemo(() =>filling, [filling])
  // const merging = () => {
  //   let total2: any[] = [];

  //   for (let i = 0; i < history[1].length; i++) {
  //     if (!history[1][i].date || !history[0][i]) {
  //       continue;
  //     }
  //     let merge = {
  //       date: history[0][i].date,
  //       total_cases: history[0][i].total_cases,
  //       recovered: history[1][i].recovered,
  //     };
  //     total2.push(merge);
  //   }
  //   return total2;
  // };
  // let chartArry = merging(chartData);
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
          {/* <BarChart
          //   width={500}
          //   height={300}
          data={props.history}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        > */}
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={function (value: string) {
              return timeFormatter(value);
            }}
          />
          <YAxis
            mirror={true}
            dataKey="total_cases"
            tickFormatter={function (value: number) {
              return numFormatter(value);
            }}
          />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="total_cases"
            background={false}
            name="Total cases"
            fill={chartFilling}
          />
          <Line
            type="monotone"
            strokeWidth={2}
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
