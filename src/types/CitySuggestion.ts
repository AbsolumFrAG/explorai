export interface CitySuggestion {
    name: string;
    coordinates: [number, number];
}

export interface MapboxFeature {
    place_name: string;
    center: [number, number];
}