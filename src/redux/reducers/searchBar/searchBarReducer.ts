const INITIAL_STATE = {
  term: "",
};
const getSearchTerm = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case "SEARCH_TERM":
      return {
        ...state,
        term: action.payload,
      };
    default:
      return state;
  }
};
export default getSearchTerm;
