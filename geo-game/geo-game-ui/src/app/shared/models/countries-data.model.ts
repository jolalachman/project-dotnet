import { LatLngExpression } from "leaflet";

export interface CountriesData {
  type: string;
  features: FeatureData[];
}

export interface FeatureData {
  type: string;
  properties: PropertiesData;
  id: string;
  geometry: GeometryData;
}

export interface PropertiesData {
  name: string;
  continent: string;
  center: number[];
}

export interface GeometryData {
  type: string;
  coordinates: any;
}