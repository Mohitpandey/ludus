import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { theme } from '../../lib/theme';

interface WeatherCardProps {
  temperature: number;
  condition: string;
  high: number;
  low: number;
  iconUrl: string;
  location: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  temperature,
  condition,
  high,
  low,
  iconUrl,
  location,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.inner}>
        <Image source={{ uri: iconUrl }} style={styles.icon} />
        <View style={styles.info}>
          <Text style={styles.temp}>{Math.round(temperature)}°</Text>
          <Text style={styles.hilo}>
            H {Math.round(high)}°  L {Math.round(low)}°
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#338CFF',
    borderRadius: 40,
    width: 300,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  icon: {
    width: 72,
    height: 72,
  },
  info: {
    justifyContent: 'center',
  },
  temp: {
    fontSize: 56,
    fontWeight: '600',
    color: '#fff',
    fontFamily: theme.fonts.primary,
  },
  hilo: {
    fontSize: 20,
    color: '#F5F5F5',
    marginTop: 2,
    fontFamily: theme.fonts.primary,
  },
});

export default WeatherCard;
