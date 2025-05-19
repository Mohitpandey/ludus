export function countTokens(text: string): number {
  // Crude token estimation: assume ~1.3 tokens per word
  if (!text) return 0;
  return Math.ceil(text.split(/\s+/).length * 1.3);
}

export function buildContextWindow(messages: any, maxTokens: number = 6000): any[] {
  const systemPrompt = {
    role: 'system',
    content:
      'You are Ludus, an AI assistant who helps generate UI components, answer general questions, and route tool calls.'
  };

  const context = [systemPrompt];
  let tokenCount = countTokens(systemPrompt.content);

  // ✅ Ensure messages is an array and validate structure
  const validMessages = Array.isArray(messages)
    ? messages.filter(
        (m) => typeof m === 'object' && m.role && typeof m.content === 'string'
      )
    : [];

  for (let i = validMessages.length - 1; i >= 0; i--) {
    const msg = validMessages[i];
    const tokens = countTokens(msg.content);
    if (tokenCount + tokens > maxTokens) break;

    context.unshift(msg); // maintain order
    tokenCount += tokens;
  }

  return context;
}