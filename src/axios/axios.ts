import axios from 'axios';
require('dotenv').config();


 export const CovidRequest = axios.create({
    
    baseURL: 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/',
    // timeout: 1000,
    headers:{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key":process.env.REACT_APP_SLEUTEL_SL
        }
  });
//   export default CovidRequest;