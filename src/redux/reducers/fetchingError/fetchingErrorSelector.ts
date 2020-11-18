import { createSelector } from "reselect";
const stateFetchingError = (state: any) => state.FetchError;
export const selectFetchErrorMsg = createSelector(
  [stateFetchingError],
  (error) => error.error.message
);
