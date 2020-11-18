import { createSelector } from "reselect";

const selectAllCountries = (state: any) => state.allCountries.allCountriesStats;

export const selectAll = createSelector([selectAllCountries], (all) => all.all);
export const selectFiltered = createSelector(
  [selectAllCountries],
  (filter) => filter.filter
);
