




import React from "react";
import InitialChart  from "../chart/initialChart";
import TinyArea from "../chart/barCharts/areaChart/tinyAreaChart";
import TinyBar from "../chart/barCharts/barChart/tinyBarChart";
// import TinyLine from "../chart/barCharts/lineChart/tinyLineChart"
import MainBarChart from "../chart/barCharts/mainBarChart/BarChart";
import ShortenedNum from "../hoc/shortNumber/shortNumber";
import { createStructuredSelector } from "reselect";
import { selectMonth, selectWeek, selectYear } from "../redux/reducers/mainChartHistorySelector";
import { selectWorldRow, selectSelectedCountry, selectIso } from "../redux/reducers/worldDataSelector";
import { setPeriod } from "../redux/actions/index";
import {selectPeriod} from "../redux/reducers/periodSelector"
import { connect } from "react-redux";

import _ from "lodash";
import { extractDifferences } from "../utils/utilities/helpers";
import style from "./mainChartContainer.module.scss";
import{Button}from "reactstrap"


interface Props {
  history: any;
  world: any;
  year: any;
  worldRow: any;
  selectedCountry: string;
  iso: string;
  month: any;
  week: any;
  selectedPeriod: any;
  setPeriod: any;
}
const ChartsContainer = (props: Props) => {
  const { year,month,week,selectedPeriod,setPeriod} = props
  const { worldRow, selectedCountry, iso } = props
  const yearPeriod = React.useMemo(() => year, [year])
  const monthPeriod = React.useMemo(() => month, [month])
  const weekPeriod = React.useMemo(() => week, [week])
  const chartPeriod=React.useMemo(() =>selectedPeriod,[selectedPeriod])
      const selectPeriod = (period: string) => {
      
        switch (period) {
          case 'week':
            // setPeriod('')
             setPeriod({ period: weekPeriod })
            break;
          case 'month':
            // setPeriod('')
             setPeriod({ period: monthPeriod})
            break;
          case 'year':
            // setPeriod('')
            return setPeriod({ period: yearPeriod})
          // default:
          //   setPeriod({ period: year })
       } 
        
      }

  // let history: any = selectedPeriod;

  
//  console.log('WEEKpERIOD IN MAIN CHARTCONTAINER',props)

   
  let shortHistory =_.reverse(_.dropRight(chartPeriod, 1) )
  
 
  return (
    
    <div  style={{ boxShadow: '-1px 8px 11px -8px rgba(11, 0, 0, 0.63)'}} className="col-lg-6" >
      <div  className="row">
        <div className={`${style.main} col-md-8`}>
          <h6>Cases and recovered overview in {selectedCountry}</h6>
          <span>Presenting the global contamination and revovery indexes</span>
        </div>

      </div>
      <div className="row">
        {[{ title: 'Total cases', value: worldRow.total_cases }, { title: 'Total recovered', value: worldRow.recovered }].map((item) => <div className='col-md-3'  key={item.title}>
          <ShortenedNum title={item.title} value={item.value}/>
        </div>)}
        
            <div className={`${style.buttons} col-md-4`}>
            {['week', 'month', 'year'].map((period: string) => <Button outline key={period} color="primary" size="sm"onClick={()=>selectPeriod(period)} >{period}</Button>)}
            </div>
            <div className={` ${style.image} col-md-2`}>
            <img
              src={`https://www.countryflags.io/${iso}/flat/64.png`}
              alt=""
              />
              </div>
        </div>
      <div className="row">
        {/* <div className="col-md-4"> */}
       
         
          
              
        {/* </div> */}
        
      </div>
      <div className="row">
        <div className="col-md-12">
          {shortHistory.length > 31 ? (
            <InitialChart
              history={["total_cases", "recovered"].map((rec: any) =>
                extractDifferences(shortHistory, rec)
              )}
              keyData="total_cases"
              sync="main"
            />
          ) : (
            <MainBarChart
              history={["total_cases", "recovered"].map((rec: any) =>
                extractDifferences(shortHistory, rec)
              )}
              keyData="total_cases"
              sync="main"
              filling="#5068e0"
            />
          )}
        </div>
      </div>
      <div className="row">
        {[
          {
            param: "tested",
            title: 'Global tests',
            chartTitle:"Periodic rate tests",
           global:worldRow.tested,
            filling: "#1d89e8",
            stroke: "#ff7b00",
          },
          {
            param: "deaths",
            title:'Global deaths',
            global: worldRow.deaths,
            chartTitle:"Periodic rate of deaths",
            filling: "#b72429",
            stroke: "#d62d33",
          },
        ].map((rec: any) => (
          <div className="col-md-6" key={rec.param}>
            <div className="row">
            <div className="col-md-6">
            <ShortenedNum title={rec.title} value={rec.global}/>
        </div>
            
            {shortHistory.length > 31 ? (
              <TinyArea
                history={extractDifferences(shortHistory, rec.param)}
                // history={shortHistory}
                keyData={rec.param}
                sync="main"
                filling={rec.filling}
                stroke={rec.stroke}
                title={rec.chartTitle}
              />
            ) : (
              <TinyBar
                history={extractDifferences(shortHistory, rec.param)}
                // history={shortHistory}
                keyData={rec.param}
                  sync="main"
                  title={rec.chartTitle}
                filling={rec.filling}
              />
            )}
            </div>
            </div>
        ))}
        {/* <div className="col-md-6">
          <TinyArea
            history={extractDifferences(shortHistory, "tested")}
            keyData="tested"
          />
        </div> */}
        {/* <div className="col-md-6">
          <TinyArea
            history={extractDifferences(shortHistory, "deaths")}
            keyData="deaths"
          />
        </div> */}
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  year: selectYear,
  month: selectMonth,
  week:selectWeek,
  worldRow: selectWorldRow,
  selectedCountry: selectSelectedCountry,
  iso: selectIso,
  selectedPeriod:selectPeriod
})

// const mapStateToProps = (state: any) => {
//   return {
//     world: state.world,
//     history: state.history,
//   };
// };

export default connect(mapStateToProps,{setPeriod})(ChartsContainer);

