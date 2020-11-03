import React from 'react';
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import style from './overlay.module.scss'
// import { selectIso, selectSelectedCountry } from '../../redux/reducers/worldDataSelector';
import { Spinner } from 'reactstrap';
import {  selectOverlayCountry, selectOverlayIso } from '../../redux/reducers/overlaySelector';
interface Props{
    iso: string;
    selectedCountry: string;
}
const Overlay = (props:Props) => {
    const { iso, selectedCountry } = props
    console.log('iso and country in overlay',iso,selectedCountry)
    

    return  <div className={style.overlay}>
        <span className={style.span}>{`Collecting data for ${selectedCountry}`}</span>
          <img
              src={`https://www.countryflags.io/${iso}/flat/64.png`}
              alt=""
        />
        <div className={style.spinners}>
            <Spinner type="grow" color="light" size='sm' />
            <Spinner type="grow" color="light"   size='sm'  />
            <Spinner type="grow" color="light"  size='sm'  />
        </div>
      </div>
    
}

const mapStateToProps = createStructuredSelector({
   
    selectedCountry: selectOverlayCountry,
    iso: selectOverlayIso,
    
})
  
export default connect(mapStateToProps)(Overlay)