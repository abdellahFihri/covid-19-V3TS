const INITIAL_STATE = {
  world: {
    firstRow: "",
    worldRow: "",
    statsCards: "",
    selectedCountry: "",
    iso: "",
    loading:true,
  },
};
const getWorldData = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case "WORLD_DATA":
      return {
        ...state,
        world: action.payload,
      };
    default:
      return state;
  }
};
export default getWorldData;
