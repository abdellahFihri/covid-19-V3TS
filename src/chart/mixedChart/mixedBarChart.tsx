import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from "recharts";
import {
  numberWithCommas,
  numFormatter,
  timeFormatter,
} from "../../utils/utilities/helpers";

const MixedChart = ({ data }: any) => {
  const chartData = React.useMemo(() => data, [data]);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <ComposedChart
          //   width={500}
          //   height={300}
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
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
          />
          <YAxis
            dataKey="recovered"
            yAxisId="right"
            orientation="right"
            tickFormatter={function (value: number) {
              return numFormatter(value);
            }}
          />
          <Tooltip formatter={(value) => numberWithCommas(value)} />
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
