import React from "react";
import {
  BarChart,
  Bar,
  Tooltip,
  Legend,
  ResponsiveContainer,
  XAxis,
} from "recharts";
import style from "./tinyBarChart.module.scss"

const TinyBar = (props: any) => {
  
  return (
    <div  className={style.barChart} style={{ width: "100%", height: 150 }}>
       <p>{props.title}</p>
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
