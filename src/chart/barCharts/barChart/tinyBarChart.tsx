import React from "react";
import { BarChart, Bar } from "recharts";
import connect from "react-redux";

const TinyBar = (props: any) => {
  console.log("DAAATAAA IN TINBAAARRR", props.data);
  return (
    <BarChart width={150} height={60} data={props.data}>
      <Bar dataKey="Diff" fill="#8884d8" />
    </BarChart>
  );
};
export default TinyBar;
