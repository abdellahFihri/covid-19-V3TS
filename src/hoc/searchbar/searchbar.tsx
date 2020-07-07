import React from 'react';
import styles from './searchbar.module.scss';
interface Props{
    onChange:any,
    placeholder:string,
    value:any
}

 const searchBar=({onChange,placeholder,value}:Props)=>(
    <div className={styles.input}>
        <input type="text" name="" placeholder={placeholder} id="" value={value} onChange={onChange} />
    </div>
);
export default searchBar