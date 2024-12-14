// Sequential Thinking Plugin for TypingMind

const schema = {
  name: "sequential_thinking",
  description: "A tool that helps break down complex problems into structured, sequential thoughts. Supports thought revisions, branching paths, and progress tracking.",
  parameters: {
    type: "object",
    properties: {
      thought: {
        type: "string",
        description: "The current thinking step or thought content"
      },
      thoughtNumber: {
        type: "integer",
        description: "Current thought number in the sequence",
        minimum: 1
      },
      totalThoughts: {
        type: "integer",
        description: "Estimated total thoughts needed",
        minimum: 1
      },
      nextThoughtNeeded: {
        type: "boolean",
        description: "Whether another thought step is needed"
      },
      isRevision: {
        type: "boolean",
        description: "Whether this revises previous thinking"
      },
      revisesThought: {
        type: "integer",
        description: "Which thought is being reconsidered",
        minimum: 1
      },
      branchFromThought: {
        type: "integer",
        description: "Branching point thought number",
        minimum: 1
      },
      branchId: {
        type: "string",
        description: "Branch identifier for alternative thought paths"
      },
      needsMoreThoughts: {
        type: "boolean",
        description: "If more thoughts are needed beyond the current total"
      }
    },
    required: ["thought", "thoughtNumber", "totalThoughts", "nextThoughtNeeded"]
  }
};

async function sequential_thinking(params) {
  const {
    thought,
    thoughtNumber,
    totalThoughts,
    nextThoughtNeeded,
    isRevision,
    revisesThought,
    branchFromThought,
    branchId,
    needsMoreThoughts
  } = params;

  // Adjust total thoughts if needed
  const adjustedTotalThoughts = thoughtNumber > totalThoughts ? thoughtNumber : totalThoughts;

  let prefix = '';
  let context = '';

  if (isRevision) {
    prefix = '🔄 Revision';
    context = ` (revising thought ${revisesThought})`;
  } else if (branchFromThought) {
    prefix = '🌿 Branch';
    context = ` (from thought ${branchFromThought}, ID: ${branchId})`;
  } else {
    prefix = '💭 Thought';
    context = '';
  }

  const header = `${prefix} ${thoughtNumber}/${adjustedTotalThoughts}${context}`;
  const border = '─'.repeat(Math.max(header.length, thought.length) + 4);

  const formattedThought = `┌${border}┐\n│ ${header.padEnd(border.length - 2)} │\n├${border}┤\n│ ${thought.padEnd(border.length - 2)} │\n└${border}┘`;

  // Return format required by TypingMind plugin spec
  return {
    thoughtNumber,
    totalThoughts: adjustedTotalThoughts,
    nextThoughtNeeded,
    branches: [],
    thoughtHistoryLength: 0, // Since we're stateless
    formattedOutput: formattedThought
  };
}

module.exports = {
  schema,
  sequential_thinking
};
