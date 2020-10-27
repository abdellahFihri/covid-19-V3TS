const INITIAL_STATE = {
   period:''
     
  };
  
  const getPeriod= (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
      case "SET_PERIOD":
        return {
          ...state,
          period: action.payload,
        };
      default:
        return state;
    }
  };
  export default getPeriod;