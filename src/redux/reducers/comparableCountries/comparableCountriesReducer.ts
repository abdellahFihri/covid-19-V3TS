import { refactorRadar } from "../../../utils/utilities/helpers";

const INITIAL_STATE = {
  option_1: "",
  country_1: "",
  iso_1: "",
  option_2: "",
  country_2: "",
  iso_2: "",
};

const getCountriesToCompare = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case "SET_OPTION_1":
      return Object.assign({}, state, {
        option_1: refactorRadar(action.payload, "A"),
        iso_1: action.payload.iso3166a2,
        country_1: action.payload.name,
      });
    case "SET_OPTION_2":
      return Object.assign({}, state, {
        option_2: refactorRadar(action.payload, "B"),
        iso_2: action.payload.iso3166a2,
        country_2: action.payload.name,
      });
    default:
      return state;
  }
};
export default getCountriesToCompare;
