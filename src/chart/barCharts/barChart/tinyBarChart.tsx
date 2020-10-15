import React from "react";
import { BarChart, Bar } from "recharts";
import connect from "react-redux";

const TinyBar = (props: any) => {
  return (
    <BarChart width={150} height={60} data={props.data}>
      <Bar dataKey="total_cases" fill="#8884d8" />
    </BarChart>
  );
};
export default TinyBar;
