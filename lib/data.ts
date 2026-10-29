import { Brain, Code2, Database, Server, Shield, Wrench, type LucideIcon } from 'lucide-react';

export interface Project {
  id: string;
  titleKey: string;
  descriptionKey: string;
  longDescriptionKey: string;
  technologies: string[];
  category: 'web' | 'ai' | 'security' | 'network';
  image?: string;
  github?: string;
  live?: string;
  featured: boolean;
  year: string;
  roleKey: string;
  highlightsKey: string[];
}

export interface SkillCategory {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: LucideIcon;
  skills: {
    nameKey: string;
    level: number; // 1-5
  }[];
}

export interface Experience {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: string;
  achievements: string[];
  type: 'education' | 'work' | 'project';
}

export const siteConfig = {
  name: "Isaac N'CHO",
  title: 'Software Engineer & Cybersecurity Specialist',
  description:
    'Building secure, scalable applications that solve real-world problems. Passionate about the intersection of software engineering, cybersecurity, and AI.',
  email: 'isaacncho08@gmail.com',
  phone: '+225 0585456593',
  location: "Abidjan, Côte d'Ivoire",
  social: {
    github: 'https://github.com/Z-Isaac08',
    linkedin: 'https://linkedin.com/in/isaac-n-cho',
    email: 'mailto:isaacncho08@gmail.com',
  },
} as const;

export const navigation = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Journey', href: '#journey' },
  { name: 'Contact', href: '#contact' },
] as const;

