
import React from "react";
import { LineChart, Line } from "recharts";
// import connect from "react-redux";
interface props {
  data: any;
  display?: any;
}
const TinyLine = (props: any) => {
  const {data,keyData}=props
  
  const chartData = React.useMemo(() => data, [data]);
  const key = React.useMemo(() => keyData, [keyData]);
  console.log("in tyinychart",chartData)
  return (
    <LineChart width={150} height={60} data={chartData}>
      <Line
        dot={false}
        type="monotone"
        dataKey={key}
        stroke="#8884d8"
        strokeWidth={2}
      />
    </LineChart>
  );
};
export default TinyLine;
