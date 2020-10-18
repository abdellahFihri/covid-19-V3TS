import React from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { connect } from "react-redux";

const TinyArea = (props: any) => {
  const { year, month, week } = props.history.history;
  return (
    <div style={{ width: "100%", height: 200 }}>
      <ResponsiveContainer>
        <AreaChart
          syncId="anyId"
          data={year}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="1 1"
            vertical={false}
            horizontal={false}
          />
          {/* <XAxis
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
          <YAxis
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
          <Area dot={false} dataKey="tested" stroke="#FFA500 " fill="#FFA500" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
const mapStateToProps = (state: any) => {
  return {
    world: state.world,
    history: state.history,
  };
};

export default connect(mapStateToProps)(TinyArea);
