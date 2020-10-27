// import React from "react";
// import InitialChart  from "../chart/initialChart";
// import TinyArea from "../chart/barCharts/areaChart/tinyAreaChart";
// import TinyBar from "../chart/barCharts/barChart/tinyBarChart";
// import MainBarChart from "../chart/barCharts/mainBarChart/BarChart";
// import { createStructuredSelector } from "reselect";
// import { selectMonth, selectYear } from "../redux/reducers/HistorySelector";
// import {selectWorldRow,selectSelectedCountry,selectIso} from "../redux/reducers/worldDataSelector"
// import { connect } from "react-redux";
// import _ from "lodash";
// import { extractDifferences, numFormatter } from "../utils/utilities/helpers";
// import style from "./mainChartContainer.module.scss";

// interface Props {
//   history: any;
//   world: any;
//   year: any;
//   worldRow: any;
//   selectedCountry: string;
//   iso: string;
//   month: string;
// }
// const ChartsContainer = (props: Props) => {
//   const { year,month} = props
//   const { worldRow, selectedCountry, iso } = props

//   let shortHistory = _.reverse(year);
//   return (
//     <div className="col-lg-6" >
//       <div className="row">
//         <div className="col-md-8">
//           <h6>Cases and recovered overview in {selectedCountry}</h6>
//           <span>Presenting the global contamination and revovery indexes</span>
//         </div>

//         <div className="col-md-4">
//           {" "}
//           <span
//             style={{
//               width: "100%",
//               display: "flex",
//               justifyContent: "flex-end",
//             }}
//           >
//             {" "}
//             <img
//               src={`https://www.countryflags.io/${iso}/flat/64.png`}
//               alt=""
//             />{" "}
//           </span>{" "}
//         </div>
//       </div>
//       <div className="row">
//         <div className="col-md-4">
//           <span>Global cases</span>
//           <div className={style.global}>
//             <span> {numFormatter(worldRow.total_cases)}</span>
//             {` (${worldRow.total_cases})`}
//           </div>
//         </div>
//         <div className="col-md-4">
//           <span>Global Recovered</span>
//           <div className={style.global}>
//             {" "}
//             <span>{numFormatter(worldRow.recovered)} </span>
//             {` (${worldRow.recovered})`}{" "}
//           </div>
//         </div>
//       </div>
//       <div className="row">
//         <div className="col-lg-12">
//           {shortHistory.length > 31 ? (
//             <InitialChart
//               history={["total_cases", "recovered"].map((rec: any) =>
//                 extractDifferences(shortHistory, rec)
//               )}
//               keyData="total_cases"
//               sync="main"
//             />
//           ) : (
//             <MainBarChart
//               history={["total_cases", "recovered"].map((rec: any) =>
//                 extractDifferences(shortHistory, rec)
//               )}
//               keyData="total_cases"
//               sync="main"
//               filling="#1d89e8"
//             />
//           )}
//         </div>
//       </div>
//       <div className="row">
//         {[
//           {
//             param: "tested",
//             param2: "critical",
//             filling: "#ed760e",
//             stroke: "ff7b00",
//           },
//           {
//             param: "deaths",
//             param2: "deaths",
//             filling: "#ea0e3d",
//             stroke: "#d65c0a",
//           },
//         ].map((rec: any) => (
//           <div className="col-md-6" key={rec.param}>
//             {shortHistory.length > 31 ? (
//               <TinyArea
//                 history={extractDifferences(shortHistory, rec.param)}
//                 keyData={rec.param}
//                 sync="main"
//                 filling={rec.filling}
//                 stroke={rec.stroke}
//               />
//             ) : (
//               <TinyBar
//                 history={extractDifferences(shortHistory, rec.param)}
//                 keyData={rec.param}
//                 sync="main"
//                 filling={rec.filling}
//               />
//             )}
//           </div>
//         ))}
//         {/* <div className="col-md-6">
//           <TinyArea
//             history={extractDifferences(shortHistory, "tested")}
//             keyData="tested"
//           />
//         </div> */}
//         {/* <div className="col-md-6">
//           <TinyArea
//             history={extractDifferences(shortHistory, "deaths")}
//             keyData="deaths"
//           />
//         </div> */}
//       </div>
//     </div>
//   );
// };
// const mapStateToProps = createStructuredSelector({
//   year: selectYear,
//   month:selectMonth,
//   worldRow: selectWorldRow,
//   selectedCountry: selectSelectedCountry,
//   iso:selectIso
// })

