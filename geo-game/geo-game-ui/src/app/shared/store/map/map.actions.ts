import { createAction, props } from '@ngrx/store';
import { FeatureData } from '@shared/models';

export const loadData = createAction(
    '[Map] Load Data',
    props<{ map: any }>()
);

export const loadColoredCountry = createAction(
    '[Map] Load Colored Country',
    props<{ country: FeatureData }>()
);

export const resetColoredCountries = createAction(
    '[Map] Reset Colored Countries'
);

export const MapActions = {
    loadData: loadData,
    loadColoredCountry: loadColoredCountry,
    resetColoredCountries
};