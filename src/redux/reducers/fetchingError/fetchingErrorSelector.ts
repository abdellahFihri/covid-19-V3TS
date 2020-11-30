import { createSelector } from "reselect";
const stateFetchingError = (state: any) => state.fetchingDataError;
export const selectFetchErrorMsg = createSelector(
  [stateFetchingError],
  (error) => error.error.message
);
