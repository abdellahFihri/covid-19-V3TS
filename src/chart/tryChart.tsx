import React from "react";
import { connect } from "react-redux";
import {
  LineChart,
  AreaChart,
  BarChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface Props {
  world: any;
}

const TryChart = (props: Props) => {
  const { worldHistory } = props.world.world;
  return (
    <div>
      <AreaChart
        width={700}
        height={300}
        syncId="anyId"
        data={worldHistory}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="2 2" vertical={false} />
        <XAxis
          dataKey="date"
          tickFormatter={function (value: string) {
            const d = new Date(value);

            const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(
              d
            );
            const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
              d
            );
            return `${da}/${mo}`;
          }}
        />
        <YAxis
          dataKey="total_cases"
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
        <Area
          dot={false}
          strokeWidth={4}
          type="monotone"
          dataKey="total_cases"
          stroke="#1D89E8"
          activeDot={{ r: 8 }}
        />
        <Area
          dot={false}
          type="monotone"
          dataKey="recovered"
          strokeWidth={4}
          stroke="#70C96D"
        />
      </AreaChart>

      <div>
        <AreaChart
          width={350}
          height={150}
          syncId="anyId"
          data={worldHistory}
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
            dataKey="active_cases"
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
          <Area
            dot={false}
            dataKey="active_cases"
            stroke="#FFA500 "
            fill="#FFA500"
          />
        </AreaChart>
      </div>

      <AreaChart
        width={350}
        height={150}
        syncId="anyId"
        data={worldHistory}
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
        <Area dot={false} dataKey="deaths" fill="#ed3b3b" stroke="#ed3b3b" />
      </AreaChart>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    world: state.world,
  };
};

export default connect(mapStateToProps)(TryChart);

// import React from "react";
// import Chart from "react-apexcharts";
// import { connect } from "react-redux";
// interface Props {
//   world: any;
// }
// const TryChart = (props: Props) => {
//   const { worldHistory } = props.world.world;
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
//       data: worldHistory.map((day: any) => day.active_cases),
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