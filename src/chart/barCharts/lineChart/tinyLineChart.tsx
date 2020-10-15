import React from "react";
import { LineChart, Line } from "recharts";
import connect from "react-redux";

const TinyLine = (props: any) => {
  return (
    <LineChart width={150} height={60} data={props.data}>
      <Line
        dot={false}
        type="monotone"
        dataKey="active_cases"
        stroke="#8884d8"
        strokeWidth={2}
      />
    </LineChart>
  );
};
export default TinyLine;