export const projects: Project[] = [
  {
    id: 'mamaci',
    titleKey: 'items.mamaci.title',
    descriptionKey: 'items.mamaci.description',
    longDescriptionKey: 'items.mamaci.longDescription',
    technologies: ['React Native', 'Node.js', 'Chatbot', 'CMU API'],
    category: 'web',
    github: 'https://github.com/Z-Isaac08/MamaCI',
    featured: true,
    year: '2026',
    roleKey: 'items.mamaci.role',
    highlightsKey: [],
  },
  {
    id: 'studyspace',
    titleKey: 'items.studyspace.title',
    descriptionKey: 'items.studyspace.description',
    longDescriptionKey: 'items.studyspace.longDescription',
    technologies: ['Next.js', 'Supabase', 'Tailwind CSS', 'Liveblocks'],
    category: 'web',
    github: 'https://github.com/Z-Isaac08/studyspace',
    featured: true,
    year: '2024',
    roleKey: 'items.studyspace.role',
    highlightsKey: [],
  },
  {
    id: 'akiba-hub',
    titleKey: 'items.akiba-hub.title',
    descriptionKey: 'items.akiba-hub.description',
    longDescriptionKey: 'items.akiba-hub.longDescription',
    technologies: ['React', 'NestJS', 'FastAPI', 'PostgreSQL'],
    category: 'web',
    featured: true,
    year: '2025',
    roleKey: 'items.akiba-hub.role',
    highlightsKey: [],
  },
  {
    id: 'xpense',
    titleKey: 'items.xpense.title',
    descriptionKey: 'items.xpense.description',
    longDescriptionKey: 'items.xpense.longDescription',
    technologies: ['React', 'Firebase', 'Tailwind CSS', 'Chart.js'],
    category: 'web',
    github: 'https://github.com/Z-Isaac08/X-PENSE-APP',
    live: 'https://x-pense-app.vercel.app',
    featured: true,
    year: '2024',
    roleKey: 'items.xpense.role',
    highlightsKey: [
      'items.xpense.highlights.0',
      'items.xpense.highlights.1',
      'items.xpense.highlights.2',
      'items.xpense.highlights.3',
    ],
  },
  {
    id: 'industry-4',
    titleKey: 'items.industry-4.title',
    descriptionKey: 'items.industry-4.description',
    longDescriptionKey: 'items.industry-4.longDescription',
    technologies: ['Python', 'TensorFlow', 'FastAPI', 'PostgreSQL'],
    category: 'ai',
    featured: true,
    year: '2023',
    roleKey: 'items.industry-4.role',
    highlightsKey: [
      'items.industry-4.highlights.0',
      'items.industry-4.highlights.1',
      'items.industry-4.highlights.2',
      'items.industry-4.highlights.3',
    ],
  },
  {
    id: 'networking-lab',
    titleKey: 'items.networking-lab.title',
    descriptionKey: 'items.networking-lab.description',
    longDescriptionKey: 'items.networking-lab.longDescription',
    technologies: ['VMware', 'Ubuntu', 'Wireshark', 'IPv6', 'DHCPv4', 'ICMPv6'],
    category: 'network',
    github: 'https://github.com/Z-Isaac08/ipv4-ipv6-addressing-labs.git',
    featured: true,
    year: '2025',
    roleKey: 'items.networking-lab.role',
    highlightsKey: [
      'items.networking-lab.highlights.0',
      'items.networking-lab.highlights.1',
      'items.networking-lab.highlights.2',
      'items.networking-lab.highlights.3',
    ],
  },
  {
    id: 'linux-adds',
    titleKey: 'items.linux-adds.title',
    descriptionKey: 'items.linux-adds.description',
    longDescriptionKey: 'items.linux-adds.longDescription',
    technologies: ['Debian', 'OpenLDAP', 'SSSD', 'DNS', 'DHCP', 'VMWare'],
    category: 'network',
    featured: true,
    year: '2026',
    roleKey: 'items.linux-adds.role',
    highlightsKey: [
      'items.linux-adds.highlights.0',
      'items.linux-adds.highlights.1',
      'items.linux-adds.highlights.2',
      'items.linux-adds.highlights.3',
    ],
  },
  {
    id: 'pl-inference',
    titleKey: 'items.pl-inference.title',
    descriptionKey: 'items.pl-inference.description',
    longDescriptionKey: 'items.pl-inference.longDescription',
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'Logistic Regression'],
    category: 'ai',
    github: 'https://github.com/Z-Isaac08/PL-Performance-Inference',
    featured: true,
    year: '2026',
    roleKey: 'items.pl-inference.role',
    highlightsKey: [
      'items.pl-inference.highlights.0',
      'items.pl-inference.highlights.1',
      'items.pl-inference.highlights.2',
      'items.pl-inference.highlights.3',
    ],
  },
  {
    id: 'wine-analysis',
    titleKey: 'items.wine-analysis.title',
    descriptionKey: 'items.wine-analysis.description',
    longDescriptionKey: 'items.wine-analysis.longDescription',
    technologies: ['Python', 'Pandas', 'Matplotlib', 'K-Means', 'Linear Regression'],
    category: 'ai',
    github: 'https://github.com/Z-Isaac08/wine-sales-analysis',
    featured: false,
    year: '2025',
    roleKey: 'items.wine-analysis.role',
    highlightsKey: [
      'items.wine-analysis.highlights.0',
      'items.wine-analysis.highlights.1',
      'items.wine-analysis.highlights.2',
      'items.wine-analysis.highlights.3',
    ],
  },
  {
    id: 'e-docs',
    titleKey: 'items.e-docs.title',
    descriptionKey: 'items.e-docs.description',
    longDescriptionKey: 'items.e-docs.longDescription',
    technologies: ['React', 'Node.js', 'Elasticsearch', 'Docker'],
    category: 'web',
    featured: false,
    year: '2024',
    roleKey: 'items.e-docs.role',
    highlightsKey: [
      'items.e-docs.highlights.0',
      'items.e-docs.highlights.1',
      'items.e-docs.highlights.2',
      'items.e-docs.highlights.3',
    ],
  },
  {
    id: 'tp1-intrusion-detection',
    titleKey: 'items.tp1-intrusion-detection.title',
    descriptionKey: 'items.tp1-intrusion-detection.description',
    longDescriptionKey: 'items.tp1-intrusion-detection.longDescription',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Jupyter'],
    category: 'ai',
    github: 'https://github.com/Z-Isaac08/ml-cybersecurity',
    featured: false,
    year: '2026',
    roleKey: 'items.tp1-intrusion-detection.role',
    highlightsKey: [
      'items.tp1-intrusion-detection.highlights.0',
      'items.tp1-intrusion-detection.highlights.1',
      'items.tp1-intrusion-detection.highlights.2',
    ],
  },
  {
    id: 'tp2-fraud-detection',
    titleKey: 'items.tp2-fraud-detection.title',
    descriptionKey: 'items.tp2-fraud-detection.description',
    longDescriptionKey: 'items.tp2-fraud-detection.longDescription',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Imbalanced-learn'],
    category: 'ai',
    github: 'https://github.com/Z-Isaac08/ml-cybersecurity',
    featured: false,
    year: '2026',
    roleKey: 'items.tp2-fraud-detection.role',
    highlightsKey: [
      'items.tp2-fraud-detection.highlights.0',
      'items.tp2-fraud-detection.highlights.1',
      'items.tp2-fraud-detection.highlights.2',
    ],
  },
  {
    id: 'tp3-phishing-detection',
    titleKey: 'items.tp3-phishing-detection.title',
    descriptionKey: 'items.tp3-phishing-detection.description',
    longDescriptionKey: 'items.tp3-phishing-detection.longDescription',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Jupyter'],
    category: 'ai',
    github: 'https://github.com/Z-Isaac08/ml-cybersecurity',
    featured: false,
    year: '2026',
    roleKey: 'items.tp3-phishing-detection.role',
    highlightsKey: [
      'items.tp3-phishing-detection.highlights.0',
      'items.tp3-phishing-detection.highlights.1',
      'items.tp3-phishing-detection.highlights.2',
    ],
  },
  {
    id: 'tp4-malware-detection',
    titleKey: 'items.tp4-malware-detection.title',
    descriptionKey: 'items.tp4-malware-detection.description',
    longDescriptionKey: 'items.tp4-malware-detection.longDescription',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Jupyter'],
    category: 'ai',
    github: 'https://github.com/Z-Isaac08/ml-cybersecurity',
    featured: false,
    year: '2026',
    roleKey: 'items.tp4-malware-detection.role',
    highlightsKey: [
      'items.tp4-malware-detection.highlights.0',
      'items.tp4-malware-detection.highlights.1',
      'items.tp4-malware-detection.highlights.2',
    ],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    id: 'security',
    titleKey: 'categories.security.title',
    descriptionKey: 'categories.security.description',
    icon: Shield,
    skills: [
      { nameKey: 'categories.security.skills.owasp', level: 5 },
      { nameKey: 'categories.security.skills.reconnaissance', level: 5 },
      { nameKey: 'categories.security.skills.activeDirectory', level: 4 },
      { nameKey: 'categories.security.skills.privilegeEscalation', level: 4 },
      { nameKey: 'categories.security.skills.remediation', level: 4 },
    ],
  },
  {
    id: 'tools',
    titleKey: 'categories.tools.title',
    descriptionKey: 'categories.tools.description',
    icon: Wrench,
    skills: [
      { nameKey: 'categories.tools.skills.securityTools', level: 5 },
      { nameKey: 'categories.tools.skills.networkScanning', level: 5 },
      { nameKey: 'categories.tools.skills.exploitation', level: 4 },
      { nameKey: 'categories.tools.skills.adcs', level: 4 },
      { nameKey: 'categories.tools.skills.packetAnalysis', level: 4 },
    ],
  },
  {
    id: 'frontend',
    titleKey: 'categories.frontend.title',
    descriptionKey: 'categories.frontend.description',
    icon: Code2,
    skills: [
      { nameKey: 'categories.frontend.skills.reactNext', level: 5 },
      { nameKey: 'categories.frontend.skills.typescript', level: 4 },
      { nameKey: 'categories.frontend.skills.tailwind', level: 5 },
      { nameKey: 'categories.frontend.skills.htmlCss', level: 5 },
      { nameKey: 'categories.frontend.skills.uiUx', level: 4 },
    ],
  },
  {
    id: 'backend',
    titleKey: 'categories.backend.title',
    descriptionKey: 'categories.backend.description',
    icon: Database,
    skills: [
      { nameKey: 'categories.backend.skills.python', level: 4 },
      { nameKey: 'categories.backend.skills.node', level: 4 },
      { nameKey: 'categories.backend.skills.go', level: 3 },
      { nameKey: 'categories.backend.skills.database', level: 4 },
      { nameKey: 'categories.backend.skills.cacheSecurity', level: 3 },
    ],
  },
  {
    id: 'systems',
    titleKey: 'categories.systems.title',
    descriptionKey: 'categories.systems.description',
    icon: Server,
    skills: [
      { nameKey: 'categories.systems.skills.linux', level: 5 },
      { nameKey: 'categories.systems.skills.windows', level: 4 },
      { nameKey: 'categories.systems.skills.vmware', level: 4 },
      { nameKey: 'categories.systems.skills.docker', level: 4 },
      { nameKey: 'categories.systems.skills.networking', level: 4 },
    ],
  },
  {
    id: 'data',
    titleKey: 'categories.data.title',
    descriptionKey: 'categories.data.description',
    icon: Brain,
    skills: [
      { nameKey: 'categories.data.skills.dataStack', level: 4 },
      { nameKey: 'categories.data.skills.versionControl', level: 5 },
      { nameKey: 'categories.data.skills.agile', level: 4 },
      { nameKey: 'categories.data.skills.uml', level: 4 },
    ],
  },
];

