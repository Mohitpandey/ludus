import { queryOllama } from '../agents/ollamaClient';
import { getWeather } from '../tools/getWeather';
import { generateComponent } from './componentGenerator';
import { extractJson } from '../utils/extractJson';

export async function askLudus(input: string, messages: any[], model = 'gemma3:27b') {
  const response = await queryOllama(messages, model);

  if (!response || typeof response !== 'string') {
    return { role: 'assistant', content: '' };
  }

  console.log('[LUDUS] Full LLM response:', response);

  if (response.includes('{') && response.includes('tool_call')) {
    try {
      const parsed = extractJson(response);

      if (parsed?.tool_call) {
        const { name, arguments: args } = parsed.tool_call;

        switch (name) {
          case 'getWeather':
            const weatherData = await getWeather(args.location);
            return {
              role: 'assistant',
              content: '',
              preview: { type: 'weatherCard', ...weatherData },
              usedTool: 'getWeather',
            };

          case 'generateComponent':
            const jsx = generateComponent(args);
            return {
              role: 'assistant',
              content: '',
              preview: { type: 'generated', code: jsx },
              usedTool: 'generateComponent',
            };
        }
      }
    } catch (err) {
      console.warn('[LUDUS] Failed to parse tool_call JSON:', err);
    }
  }

  return { role: 'assistant', content: response };
}