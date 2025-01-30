import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { FeatureData } from '@shared/models';
import { MapFacade } from '@shared/store/map';
import * as L from 'leaflet';
import { tap } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit, OnChanges, OnDestroy {
  @Input() coloredCountries: FeatureData[] = [];
  @Input() showMissing: boolean = false;
  private facade = inject(MapFacade);
  private map: L.Map | undefined;
  private markers: L.Marker[] = [];

  ngOnInit() {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['coloredCountries']) {
      const currentValue = changes['coloredCountries'].currentValue;
      if(currentValue.length > 0) {
        this.updateColoredCountries(currentValue);
      }
      else {
        if (this.map) {
          this.map.remove();
          this.initMap();
        }
      }
    }
    if (changes['showMissing']) {
      if(this.showMissing){
        this.showMissingCountries();
      }
      else {
        this.hideMissingCountries();
      }
    }
  }
  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [25, 10],
      zoom: 2,
    });

    this.loadCountriesGeoJson();
  }

  private loadCountriesGeoJson() {
    this.facade.mapData$.pipe(tap(x => {
      L.geoJSON(x, {
        style: this.defaultStyle,
      }).addTo(this.map as L.Map)
  })).subscribe();
  }

  private updateColoredCountries(countries: FeatureData[]) {
    if (this.map) {
      this.map.eachLayer((layer: any) => {
        const country = countries.find(c => c.id === layer?.feature?.id);
        if(country) {
          const removedMarker = this.markers.find(x => {
            const {lat, lng} = x.getLatLng();
            return lat === country.properties.center[0] && lng === country.properties.center[1];
          });
          if (removedMarker) {
            removedMarker.remove();
          }
          layer.setStyle({...layer.options, fillColor: '#e64220' });
        }
      });
    }
  }

  private defaultStyle() {
    return {
      fillColor: '#CD853F',
      weight: 1,
      opacity: 1,
      color: '#905d2c',
      fillOpacity: 0.7,
    };
  }

  showMissingCountries() {
    if (this.map) {
      this.map.eachLayer((layer: any) => {
        const country = this.coloredCountries.find(c => c.id === layer?.feature?.id);
        if(!country && layer?.feature?.properties?.center) {    
          const marker = L.marker(layer?.feature?.properties?.center, {
            icon: L.divIcon({
              className: 'black-point',
              iconSize: [10, 10],
              html: '<div style="background-color: black; border-radius: 50%; width: 10px; height: 10px;"></div>' // Style for black point
            })
          });
          this.markers.push(marker);
        }
      });
      this.markers.forEach(m => m.addTo(this.map as L.Map));
    }
  }

  hideMissingCountries() {
    this.markers.forEach(m => m.removeFrom(this.map as L.Map));
    this.markers = [];
  }
}
