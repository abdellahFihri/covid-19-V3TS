import React from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  // YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import style from "./tinyAreaChart.module.scss";

const TinyArea = (props: any) => {
  // const { year, month, week } = props.history.history;
  const { history, keyData, filling, stroke,title } = props;
  const chartData = React.useMemo(() => history, [history]);
  console.log("cdata in tyniy area", chartData);
  return (
    <div className={style.tinyArea} style={{ width: "100%", height: 150 }}>
      <p>{props.title}</p>
      <ResponsiveContainer>
        <AreaChart
          syncId={props.sync}
          data={chartData}
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 10,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            // vertical={false}
            // horizontal={false}
          />
          <XAxis
            hide={true}
            dataKey="date"
            tickFormatter={function (value: string) {
              const d = new Date(value);

              const mo = new Intl.DateTimeFormat("en", {
                month: "short",
              }).format(d);
              const da = new Intl.DateTimeFormat("en", {
                day: "2-digit",
              }).format(d);
              return `${da}/${mo}`;
            }}
          />
          {/*<YAxis
            dataKey="tested"
            type="number"
            tickFormatter={function (value: number) {
              if (value >= 1000000000) {
                return (
                  (value / 1000000000).toFixed(1).replace(/\.0$/, "") + "G"
                );
              }
              if (value >= 1000000) {
                return (value / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
              }
              if (value >= 1000) {
                return (value / 1000).toFixed(1).replace(/\.0$/, "") + "K";
              }
              return value;
            }}
          /> */}
          <Tooltip />
          <Legend />
          <Area
            dot={false}
            dataKey={keyData}
            stroke={stroke}
            fill={filling}
            fillOpacity={0.5}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
// const mapStateToProps = (state: any) => {
//   return {
//     world: state.world,
//     history: state.history,
//   };
// };

// export default connect(mapStateToProps)(TinyArea);
export default TinyArea;
