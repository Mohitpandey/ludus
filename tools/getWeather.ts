const API_KEY = '';

export async function getWeather(location) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      return {
        answer: `Could not find weather for "${location}".`,
        usedTool: 'getWeather',
        preview: null
      };
    }

    const temperature = data.main.temp.toFixed(1);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const high = data.main.temp_max.toFixed(1);
    const low = data.main.temp_min.toFixed(1);

    return {
      answer: `The weather in ${data.name} is ${description} with a temperature of ${temperature}°C.`,
      usedTool: 'getWeather',
      preview: {
        location: data.name,
        temperature,
        description,
        high,
        low,
        icon
      }
    };
  } catch (error) {
    return {
      answer: 'Failed to fetch weather data.',
      usedTool: 'getWeather',
      preview: null
    };
  }
}