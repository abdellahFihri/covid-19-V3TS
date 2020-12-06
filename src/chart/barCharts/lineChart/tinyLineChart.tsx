import _ from "lodash";
import React from "react";
import {
  LineChart,
  Line,
  Tooltip,
  XAxis,
  ResponsiveContainer,
  Legend,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  numberWithCommas,
  numFormatter,
  timeFormatter,
} from "../../../utils/utilities/helpers";

interface Props {
  history: { [key: string]: number | string }[] | any;
  keyData: string;
  sync: string;
  filling: string;
  height: number;
  XaxisHide: boolean;
  marginTop?: number;
  marginRight?: number;
  title?: string;
}
const TinyLine: React.FunctionComponent<Props> = (props) => {
  const {
    history,
    keyData,
    sync,
    filling,
    height,
    XaxisHide,
    marginTop,
    marginRight,
  } = props;

  const key = React.useMemo(() => keyData, [keyData]);
  const chartData = React.useMemo(
    () => (history.length > 33 ? _.reverse(history) : history),
    [history]
  );
  const syncID = React.useMemo(() => sync, [sync]);

  const chartFilling = React.useMemo(() => filling, [filling]);

  return (
    <div
      style={{
        width: "100%",
        height: `${height}px`,
        marginTop: `${marginTop}px`,
        marginLeft: `${marginRight}px`,
      }}
    >
      <ResponsiveContainer>
        <LineChart data={chartData} syncId={syncID}>
          <CartesianGrid
            strokeDasharray="1 1"
            vertical={false}
            horizontal={!XaxisHide}
          />
          <XAxis
            hide={XaxisHide}
            dataKey="date"
            tickFormatter={function (value: string) {
              return timeFormatter(value);
            }}
          />
          {!XaxisHide ? (
            <YAxis
              mirror={true}
              dataKey={key}
              type="number"
              tickFormatter={function (value: number) {
                return numFormatter(value);
              }}
            />
          ) : (
            ""
          )}
          <Line
            dot={false}
            type="monotone"
            dataKey={key}
            stroke={chartFilling}
            strokeWidth={2}
            animationDuration={500}
          />
          <Tooltip formatter={(value) => numberWithCommas(value)} />
          {!XaxisHide ? (
            <Legend
              align="center"
              verticalAlign="top"
              iconType="line"
              iconSize={13}
            />
          ) : (
            ""
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default TinyLine;
