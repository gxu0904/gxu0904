import { describe, it, expect, beforeEach } from 'vitest';
import { CommandHistory } from '@/lib/cli/history';

describe('CommandHistory', () => {
  let history: CommandHistory;

  beforeEach(() => {
    history = new CommandHistory();
    history.clear();
  });

  it('should add commands to history', () => {
    history.add('help');
    history.add('about');

    const all = history.getAll();
    expect(all).toEqual(['help', 'about']);
  });

  it('should not add duplicate consecutive commands', () => {
    history.add('help');
    history.add('help');

    const all = history.getAll();
    expect(all).toEqual(['help']);
  });

  it('should not add empty commands', () => {
    history.add('');
    history.add('  ');

    const all = history.getAll();
    expect(all).toEqual([]);
  });

  it('should navigate backwards through history', () => {
    history.add('help');
    history.add('about');
    history.add('projects');

    expect(history.getPrevious('')).toBe('projects');
    expect(history.getPrevious('')).toBe('about');
    expect(history.getPrevious('')).toBe('help');
  });

  it('should navigate forwards through history', () => {
    history.add('help');
    history.add('about');

    history.getPrevious('');
    history.getPrevious('');

    expect(history.getNext()).toBe('about');
  });

  it('should return temp input when navigating past end', () => {
    history.add('help');

    const tempInput = 'test';
    history.getPrevious(tempInput);
    history.getNext();

    expect(history.getNext()).toBe(tempInput);
  });

  it('should reset navigation state', () => {
    history.add('help');
    history.getPrevious('');
    history.reset();

    expect(history.getNext()).toBeNull();
  });

  it('should clear all history', () => {
    history.add('help');
    history.add('about');
    history.clear();

    expect(history.getAll()).toEqual([]);
  });
});
