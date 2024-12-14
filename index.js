// Sequential Thinking Plugin for TypingMind

// Store thought history in memory
const thoughtHistory = [];
const branches = {};

const schema = {
  name: "sequential_thinking",
  description: "Facilitates a detailed, step-by-step thinking process for problem-solving and analysis. Helps break down complex problems into manageable steps, with support for revisions and branching thoughts.",
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
    required: [
      "thought",
      "nextThoughtNeeded",
      "thoughtNumber",
      "totalThoughts"
    ]
  }
};

async function sequential_thinking(params, userSettings) {
  // Validate and process input
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
  let adjustedTotalThoughts = totalThoughts;
  if (thoughtNumber > totalThoughts) {
    adjustedTotalThoughts = thoughtNumber;
  }

  // Create thought data object
  const thoughtData = {
    thought,
    thoughtNumber,
    totalThoughts: adjustedTotalThoughts,
    nextThoughtNeeded,
    isRevision,
    revisesThought,
    branchFromThought,
    branchId,
    needsMoreThoughts
  };

  // Store in history
  thoughtHistory.push(thoughtData);

  // Handle branches
  if (branchFromThought && branchId) {
    if (!branches[branchId]) {
      branches[branchId] = [];
    }
    branches[branchId].push(thoughtData);
  }

  // Format the response
  const formattedThought = formatThought(thoughtData);

  return {
    thoughtNumber,
    totalThoughts: adjustedTotalThoughts,
    nextThoughtNeeded,
    branches: Object.values(branches),
    thoughtHistoryLength: thoughtHistory.length,
    formattedOutput: formattedThought
  };
}

function formatThought(thoughtData) {
  const {
    thoughtNumber,
    totalThoughts,
    thought,
    isRevision,
    revisesThought,
    branchFromThought,
    branchId
  } = thoughtData;

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

  const header = `${prefix} ${thoughtNumber}/${totalThoughts}${context}`;
  const border = '─'.repeat(Math.max(header.length, thought.length) + 4);

  return `┌${border}┐\n│ ${header.padEnd(border.length - 2)} │\n├${border}┤\n│ ${thought.padEnd(border.length - 2)} │\n└${border}┘`;
}

module.exports = {
  schema,
  sequential_thinking
};