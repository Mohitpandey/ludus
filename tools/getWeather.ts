import axios from 'axios';
import Constants from 'expo-constants';

export function getWeather(location: string) {
  const apiKey = Constants.expoConfig?.extra?.openWeatherKey;

  if (!apiKey) {
    console.error('[getWeather] Missing OPENWEATHER_API_KEY in app.config.js');
    return {
      type: 'error',
      message: 'Missing OpenWeather API key.'
    };
  }

  try {
    const encodedLocation = encodeURIComponent(location);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedLocation}&appid=${apiKey}&units=metric`;
    console.log('[getWeather] Requesting:', url);

    return axios.get(url).then((response) => {
      console.log('[getWeather] Response received:', response.data);
      const data = response.data;
      return {
        type: 'weatherCard',
        location: data.name,
        temperature: data.main.temp.toFixed(1),
        high: data.main.temp_max.toFixed(1),
        low: data.main.temp_min.toFixed(1),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      };
    });
  } catch (error) {
    console.error('[getWeather] API error:', error);
    return {
      type: 'error',
      message: 'Could not fetch weather data. Please try again.'
    };
  }
}