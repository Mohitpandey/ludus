import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing, radii } from '../../lib/theme';

export default function ScreenWrapper({ children }) {
  return <View style={styles.wrapper}>{children}</View>;
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    backgroundColor: '#121212',
  },
});