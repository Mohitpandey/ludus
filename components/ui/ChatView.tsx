import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ChatBubble from './ChatBubble';
import { theme } from '../../lib/theme';

interface Message {
  role: 'user' | 'assistant';
  content?: string;
  component?: {
    type: 'weatherCard' | 'generated';
    code: string;
    [key: string]: any;
  };
}

export default function ChatView({ messages }: { messages: Message[] }) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {messages.map((msg: Message, idx: number) => (
          <ChatBubble key={idx} message={msg} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: theme.layout.maxWidth,
    alignSelf: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  scroll: {
    flexGrow: 1,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.layout.inputHeight + theme.spacing.xl,
  },
});
