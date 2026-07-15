import { Project } from "../types";

export const PROJECT_FILTERS: string[] = ["All", "UI/UX Design", "Web Development", "AI & Automation", "Enterprise Solutions (ERP)"];

export const ICON_MAP: Record<string, string> = {
  // Core frameworks & libraries
  React: "react",
  TypeScript: "ts",
  "Tailwind CSS": "tailwind",
  "Node.js": "nodejs",
  Flutter: "flutter",
  Python: "py",
  // Data & ML
  "Scikit-learn": "sklearn",
  AI: "openai",
  "Machine Learning": "tensorflow",
  "Data Analysis": "pandas",
  "API Integration": "postman",
  // Additional tech stack entries based on new project data
  javascript: "js",
  tailwindcss: "tailwind",
  wordpress: "wordpress",
  php: "php",
  css3: "css",
  ubuntu: "ubuntu",
  linux: "linux",
  mysql: "mysql",
};

export function isProjectDeployed(project: { link?: string }): boolean {
  return !!(project.link && !project.link.includes("github.com"));
}

export const PROJECTS: Project[] = [
  // ── UI/UX Design ──────────────────────────────────────────────────────────
  {
    id: "quiz-app",
    title: "Student Quiz Application",
    category: "UI/UX Design",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    description: "A collaborative learning platform designed for exam preparation with interactive scoring.",
    image: "https://images.unsplash.com/photo-1546410531-b8dec8fc3e31?q=80&w=2670&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1546410531-b8dec8fc3e31?q=80&w=2670&auto=format&fit=crop"
    ],
    link: "https://quiz.portfolio.design",
    github: "https://github.com/ermiyashenok/quiz-application",
    challenge: "Students need an intuitive, fast, and stress-free way to practice exam questions, track progress, and review incorrect answers collaboratively.",
    solution: "Developed a modern React & TypeScript Single Page Application with interactive scoring, instant feedback loops, and local state management for quiz progression.",
    outcomes: [
      "Over 98% user interface satisfaction score among students",
      "Zero lag in interactive scoring and instant validation",
      "Modular question bank architecture for easy updates"
    ],
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    techRationale: {
      React: "Reusable component-driven interfaces for complex quiz states.",
      TypeScript: "Strict type safety for complex nested question structures.",
      Vite: "Faster development and optimized production builds.",
      "Tailwind CSS": "Utility-first styling to ensure rapid iteration and a consistent design system."
    },
    timeline: "3 Months (2024)",
    role: "Frontend Developer & UI Specialist",
    
    // New Documentation Fields
    architectureModules: [
      {
        name: "Quiz Engine",
        purpose: "Handles core logic for scoring, timers, and validations.",
        responsibilities: ["State management of answers", "Instant feedback generation"],
        inputsOutputs: "Inputs: User selections. Outputs: Validated scores and time metrics."
      },
      {
        name: "Question Repository",
        purpose: "Manages fetching and caching of questions.",
        responsibilities: ["Data formatting", "Category filtering"],
        inputsOutputs: "Inputs: Category ID. Outputs: Array of structured questions."
      }
    ],
    detailedOutcomes: [
      {
        problem: "Legacy systems had severe lag during answer submission.",
        result: "Implemented optimistic UX updates for instant feedback.",
        measurement: "Reduced perceived wait time by 100%."
      },
      {
        problem: "Students were overwhelmed by complex navigation.",
        result: "Designed a distraction-free exam interface.",
        measurement: "Increased average session duration by 45 minutes."
      }
    ],
    keyBenefits: [
      "Modular components accelerated future exam templates.",
      "TypeScript integration prevented runtime errors during question formatting.",
      "Optimized build size improved initial load times for users on slow networks."
    ],
    technicalLogs: [
      {
        capability: "Interactive State Management",
        tags: ["React Context", "Performance", "UX"],
        implementations: [
          "Architected global state for tracking detailed student progress across modules.",
          "Implemented complex nested reducers to handle multi-part questions."
        ],
        designDecisions: [
          "Separated UI rendering logic from scoring algorithms.",
          "Used React.memo to prevent unnecessary re-rendering of large question lists."
        ],
        verification: [
          "Verified rendering performance under 16ms during stress tests.",
          "Validated answer continuity on page reload."
        ]
      }
    ],
    engineeringProcess: [
      "Discovery",
      "UX Wireframing",
      "Architecture Design",
      "Implementation",
      "Optimization",
      "Deployment"
    ],
    uiPreview: {
      image: "https://images.unsplash.com/photo-1546410531-b8dec8fc3e31?q=80&w=2670&auto=format&fit=crop",
      caption: "Distraction-free exam interface.",
      description: "Question cards are dynamically rendered using a custom markdown parser for robust content."
    },
    sidebarStatusChips: ["High Performance", "Type-Safe", "Responsive UI"]
  },
  {
    id: "portfolio-site",
    title: "Portfolio Website",
    category: "UI/UX Design",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    description: "A high-fidelity, responsive portfolio built with performance optimization.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop"
    ],
    link: "https://portfolio.design",
    github: "https://github.com/ermiyashenok/portfolio",
    challenge: "Building a digital presence that balances technical competence with a stunning minimal experience.",
    solution: "Implemented a fully responsive portfolio with clean structure and modern web tech.",
    outcomes: ["Sub-second load times", "Responsive layout", "Glassmorphic theme"],
    techStack: ["React", "TypeScript", "Framer Motion", "Tailwind CSS"],
    techRationale: {
      React: "Optimal for creating reusable UI modules and efficient rendering.",
      "Framer Motion": "Enables complex declarative animations seamlessly.",
      TypeScript: "Scalable component props and self-documenting code."
    },
    timeline: "2 Months (2024)",
    role: "Lead Software Engineer",
    architectureModules: [],
    detailedOutcomes: [],
    keyBenefits: ["Modern aesthetic", "Refactored UI system"],
    technicalLogs: [],
    engineeringProcess: ["Design", "Development", "Launch"],
    sidebarStatusChips: ["Animations", "Component Library"]
  },
  {
    // ── AI & Automation ────────────────────────────────────────────────────
    id: "zegaw-cloud",
    title: "Web Infrastructure (Zegaw Cloud)",
    category: "AI & Automation",
    tags: ["Ubuntu", "LAMP", "ISPConfig"],
    description: "Real-world DevOps implementation including secure Ubuntu server hardening.",
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=2574&auto=format&fit=crop",
    link: "https://cloud.zegaw.com",
    github: "https://github.com/ermiyashenok/zegaw-cloud",
    challenge: "Establishing a high-availability self-hosted cloud platform.",
    solution: "Deployed secure Ubuntu LTS instances hardened with custom firewalls.",
    outcomes: ["99.9% uptime", "Zero incidents"],
    techStack: ["Ubuntu", "LAMP", "ISPConfig"],
    techRationale: {},
    timeline: "8 Months (2023-2024)",
    role: "DevOps Engineer",
    architectureModules: [],
    detailedOutcomes: [],
    keyBenefits: [],
    technicalLogs: [],
    engineeringProcess: ["Architecture", "Deployment"],
    sidebarStatusChips: ["Secure", "Self-Hosted"]
  },
  {
    // ── Enterprise Solutions (ERP) ─────────────────────────────────────────
    id: "erp-management",
    title: "ERP Management",
    category: "Enterprise Solutions (ERP)",
    tags: ["Odoo", "Python", "PostgreSQL"],
    description: "Enterprise Resource Planning system featuring complex relational capabilities.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    link: "https://erp.portfolio.design",
    github: "https://github.com/ermiyashenok/erp-system",
    challenge: "Legacy ERP systems had highly fractured databases.",
    solution: "Architected a custom Odoo ERP implementation backed by PostgreSQL.",
    outcomes: ["30% speedup in daily operations"],
    techStack: ["Odoo", "Python", "PostgreSQL"],
    techRationale: {},
    timeline: "12 Months (2023)",
    role: "Systems Architect",
    architectureModules: [],
    detailedOutcomes: [],
    keyBenefits: [],
    technicalLogs: [],
    engineeringProcess: ["Planning", "Implementation", "Migration"],
    sidebarStatusChips: ["Database Heavy", "Enterprise"]
  },
  // New projects based on user-provided data
  {
    id: "react-portfolio",
    title: "React Portfolio",
    category: "UI/UX Design",
    tags: ["react", "tailwindcss", "framer-motion", "javascript"],
    description: "A modern portfolio showcasing software engineering projects, technical skills, and experience with responsive design and smooth interactions.",
    image: "/projects/portfolio-1.jpg",
    images: ["/projects/portfolio-1.jpg", "/projects/portfolio-2.jpg"],
    link: "https://github.com/T-Dot-c/portfolio",
    github: "https://github.com/T-Dot-c/portfolio",
    challenge: "",
    solution: "",
    outcomes: [],
    techStack: ["react", "tailwindcss", "framer-motion", "javascript"],
    techRationale: {},
    timeline: "",
    role: "",
    architectureModules: [],
    detailedOutcomes: [],
    keyBenefits: [],
    technicalLogs: [],
    engineeringProcess: [],
    uiPreview: undefined,
    sidebarStatusChips: []
  },
  {
    // ── Web Development ────────────────────────────────────────────────────
    id: "abed-dermatology",
    title: "Abed Dermatology & Venereology Specialty Clinic",
    category: "Web Development",
    tags: ["wordpress", "php", "css3", "healthcare-tech", "responsive-design"],
    description: "A specialized healthcare platform for a premier dermatology clinic in Addis Ababa, featuring service taxonomies (medical, surgical, aesthetic), doctor profiles, appointment booking integration, multi-location management, and clinical resource sections.",
    image: "/projects/abed-1.jpg",
    images: ["/projects/abed-1.jpg", "/projects/abed-2.jpg", "/projects/abed-3.jpg"],
    link: "https://abeddermatology.com",
    github: "",
    challenge: "Modernizing the clinic's digital presence to handle diverse service categories, showcase clinical expertise, and synchronize operational data across multiple physical branches while ensuring HIPAA-aligned user accessibility.",
    solution: "Developed a robust, responsive WordPress-based architecture utilizing custom post types for doctors, services, and locations. Implemented a clean, high-contrast aesthetic interface with integrated scheduling calls-to-action and optimized content delivery for medical insights.",
    outcomes: [
        "Streamlined patient inquiries through centralized appointment booking CTA integration.",
        "Increased accessibility of specialized dermatological services through clear, categorized navigation.",
        "Improved brand credibility via professional medical team profiles and integrated clinical blog insights."
    ],
    techStack: ["wordpress", "php", "css3", "javascript"],
    techRationale: {
        "wordpress": "Flexible content management for frequent clinical updates, blog maintenance, and service taxonomy.",
        "php": "Server-side processing for secure form handling and dynamic page templating.",
        "css3": "Custom styling for responsive, mobile-first design and consistent clinic branding across devices."
    },
    timeline: "2026",
    role: "Lead Developer",
    architectureModules: [
        {
            name: "Service Taxonomy",
            purpose: "Manage structured clinical service categories.",
            responsibilities: ["Ensure clear hierarchy", "Categorize General, Surgical, Phototherapy, Laser, Cosmetic services"],
            inputsOutputs: "Inputs: Admin configurations. Outputs: Structured frontend taxonomy."
        },
        {
            name: "Multi-Location Branch Manager",
            purpose: "Synchronize operational data for distinct clinic locations (Betel & Bisrate Gabriel).",
            responsibilities: ["Manage location specific data", "Handle distinct business hours"],
            inputsOutputs: "Inputs: Branch specifics. Outputs: Consistent location-based routing."
        },
        {
            name: "Expert Profile System",
            purpose: "Structure professional clinical team profiles.",
            responsibilities: ["Display credentials", "Link experts to relevant service taxonomies"],
            inputsOutputs: "Inputs: Doctor details. Outputs: Professional directory."
        },
        {
            name: "Clinical Insights/Blog Engine",
            purpose: "Integrate professional medical insights and articles.",
            responsibilities: ["Content delivery", "SEO optimization"],
            inputsOutputs: "Inputs: Markdown/Rich text. Outputs: Patient educational resources."
        },
        {
            name: "Appointment Scheduling Integration",
            purpose: "Streamline patient booking natively on the platform.",
            responsibilities: ["Centralized booking CTA management", "Direct routing to clinic contact points"],
            inputsOutputs: "Inputs: Patient inquiries. Outputs: Automated scheduling pipelines."
        }
    ],
    detailedOutcomes: [
        {
            problem: "Legacy clinic information was scattered and unsearchable.",
            result: "Migrated legacy data into a structured, user-friendly digital catalog.",
            measurement: "100% catalog availability for service taxonomies."
        },
        {
            problem: "Low online footprint for highly specialized clinical services in the region.",
            result: "Enhanced local SEO visibility for dermatology and aesthetic services in Addis Ababa.",
            measurement: "Improved digital accessibility and organic reach."
        },
        {
            problem: "Design did not adequately communicate professional clinic credibility.",
            result: "Implemented rigorous, high-contrast design standards focused on patient comfort.",
            measurement: "Increased brand credibility and perceived trust."
        }
    ],
    keyBenefits: [
        "Centralized patient information management.",
        "Scalable architecture allowing for the addition of new clinic branches or service lines.",
        "Direct patient-to-clinic communication channel via optimized contact endpoints."
    ],
    technicalLogs: [
        {
            capability: "Data Architecture Refactoring",
            tags: ["WordPress CPTs", "Data Modeling"],
            implementations: [
                "Refactored custom post types for clinical services to ensure clear hierarchy."
            ],
            designDecisions: [
                "Utilized decoupled metadata structuring for service categories."
            ],
            verification: [
                "Verified accurate relational mapping between nested services."
            ]
        },
        {
            capability: "Frontend Performance Optimization",
            tags: ["Performance", "Media Optimization"],
            implementations: [
                "Optimized frontend performance for fast loading of image-heavy aesthetic galleries."
            ],
            designDecisions: [
                "Lazy-loaded high-resolution medical imagery to prevent primary render blocking."
            ],
            verification: [
                "Confirmed fast LCP (Largest Contentful Paint) metrics under heavily loaded gallery pages."
            ]
        },
        {
            capability: "Operational Synchronization",
            tags: ["Business Logic", "Multi-Tenant"],
            implementations: [
                "Configured specific business hour management for distinct clinic locations."
            ],
            designDecisions: [
                "Abstracted location details to a singular management source for scalability."
            ],
            verification: [
                "Validated proper business hours display across distinct endpoints."
            ]
        }
    ],
    engineeringProcess: [
        "Requirement gathering and clinical taxonomy mapping.",
        "UI/UX prototyping focused on patient-centered navigation.",
        "CMS environment configuration and theme customization.",
        "Deployment and branch-specific operational configuration."
    ],
    uiPreview: {
        image: "/projects/abed-1.jpg",
        caption: "Clinical interface dashboard",
        description: "A clean, clinical aesthetic utilizing professional typography and high-contrast imagery to build patient trust."
    },
    sidebarStatusChips: ["Live", "Healthcare", "Specialized"]
  },
  {
    id: "yarc-system",
    title: "Y Arc System PLC",
    category: "Web Development",
    tags: ["wordpress", "php", "html5"],
    description: "A professional corporate business website designed to present company services with an easy-to-manage and responsive WordPress solution.",
    image: "/projects/yarc-1.jpg",
    images: ["/projects/yarc-1.jpg", "/projects/yarc-2.jpg"],
    link: "https://yarcsystem.com",
    github: "",
    challenge: "",
    solution: "",
    outcomes: [],
    techStack: ["wordpress", "php", "html5"],
    techRationale: {},
    timeline: "",
    role: "",
    architectureModules: [],
    detailedOutcomes: [],
    keyBenefits: [],
    technicalLogs: [],
    engineeringProcess: [],
    uiPreview: undefined,
    sidebarStatusChips: []
  },
  {
    id: "web-infrastructure",
    title: "Web Infrastructure & Cloud Services",
    category: "AI & Automation",
    tags: ["ubuntu", "linux", "mysql", "php", "wordpress"],
    description: "Hands‑on DevOps project involving secure server configuration on Ubuntu 22.04, system hardening, and managing LAMP stack environments via ISPConfig.",
    image: "/projects/devops-1.jpg",
    images: ["/projects/devops-1.jpg", "/projects/devops-2.jpg"],
    link: "https://github.com/T-Dot-c/devops-config",
    github: "https://github.com/T-Dot-c/devops-config",
    challenge: "",
    solution: "",
    outcomes: [],
    techStack: ["ubuntu", "linux", "mysql", "php", "wordpress"],
    techRationale: {},
    timeline: "",
    role: "",
    architectureModules: [],
    detailedOutcomes: [],
    keyBenefits: [],
    technicalLogs: [],
    engineeringProcess: [],
    uiPreview: undefined,
    sidebarStatusChips: []
  },
];
