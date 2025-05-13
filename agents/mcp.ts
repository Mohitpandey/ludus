export interface MCPRequest {
  context: string;
  task: string;
}

export interface MCPResponse {
  answer: string;
  usedTool?: string;
}