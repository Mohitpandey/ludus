import 'dotenv/config';

export default {
  expo: {
    name: 'Ludus',
    slug: 'ludus',
    extra: {
      openWeatherKey: process.env.OPENWEATHER_API_KEY,
    },
  },
};
