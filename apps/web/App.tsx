import React, { useEffect, useState } from 'react';
import { Message } from '../../components/ui/ChatBubble';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import ChatView from '../../components/ui/ChatView';
import ChatInput from '../../components/ui/ChatInput';
import { askLudus } from '../../services/componentRouter';

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const initialMessage: Message = {
      role: 'assistant',
      content: "Hi, I'm Ludus. Ask me anything or request a UI component!",
    };
    setMessages([initialMessage]);
  }, []);

  const handleSend = async (text: string) => {
    const userMessage: Message = { role: 'user', content: text };
    const newMessages: Message[] = [...messages, userMessage];
    setMessages(newMessages);

    try {
      const result = await askLudus(text, newMessages, 'gemma3:27b');

      if (result?.content || result?.preview) {
        const responseMessage: Message = {
          role: 'assistant',
          content: result.content || '',
          component: result.preview && {
            type: (result.preview.type === 'weatherCard' || result.preview.type === 'generated') 
              ? result.preview.type 
              : 'generated',
            code: typeof result.preview.code === 'string' ? result.preview.code : '',
            ...(result.preview as any)
          },
        };
        setMessages((prev) => [...prev, responseMessage]);
      }
    } catch (error) {
      console.error('[ERROR] askLudus failed:', error);
    }
  };

  return (
    <View style={styles.wrapper}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <ChatView messages={messages} />
        <ChatInput onSend={handleSend} />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#111',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
