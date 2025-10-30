import {
  helpCommand,
  aboutCommand,
  projectsCommand,
  openCommand,
  resumeCommand,
  contactCommand,
  emailCommand,
  socialsCommand,
  catCommand,
  themeCommand,
  clearCommand,
  CommandHandler,
  CommandOutput,
} from './commands';
import { ParsedCommand } from './parser';
import projectsData from '@/data/projects.json';

/**
 * Command Router
 *
 * Maps commands to their handlers and executes them
 * Provides list of available commands for autocomplete
 */

export const commandMap: Record<string, CommandHandler> = {
  help: helpCommand,
  about: aboutCommand,
  projects: projectsCommand,
  ls: projectsCommand, // Alias for projects
  open: openCommand,
  resume: resumeCommand,
  contact: contactCommand,
  email: emailCommand,
  socials: socialsCommand,
  cat: catCommand,
  theme: themeCommand,
  clear: clearCommand,
};

/**
 * Get list of all available commands
 */
export function getAvailableCommands(): string[] {
  return Object.keys(commandMap);
}

/**
 * Get list of all project slugs for autocomplete
 */
export function getProjectSlugs(): string[] {
  return projectsData.projects.map(p => p.slug);
}

/**
 * Execute a parsed command
 *
 * @param parsed - The parsed command from parser
 * @returns Command output or error
 */
export async function executeCommand(parsed: ParsedCommand): Promise<CommandOutput> {
  const { command, args } = parsed;

  if (!command) {
    return { lines: [] };
  }

  const handler = commandMap[command];

  if (!handler) {
    return {
      lines: [
        { type: 'error', content: `Command not found: ${command}` },
        { type: 'text', content: 'Type "help" to see available commands.' },
      ],
    };
  }

  try {
    return await handler(args);
  } catch (error) {
    console.error('Command execution error:', error);
    return {
      lines: [
        { type: 'error', content: 'An error occurred while executing the command.' },
        { type: 'text', content: 'Please try again or type "help" for assistance.' },
      ],
    };
  }
}
