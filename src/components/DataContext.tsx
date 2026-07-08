import React, { createContext, useState, ReactNode, useContext } from "react";
import { Project } from "../types";
import { PROJECTS, PROJECT_FILTERS } from "./ProjectsData";
import { SPECIALTY_SERVICES, WORKFLOW_STEPS, SpecialtyService, WorkflowStep } from "./SpecialtiesData";

// ----- Projects Context -----
interface ProjectsContextProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  filters: string[];
}

const ProjectsContext = createContext<ProjectsContextProps | undefined>(undefined);

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
};

// ----- Specialties Context -----
interface SpecialtiesContextProps {
  services: SpecialtyService[];
  setServices: React.Dispatch<React.SetStateAction<SpecialtyService[]>>;
  workflowSteps: WorkflowStep[];
  setWorkflowSteps: React.Dispatch<React.SetStateAction<WorkflowStep[]>>;
}

const SpecialtiesContext = createContext<SpecialtiesContextProps | undefined>(undefined);

export const useSpecialties = () => {
  const context = useContext(SpecialtiesContext);
  if (!context) {
    throw new Error("useSpecialties must be used within a SpecialtiesProvider");
  }
  return context;
};

// ----- Provider -----
interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [services, setServices] = useState<SpecialtyService[]>(SPECIALTY_SERVICES);
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>(WORKFLOW_STEPS);

  return (
    <ProjectsContext.Provider value={{ projects, setProjects, filters: PROJECT_FILTERS }}>
      <SpecialtiesContext.Provider
        value={{ services, setServices, workflowSteps, setWorkflowSteps }}
      >
        {children}
      </SpecialtiesContext.Provider>
    </ProjectsContext.Provider>
  );
};
