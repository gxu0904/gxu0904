/**
 * CLI Parser - Parses user input into command and arguments
 *
 * Handles:
 * - Command extraction (first word)
 * - Argument parsing (remaining words)
 * - Quoted string support
 * - Trimming and normalization
 */

export interface ParsedCommand {
  command: string;
  args: string[];
  raw: string;
}

export function parseCommand(input: string): ParsedCommand {
  const trimmed = input.trim();

  if (!trimmed) {
    return { command: '', args: [], raw: input };
  }

  // Simple parser that handles quoted strings
  const parts: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < trimmed.length; i++) {
    const char = trimmed[i];

    if (char === '"' || char === "'") {
      inQuotes = !inQuotes;
    } else if (char === ' ' && !inQuotes) {
      if (current) {
        parts.push(current);
        current = '';
      }
    } else {
      current += char;
    }
  }

  if (current) {
    parts.push(current);
  }

  const [command = '', ...args] = parts;

  return {
    command: command.toLowerCase(),
    args,
    raw: input,
  };
}

/**
 * Get autocomplete suggestions for partial input
 */
export function getAutocompleteSuggestions(
  input: string,
  commands: string[],
  projectSlugs: string[] = []
): string[] {
  const trimmed = input.trim().toLowerCase();

  if (!trimmed) {
    return [];
  }

  const parts = trimmed.split(' ');

  // If only one word, suggest commands
  if (parts.length === 1) {
    return commands.filter(cmd => cmd.startsWith(trimmed));
  }

  // If command is 'open' or 'cat', suggest project slugs or files
  const [command, ...args] = parts;
  const partial = args[args.length - 1] || '';

  if (command === 'open') {
    return projectSlugs.filter(slug => slug.startsWith(partial));
  }

  if (command === 'cat') {
    const files = ['secret.txt'];
    return files.filter(file => file.startsWith(partial));
  }

  return [];
}

/**
 * Complete the current input with the best autocomplete match
 */
export function autocomplete(
  input: string,
  commands: string[],
  projectSlugs: string[] = []
): string {
  const suggestions = getAutocompleteSuggestions(input, commands, projectSlugs);

  if (suggestions.length === 0) {
    return input;
  }

  const trimmed = input.trim();
  const parts = trimmed.split(' ');

  if (parts.length === 1) {
    // Complete command
    return suggestions[0];
  }

  // Complete argument
  const [command, ...args] = parts;
  args[args.length - 1] = suggestions[0];

  return [command, ...args].join(' ');
}
