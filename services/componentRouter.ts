import { queryOllama } from '../agents/ollamaClient';
import { getWeather } from '../tools/getWeather';
import { generateComponent } from './componentGenerator';

const context = [
  "You are Ludus, an advanced AI assistant designed to respond to questions and use tools when appropriate.",
  "",
  "Available tools you may use:",
  "",
  "1. getWeather(location: string)",
  "   → Use when the user asks about the weather or forecast.",
  "",
  "2. generateComponent(type: string, title: string, content: string)",
  "   → Use when the user wants a UI component generated from a description.",
  "",
  "TO CALL A TOOL, you must return a single valid JSON object, exactly like this:",
  "{",
  '  "tool_call": {',
  '    "name": "getWeather",',
  '    "arguments": {',
  '      "location": "Paris"',
  "    }",
  "  }",
  "}",
  "",
  "RULES:",
  "- Only use tool_call when it's appropriate",
  "- DO NOT include text, markdown, or commentary outside the JSON",
  "- Keys and strings MUST be wrapped in double quotes",
  "",
  "If no tool is needed, just respond in markdown using headings, lists, and paragraphs."
].join('\n');

function extractJson(text: any): any | null {
  if (typeof text !== 'string') return null;

  try {
    const match = text.match(/\{[\s\S]*\}/); // find first { ... } block
    if (match) {
      return JSON.parse(match[0]);
    }
  } catch (err) {
    console.warn('[LUDUS] Failed to parse tool_call JSON:', err);
  }

  console.warn('[LUDUS] Not valid JSON, skipping parse.');
  return null;
}

export async function askLudus(input: string, model: string = 'gemma3:27b') {
  const messages = [
    { role: 'system', content: context },
    { role: 'user', content: input }
  ];

  console.debug('[LUDUS DEBUG] Messages sent to model:', JSON.stringify(messages, null, 2));

  const rawResponse = await queryOllama(messages, model);
  console.debug('[LUDUS DEBUG] Raw model response:', rawResponse);

  const raw = typeof rawResponse === 'string'
    ? rawResponse
    : rawResponse?.response || JSON.stringify(rawResponse);

  const parsed = extractJson(raw);

  if (parsed?.tool_call?.name === 'getWeather') {
    const result = await getWeather(parsed.tool_call.arguments.location);
    return {
      answer: result.text,
      usedTool: 'getWeather',
      preview: result.preview,
    };
  }

  if (parsed?.tool_call?.name === 'generateComponent') {
    const result = generateComponent(parsed.tool_call.arguments, model);
    return {
      answer: result.answer,
      usedTool: 'generateComponent',
      preview: result.preview,
    };
  }

  if (typeof parsed?.answer === 'string') {
    return {
      answer: parsed.answer,
      usedTool: parsed.usedTool || 'chat',
      preview: null,
    };
  }

  return {
    answer: raw,
    usedTool: 'chat',
    preview: null,
  };
}