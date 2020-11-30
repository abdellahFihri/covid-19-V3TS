import React from "react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { numberWithCommas } from "../../utils/utilities/helpers";

const COLORS = ["#f7ab13", "#d62d33", "#28a745"];
interface Props {
  data: any;
  title: string;
}
const DonutChart = (props: Props) => {
  const { data, title } = props;
  const chartData = React.useMemo(() => [0, 2, 3].map((i: number) => data[i]), [
    data,
  ]);
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.1;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        style={{
          color: "white",
          fontWeight: 700,
          fontSize: "12px",
          textShadow: " -1px 1px 7px rgba(0,0,0,0.95)",
        }}
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  return (
    <div style={{ width: "100%", height: 350, textAlign: "center" }}>
      <h6>{title}</h6>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            innerRadius={70}
            outerRadius={100}
            fill="#8884d8"
            labelLine={false}
            paddingAngle={1}
            dataKey="A"
            label={renderCustomizedLabel}
            animationDuration={500}
          >
            {chartData.map((entry: any, index: any) => (
              <Cell
                key={`cell-${entry.index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend
            align="center"
            verticalAlign="top"
            height={25}
            iconSize={13}
            iconType="circle"
          />
          <Tooltip formatter={(value) => numberWithCommas(value)} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
export default DonutChart;
