
import _ from "lodash";
import React from "react";
import { LineChart, Line,Tooltip ,XAxis, ResponsiveContainer, Legend, YAxis, CartesianGrid} from "recharts";
import { numberWithCommas, numFormatter, timeFormatter } from "../../../utils/utilities/helpers";
import style from "./tinyLineChart.module.scss"
// import connect from "react-redux";
interface props {
  data: any;
  display?: any;
}
const TinyLine = (props: any) => {
  const {history,keyData,sync,filling,height,XaxisHide}=props
  

  const key = React.useMemo(() => keyData, [keyData]);
  const chartData = React.useMemo(() => history.length>33? _.reverse(history):history, [history]);
  const syncID= React.useMemo(() => sync, [sync]);
 
  const chartFilling = React.useMemo(() => filling, [filling]);

  return (
    <div style={{
      // width: `${width ? width : '100%'}px`
      width:'100%'
      , height: `${height}px`
    }}>
    <ResponsiveContainer>
     
        <LineChart
          // width={width ? width : 150}
          // height={height ? height : 60}
      data={chartData} syncId={syncID}>
      <CartesianGrid strokeDasharray="1 1" vertical={false} horizontal={!XaxisHide} />
       <XAxis hide={XaxisHide}  dataKey="date" tickFormatter={function (value: string) {
              return timeFormatter(value);
      }} />
      {
        !XaxisHide ?
          (
            
        <YAxis
        mirror={true}
        dataKey={key}
        type="number"
        tickFormatter={function (value: number) {
          return numFormatter(value);
        }}
          />
              
              
       )
          :(
          '')
      }
      <Line
        dot={false}
        type="monotone"
        dataKey={key}
        stroke={chartFilling}
            strokeWidth={2}
            
      />
      <Tooltip formatter={(value) => numberWithCommas(value)} />
      {
!XaxisHide?
          <Legend align="right" verticalAlign="top" iconType='circle' iconSize={13} />
          :''
      }
        </LineChart>
        </ResponsiveContainer >
        </div>
     
  );
};
export default TinyLine;
