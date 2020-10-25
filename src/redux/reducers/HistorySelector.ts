import { createSelector } from "reselect";

const selectHistory = (state: any) => state.history.history;

export const selectWeek = createSelector([selectHistory], (week) => week.week);
export const selectMonth = createSelector([selectHistory], (month) => month.month);
export const selectYear = createSelector([selectHistory], (year) => year.year);
