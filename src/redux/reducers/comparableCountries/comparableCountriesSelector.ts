import _ from "lodash";
import { createSelector } from "reselect";
import { extractDifferences, merging } from "../../../utils/utilities/helpers";

const comparableCountries = (state: any) => state.countriesToCompare;

export const selectIso_1 = createSelector(
  [comparableCountries],
  (iso_1) => iso_1.iso_1
);
export const selectIso_2 = createSelector(
  [comparableCountries],
  (iso_2) => iso_2.iso_2
);
export const selectCountryName_1 = createSelector(
  [comparableCountries],
  (country_1) => country_1.country_1
);
export const selectCountryName_2 = createSelector(
  [comparableCountries],
  (country_2) => country_2.country_2
);
export const selectCountryData_1 = createSelector(
  [comparableCountries],
  (option_1) => option_1.option_1
);
export const selectCountryData_2 = createSelector(
  [comparableCountries],
  (option_2) => option_2.option_2
);
export const selectHistory_1 = createSelector(
  [comparableCountries],
  (history_1) =>
    merging(
      ["total_cases", "recovered", "deaths"].map((val: string) =>
        extractDifferences(_.reverse(_.dropRight(history_1.history_1, 1)), val)
      )
    )
);
export const selectHistory_2 = createSelector(
  [comparableCountries],
  (history_2) =>
    merging(
      ["total_cases", "recovered", "deaths"].map((val: string) =>
        extractDifferences(_.reverse(_.dropRight(history_2.history_2, 1)), val)
      )
    )
);
