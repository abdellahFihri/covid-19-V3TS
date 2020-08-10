import axios from 'axios';
require('dotenv').config();


 export const CovidRequest = axios.create({
    
    baseURL: 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/',
    // timeout: 1000,
    headers:{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key":"aea18ae159mshb7fb100058a7a96p1f2a4fjsnaef89ac713ae"
        }
  });
//   export default CovidRequest;