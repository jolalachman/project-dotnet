import { FeatureData } from "@shared/models";

export interface MapState {
    map: any;
    coloredCountries: FeatureData[];
}

export const initialMapState: MapState = {
    map: null,
    coloredCountries: [],
};
