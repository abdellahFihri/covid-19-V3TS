import { createSelector } from "reselect";
const stateCumulative = (state: any) => state.cumulative;
export const selectCumulative = createSelector([stateCumulative], (cumulative) => cumulative.cumulative);
