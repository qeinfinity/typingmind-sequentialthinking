export interface ThoughtData {
  thought: string;
  thoughtNumber: number;
  totalThoughts: number;
  nextThoughtNeeded: boolean;
  isRevision?: boolean;
  revisesThought?: number;
  branchFromThought?: number;
  branchId?: string;
  needsMoreThoughts?: boolean;
}

export interface FormattedResponse {
  content: Array<{
    type: string;
    text: string;
  }>;
}

export function sequential_thinking(params: ThoughtData): Promise<FormattedResponse>;
