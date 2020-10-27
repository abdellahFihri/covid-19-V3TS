import { createSelector } from "reselect";
import {reverseData} from "../../utils/utilities/helpers"
const selectHistory = (state: any) => state.history.history;

export const selectWeek = createSelector([selectHistory], (week) => week.week);
export const selectMonth = createSelector([selectHistory], (month) => month.month);
export const selectYear = createSelector([selectHistory], (year) => year.year);

export const selectWeekReverse = createSelector([selectHistory], (week) =>reverseData(week.week));
export const selectMonthReverse = createSelector([selectHistory], (month) =>reverseData(month.month));
export const selectYearReverse = createSelector([selectHistory], (year) =>reverseData(year.year));
