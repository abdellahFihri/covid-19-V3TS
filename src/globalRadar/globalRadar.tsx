import React from "react";
import RadarRatio from "../chart/radar/radar";
import style from "./globalRadar.module.scss";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {
  selectRadarData,
  selectSelectedCountry,
} from "../redux/reducers/world/worldDataSelector";

interface Props {
  radarData: { [key: string]: number | string | null }[];
  country: string;
}
const GlobalRadar: React.FunctionComponent<Props> = (props) => {
  const { radarData, country } = props;

  return (
    <div className={style.compareRadar}>
      <RadarRatio
        data={radarData}
        comparable={false}
        country={country}
        filling2="#1d89e8"
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  radarData: selectRadarData,
  country: selectSelectedCountry,
});
export default connect(mapStateToProps)(GlobalRadar);
