import React from "react";
import {
  BarChart,
  Bar,
  Tooltip,
  Legend,
  ResponsiveContainer,
  XAxis,
 
} from "recharts";
import { numberWithCommas, timeFormatter } from "../../../utils/utilities/helpers";
import style from "./tinyBarChart.module.scss"

const TinyBar = (props: any) => {
  const {history,sync,keyData,filling}=props
  const chartData = React.useMemo(() => history, [history]);
  const syncID= React.useMemo(() => sync, [sync]);
  const data = React.useMemo(() => keyData, [keyData]);
  const chartFilling = React.useMemo(() => filling, [filling]);
  return (
    <div  className={style.barChart} style={{ width: "100%", height: 150 }}>
       
        <p>{props.title}</p>
      <ResponsiveContainer>
        <BarChart syncId={syncID} data={chartData}>
          <XAxis hide={false}  dataKey="date" tickFormatter={function (value: string) {
              return timeFormatter(value);
            }} />
          <Bar
            dataKey={data}
            // background={false}
            fill={chartFilling}
          />
          <Tooltip  formatter={(value)=> numberWithCommas(value)} />
          <Legend  align="right" verticalAlign="top" iconType='circle' iconSize={13} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default TinyBar;
