const INITIAL_STATE = {

    
  overlay: false,
  iso: '',
  selectedCountry:''
  
};
const getOverlay = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case "SET_OVERLAY":
      return {
        ...state,
        overlay: action.payload.overlay,
        iso: action.payload.iso,
        selectedCountry:action.payload.country,
          };
      case 'FETCH_COUNTRY_DATA':
          return {
              ...state,
            overlay: false,
            
              
      }
      case 'FETCH_DATA':
        return {
            ...state,
          overlay: false,
          
            
        }
   
     
    default:
      return state;
  }
};
export default getOverlay;