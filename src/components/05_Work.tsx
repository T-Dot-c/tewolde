import { motion, AnimatePresence } from "framer-motion";
import { Project } from "../types";
import ProjectCard from "./09_ProjectCard";
import { PROJECT_FILTERS } from "./ProjectsData";

interface WorkProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  filteredProjects: Project[];
  onSelectProject: (project: Project) => void;
}

export default function Work({
  activeFilter,
  setActiveFilter,
  filteredProjects,
  onSelectProject,
}: WorkProps) {
  return (
    <section className="py-24 md:py-32 px-6" id="work">
      <div className="max-w-[1200px] mx-auto space-y-12">
        {/* Header with Project Categories Filter */}
        <div className="border-t border-black pt-3 flex justify-between items-center mb-8">
          <span className="text-[11px] font-extrabold tracking-[0.25em] text-black uppercase font-mono">
            Portfolio
          </span>
          <span className="text-[11px] font-extrabold text-black font-mono">02</span>
        </div>

        {/* Interactive Filters */}
        <div className="flex flex-wrap gap-2.5">
          {PROJECT_FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg font-label-sm text-xs uppercase tracking-wider transition-all duration-300 ${activeFilter === filter
                  ? "bg-black text-white font-semibold shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
                  : "bg-black/5 text-zinc-600 border border-black/10 hover:border-black/25 hover:bg-black/10 hover:text-black"
                }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard
                  project={project}
                  onClick={() => onSelectProject(project)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
