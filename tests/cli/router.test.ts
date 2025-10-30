import { describe, it, expect } from 'vitest';
import { getAvailableCommands, getProjectSlugs } from '@/lib/cli/router';

describe('router', () => {
  it('should return list of available commands', () => {
    const commands = getAvailableCommands();

    expect(commands).toContain('help');
    expect(commands).toContain('about');
    expect(commands).toContain('projects');
    expect(commands).toContain('open');
    expect(commands).toContain('resume');
    expect(commands).toContain('contact');
    expect(commands).toContain('email');
    expect(commands).toContain('socials');
    expect(commands).toContain('cat');
    expect(commands).toContain('theme');
    expect(commands).toContain('clear');
    expect(commands).toContain('ls');
  });

  it('should return list of project slugs', () => {
    const slugs = getProjectSlugs();

    expect(slugs.length).toBeGreaterThan(0);
    expect(slugs).toContain('studyap');
  });
});
