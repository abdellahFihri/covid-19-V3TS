import React from "react";

import { connect } from "react-redux";
import Spinner from "../hoc/spinner/spinner";
import { createStructuredSelector } from "reselect";
import { selectMonth } from "../redux/reducers/mainChart/mainChartHistorySelector";
import TinyBar from "../chart/barCharts/barChart/tinyBarChart";
import ShortenedNum from "../hoc/shortNumber/shortNumber";
import _ from "lodash";
import { extractDifferences } from "../utils/utilities/helpers";
import DataErr from "../hoc/noData/messageError";
import { selectSelectedCountry } from "../redux/reducers/world/worldDataSelector";
import style from "./infos.module.scss";

interface Props {
  info1: number;
  info2: number;
  month: { [key: string]: number | string | null }[];
  country: string;
}

const Infos: React.FunctionComponent<Props> = (props) => {
  const { info1, info2, month, country } = props;

  let history: any[] = _.dropRight(month, 1);
  return (
    <div style={{ width: "100%" }}>
      <div className={style.infos}>
        <div className={style.spans}>
          {[
            { title: "Total active", value: info2 },
            { title: "Total critical", value: info1 },
          ].map((info: any) => (
            <ShortenedNum
              title={info.title}
              value={info.value}
              key={info.title}
            />
          ))}
        </div>
        {!history.length ? (
          <Spinner />
        ) : history[0].critical === history[5].critical ? (
          <DataErr
            errMsg={`No data available for critical cases in ${country}`}
            iconFill="#f1a51b"
          />
        ) : (
          <TinyBar
            history={extractDifferences(_.reverse(history), "critical")}
            keyData="critical"
            filling="#d65c0a"
            title={"Critical index of the last 30 days"}
            YaxisHide={true}
          />
        )}
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  month: selectMonth,
  country: selectSelectedCountry,
});
export default connect(mapStateToProps)(Infos);
