import React from "react";
// import { connect } from "react-redux";
import {
  // LineChart,
  AreaChart,
  // BarChart,
  // Line,
  // Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { numFormatter, timeFormatter, merging } from "../utils/utilities/helpers";
import style from "./initialChart.module.scss";

interface Props {
  // world: any;
  history: any;
  keyData: string;
  sync: string;
}

const TryChart = (props: Props) => {
  // const { worldHistory } = props.world.world;
  const { history, keyData, sync } = props;

  const chartData = React.useMemo(() => merging(history), [history]);
  const data = React.useMemo(() => keyData, [keyData]);
  const syncID = React.useMemo(() => sync, [sync]);

  // const merging = () => {
  //   let total2: any[] = [];

  //   for (let i = 0; i < chartData[1].length; i++) {
  //     if (!chartData[1][i].date || !chartData[0][i]) {
  //       continue;
  //     }
  //     let merge = {
  //       date: chartData[0][i].date,
  //       total_cases: chartData[0][i].total_cases,
  //       recovered: chartData[1][i].recovered,
  //     };
  //     total2.push(merge);
  //   }
  //   return total2;
  // };
  // let chartArry = merging();

  // const { year, month, week } = props.history.history;
  // console.log("WEEEEEEEEEEEEEK", week);
  return (
    <div className={style.initialChart} style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <AreaChart
          // width={700}
          // height={300}
          syncId={syncID}
          data={chartData}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="2 2" vertical={false} />
          <XAxis
            // tickSize={8}

            dataKey="date"
            tickFormatter={function (value: string) {
              return timeFormatter(value);
            }}
          />
          <YAxis
            mirror={true}
            dataKey={data}
            type="number"
            tickFormatter={function (value: number) {
              return numFormatter(value);
            }}
          />
          <Tooltip />
          <Legend align="right" verticalAlign="top" height={24} />
          <Area
            dot={false}
            fillOpacity={0.5}
            strokeWidth={2}
            name="Total cases"
            type="monotone"
            dataKey="total_cases"
            stroke="#1D89E8"
            activeDot={{ r: 8 }}
          />
          <Area
            dot={false}
            fillOpacity={0.5}
            strokeWidth={2}
            type="monotone"
            name="Recovered"
            dataKey="recovered"
            fill="#70C96D"
            stroke="#127c29"
          />
        </AreaChart>

        {/* <div>
        <AreaChart
          width={350}
          height={150}
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
          <XAxis
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
          />
          <Tooltip />
          <Legend />
          <Area dot={false} dataKey="tested" stroke="#FFA500 " fill="#FFA500" />
        </AreaChart>
      </div>

      <AreaChart
        width={350}
        height={150}
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
        <XAxis
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
          dataKey="deaths"
          type="number"
          tickFormatter={function (value: number) {
            if (value >= 1000000000) {
              return (value / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
            }
            if (value >= 1000000) {
              return (value / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
            }
            if (value >= 1000) {
              return (value / 1000).toFixed(1).replace(/\.0$/, "") + "K";
            }
            return value;
          }}
        />
        <Tooltip />
        <Legend />
        <Area dot={false} dataKey="deaths" fill="#ed3b3b" stroke="#ed3b3b" /> */}
        {/* </AreaChart> */}
      </ResponsiveContainer>
    </div>
  );
};
export default TryChart;

// const mapStateToProps = (state: any) => {
//   return {
//     world: state.world,
//     history: state.history,
//   };
// };

// export default connect(mapStateToProps)(TryChart);

// import React from "react";
// import Chart from "react-apexcharts";
// import { connect } from "react-redux";
// interface Props {
//   world: any;
// }
// const TryChart = (props: Props) => {
//   const { month } = props.world.world;
//   const options = {
//     chart: {
//       id: "area",
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     stroke: {
//       curve: "straight",
//     },
//     yaxis: {
//       opposite: true,
//     },
//     legend: {
//       horizontalAlign: "left",
//     },
//     xaxis: {
//       type: "datetime",
//       categories: worldHistory.map((day: any) => day.date),
//     },
//   };
//   const series = [
//     {
//       name: "Gloabal cases",
//       data: worldHistory.map((day: any) => day.total_cases),
//     },
//     {
//       name: "Recovered",
//       data: worldHistory.map((day: any) => day.recovered),
//     },
//     {
//       name: "Active cases",
//       data: worldHistory.map((day: any) => day.tested),
//     },
//   ];

//   return (
//     <div className="app">
//       <div className="row">
//         <div className="mixed-chart">
//           <Chart options={options} series={series} type="area" width="500" />
//         </div>
//       </div>
//     </div>
//   );
// };

// const mapStateToProps = (state: any) => {
//   return {
//     world: state.world,
//   };
// };

// export default connect(mapStateToProps)(TryChart);
