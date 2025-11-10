export type Project = {
  title: string;
  description: string;
  impact: string; // One-line quantified impact
  tags: string[]; // e.g., ['AI', 'Nonprofit', 'Research']
  techStack?: string[];
  metrics?: string; // Additional metrics/details
  demo?: string;
  github?: string;
};

export const projects: Project[] = [
  {
    title: 'LightAid',
    description: 'Affordable smart lighting for disaster relief and off-grid communities.',
    impact: '17K+ items shipped; raised $4K+; 750 volunteers',
    tags: ['Nonprofit', 'Hardware', 'Social Impact'],
    techStack: ['Python', 'IoT', 'Hardware Design'],
    metrics: '501(c)(3) nonprofit addressing global light, period, and learning poverty',
    demo: 'https://lightaid.net',
    github: 'https://github.com/gxu0904',
  },
  {
    title: 'StudyAP',
    description: 'AI-guided AP prep with practice, analytics, and personalized study plans.',
    impact: '10K+ practice questions; 1K+ active users',
    tags: ['AI', 'Education', 'Web App'],
    techStack: ['Next.js', 'TypeScript', 'AI/ML'],
    metrics: 'Co-founded AI-powered platform for AP and standardized test prep',
    demo: 'https://studyap.org',
    github: 'https://github.com/gxu0904',
  },
  {
    title: 'DECA Automation Suite',
    description: 'Tools that streamline event logistics, role assignments, and scoring.',
    impact: '200+ members; optimized competition scheduling',
    tags: ['Automation', 'Python', 'Operations'],
    techStack: ['Python', 'Go', 'C++'],
    metrics: 'VP of Operations; built automation tools for competition scheduling and scoring',
    demo: 'https://github.com/gxu0904',
    github: 'https://github.com/gxu0904',
  },
  {
    title: 'Nano-grinding Research',
    description: 'Data pipelines and models for precision nano-grinding process diagnostics.',
    impact: 'Published research; precision diagnostics',
    tags: ['Research', 'Data Science', 'ML'],
    techStack: ['Python', 'Data Pipelines', 'ML Models'],
    metrics: 'Data pipelines and models for precision nano-grinding process diagnostics',
    demo: 'https://github.com/gxu0904',
  },
];


