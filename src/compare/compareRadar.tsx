import * as React from 'react';
import RadarRatio from "../chart/radar/radar";
import style from "./compareRadar.module.scss";
import ComboBox from "../hoc/autoComplete/autoComplete"
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectRadarData, selectSelectedCountry } from '../redux/reducers/worldDataSelector';
import { selectCountryData_1, selectCountryData_2, selectCountryName_1, selectCountryName_2 } from '../redux/reducers/comparableCountriesSelector';
import { mergeRadarData } from '../utils/utilities/helpers';
import _ from 'lodash';

const CompareRadar = (props:any) => {
    const { radarData,  comparable_1, comparable_2, country_1, country_2 } = props
    const mergedData=React.useMemo(() =>mergeRadarData(comparable_1,comparable_2),[comparable_1,comparable_2])
 
    console.log('RADAR DATA', mergeRadarData(comparable_1,comparable_2) ,'comparable1: ',comparable_1,'radarData: ', _.orderBy(radarData,['A'],['desc']))

    return (
        
        <div className={style.compareRadar}>
            <h6>Compare countries  </h6>
            <div className={style.comboBox}>
            <ComboBox id="first" label='Option 1'/>
                <ComboBox id='second' label='Option 2' />
                </div>
            {
mergedData.length?
                    <RadarRatio data={mergedData} comparable={comparable_2 ? true : false} country1={country_1} country2={country_2} filling2="#1d89e8" />
                    :''
            }
            
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    radarData: selectRadarData,
    country: selectSelectedCountry,
    comparable_1: selectCountryData_1,
    comparable_2: selectCountryData_2,
    country_1: selectCountryName_1,
    country_2:selectCountryName_2
    
    })
  export default connect(mapStateToProps)(CompareRadar)
