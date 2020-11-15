import { createSelector } from "reselect";
import _ from "lodash";
const comparableCountries = (state: any) => state.countriesToCompare;

export const selectIso_1 = createSelector([comparableCountries], (iso_1) => iso_1.iso_1);
export const selectIso_2 = createSelector([comparableCountries], (iso_2) => iso_2.iso_2);
export const selectCountryName_1 = createSelector([comparableCountries], (country_1) => country_1.country_1);
export const selectCountryName_2 = createSelector([comparableCountries], (country_2) => country_2.country_2);
export const selectCountryData_1 = createSelector([comparableCountries], (option_1) =>   option_1.option_1);
export const selectCountryData_2 = createSelector([comparableCountries], (option_2) => option_2.option_2);

