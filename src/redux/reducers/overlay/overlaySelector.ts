import { createSelector } from "reselect";
const overlay = (state: any) => state.overlay;

export const selectOverlay = createSelector([overlay], (overlay) => overlay.overlay);
export const selectOverlayIso = createSelector([overlay], (iso) => iso.iso);
export const selectOverlayCountry = createSelector([overlay], (selectedCountry) => selectedCountry.selectedCountry);