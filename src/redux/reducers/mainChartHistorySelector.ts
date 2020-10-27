import { createSelector } from "reselect";
import _ from "lodash";
const selectMainChartHistory = (state: any) => state.mainChartHistory.history;

// export const selectYear = createSelector([selectMainChartHistory], (yearHistory) =>_.orderBy( yearHistory.yearHistory,['total_cases'],['asc']));
// export const selectMonth = createSelector([selectMainChartHistory], (yearHistory) =>_.orderBy( _.take(yearHistory.yearHistory, 31),['total_cases'],['asc']));
// export const selectWeek = createSelector([selectMainChartHistory], (yearHistory) =>_.orderBy( _.take(yearHistory.yearHistory, 8)));

export const selectYear = createSelector([selectMainChartHistory], (yearHistory) => yearHistory.yearHistory);
export const selectMonth = createSelector([selectMainChartHistory], (monthHistory) =>monthHistory.monthHistory);
export const selectWeek = createSelector([selectMainChartHistory], (weekHistory) => weekHistory.weekHistory);

