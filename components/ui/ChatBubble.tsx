
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ReactMarkdown from 'react-markdown';
import { theme } from '../../lib/theme';

interface ChatBubbleProps {
  message: {
    role: 'user' | 'ludus';
    message: string;
  };
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  if (!message || typeof message !== 'object') {
    console.warn('[ChatBubble] Invalid message:', message);
    return null;
  }

  const isUser = message.role === 'user';

  return (
    <View
      style={[
        styles.bubble,
        {
          backgroundColor: isUser ? theme.colors.secondary : theme.colors.primaryLight,
          alignSelf: isUser ? 'flex-end' : 'flex-start',
        },
      ]}
    >
      <ReactMarkdown
        components={{
          p: ({ children }) => <Text style={styles.text}>{children}</Text>,
          strong: ({ children }) => <Text style={[styles.text, styles.bold]}>{children}</Text>,
          em: ({ children }) => <Text style={[styles.text, styles.italic]}>{children}</Text>,
          li: ({ children }) => <Text style={styles.text}>• {children}</Text>,
        }}
      >
        {message.message || '...'}
      </ReactMarkdown>
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    marginVertical: 6,
    padding: 12,
    borderRadius: 10,
    maxWidth: '80%',
  },
  text: {
    color: theme.colors.textPrimary || '#232F34',
    fontSize: 15,
    lineHeight: 22,
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
});

export default ChatBubble;
