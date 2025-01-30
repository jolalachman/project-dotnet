import { createReducer, on } from '@ngrx/store';
import { loadColoredCountry, loadData, resetColoredCountries } from './map.actions';
import { initialMapState } from './map.state';

export const mapReducer = createReducer(
  initialMapState,
  on(loadData, (state, { map }) => ({
    ...state,
    map
  })),
  on(loadColoredCountry, (state, { country }) => ({
    ...state,
    coloredCountries: [
      ...state.coloredCountries,
      country
    ]
  })),
  on(resetColoredCountries, (state) => ({
    ...state,
    coloredCountries: initialMapState.coloredCountries
  }))
);
