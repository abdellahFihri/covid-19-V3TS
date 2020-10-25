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
import { numFormatter, timeFormatter } from "../../../utils/utilities/helpers";

const MainBarChart = (props: any) => {
  //   const total: any[] = [...props.history[0]];
  const merging = () => {
    let total2: any[] = [];

    for (let i = 0; i < props.history[1].length; i++) {
      if (!props.history[1][i].date || !props.history[0][i]) {
        continue;
      }
      let merge = {
        date: props.history[0][i].date,
        total_cases: props.history[0][i].total_cases,
        recovered: props.history[1][i].recovered,
      };
      total2.push(merge);
    }
    return total2;
  };
  let chartArry = merging();
  console.log("THE TOTAL", merging());
  return (
    <div style={{ width: "100%", height: 300 ,backgroundColor:'white',color:'#3d3d3d'}}>
     
      <ResponsiveContainer>
        <ComposedChart
          width={500}
          height={400}
          data={chartArry}
          syncId={props.sync}
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
            fill={props.filling}
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
