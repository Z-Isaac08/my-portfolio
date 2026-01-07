import {
  Code2,
  Shield,
  Smartphone,
  Database,
  Cloud,
  Brain,
  GitBranch,
  Layers,
  type LucideIcon,
} from "lucide-react";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: "web" | "mobile" | "ai" | "security";
  image?: string;
  github?: string;
  live?: string;
  featured: boolean;
  year: string;
  role: string;
  highlights: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  skills: {
    name: string;
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
  type: "education" | "work" | "project";
}

export const siteConfig = {
  name: "Isaac N'CHO",
  title: "Software Engineer & Cybersecurity Specialist",
  description:
    "Building secure, scalable applications that solve real-world problems. Passionate about the intersection of software engineering, cybersecurity, and AI.",
  email: "isaacncho08@gmail.com",
  phone: "+225 0585456593",
  location: "Abidjan, Côte d'Ivoire",
  social: {
    github: "https://github.com/Z-Isaac08",
    linkedin: "https://linkedin.com/in/isaac-n-cho",
    email: "mailto:isaacncho08@gmail.com",
  },
} as const;

export const navigation = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Journey", href: "#journey" },
  { name: "Contact", href: "#contact" },
] as const;

export const projects: Project[] = [
  {
    id: "xpense",
    title: "Xpense",
    description: "Real-time expense tracking with intelligent categorization",
    longDescription:
      "A comprehensive expense management solution built with ReactJS and Firebase. Features real-time synchronization across devices, automated expense categorization, and insightful financial analytics.",
    technologies: ["React", "Firebase", "Tailwind CSS", "Chart.js"],
    category: "web",
    github: "https://github.com/Z-Isaac08/X_Pense_Mobile",
    featured: true,
    year: "2024",
    role: "Full-Stack Developer",
    highlights: [
      "Real-time data synchronization with Firebase Realtime Database",
      "Automated expense categorization using pattern matching",
      "Interactive dashboards with spending analytics",
      "PWA support for offline functionality",
    ],
  },
  {
    id: "ace-app",
    title: "ACE_APP",
    description: "Smart attendance management for educational institutions",
    longDescription:
      "A mobile-first attendance tracking solution designed for schools and universities. Built with Flutter for cross-platform deployment, featuring offline support and intelligent reporting.",
    technologies: ["Flutter", "Dart", "SQLite", "Drift"],
    category: "mobile",
    github: "https://github.com/Z-Isaac08/ACE_APP",
    featured: true,
    year: "2024",
    role: "Mobile Developer",
    highlights: [
      "Cross-platform iOS and Android support with Flutter",
      "Offline-first architecture with local SQLite storage",
      "Automated attendance reports and analytics",
      "QR code-based check-in system",
    ],
  },
  {
    id: "industry-4",
    title: "Industry 4.0 - Livestock AI",
    description: "AI-driven livestock optimization for sustainable farming",
    longDescription:
      "An innovative AI solution for livestock management that leverages machine learning to optimize feeding schedules, health monitoring, and resource allocation for sustainable farming practices.",
    technologies: ["Python", "TensorFlow", "FastAPI", "PostgreSQL"],
    category: "ai",
    featured: true,
    year: "2023",
    role: "Team Lead & AI Developer",
    highlights: [
      "Led a team of 4 developers in agile methodology",
      "Implemented predictive models for livestock health monitoring",
      "Reduced resource waste by 30% through optimized scheduling",
      "Integrated real-time sensor data processing",
    ],
  },
  {
    id: "e-docs",
    title: "E-Docs",
    description: "Digital library and documentation management system",
    longDescription:
      "A modern documentation platform designed for educational institutions, featuring advanced search capabilities, version control, and collaborative editing features.",
    technologies: ["React", "Node.js", "MongoDB", "Elasticsearch"],
    category: "web",
    github: "https://github.com/Z-Isaac08/E-Docs",
    featured: false,
    year: "2023",
    role: "Full-Stack Developer",
    highlights: [
      "Full-text search with Elasticsearch integration",
      "Document versioning and change tracking",
      "Role-based access control system",
      "RESTful API with comprehensive documentation",
    ],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    description: "Building responsive, accessible, and performant user interfaces",
    icon: Code2,
    skills: [
      { name: "React / Next.js", level: 5 },
      { name: "TypeScript", level: 4 },
      { name: "Tailwind CSS", level: 5 },
      { name: "Framer Motion", level: 4 },
      { name: "HTML5 / CSS3", level: 5 },
    ],
  },
  {
    id: "mobile",
    title: "Mobile Development",
    description: "Cross-platform mobile applications with native performance",
    icon: Smartphone,
    skills: [
      { name: "Flutter / Dart", level: 5 },
      { name: "SQLite / Drift", level: 4 },
      { name: "State Management", level: 4 },
      { name: "Native APIs", level: 3 },
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    description: "Scalable APIs and robust server-side architectures",
    icon: Database,
    skills: [
      { name: "Node.js / Express", level: 4 },
      { name: "NestJS", level: 3 },
      { name: "FastAPI / Python", level: 4 },
      { name: "PostgreSQL / MySQL", level: 4 },
      { name: "Redis", level: 3 },
    ],
  },
  {
    id: "security",
    title: "Cybersecurity",
    description: "Secure development practices and vulnerability assessment",
    icon: Shield,
    skills: [
      { name: "Security Fundamentals", level: 4 },
      { name: "OWASP Top 10", level: 4 },
      { name: "Secure Coding", level: 4 },
      { name: "Network Security", level: 3 },
    ],
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    description: "Containerization, CI/CD, and cloud infrastructure",
    icon: Cloud,
    skills: [
      { name: "Docker", level: 4 },
      { name: "Git / GitHub", level: 5 },
      { name: "Firebase / Supabase", level: 4 },
      { name: "CI/CD Pipelines", level: 3 },
    ],
  },
  {
    id: "ai",
    title: "AI & Machine Learning",
    description: "Practical AI solutions and data-driven applications",
    icon: Brain,
    skills: [
      { name: "Python ML Stack", level: 3 },
      { name: "TensorFlow", level: 3 },
      { name: "Data Analysis", level: 4 },
      { name: "AI Integration", level: 3 },
    ],
  },
];

export const experiences: Experience[] = [
  {
    id: "esatic-4",
    title: "4th Year - Cybersecurity & AI Specialization",
    organization: "ESATIC - École Supérieure Africaine des TIC",
    period: "2024 - Present",
    description:
      "Specializing in advanced cybersecurity concepts and AI integration for security applications.",
    achievements: [
      "Focus on AI-driven security solutions",
      "Advanced cryptography and secure protocols",
      "Penetration testing and vulnerability assessment",
    ],
    type: "education",
  },
  {
    id: "esatic-1-3",
    title: "Network Systems & Telecommunications",
    organization: "ESATIC - École Supérieure Africaine des TIC",
    period: "2022 - 2024",
    description:
      "Comprehensive foundation in network architecture, systems administration, and software development.",
    achievements: [
      "Strong foundation in networking protocols",
      "Full-stack web and mobile development skills",
      "Database design and administration",
    ],
    type: "education",
  },
  {
    id: "industry-project",
    title: "Team Lead - Industry 4.0 Project",
    organization: "Academic Project",
    period: "2023",
    description:
      "Led a team in developing an AI-powered livestock optimization solution as part of an Industry 4.0 initiative.",
    achievements: [
      "Managed team of 4 developers using Agile methodology",
      "Delivered project 2 weeks ahead of schedule",
      "Achieved 30% resource optimization in testing",
    ],
    type: "project",
  },
  {
    id: "bac",
    title: "Baccalauréat Série C",
    organization: "Lycée Moderne Aboisso",
    period: "2021 - 2022",
    description:
      "Scientific baccalaureate with focus on mathematics and physics.",
    achievements: [
      "Strong mathematical and analytical foundation",
      "Physics and chemistry fundamentals",
    ],
    type: "education",
  },
];

export const heroStats = [
  { value: "3+", label: "Years Learning" },
  { value: "10+", label: "Projects Built" },
  { value: "5+", label: "Technologies" },
] as const;
