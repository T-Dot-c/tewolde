import { type LucideIcon, Code, Globe, Figma } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TechItem {
  name: string;
  key: string;
}

export interface SpecialtyService {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
  standard: string;
  techs: TechItem[];
  hoverFooter: string;
}

export interface WorkflowStep {
  step: string;
  title: string;
  description: string;
}

// ─── Specialty Service Cards ──────────────────────────────────────────────────

export const SPECIALTY_SERVICES: SpecialtyService[] = [
  {
    id: 1,
    icon: Figma,
    title: "UI/UX Design",
    description:
      "Focuses on the 'Strategy & Design' phase. Showcase ability to create wireframes and high-fidelity prototypes in Figma before writing code.",
    standard: "Standard: UX-First",
    techs: [
      { name: "Figma", key: "figma" },
      { name: "HTML5", key: "html" },
      { name: "CSS3", key: "css" },
    ],
    hoverFooter: "Figma · Wireframing · Prototyping · Design Systems",
  },
  {
    id: 2,
    icon: Globe,
    title: "WordPress Development",
    description:
      "Focuses on 'CMS & Web Ecosystem.' Highlights ability to build custom themes and plugins that provide clients with intuitive content management.",
    standard: "Standard: Custom UI",
    techs: [
      { name: "WordPress", key: "wordpress" },
      { name: "PHP", key: "php" },
      { name: "HTML5", key: "html" },
      { name: "CSS3", key: "css" },
    ],
    hoverFooter: "Custom Themes · Plugin Customization · Performance Optimization",
  },
  {
    id: 3,
    icon: Code,
    title: "Web Applications & Portfolios",
    description:
      "Focuses on 'Core Development.' Covers work with React, TypeScript, and Tailwind CSS to build high-performance, modern business tools and portfolios.",
    standard: "Standard: Enterprise",
    techs: [
      { name: "React", key: "react" },
      { name: "TypeScript", key: "ts" },
      { name: "Tailwind CSS", key: "tailwind" },
      { name: "JavaScript", key: "js" },
    ],
    hoverFooter: "React · TypeScript · Tailwind CSS · State Management",
  },
];

// ─── Workflow Steps ───────────────────────────────────────────────────────────

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: "1",
    title: "Research",
    description:
      "Understanding requirements, defining scope, and mapping user needs before any design or code begins.",
  },
  {
    step: "2",
    title: "UI/UX",
    description:
      "Wireframes, prototypes, and interaction design that balance aesthetics with usability.",
  },
  {
    step: "3",
    title: "Development",
    description:
      "Clean, maintainable code — React applications, WordPress sites, or backend integrations — built to the brief.",
  },
  {
    step: "4",
    title: "Deploy & Maintain",
    description:
      "Production deployment on configured Ubuntu Server infrastructure, with ongoing optimization and maintenance.",
  },
];
