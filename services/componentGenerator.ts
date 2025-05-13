export function generateComponent(args: { type: string; title: string; content: string }, model: string) {
    const { type, title, content } = args;
  
    let jsx = '';
  
    switch (type) {
      case 'infoBox':
        jsx = [
          "import React from 'react';",
          "import { View, Text, StyleSheet } from 'react-native';",
          "import Markdown from 'react-native-markdown-display';",
          "",
          "function InfoBox() {",
          "  return (",
          "    <View style={styles.container}>",
          `      <Text style={styles.title}>${title}</Text>`,
          "      <Markdown>",
          "        {content}",
          "      </Markdown>",
          "    </View>",
          "  );",
          "}",
          "",
          "const styles = StyleSheet.create({",
          "  container: {",
          "    padding: 16,",
          "    backgroundColor: '#f9f9f9',",
          "    borderRadius: 12,",
          "    marginBottom: 12,",
          "  },",
          "  title: {",
          "    fontSize: 20,",
          "    fontWeight: 'bold',",
          "    marginBottom: 8,",
          "  },",
          "});",
          "",
          "export default InfoBox;",
        ].join('\n');
        break;
  
      default:
        jsx = [
          "import React from 'react';",
          "import { View, Text, StyleSheet } from 'react-native';",
          "",
          "function GeneratedComponent() {",
          "  return (",
          "    <View style={styles.container}>",
          `      <Text>${title}</Text>`,
          "    </View>",
          "  );",
          "}",
          "",
          "const styles = StyleSheet.create({",
          "  container: {",
          "    padding: 16,",
          "    borderRadius: 8,",
          "    backgroundColor: '#e0e0e0',",
          "  },",
          "});",
          "",
          "export default GeneratedComponent;",
        ].join('\n');
    }
  
    return {
      answer: jsx,
      usedTool: 'generateComponent',
      preview: { type, title, content },
    };
  }