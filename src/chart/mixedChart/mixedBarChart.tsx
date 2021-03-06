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
} from "recharts";
import {
  numberWithCommas,
  numFormatter,
  timeFormatter,
} from "../../utils/utilities/helpers";
// import style from "./mixedBarChart.module.scss";
interface Props {
  data: any;
}
const MixedChart: React.FunctionComponent<Props> = ({ data }) => {
  const chartData = React.useMemo(() => data, [data]);

  return (
    <div style={{ width: "100%", height: 300 }}>
      {/* <div className={style.country}>
        <span>{country}</span>
        <img
          src={`https://flagcdn.com/${iso.toLocaleLowerCase()}.svg`}
          width="40"
          alt=""
        />
      </div> */}
      <ResponsiveContainer>
        <ComposedChart
          data={chartData}
          margin={{
            top: 20,

            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={function (value: string) {
              return timeFormatter(value);
            }}
          />
          <YAxis
            orientation="left"
            yAxisId="left"
            dataKey="total_cases"
            tickFormatter={function (value: number) {
              return numFormatter(value);
            }}
            label={{
              value: "Total",

              offset: 10,
              position: "top",
            }}
            type="number"
            domain={["auto", "auto"]}
          />
          <YAxis
            dataKey="recovered"
            yAxisId="right"
            orientation="right"
            tickFormatter={function (value: number) {
              return numFormatter(value);
            }}
            label={{
              value: "Recovered",

              offset: 10,
              position: "top",
            }}
            type="number"
            domain={["auto", "auto"]}
          />
          <Tooltip formatter={(value: any) => numberWithCommas(value)} />
          <Legend />
          <Bar
            dataKey="total_cases"
            stackId="a"
            yAxisId="left"
            fill="#8884d8"
          />
          <Bar dataKey="recovered" stackId="a" yAxisId="right" fill="#82ca9d" />
          {/* <Line dataKey="deaths" fill="#ffc658" yAxisId="right" /> */}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
export default MixedChart;
