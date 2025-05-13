import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ChatBubble from './ChatBubble';
import { colors, spacing, fontSizes, radii } from '../../lib/theme';


export default function ChatView({ messages }) {
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      {messages.map((msg, idx) => (
        <ChatBubble key={idx} message={msg} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 10,
    width: '100%',
    maxWidth: 700,
    alignSelf: 'center',
  },
});