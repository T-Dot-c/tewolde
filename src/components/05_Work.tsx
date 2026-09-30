import { motion, AnimatePresence } from "framer-motion";
import { Project } from "../types";
import ProjectCard from "./09_ProjectCard";
import { PROJECT_FILTERS } from "./ProjectsData";

const INK = '#050507';
const MUTE = '#71717a';
const CHIP = '#f4f4f5';
const CHIP_BORDER = 'rgba(5,5,7,0.08)';

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
    <section className="py-24 md:py-32 px-6" style={{ background: '#ffffff' }} id="work">
      <div className="max-w-[1200px] mx-auto space-y-12">
        {/* Section Header */}
        <div style={{ borderTop: `3px solid ${INK}`, paddingTop: 12 }} className="flex justify-between items-center mb-8">
          <span style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', color: INK, textTransform: 'uppercase' }}>
            Portfolio
          </span>
          <span style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 11, fontWeight: 700, color: INK }}>02</span>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2.5">
          {PROJECT_FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{
                fontFamily: '"Figtree", system-ui, sans-serif',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '8px 16px',
                borderRadius: 8,
                border: activeFilter === filter ? `2px solid ${INK}` : `2px solid ${CHIP_BORDER}`,
                background: activeFilter === filter ? INK : CHIP,
                color: activeFilter === filter ? '#ffffff' : MUTE,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: activeFilter === filter ? `3px 3px 0 ${INK}` : 'none',
              }}
              onMouseEnter={e => {
                if (activeFilter !== filter) {
                  e.currentTarget.style.borderColor = INK;
                  e.currentTarget.style.color = INK;
                }
              }}
              onMouseLeave={e => {
                if (activeFilter !== filter) {
                  e.currentTarget.style.borderColor = CHIP_BORDER;
                  e.currentTarget.style.color = MUTE;
                }
              }}
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
