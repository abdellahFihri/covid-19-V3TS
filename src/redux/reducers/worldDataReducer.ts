const INITIAL_STATE = {
  world: {
    worldRow: "",
    statsCards: "",
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
