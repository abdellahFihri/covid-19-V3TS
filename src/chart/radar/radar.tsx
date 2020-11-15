import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import { numberWithCommas, numFormatter } from "../../utils/utilities/helpers";

import _ from "lodash";

interface Props {
  country?: string;

  country1?: string;
  country2?: string;
  data: any;
  comparable: boolean;
  filling2?: string;
}
const RadarRatio = (props: Props) => {
  const { country, country1, country2, data, comparable, filling2 } = props;

  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <RadarChart outerRadius={95} data={_.orderBy(data, ["A"], ["desc"])}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis
            tickFormatter={function (value: number) {
              return numFormatter(value);
            }}
            scale="sqrt"
            orientation="middle"
          />
          <Radar
            name={country1 ? country1 : country}
            dataKey="A"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          {comparable ? (
            <Radar
              name={country2}
              dataKey="B"
              stroke={filling2}
              fill={filling2}
              fillOpacity={0.6}
            />
          ) : (
            ""
          )}

          <Tooltip formatter={(value) => numberWithCommas(value)} />
          <Legend
            align="right"
            verticalAlign="top"
            iconType="circle"
            height={5}
            iconSize={13}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarRatio;
