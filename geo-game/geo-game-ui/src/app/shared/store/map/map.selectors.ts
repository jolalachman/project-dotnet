import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MapState } from './map.state';

export const MAP_FEATURE_STORE_KEY = 'map';

export const selectFeature = createFeatureSelector<MapState>(
    MAP_FEATURE_STORE_KEY
);

export const selectMapData = createSelector(selectFeature, (state) => state.map);
export const coloredCountries = createSelector(selectFeature, (state) => state.coloredCountries);

export const MapSelectors = {
    selectMapData: selectMapData,
    coloredCountries: coloredCountries,
};
