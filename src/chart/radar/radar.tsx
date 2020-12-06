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
import style from "./radar.module.scss";

interface Props {
  country?: string;
  iso1?: string;
  iso2?: string;
  country1?: string;
  country2?: string;
  data: any;
  comparable: boolean;
  filling2?: string;
}
const RadarRatio = (props: Props) => {
  const {
    country,
    country1,
    country2,
    data,
    comparable,
    filling2,
    iso1,
    iso2,
  } = props;
  const chartData = React.useMemo(() => _.orderBy(data, ["A"], ["desc"]), [
    data,
  ]);
  return (
    <div style={{ width: "100%", height: 385 }}>
      {iso1 ? (
        <div className={style.flags}>
          <span>
            {" "}
            <img
              src={`https://flagcdn.com/${iso1.toLocaleLowerCase()}.svg`}
              width="80"
              alt=""
            />
          </span>{" "}
          vs{" "}
          <span>
            {" "}
            <img
              src={`https://flagcdn.com/${
                iso2 ? iso2.toLocaleLowerCase() : ""
              }.svg`}
              width="80"
              alt=""
            />
          </span>
        </div>
      ) : (
        ""
      )}
      <ResponsiveContainer>
        <RadarChart outerRadius={130} data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <PolarRadiusAxis
            angle={18}
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
            fill="#3f51b5"
            fillOpacity={0.6}
            animationDuration={500}
          />
          {comparable ? (
            <Radar
              name={country2}
              dataKey="B"
              stroke={filling2}
              fill={filling2}
              fillOpacity={0.6}
              animationDuration={500}
              animationBegin={500}
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
