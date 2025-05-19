import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ReactMarkdown from 'react-markdown';
import WeatherCard from '../render/WeatherCard';
import ComponentPreview from '../render/ComponentPreview';
import { theme } from '../../lib/theme';

interface WeatherCardProps {
  temperature: number;
  condition: string;
  high: number;
  low: number;
  iconUrl: string;
  location: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content?: string;
  component?: {
    type: 'weatherCard' | 'generated';
    code: string;
  } & Partial<WeatherCardProps>;
}

export default function ChatBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';

  const renderComponent = () => {
    if (!message.component) return null;

    if (message.component.type === 'weatherCard') {
      return <WeatherCard {...message.component as WeatherCardProps} />;
    }

    if (message.component.type === 'generated' && message.component.code) {
      return <ComponentPreview code={message.component.code} />;
    }

    return null;
  };

  return (
    <View style={[styles.bubble, isUser ? styles.user : styles.assistant]}>
      {message.content ? (
        <ReactMarkdown
          children={message.content}
          components={{
            p: ({ children }) => <Text style={styles.text}>{children}</Text>,
            strong: ({ children }) => (
              <Text style={[styles.text, { fontWeight: 'bold' }]}>{children}</Text>
            ),
            em: ({ children }) => (
              <Text style={[styles.text, { fontStyle: 'italic' }]}>{children}</Text>
            ),
            code: ({ children }) => (
              <Text style={[styles.text, { fontFamily: 'monospace' }]}>{children}</Text>
            ),
          }}
        />
      ) : null}
      {renderComponent()}
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    borderRadius: theme.radii.lg,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.xs,
    maxWidth: '75%',
  },
  user: {
    alignSelf: 'flex-end',
    backgroundColor: theme.colors.chatBubbleUser,
  },
  assistant: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
  },
});
