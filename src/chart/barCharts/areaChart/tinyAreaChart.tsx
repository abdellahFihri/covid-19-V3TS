import React from "react";
import { AreaChart, Area } from "recharts";
import connect from "react-redux";

const TinyArea = (props: any) => {
  console.log("DAAATAAAA IN AREAAAAA", props.data);
  return (
    <AreaChart
      width={150}
      height={60}
      data={props.data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <Area
        dot={false}
        type="monotone"
        dataKey="Diff"
        stroke="#8884d8"
        fill="#8884d8"
      />
    </AreaChart>
  );
};
export default TinyArea;
