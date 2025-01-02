import { useEffect, useState } from "react";
import {
  CurrentWeatherData,
  ForecastData,
  AirPollutionData,
  weatherService,
} from "../../services/weatherService";
import {
  faCloud,
  faCloudRain,
  faSun,
  faSmog,
  faWind,
  faTemperatureHigh,
  faDroplet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface WeatherDisplayProps {
  city: string;
}

const WeatherDisplay = ({ city }: WeatherDisplayProps) => {
  const [currentWeather, setCurrentWeather] =
    useState<CurrentWeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [airPollution, setAirPollution] = useState<AirPollutionData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWeatherData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Obtenir d'abord les coordonnées
        const coordinates = await weatherService.getCoordinates(city);

        if (!coordinates) {
          setError("Impossible de trouver les coordonnées de la ville");
          setLoading(false);
          return;
        }

        const [weatherData, forecastData, pollutionData] = await Promise.all([
          weatherService.getCurrentWeather(coordinates.lat, coordinates.lon),
          weatherService.getForecast(coordinates.lat, coordinates.lon),
          weatherService.getAirPollution(coordinates.lat, coordinates.lon),
        ]);

        setCurrentWeather(weatherData);
        setForecast(forecastData);
        setAirPollution(pollutionData);
      } catch (error) {
        console.error("Erreur chargement données météo:", error);
        setError("Erreur lors du chargement des données météorologiques");
      }

      setLoading(false);
    };

    if (city) {
      loadWeatherData();
    }
  }, [city]);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return faSun;
      case "rain":
        return faCloudRain;
      case "clouds":
        return faCloud;
      case "mist":
      case "fog":
        return faSmog;
      default:
        return faWind;
    }
  };

  const getAQILevel = (aqi: number) => {
    const levels = ["Bon", "Correct", "Modéré", "Mauvais", "Très mauvais"];
    const colors = [
      "text-green-500",
      "text-yellow-500",
      "text-orange-500",
      "text-red-500",
      "text-purple-500",
    ];
    return {
      text: levels[aqi - 1] || "Inconnu",
      color: colors[aqi - 1] || "text-gray-500",
    };
  };

  if (loading) {
    return (
      <div className="w-full rounded-xl bg-white p-6 shadow-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-3/4 rounded bg-gray-200"></div>
          <div className="h-20 w-full rounded bg-gray-200"></div>
          <div className="space-y-3">
            <div className="h-4 w-full rounded bg-gray-200"></div>
            <div className="h-4 w-5/6 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full rounded-xl bg-white p-6 shadow-lg">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <h3 className="mb-6 text-2xl font-bold text-gray-800">Météo à {city}</h3>

      {currentWeather && (
        <div className="mb-8 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">
                {Math.round(currentWeather.main.temp)}°C
              </div>
              <div className="text-lg">
                {currentWeather.weather[0].description}
              </div>
            </div>
            <FontAwesomeIcon
              icon={getWeatherIcon(currentWeather.weather[0].main)}
              className="text-5xl"
            />
          </div>
          <div className="mt-4 flex justify-around text-sm">
            <div>
              <FontAwesomeIcon icon={faTemperatureHigh} className="mr-2" />
              Ressenti: {Math.round(currentWeather.main.feels_like)}°C
            </div>
            <div>
              <FontAwesomeIcon icon={faDroplet} className="mr-2" />
              Humidité: {currentWeather.main.humidity}%
            </div>
          </div>
        </div>
      )}

      {forecast && (
        <div className="mb-8">
          <h4 className="mb-4 text-lg font-semibold text-gray-700">
            Prévisions sur 5 jours
          </h4>
          <div className="grid grid-cols-5 gap-2">
            {forecast.list
              .filter((_, index) => index % 8 === 0)
              .slice(0, 5)
              .map((day) => (
                <div
                  key={day.dt}
                  className="flex flex-col items-center rounded-lg bg-gray-50 p-2 text-center"
                >
                  <div className="text-sm font-medium">
                    {new Date(day.dt * 1000).toLocaleDateString("fr-FR", {
                      weekday: "short",
                    })}
                  </div>
                  <FontAwesomeIcon
                    icon={getWeatherIcon(day.weather[0].main)}
                    className="my-2 text-xl text-blue-500"
                  />
                  <div className="text-sm">{Math.round(day.main.temp)}°C</div>
                </div>
              ))}
          </div>
        </div>
      )}

      {airPollution && (
        <div>
          <h4 className="mb-2 text-lg font-semibold text-gray-700">
            Qualité de l'air
          </h4>
          <div className="rounded-lg bg-gray-50 p-4">
            <div
              className={`text-lg font-medium ${getAQILevel(airPollution.list[0].main.aqi).color}`}
            >
              {getAQILevel(airPollution.list[0].main.aqi).text}
            </div>
            <div className="mt-2 text-sm text-gray-600">
              PM2.5: {airPollution.list[0].components.pm2_5} µg/m³ | PM10:{" "}
              {airPollution.list[0].components.pm10} µg/m³
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
