import _ from "lodash";
const INITIAL_STATE = {
   period:''
     
  };
  
  const getPeriod= (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
      case "SET_PERIOD":
        return {
          ...state,
          period: action.payload.period,
        };
      case "FETCH_DATA":
        return {
          ...state,period:_.takeRight(_.orderBy(action.data[2], ["date"], ["asc"]), 32),
        }
      case 'FETCH_COUNTRY_DATA':
        return {
          ...state,period: action.payload.data[2]
        }
      default:
        return state;
    }
  };
  export default getPeriod;