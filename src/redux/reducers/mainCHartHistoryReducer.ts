const INITIAL_STATE = {
    history: {
        yearHistory: '',
        monthHistory: '',
        weekHistory:''
    }
     
  };
  
  const getMainChartHistory= (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
      case "MAIN_CHART_HISTORY":
        return {
          ...state,
          history: action.payload,
        };
      default:
        return state;
    }
  };
  export default getMainChartHistory;
  