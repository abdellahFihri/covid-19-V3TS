import React from 'react';
import styles from './searchbar.module.scss';
interface Props{
    onChange:(event:{target:{value:any}})=>void,
    placeholder:string,
    value:string
}

 const searchBar=({onChange,placeholder,value}:Props)=>(
    <div className={styles.input}>
        <input type="text" name="" placeholder={placeholder} id="" value={value} onChange={onChange} />
    </div>
);
export default searchBar