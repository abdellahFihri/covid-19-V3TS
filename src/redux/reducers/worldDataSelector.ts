import { createSelector } from "reselect";
import { refactorRadar } from "../../utils/utilities/helpers";

const selectWorldData = (state:any)  => state.world;

export const selectFirstRow = createSelector(
  [selectWorldData],
  firstRow => firstRow.firstRow
);
export const selectWorldRow = createSelector(
  [selectWorldData],
  (worldRow) => worldRow.worldRow
);
export const selectStatsCards = createSelector(
  [selectWorldData],
  (statsCards) => statsCards.statsCards
);
export const selectRadarData = createSelector(
  [selectWorldData],
  (worldRow) => refactorRadar(worldRow.worldRow,'A')
);
export const selectSelectedCountry = createSelector(
  [selectWorldData],
  (selectedCountry) => selectedCountry.selectedCountry
);
export const selectIso = createSelector([selectWorldData], (iso) => iso.iso);
export const selectLoading = createSelector([selectWorldData], (loading) => loading.loading);
