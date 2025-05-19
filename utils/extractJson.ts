export function extractJson(text: string): any {
  if (typeof text !== 'string') {
    throw new Error('Input must be a string');
  }

  // Match JSON block inside markdown code block
  const codeMatch = text.match(/```(?:json)?\n([\s\S]*?)\n```/);
  let jsonString = codeMatch ? codeMatch[1].trim() : text.trim();

  // Slice to first valid JSON block between braces
  const start = jsonString.indexOf('{');
  const end = jsonString.lastIndexOf('}');
  if (start !== -1 && end !== -1 && end > start) {
    jsonString = jsonString.slice(start, end + 1);
  }

  try {
    return JSON.parse(jsonString);
  } catch (err) {
    console.error('[extractJson] Failed to parse:', jsonString);
    throw new Error('No valid JSON object found');
  }
}