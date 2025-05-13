import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, spacing, radii } from '../../lib/theme';

export default function WeatherCard({ location, temperature, description, high, low, icon }) {
  const iconUrl = icon
    ? `https://openweathermap.org/img/wn/${icon}@2x.png`
    : null;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.city}>{location}</Text>
        {iconUrl && (
          <Image
            source={{ uri: iconUrl }}
            style={styles.icon}
            resizeMode="contain"
          />
        )}
        <Text style={styles.temp}>{temperature}°</Text>
        <Text style={styles.desc}>{description}</Text>
        <Text style={styles.hilo}>H {high}°   L {low}°</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  card: {
    width: 240,
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#e1f0ff',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  icon: {
    width: 60,
    height: 60,
    marginVertical: 6,
  },
  city: {
    fontSize: 20,
    fontWeight: '600',
    color: '#003366',
    marginBottom: 4,
  },
  temp: {
    fontSize: 46,
    fontWeight: 'bold',
    color: '#003366',
  },
  desc: {
    fontSize: 16,
    color: '#1f1f1f',
    marginVertical: 4,
    textTransform: 'capitalize',
  },
  hilo: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
  },
});