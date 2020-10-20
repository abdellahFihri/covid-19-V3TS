import React from "react";
import {
  BarChart,
  Bar,
  Tooltip,
  Legend,
  ResponsiveContainer,
  XAxis,
} from "recharts";
// import connect from "react-redux";

const TinyBar = (props: any) => {
  // console.log("DAAATAAA IN TINBAAARRR", props.history);
  return (
    <div style={{ width: "100%", height: 150 }}>
      <ResponsiveContainer>
        <BarChart syncId={props.sync} data={props.history}>
          <XAxis hide={true} dataKey="date" />
          <Bar
            dataKey={props.keyData}
            background={false}
            fill={props.filling}
          />
          <Tooltip />
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default TinyBar;
