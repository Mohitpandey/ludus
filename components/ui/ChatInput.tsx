
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { theme } from '../../lib/theme';

export default function ChatInput({ onSend }: { onSend: (text: string) => void }) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim() === '') return;
    onSend(text);
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type your message..."
        placeholderTextColor={theme.colors.primaryLight}
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleSend}
        returnKeyType="send"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  input: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primaryLight,
    color: theme.colors.primary,
    padding: 12,
    borderRadius: 20,
  },
});
