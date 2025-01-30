import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { MapState } from "./map.state";
import { MapSelectors } from "./map.selectors";
import { MapActions } from "./map.actions";
import { MapService } from "@shared/services";
import { combineLatest, map, take, tap } from "rxjs";
import { CountriesData, FeatureData } from "@shared/models";

@Injectable({
  providedIn: 'root',
})
export class MapFacade {
  private store = inject(Store<MapState>);
  private service = inject(MapService);

  loadData() {
    return this.service.getMap().pipe(tap(x => this.store.dispatch(MapActions.loadData({ map: x }))));
  }

  loadColoredCountry(country: FeatureData) {
    this.store.dispatch(MapActions.loadColoredCountry({ country: country }));
  }

  resetGuessedCountries() {
    this.store.dispatch(MapActions.resetColoredCountries());
  }

  mapData$ = this.store.select(MapSelectors.selectMapData);

  coloredCountries$ = this.store.select(MapSelectors.coloredCountries);

  guessedCountries$ = 
  combineLatest([
    this.store.select(MapSelectors.selectMapData),
    this.store.select(MapSelectors.coloredCountries)
  ]).pipe(
    map(([mapData, coloredCountries]: [CountriesData, FeatureData[]]) => {
      return `${coloredCountries.length}/${mapData?.features.length}`
    })
  );

}
