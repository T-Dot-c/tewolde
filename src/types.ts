export interface ArchitectureModule {
  name: string;
  purpose: string;
  responsibilities: string[];
  inputsOutputs: string;
}

export interface DetailedOutcome {
  problem: string;
  result: string;
  measurement: string;
}

export interface TechnicalLog {
  capability: string;
  tags: string[];
  implementations: string[];
  designDecisions: string[];
  verification: string[];
}

export interface UIPreview {
  image: string;
  caption: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  description: string; // One-line description
  image: string;
  images?: string[];
  link?: string;
  github?: string;
  challenge: string; // Still useful for general overview, although we might rename it later
  solution: string;
  outcomes: string[];
  techStack: string[];
  techRationale: Record<string, string>; // Maps tech to rationale
  timeline: string;
  role: string;
  
  // New Documentation Fields
  architectureModules: ArchitectureModule[];
  detailedOutcomes: DetailedOutcome[];
  keyBenefits: string[];
  technicalLogs: TechnicalLog[];
  engineeringProcess: string[];
  uiPreview?: UIPreview;
  sidebarStatusChips: string[]; // E.g., "RBAC Enabled", "Responsive UI"
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}
