import { createSelector } from "reselect";
const selectMainChartHistory = (state: any) => state.mainChartHistory.history;



export const selectYear = createSelector([selectMainChartHistory], (yearHistory) => yearHistory.yearHistory);
export const selectMonth = createSelector([selectMainChartHistory], (monthHistory) =>monthHistory.monthHistory);
export const selectWeek = createSelector([selectMainChartHistory], (weekHistory) => weekHistory.weekHistory);
export const selectCumulative = createSelector([selectMainChartHistory], (cumulative) => cumulative.cumulative);


