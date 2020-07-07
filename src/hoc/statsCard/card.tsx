import React from 'react';
import CountUp from 'react-countup';
import style from './card.module.scss';


interface Props{
    colSize:number;
    title:string;
    end?:string;
    description?:string
}


const StatsCard=(props:Props)=>{
   
    return(
    <div className={`col-md-${props.colSize}`}>
        <div className={style.card}>
<div className={style.label}><span> {props.title}</span></div>
            <div className="content">
                {props.end?  
            <CountUp className={style.countup} end={parseFloat(props.end)}
            duration={2}
            separator="."
            useEasing={true}
             />:<span className={style.countup}>--</span>
                }
            </div>
    <span className={style.description}>{props.description}</span>
        </div>
        </div>
    )
}
export default StatsCard;