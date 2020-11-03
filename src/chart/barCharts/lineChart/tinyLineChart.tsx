
import React from "react";
import { LineChart, Line,Tooltip ,XAxis} from "recharts";
import { numberWithCommas } from "../../../utils/utilities/helpers";
// import connect from "react-redux";
interface props {
  data: any;
  display?: any;
}
const TinyLine = (props: any) => {
  const {history,keyData,sync,filling,height,width}=props
  

  const key = React.useMemo(() => keyData, [keyData]);
  const chartData = React.useMemo(() => history, [history]);
  const syncID= React.useMemo(() => sync, [sync]);
 
  const chartFilling = React.useMemo(() => filling, [filling]);

  return (
    <LineChart width={width ? width : 150} height={height ? height : 60} data={chartData} syncId={syncID}>
      <XAxis dataKey='date' hide={true} />
      <Line
        dot={false}
        type="monotone"
        dataKey={key}
        stroke={chartFilling}
        strokeWidth={2}
      />
      <Tooltip formatter={(value)=> numberWithCommas(value)} />
    </LineChart>
  );
};
export default TinyLine;
