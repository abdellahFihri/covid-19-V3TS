import { createSelector } from "reselect";
const selectHistoryPeriod = (state: any) => state.period.period;

export const selectPeriod = createSelector([selectHistoryPeriod], (period) => period);
