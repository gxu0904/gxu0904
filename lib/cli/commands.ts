import { person } from '@/data/person';
import projectsData from '@/data/projects.json';
import { aboutContent } from '@/data/about';
import { resumeContent } from '@/data/resume';
import { Project } from '@/lib/types';

export type OutputType = 'text' | 'error' | 'success' | 'link' | 'table' | 'list' | 'markdown';

export interface OutputLine {
  type: OutputType;
  content: string;
  className?: string;
}

export interface CommandOutput {
  lines: OutputLine[];
}

export type CommandHandler = (args: string[]) => CommandOutput | Promise<CommandOutput>;

/**
 * HELP - List all available commands
 *
 * Input: none
 * Output: Table of commands with descriptions
 */
export const helpCommand: CommandHandler = () => {
  return {
    lines: [
      { type: 'success', content: 'Available Commands:' },
      { type: 'text', content: '' },
      { type: 'text', content: '  help              Show this help message' },
      { type: 'text', content: '  about             Learn more about me' },
      { type: 'text', content: '  projects          List all projects' },
      { type: 'text', content: '  ls                Alias for projects' },
      { type: 'text', content: '  open <slug>       View project details' },
      { type: 'text', content: '  resume            View my resume' },
      { type: 'text', content: '  contact           Get contact information' },
      { type: 'text', content: '  email             Open email client' },
      { type: 'text', content: '  socials           View social media links' },
      { type: 'text', content: '  theme             Toggle light/dark theme' },
      { type: 'text', content: '  cat <file>        Read a file (try secret.txt)' },
      { type: 'text', content: '  clear             Clear the terminal' },
      { type: 'text', content: '' },
      { type: 'text', content: 'Tips:' },
      { type: 'text', content: '  • Use ↑/↓ arrow keys to navigate history' },
      { type: 'text', content: '  • Press Tab for autocomplete' },
      { type: 'text', content: '  • Try typing "cat secret.txt" for a surprise' },
    ],
  };
};

/**
 * ABOUT - Show bio and highlights
 *
 * Input: none
 * Output: Formatted bio text with highlights
 */
export const aboutCommand: CommandHandler = () => {
  return {
    lines: [
      { type: 'success', content: `${person.name} — ${person.title}` },
      { type: 'text', content: person.location },
      { type: 'text', content: '' },
      { type: 'markdown', content: aboutContent },
    ],
  };
};

/**
 * PROJECTS / LS - List all projects
 *
 * Input: none
 * Output: Formatted table of projects
 */
export const projectsCommand: CommandHandler = () => {
  const projects = projectsData.projects as Project[];

  const lines: OutputLine[] = [
    { type: 'success', content: `Projects (${projects.length} total)` },
    { type: 'text', content: '' },
  ];

  projects.forEach((project, index) => {
    lines.push(
      { type: 'text', content: `${index + 1}. ${project.name}`, className: 'font-bold text-cyan-400' },
      { type: 'text', content: `   ${project.tagline}` },
      { type: 'text', content: `   Stack: ${project.stack.join(', ')}` },
      { type: 'text', content: `   Role: ${project.role} | Year: ${project.year}` },
      { type: 'text', content: `   Commands: open ${project.slug}` },
      { type: 'text', content: '' }
    );
  });

  lines.push(
    { type: 'text', content: 'Use "open <slug>" to view project details' }
  );

  return { lines };
};

/**
 * OPEN - Open a specific project
 *
 * Input: project slug
 * Output: Detailed project information
 */
export const openCommand: CommandHandler = (args) => {
  if (args.length === 0) {
    return {
      lines: [
        { type: 'error', content: 'Error: Please specify a project slug' },
        { type: 'text', content: 'Usage: open <slug>' },
        { type: 'text', content: 'Try: projects (to see available slugs)' },
      ],
    };
  }

  const slug = args[0].toLowerCase();
  const projects = projectsData.projects as Project[];
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return {
      lines: [
        { type: 'error', content: `Error: Project "${slug}" not found` },
        { type: 'text', content: 'Available projects:' },
        ...projects.map(p => ({ type: 'text' as OutputType, content: `  • ${p.slug}` })),
      ],
    };
  }

  const lines: OutputLine[] = [
    { type: 'success', content: project.name, className: 'text-2xl font-bold' },
    { type: 'text', content: project.tagline, className: 'text-gray-400' },
    { type: 'text', content: '' },
    { type: 'text', content: `Role: ${project.role} | Year: ${project.year}` },
    { type: 'text', content: `Stack: ${project.stack.join(', ')}` },
    { type: 'text', content: '' },
    { type: 'text', content: 'Description:' },
    { type: 'text', content: project.description },
    { type: 'text', content: '' },
    { type: 'text', content: 'Highlights:' },
  ];

  project.highlights.forEach(highlight => {
    lines.push({ type: 'text', content: `  • ${highlight}` });
  });

  if (project.metrics.length > 0) {
    lines.push(
      { type: 'text', content: '' },
      { type: 'text', content: 'Key Metrics:' }
    );
    project.metrics.forEach(metric => {
      lines.push({ type: 'text', content: `  ✓ ${metric}`, className: 'text-green-400' });
    });
  }

  if (project.links.demo || project.links.repo) {
    lines.push(
      { type: 'text', content: '' },
      { type: 'text', content: 'Links:' }
    );
    if (project.links.demo) {
      lines.push({ type: 'link', content: `  Live Demo: ${project.links.demo}` });
    }
    if (project.links.repo) {
      lines.push({ type: 'link', content: `  Repository: ${project.links.repo}` });
    }
  }

  return { lines };
};

