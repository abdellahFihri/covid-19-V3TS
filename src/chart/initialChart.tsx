import React from "react";
// import { connect } from "react-redux";
import {
  // LineChart,
  AreaChart,
  // BarChart,
  // Line,
  // Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { numFormatter, timeFormatter, merging, numberWithCommas } from "../utils/utilities/helpers";
import style from "./initialChart.module.scss";

interface Props {
  // world: any;
  history: any;
  keyData: string;
  sync: string;
  cumulative:boolean
}

const TryChart = (props: Props) => {
  
  const { history, keyData, sync,cumulative } = props;

  const chartData = React.useMemo(() =>!cumulative? merging(history):history, [history,cumulative]);
  const data = React.useMemo(() => keyData, [keyData]);
  const syncID = React.useMemo(() => sync, [sync]);

 
  return (
    <div className={style.initialChart} style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <AreaChart
          // width={700}
          // height={300}
          syncId={syncID}
          data={chartData}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="2 2" vertical={false} />
          <XAxis
            // tickSize={8}

            dataKey="date"
            tickFormatter={function (value: string) {
              return timeFormatter(value);
            }}
          />
          <YAxis
            mirror={true}
            dataKey={data}
            type="number"
            tickFormatter={function (value: number) {
              return numFormatter(value);
            }}
          />
          <Tooltip  formatter={(value)=> numberWithCommas(value)} />
          <Legend align="right" verticalAlign="top" height={24} iconSize={13} iconType='circle' />
          <Area
            dot={false}
            fillOpacity={0.5}
            strokeWidth={2}
            name="Total cases"
            type="monotone"
            dataKey="total_cases"
            stroke="#1D89E8"
            activeDot={{ r: 8 }}
          />
          <Area
            dot={false}
            fillOpacity={0.5}
            strokeWidth={2}
            type="monotone"
            name="Recovered"
            dataKey="recovered"
            fill="#70C96D"
            stroke="#127c29"
          />
        </AreaChart>

       
      </ResponsiveContainer>
    </div>
  );
};
export default TryChart;

