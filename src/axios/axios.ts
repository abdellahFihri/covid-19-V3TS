import axios from "axios";
require("dotenv").config();

export const WorldRequest = axios.create({
  baseURL: "https://coronavirus-map.p.rapidapi.com/v1/",

  headers: {
    "content-type": "application/octet-stream",
    "x-rapidapi-host": "coronavirus-map.p.rapidapi.com",
    "x-rapidapi-key": "aea18ae159mshb7fb100058a7a96p1f2a4fjsnaef89ac713ae",
    useQueryString: true,
  },
});
