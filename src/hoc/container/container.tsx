import React from 'react';
import style from './container.module.scss';

const container:React.FunctionComponent=({children})=>(
    <div className={style.container}>
        
            {children}
        
    </div>
)
export default container;