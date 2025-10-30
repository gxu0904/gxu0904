import { describe, it, expect } from 'vitest';
import { parseCommand, autocomplete, getAutocompleteSuggestions } from '@/lib/cli/parser';

describe('parseCommand', () => {
  it('should parse a simple command', () => {
    const result = parseCommand('help');
    expect(result.command).toBe('help');
    expect(result.args).toEqual([]);
    expect(result.raw).toBe('help');
  });

  it('should parse a command with arguments', () => {
    const result = parseCommand('open studyap');
    expect(result.command).toBe('open');
    expect(result.args).toEqual(['studyap']);
  });

  it('should parse a command with multiple arguments', () => {
    const result = parseCommand('cat secret.txt');
    expect(result.command).toBe('cat');
    expect(result.args).toEqual(['secret.txt']);
  });

  it('should handle quoted strings', () => {
    const result = parseCommand('echo "hello world"');
    expect(result.command).toBe('echo');
    expect(result.args).toEqual(['hello world']);
  });

  it('should handle empty input', () => {
    const result = parseCommand('');
    expect(result.command).toBe('');
    expect(result.args).toEqual([]);
  });

  it('should trim whitespace', () => {
    const result = parseCommand('  help  ');
    expect(result.command).toBe('help');
    expect(result.args).toEqual([]);
  });

  it('should convert command to lowercase', () => {
    const result = parseCommand('HELP');
    expect(result.command).toBe('help');
  });
});

describe('getAutocompleteSuggestions', () => {
  const commands = ['help', 'about', 'projects', 'open', 'clear'];
  const projectSlugs = ['studyap', 'lightaid-ops', 'frc-scouting'];

  it('should suggest commands for partial input', () => {
    const suggestions = getAutocompleteSuggestions('he', commands);
    expect(suggestions).toContain('help');
  });

  it('should suggest project slugs for open command', () => {
    const suggestions = getAutocompleteSuggestions('open stu', commands, projectSlugs);
    expect(suggestions).toContain('studyap');
  });

  it('should return empty array for no matches', () => {
    const suggestions = getAutocompleteSuggestions('xyz', commands);
    expect(suggestions).toEqual([]);
  });

  it('should return empty array for empty input', () => {
    const suggestions = getAutocompleteSuggestions('', commands);
    expect(suggestions).toEqual([]);
  });
});

describe('autocomplete', () => {
  const commands = ['help', 'about', 'projects', 'open'];
  const projectSlugs = ['studyap', 'frc-scouting'];

  it('should autocomplete partial command', () => {
    const result = autocomplete('he', commands);
    expect(result).toBe('help');
  });

  it('should autocomplete project slug', () => {
    const result = autocomplete('open stu', commands, projectSlugs);
    expect(result).toBe('open studyap');
  });

  it('should return original input if no match', () => {
    const result = autocomplete('xyz', commands);
    expect(result).toBe('xyz');
  });
});
