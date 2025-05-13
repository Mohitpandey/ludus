import React from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';
import { colors, spacing, radii } from '../../lib/theme';

export default function Sidebar({ model, setModel }) {
  return (
    <View style={styles.sidebar}>
      <Text style={styles.title}>Ludus</Text>
      <Text style={styles.label}>Model</Text>
      <Picker
        selectedValue={model}
        onValueChange={setModel}
        style={styles.picker}
      >
        <Picker.Item label="Ollama (Groq LLaMA 3)" value="ollama" />
        <Picker.Item label="OpenAI (GPT-3.5)" value="openai" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 250,
    padding: 20,
    backgroundColor: '#1e1e1e',
    borderRightWidth: 1,
    borderColor: '#333',
    zIndex: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  label: {
    color: '#ccc',
    fontWeight: '600',
  },
  picker: {
    color: '#fff',
    marginTop: 5,
  },
});