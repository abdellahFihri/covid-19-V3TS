import { createSelector } from "reselect";

const selectAllCountries = (state: any) => state.allCountries.allCountriesStats;
const selectFiltering = (state: any) => state.allCountries;

export const selectAll = createSelector([selectAllCountries], (all) => all.all);
export const listFiltering = createSelector(
  [selectFiltering],
  (listFiltering) => listFiltering.listFiltering
);

export const selectFiltered = createSelector(
  [selectAllCountries],
  (filter) => filter.filter
);