/**
 * RESUME - Show resume
 *
 * Input: none
 * Output: Formatted resume with download link
 */
export const resumeCommand: CommandHandler = () => {
  return {
    lines: [
      { type: 'success', content: 'Resume' },
      { type: 'text', content: '' },
      { type: 'markdown', content: resumeContent },
      { type: 'text', content: '' },
      { type: 'text', content: '─'.repeat(60) },
      { type: 'link', content: 'Download PDF: /resume.pdf' },
    ],
  };
};

/**
 * CONTACT - Show contact information
 *
 * Input: none
 * Output: Contact details with copy-to-clipboard functionality
 */
export const contactCommand: CommandHandler = () => {
  return {
    lines: [
      { type: 'success', content: 'Contact Information' },
      { type: 'text', content: '' },
      { type: 'text', content: `Email: ${person.email}`, className: 'text-cyan-400' },
      { type: 'text', content: `Location: ${person.location}` },
      { type: 'text', content: '' },
      { type: 'text', content: 'Social Media:' },
      { type: 'link', content: `  GitHub: ${person.socials.github}` },
      { type: 'link', content: `  LinkedIn: ${person.socials.linkedin}` },
      { type: 'text', content: '' },
      { type: 'text', content: '💡 Tip: Use "email" to open your mail client' },
    ],
  };
};

/**
 * EMAIL - Open email client
 *
 * Input: none
 * Output: Opens mailto link and shows fallback
 */
export const emailCommand: CommandHandler = () => {
  if (typeof window !== 'undefined') {
    window.location.href = `mailto:${person.email}`;
  }

  return {
    lines: [
      { type: 'success', content: 'Opening email client...' },
      { type: 'text', content: '' },
      { type: 'text', content: `If your email client didn't open, send me an email at:` },
      { type: 'text', content: person.email, className: 'text-cyan-400 font-bold' },
    ],
  };
};

/**
 * SOCIALS - Show social media links
 *
 * Input: none
 * Output: List of social media links
 */
export const socialsCommand: CommandHandler = () => {
  return {
    lines: [
      { type: 'success', content: 'Social Media' },
      { type: 'text', content: '' },
      { type: 'link', content: `GitHub: ${person.socials.github}` },
      { type: 'link', content: `LinkedIn: ${person.socials.linkedin}` },
      { type: 'text', content: '' },
      { type: 'text', content: 'Feel free to connect!' },
    ],
  };
};

/**
 * CAT - Read a file (Easter egg)
 *
 * Input: filename
 * Output: File contents or easter egg
 */
export const catCommand: CommandHandler = (args) => {
  if (args.length === 0) {
    return {
      lines: [
        { type: 'error', content: 'Error: Please specify a file' },
        { type: 'text', content: 'Usage: cat <filename>' },
        { type: 'text', content: 'Try: cat secret.txt' },
      ],
    };
  }

  const filename = args[0].toLowerCase();

  if (filename === 'secret.txt') {
    return {
      lines: [
        { type: 'success', content: 'secret.txt' },
        { type: 'text', content: '' },
        { type: 'text', content: '🎉 You found the Easter egg! 🎉' },
        { type: 'text', content: '' },
        { type: 'text', content: 'Fun fact: I started coding when I was 13 years old.' },
        { type: 'text', content: 'The first thing I learned was how to make a website with' },
        { type: 'text', content: 'animated GIFs everywhere. We\'ve come a long way since then!' },
        { type: 'text', content: '' },
        { type: 'text', content: 'ASCII Art:' },
        { type: 'text', content: '    /\\_/\\  ', className: 'text-yellow-400' },
        { type: 'text', content: '   ( o.o ) ', className: 'text-yellow-400' },
        { type: 'text', content: '    > ^ <  ', className: 'text-yellow-400' },
        { type: 'text', content: '   /|   |\\', className: 'text-yellow-400' },
        { type: 'text', content: '  (_|   |_)', className: 'text-yellow-400' },
        { type: 'text', content: '' },
        { type: 'text', content: 'Thanks for exploring my portfolio!' },
      ],
    };
  }

  return {
    lines: [
      { type: 'error', content: `cat: ${filename}: No such file or directory` },
      { type: 'text', content: 'Hint: Try "cat secret.txt"' },
    ],
  };
};

/**
 * THEME - Toggle theme
 *
 * Input: none
 * Output: Confirmation message
 */
export const themeCommand: CommandHandler = () => {
  if (typeof window !== 'undefined') {
    const html = document.documentElement;
    const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    if (newTheme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

    localStorage.setItem('theme', newTheme);

    return {
      lines: [
        { type: 'success', content: `Theme switched to ${newTheme} mode` },
        { type: 'text', content: 'Your preference has been saved.' },
      ],
    };
  }

  return {
    lines: [
      { type: 'text', content: 'Theme toggle is only available in the browser.' },
    ],
  };
};

/**
 * CLEAR - Clear terminal (special command, handled by terminal component)
 *
 * Input: none
 * Output: Empty (terminal clears)
 */
export const clearCommand: CommandHandler = () => {
  return { lines: [] };
};
