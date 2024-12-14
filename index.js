// Sequential Thinking Tool
// A stateless implementation with enhanced visual formatting

async function sequential_thinking(params) {
  // Validate required parameters
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

  // Format the thought
  const formattedThought = formatThought({
    thought,
    thoughtNumber,
    totalThoughts: adjustedTotalThoughts,
    isRevision,
    revisesThought,
    branchFromThought,
    branchId
  });

  return {
    content: [{
      type: "text",
      text: formattedThought
    }]
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

  return `
┌${border}┐
│ ${header.padEnd(border.length - 2)} │
├${border}┤
│ ${thought.padEnd(border.length - 2)} │
└${border}┘`;
}

module.exports = {
  sequential_thinking
};