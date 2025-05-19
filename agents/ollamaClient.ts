import { buildContextWindow } from '../utils/contextBuilder';

export async function queryOllama(messages: any[], model: string = 'gemma3:27b'): Promise<string> {
  const contextMessages = buildContextWindow(messages);

  try {
    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: model || 'gemma3:27b',
        messages: contextMessages,
        stream: false  // Set to false to avoid partial streaming issues
      }),
    });

    const raw = await response.text();

    // Handle line-by-line streaming JSON (NDJSON)
    const lines = raw.trim().split('\n');
    let content = '';

    for (const line of lines) {
      try {
        const parsed = JSON.parse(line);
        if (parsed?.message?.content) {
          content += parsed.message.content;
        }
      } catch (e) {
        console.warn('[OLLAMA STREAM PARSE FAIL]', line);
      }
    }

    return content.trim();
  } catch (error) {
    console.error('[OLLAMA CLIENT ERROR]', error);
    throw error;
  }
}