import { createSelector } from "reselect";
const selectTerm = (state: any) => state.searchTerm;

export const selectSearchTerm = createSelector(
  [selectTerm],
  (term) => term.term
);
