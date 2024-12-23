# Sequential Thinking Plugin

A stateless implementation of a sequential thinking framework with enhanced visual formatting. This tool helps break down complex problems into structured, sequential thoughts while maintaining efficiency and avoiding state management overhead.

## Features

- Stateless design for optimal performance
- Enhanced visual formatting with ASCII boxes and emoji indicators
- Support for thought revisions and branching
- No external dependencies

## Usage

```javascript
const { sequential_thinking } = require('typingmind-sequentialthinking');

// Basic thought
await sequential_thinking({
  thought: 'Analyzing the problem step by step',
  thoughtNumber: 1,
  totalThoughts: 3,
  nextThoughtNeeded: true
});

// Revision example
await sequential_thinking({
  thought: 'Revising previous analysis based on new information',
  thoughtNumber: 2,
  totalThoughts: 3,
  nextThoughtNeeded: true,
  isRevision: true,
  revisesThought: 1
});

// Branching example
await sequential_thinking({
  thought: 'Exploring an alternative approach',
  thoughtNumber: 3,
  totalThoughts: 3,
  nextThoughtNeeded: false,
  branchFromThought: 1,
  branchId: 'alternative-1'
});
```

## API

### Parameters

- `thought` (string, required): The current thinking step or thought content
- `thoughtNumber` (integer, required): Current thought number in the sequence
- `totalThoughts` (integer, required): Estimated total thoughts needed
- `nextThoughtNeeded` (boolean, required): Whether another thought step is needed
- `isRevision` (boolean, optional): Whether this revises previous thinking
- `revisesThought` (integer, optional): Which thought is being reconsidered
- `branchFromThought` (integer, optional): Branching point thought number
- `branchId` (string, optional): Branch identifier for alternative thought paths
- `needsMoreThoughts` (boolean, optional): If more thoughts are needed beyond the current total

## Design Philosophy

This implementation focuses on maintaining simplicity and efficiency while providing clear visual formatting. By avoiding state management, it reduces API overhead and potential complexity issues while still supporting advanced features like revisions and branching through parameter passing.

## License

MIT
