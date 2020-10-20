import React from "react";
import { LineChart, Line } from "recharts";
// import connect from "react-redux";
interface props {
  data: any;
  display?: any;
}
const TinyLine = (props: any) => {
  console.log("DAATAAAA IN LIIINE", props.data);
  return (
    <LineChart width={100} height={60} data={props.data}>
      <Line
        dot={false}
        type="monotone"
        dataKey={props.display ? `${props.display}` : "Diff"}
        stroke="#8884d8"
        strokeWidth={2}
      />
    </LineChart>
  );
};
export default TinyLine;
