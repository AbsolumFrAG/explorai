import { useEffect, useState } from "react";
import { CitySuggestion, MapboxFeature } from "../types/CitySuggestion";

const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export const useCityAutocomplete = (query: string) => {
    const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
    const [language, setLanguage] = useState<string>("fr");

    useEffect(() => {
        const userLang = navigator.language;
        setLanguage(userLang);
    }, []);

    useEffect(() => {
        if (query.length > 1) {
            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxToken}&language=${language}`)
                .then(res => res.json())
                .then(data => {
                    const cities: CitySuggestion[] = data.features.map((feature: MapboxFeature) => ({
                        name: feature.place_name,
                        coordinates: feature.center
                    }));
                    setSuggestions(cities);
                })
                .catch(err => console.error(err));
        } else {
            setSuggestions([]);
        }
    }, [language, query]);

    return suggestions;
};