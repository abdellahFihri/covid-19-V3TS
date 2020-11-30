import { createSelector } from "reselect";
const selectHistoryPeriod = (state: any) => state.period;

export const selectPeriod = createSelector(
  [selectHistoryPeriod],
  (period) => period.period
);

export const selectPeriodRange = createSelector(
  [selectHistoryPeriod],
  (periodTimeRange) => periodTimeRange.periodTimeRange
);

export const selectIfCountry = createSelector(
  [selectHistoryPeriod],
  (countryPeriod) => countryPeriod.countryPeriod
);
