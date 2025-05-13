
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import ChatInput from '../../components/ui/ChatInput';
import ChatBubble from '../../components/ui/ChatBubble';
import { askLudus } from '../../services/componentRouter';
import { theme } from '../../lib/theme';

export default function App() {
  const [messages, setMessages] = useState([
    { id: '1', role: 'ludus', message: "Hi! I'm Ludus. Ask me anything about weather, UI components, or general questions." }
  ]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage = { id: Date.now().toString(), role: 'user', message: text };
    setMessages(prev => [...prev, userMessage]);

    try {
      const result = await askLudus(text);
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ludus',
        message: result?.message || result?.answer || JSON.stringify(result)
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 2).toString(),
        role: 'ludus',
        message: 'Something went wrong.'
      }]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chatBox}>
        <Text style={styles.header}>Ludus</Text>
        <FlatList
          data={messages.filter((m) => m && m.role && m.message)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ChatBubble message={item} />}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
        <ChatInput onSend={handleSend} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatBox: {
    flex: 1,
    width: '100%',
    maxWidth: 720,
    padding: 16,
    justifyContent: 'flex-end',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: 12,
  },
});
