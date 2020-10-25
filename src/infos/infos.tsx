import React from "react";
import Container from "../hoc/container/container";
import style from "./infos.module.scss";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {selectMonth}  from "../redux/reducers/HistorySelector"
import TinyBar from "../chart/barCharts/barChart/tinyBarChart";
import _ from "lodash";
import { extractDifferences } from "../utils/utilities/helpers";
interface Props{
  info1: any;
  info2: any;
  month: any;
}

const infos = (props:Props) => {
const {info1,info2,month}=props
  // let history = month
  console.log('HISTORY IN INFOS',props)
  return (
    <Container>
      <div className={style.infos}>
        <div className={style.spans}>
       
        <div className="infoSection">
          {" "}
         <span className={style.infoSpan}>{info1 ? info1 : "Not registered yet"}</span> <br/> Critical cases
        </div>
        <div className="infoSection">
          {" "}
         
          <span className={style.infoSpan}>{info2 ? info2 : "Not registered yet"}</span> <br/>{" "} Total tested
        </div>
        </div>
        
        <TinyBar history={extractDifferences(_.reverse(month), 'critical')} keyData="critical" filling="#f7ab13" title={'Critical index of the last month'}/>
       
        </div>
    </Container>
  );
};
const mapStateToProps = createStructuredSelector({
  month:selectMonth
})
export default connect(mapStateToProps) (infos);
