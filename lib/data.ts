import {
  Brain,
  Code2,
  Database,
  Server,
  Shield,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: "web" | "ai" | "security" | "network";
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
    id: "mamaci",
    title: "MamaCi",
    description:
      "Application mobile de santé maternelle et infantile (1er Prix Hackathon JDN)",
    longDescription: "",
    technologies: ["React Native", "Node.js", "Chatbot", "CMU API"],
    category: "web",
    github: "https://github.com/Z-Isaac08/MamaCI",
    featured: true,
    year: "2026",
    role: "Developer & Hackathon Winner",
    highlights: [],
  },
  {
    id: "studyspace",
    title: "StudySpace",
    description: "Collaborative study platform",
    longDescription: "",
    technologies: ["Next.js", "Supabase", "Tailwind CSS", "Liveblocks"],
    category: "web",
    github: "https://github.com/Z-Isaac08/studyspace",
    featured: true,
    year: "2024",
    role: "Full-Stack Developer",
    highlights: [],
  },
  {
    id: "akiba-hub",
    title: "AkibaHub",
    description: "Economic intelligence platform",
    longDescription: "",
    technologies: ["React", "NestJS", "FastAPI", "PostgreSQL"],
    category: "web",
    featured: true,
    year: "2025",
    role: "Full-Stack Developer",
    highlights: [],
  },
  {
    id: "xpense",
    title: "Xpense",
    description: "Real-time expense tracking with intelligent categorization",
    longDescription:
      "A comprehensive expense management solution built with ReactJS and Firebase. Features real-time synchronization across devices, automated expense categorization, and insightful financial analytics.",
    technologies: ["React", "Firebase", "Tailwind CSS", "Chart.js"],
    category: "web",
    github: "https://github.com/Z-Isaac08/X-PENSE-APP",
    live: "https://x-pense-app.vercel.app",
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
    id: "networking-lab",
    title: "Networking Lab - DHCPv4 & SLAAC IPv6",
    description: "Comparative analysis of IPv4 and IPv6 addressing mechanisms",
    longDescription:
      "A comprehensive networking lab simulating and comparing stateful DHCPv4 and stateless SLAAC IPv6 mechanisms in a virtualized environment. Features deep packet analysis to observe protocol transitions and security implications.",
    technologies: ["VMware", "Ubuntu", "Wireshark", "IPv6", "DHCPv4", "ICMPv6"],
    category: "network",
    github: "https://github.com/Z-Isaac08/ipv4-ipv6-addressing-labs.git",
    featured: true,
    year: "2025",
    role: "Network Analyst",
    highlights: [
      "Simulated DHCPv4 Stateful and SLAAC IPv6 Stateless mechanisms",
      "Deep packet analysis using Wireshark and tshark",
      "Analyzed transition from ARP to Neighbor Discovery Protocol (NDP)",
      "Documented IPv6 Privacy Extensions and Multicast transitions",
    ],
  },
  {
    id: "linux-adds",
    title: "Linux Infrastructure Services (ADDS)",
    description:
      "Centralized authentication and network services deployment on Debian",
    longDescription:
      "A robust enterprise-grade infrastructure deployment featuring an Active Directory-like environment on Linux. Includes centralized authentication with OpenLDAP and SSSD, integrated DNS/DHCP services, and a comprehensive backup strategy.",
    technologies: ["Debian", "OpenLDAP", "SSSD", "DNS", "DHCP", "VMWare"],
    category: "network",
    featured: true,
    year: "2026",
    role: "System Administrator",
    highlights: [
      "Implemented centralized identity management with OpenLDAP",
      "Configured unified authentication using SSSD",
      "Deployed integrated DNS and DHCP services",
      "Designed and implemented an automated backup strategy",
    ],
  },
  {
    id: "pl-inference",
    title: "Premier League Performance Inference",
    description:
      "Inferential analysis of factors determining football match results",
    longDescription:
      "Statistical analysis project using Multinomial Logistic Regression to understand factors influencing PL match outcomes, focusing on efficiency, level, and discipline.",
    technologies: ["Python", "Pandas", "Scikit-learn", "Logistic Regression"],
    category: "ai",
    github: "https://github.com/Z-Isaac08/PL-Performance-Inference",
    featured: true,
    year: "2026",
    role: "Data Scientist",
    highlights: [
      "Built Multinomial Logistic Regression model with 57.85% accuracy",
      "Quantified impact of efficiency on victory probability",
      "Conducted significance tests using P-values and Odds Ratios",
      "Data cleaning and feature engineering on 2019-2025 sports data",
    ],
  },
  {
    id: "wine-analysis",
    title: "Wine Sales Data Analysis",
    description:
      "Data reconciliation and sales performance analysis for a wine merchant",
    longDescription:
      "Infrastructure transformation through ERP/CMS data reconciliation, outlier detection, and product segmentation.",
    technologies: [
      "Python",
      "Pandas",
      "Matplotlib",
      "K-Means",
      "Linear Regression",
    ],
    category: "ai",
    github: "https://github.com/Z-Isaac08/wine-sales-analysis",
    featured: false,
    year: "2025",
    role: "Data Analyst",
    highlights: [
      "Reconciled disconnected ERP and CMS datasets",
      "Detected price outliers using Z-score and IQR methods",
      "Segmented product profiles using K-Means Clustering",
      "Modeled price-sales relationships via Linear Regression",
    ],
  },
  {
    id: "e-docs",
    title: "E-Docs",
    description: "Digital library and documentation management system",
    longDescription:
      "A modern documentation platform designed for educational institutions, featuring advanced search capabilities, version control, and collaborative editing features.",
    technologies: ["React", "Node.js", "Elasticsearch", "Docker"],
    category: "web",
    featured: false,
    year: "2024",
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
    id: "frontend",
    title: "Frontend Engineering",
    description:
      "Building responsive, accessible, and performant user interfaces",
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
    id: "systems",
    title: "Systems & Infrastructure",
    description:
      "Network infrastructure, virtualization, and system administration",
    icon: Server,
    skills: [
      { name: "Virtualization", level: 4 },
      { name: "Linux Administration", level: 4 },
      { name: "Windows Server", level: 3 },
      { name: "Network Design & Configuration", level: 4 },
      { name: "Active Directory & Authentication", level: 3 },
    ],
  },
  {
    id: "data",
    title: "Data & Machine Learning",
    description:
      "Data analysis, statistical modeling, and machine learning solutions",
    icon: Brain,
    skills: [
      { name: "Python ML Stack", level: 3 },
      { name: "TensorFlow", level: 3 },
      { name: "Data Analysis", level: 4 },
      { name: "Statistical Modeling", level: 4 },
    ],
  },
  {
    id: "tools",
    title: "Tools & Methods",
    description:
      "Development tools, design systems, and collaborative workflows",
    icon: Wrench,
    skills: [
      { name: "Git / GitHub", level: 5 },
      { name: "Figma", level: 4 },
      { name: "Postman / API Testing", level: 4 },
      { name: "VS Code / Dev Tools", level: 5 },
      { name: "Wireshark", level: 4 },
      { name: "VMware", level: 4 },
    ],
  },
];

export const experiences: Experience[] = [
  {
    id: "mamaci-hackathon",
    title: "1er Prix - Hackathon JDN",
    organization: "Journées du Numérique (JDN)",
    period: "2026",
    description: "",
    achievements: [],
    type: "project",
  },
  {
    id: "esatic-4",
    title: "4th Year - Cybersecurity & AI Specialization",
    organization: "ESATIC - École Supérieure Africaine des TIC",
    period: "2025 - Present",
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
    id: "industry-project",
    title: "Team Lead - Industry 4.0 Project",
    organization: "Academic Project",
    period: "2025",
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
    id: "esatic-1-3",
    title: "Network Systems & Telecommunications",
    organization: "ESATIC - École Supérieure Africaine des TIC",
    period: "2022 - 2025",
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
