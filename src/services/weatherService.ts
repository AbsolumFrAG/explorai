import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface CurrentWeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: [
    {
      main: string;
      description: string;
      icon: string;
    },
  ];
  name: string;
}

export interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
    };
    weather: [
      {
        main: string;
        description: string;
        icon: string;
      },
    ];
    dt_txt: string;
  }>;
}

export interface AirPollutionData {
  list: [
    {
      main: {
        aqi: number; // Air Quality Index
      };
      components: {
        co: number; // Carbon monoxide
        no2: number; // Nitrogen dioxide
        o3: number; // Ozone
        pm2_5: number; // Fine particles
        pm10: number; // Coarse particles
      };
    },
  ];
}

export const weatherService = {
  // Obtenir les coordonnées à partir du nom de la ville
  getCoordinates: async (cityName: string) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
      );
      if (response.data.length > 0) {
        return {
          lat: response.data[0].lat,
          lon: response.data[0].lon,
        };
      }
      return null;
    } catch (error) {
      console.error("Erreur de géocodage:", error);
      return null;
    }
  },

  // Obtenir la météo actuelle
  getCurrentWeather: async (
    lat: number,
    lon: number
  ): Promise<CurrentWeatherData | null> => {
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          lat,
          lon,
          units: "metric",
          lang: "fr",
          appid: API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur météo actuelle:", error);
      return null;
    }
  },

  // Obtenir les prévisions sur 5 jours
  getForecast: async (
    lat: number,
    lon: number
  ): Promise<ForecastData | null> => {
    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          lat,
          lon,
          units: "metric",
          lang: "fr",
          appid: API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur prévisions:", error);
      return null;
    }
  },

  // Obtenir les données de pollution de l'air
  getAirPollution: async (
    lat: number,
    lon: number
  ): Promise<AirPollutionData | null> => {
    try {
      const response = await axios.get(`${BASE_URL}/air_pollution`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur pollution:", error);
      return null;
    }
  },
};
