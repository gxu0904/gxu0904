export type Project = {
  title: string;
  description: string;
  demo?: string;
  github?: string;
};

export const projects: Project[] = [
  {
    title: 'LightAid',
    description: 'Affordable smart lighting for disaster relief and off-grid communities.',
    demo: 'https://example.com/lightaid',
    github: 'https://github.com/your/lightaid',
  },
  {
    title: 'StudyAP',
    description: 'AI-guided AP prep with practice, analytics, and personalized study plans.',
    demo: 'https://example.com/studyap',
    github: 'https://github.com/your/studyap',
  },
  {
    title: 'DECA Automation Suite',
    description: 'Tools that streamline event logistics, role assignments, and scoring.',
    demo: 'https://example.com/deca-suite',
    github: 'https://github.com/your/deca-suite',
  },
  {
    title: 'Nano-grinding Research',
    description: 'Data pipelines and models for precision nano-grinding process diagnostics.',
    demo: 'https://example.com/nanogrinding',
  },
];