export const experiences: Experience[] = [
  {
    id: 'mamaci-hackathon',
    title: '1er Prix - Hackathon JDN',
    organization: 'Journées du Numérique (JDN)',
    period: '2026',
    description: '',
    achievements: [],
    type: 'project',
  },
  {
    id: 'esatic-4',
    title: '4th Year - Cybersecurity & AI Specialization',
    organization: 'ESATIC - École Supérieure Africaine des TIC',
    period: '2025 - Present',
    description:
      'Specializing in advanced cybersecurity concepts and AI integration for security applications.',
    achievements: [
      'Focus on AI-driven security solutions',
      'Advanced cryptography and secure protocols',
      'Penetration testing and vulnerability assessment',
    ],
    type: 'education',
  },
  {
    id: 'industry-project',
    title: 'Team Lead - Industry 4.0 Project',
    organization: 'Academic Project',
    period: '2025',
    description:
      'Led a team in developing an AI-powered livestock optimization solution as part of an Industry 4.0 initiative.',
    achievements: [
      'Managed team of 4 developers using Agile methodology',
      'Delivered project 2 weeks ahead of schedule',
      'Achieved 30% resource optimization in testing',
    ],
    type: 'project',
  },
  {
    id: 'esatic-1-3',
    title: 'Network Systems & Telecommunications',
    organization: 'ESATIC - École Supérieure Africaine des TIC',
    period: '2022 - 2025',
    description:
      'Comprehensive foundation in network architecture, systems administration, and software development.',
    achievements: [
      'Strong foundation in networking protocols',
      'Full-stack web and mobile development skills',
      'Database design and administration',
    ],
    type: 'education',
  },
  {
    id: 'bac',
    title: 'Baccalauréat Série C',
    organization: 'Lycée Moderne Aboisso',
    period: '2021 - 2022',
    description: 'Scientific baccalaureate with focus on mathematics and physics.',
    achievements: [
      'Strong mathematical and analytical foundation',
      'Physics and chemistry fundamentals',
    ],
    type: 'education',
  },
];

export const heroStats = [
  { value: '3+', key: 'years' },
  { value: '10+', key: 'projects' },
  { value: '5+', key: 'technologies' },
] as const;
