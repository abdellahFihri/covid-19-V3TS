import React from "react";
import Container from "../hoc/container/container";
import style from "./infos.module.scss";
import { connect } from "react-redux";
import Spinner from "../hoc/spinner/spinner"
import { createStructuredSelector } from "reselect";
import {selectMonth}  from "../redux/reducers/mainChartHistorySelector"
import TinyBar from "../chart/barCharts/barChart/tinyBarChart";
import _ from "lodash";
import { extractDifferences ,numberWithCommas} from "../utils/utilities/helpers";

interface Props{
  info1: any;
  info2: any;
  month: any;
}

const Infos = (props:Props) => {
  const { info1, info2, month } = props
  const shortHistory = React.useMemo(() => month, [month])
  const critical = React.useMemo(() => info1, [info1])
  const tested=React.useMemo(() => info2, [info2])
  // let history = month
  // console.log('HISTORY IN INFOS',props)
  let history=_.dropRight(shortHistory,1)
  return (
    <Container>
      <div className={style.infos}>
        <div className={style.spans}>
       
        <div className="infoSection">
          {" "}
         <span className={style.infoSpan}>{critical ? numberWithCommas( critical) : "Not registered yet"}</span> <br/> Critical cases
        </div>
        <div className="infoSection">
          {" "}
         
          <span className={style.infoSpan}>{tested ? numberWithCommas(tested): "Not registered yet"}</span> <br/>{" "} Total tested
        </div>
        </div>
        {
          !history.length ?
            <Spinner /> :
            
        <TinyBar history={extractDifferences(_.reverse(history),'critical')} keyData="critical" filling="#d65c0a" title={'Critical index of the last 30 days'}/>
        }
       
        </div>
    </Container>
  );
};
const mapStateToProps = createStructuredSelector({
  month:selectMonth
})
export default connect(mapStateToProps) (Infos);
