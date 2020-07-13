import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import style from './spinner.module.scss'

 function CircularUnderLoad() {
  return   <div className={style.spinner}> <CircularProgress disableShrink  /> </div>;
}
export default CircularUnderLoad