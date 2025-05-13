import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Markdown from 'react-native-markdown-display';

interface ComponentPreviewProps {
  code: string;
}

export default function ComponentPreview({ code }: ComponentPreviewProps) {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const cleaned = code.replace(/^export\s+default\s+/m, '');
      const fullCode = 'return (' + cleaned + ')';
      const Comp = new Function('React', 'View', 'Text', 'StyleSheet', 'Markdown', fullCode)(
        React,
        View,
        Text,
        StyleSheet,
        Markdown
      );
      setComponent(() => Comp);
      setError(null);
    } catch (err: any) {
      console.error('ComponentPreview evaluation error:', err);
      setError(err.message || 'Failed to render component preview.');
      setComponent(null);
    }
  }, [code]);

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Preview error: {error}</Text>
        <Markdown>{'```tsx\n' + code + '\n```'}</Markdown>
      </View>
    );
  }

  return (
    <View style={styles.previewContainer}>
      {Component ? <Component /> : <Text style={styles.loadingText}>Loading preview...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  previewContainer: {
    marginVertical: 8,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  errorContainer: {
    marginVertical: 8,
    padding: 12,
    backgroundColor: '#ffe6e6',
    borderRadius: 12,
  },
  errorText: {
    color: '#d00',
    marginBottom: 8,
    fontSize: 14,
  },
  loadingText: {
    fontSize: 16,
    color: '#888',
  },
});