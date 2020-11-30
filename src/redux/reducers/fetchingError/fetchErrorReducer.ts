const INITIAL_STATE = {
  error: "",
};

const getFetchingErrorMessage = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case "ERROR":
      return { ...state, error: action.data };
    default:
      return state;
  }
};
export default getFetchingErrorMessage;
