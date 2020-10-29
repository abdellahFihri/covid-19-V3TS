import _ from "lodash";
const INITIAL_STATE = {
    history: {
        yearHistory: "",
        monthHistory: '',
    weekHistory: '',
        selectedHistory:''
    }
     
  };
  
  const getMainChartHistory= (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
      case "MAIN_CHART_HISTORY":
        return {
          ...state,
          history: action.payload,
        };
        case "FETCH_DATA":
          return {
            ...state,
            history: {
              yearHistory: _.orderBy(action.data[2],['total_cases'],['asc']),
              monthHistory:_.orderBy( _.take(action.data[2], 32),['total_cases'],['asc']),
              weekHistory: _.orderBy( _.take(action.data[2], 10),['total_cases'],['asc']),
            
            }
        };
        case "FETCH_COUNTRY_DATA":
          return {
            ...state,
            history: {
              yearHistory: action.payload.data[3],
              monthHistory:action.payload.data[2],
              weekHistory: action.payload.data[1]
            
            }
        };
      
      default:
        return state;
    }
  };
  export default getMainChartHistory;
  