// // const mapStateToProps = (state: any) => {
// //   return {
// //     world: state.world,
// //     history: state.history,
// //   };
// // };

// export default connect(mapStateToProps)(ChartsContainer);




import React, { useState} from "react";
import InitialChart  from "../chart/initialChart";
import TinyArea from "../chart/barCharts/areaChart/tinyAreaChart";
import TinyBar from "../chart/barCharts/barChart/tinyBarChart";
import MainBarChart from "../chart/barCharts/mainBarChart/BarChart";
import { createStructuredSelector } from "reselect";
import { selectMonth, selectWeek, selectYear } from "../redux/reducers/mainChartHistorySelector";
import { selectWorldRow, selectSelectedCountry, selectIso } from "../redux/reducers/worldDataSelector";
import { setPeriod } from "../redux/actions/index";
import {selectPeriod} from "../redux/reducers/periodSelector"
import { connect } from "react-redux";
import _ from "lodash";
import { extractDifferences, numFormatter } from "../utils/utilities/helpers";
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
            setPeriod('')
             setPeriod({ period: weekPeriod })
            break;
          case 'month':
            setPeriod('')
             setPeriod({ period: monthPeriod })
            break;
          case 'year':
            setPeriod('')
            return setPeriod({ period: yearPeriod })
          // default:
          //   setPeriod({ period: year })
       } 
        
      }

  // let history: any = selectedPeriod;

  
 

   
  let shortHistory =_.reverse(_.dropRight(chartPeriod, 1) )
  
 
  return (
    <div className="col-lg-6" >
      <div className="row">
        <div className={`${style.main} col-md-8`}>
          <h6>Cases and recovered overview in {selectedCountry}</h6>
          <span>Presenting the global contamination and revovery indexes</span>
        </div>

      </div>
      <div className="row">
        <div className="col-sm-6">
          <span>Global cases</span>
          <div className={style.global}>
            <span> {numFormatter(worldRow.total_cases)}</span>
            {` (${worldRow.total_cases.toLocaleString()})`}
          </div>
        </div>
        <div className="col-sm-6">
          <span>Global Recovered</span>
          <div className={style.global}>
            {" "}
            <span>{numFormatter(worldRow.recovered)} </span>
            {` (${worldRow.recovered.toLocaleString()})`}{" "}
          </div>
        </div>
        </div>
      <div className="row">
        {/* <div className="col-md-4"> */}
       
         
          
            <div className={`${style.buttons} col-sm-8`}>
            {['week', 'month', 'year'].map((period: string) => <Button outline key={period} color="primary" size="sm"onClick={()=>selectPeriod(period)} >{period}</Button>)}
            </div>
            <div className={` ${style.image} col-sm-4`}>
            <img
              src={`https://www.countryflags.io/${iso}/shiny/64.png`}
              alt=""
              />
              </div>
              
        {/* </div> */}
        
      </div>
      <div className="row">
        <div className="col-lg-12">
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
              filling="#1d89e8"
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
            filling: "#5068e0",
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
                <span>{rec.title}</span>
          <div className={style.global}>
            {" "}
            <span>{numFormatter(rec.global)} </span>
            {` (${rec.global.toLocaleString()})`}{" "}
          </div>
        </div>
            </div>
            {shortHistory.length > 31 ? (
              <TinyArea
                history={extractDifferences(shortHistory, rec.param)}
                keyData={rec.param}
                sync="main"
                filling={rec.filling}
                stroke={rec.stroke}
                title={rec.chartTitle}
              />
            ) : (
              <TinyBar
                history={extractDifferences(shortHistory, rec.param)}
                keyData={rec.param}
                  sync="main"
                  title={rec.chartTitle}
                filling={rec.filling}
              />
            )}
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

