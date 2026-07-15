import { motion } from "framer-motion";
import { PROJECTS } from "./ProjectsData";
import { Project } from "../types";

interface SelectedWorkProps {
  onSelectProject: (project: Project) => void;
}

export default function SelectedWork({ onSelectProject }: SelectedWorkProps) {
  // Find project data from ProjectsData mapping
  const localProjectsData = [
    {
      number: "01",
      id: "react-portfolio",
      displayTitle: "Personal Portfolio",
      desc: "A modern, responsive portfolio site built with React and Tailwind CSS, showcasing engineering projects with smooth, deliberate interactions.",
      year: "2026"
    },
    {
      number: "02",
      id: "abed-dermatology",
      displayTitle: "Abed Dermatology & Venereology Specialty Clinic",
      desc: "A professional healthcare website with structured services, doctor profiles, and patient resources — designed for clarity and trust.",
      year: "2025"
    },
    {
      number: "03",
      id: "yarc-system",
      displayTitle: "Y Arc System PLC",
      desc: "A corporate business site presenting company services through an easy-to-manage, professional platform.",
      year: "2025"
    }
  ];

  const handleRowClick = (projectId: string) => {
    const proj = PROJECTS.find((p) => p.id === projectId);
    if (proj) {
      onSelectProject(proj);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 35 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-cream text-ink border-b border-token-border" id="selected-work">
      <div className="max-w-[1200px] mx-auto space-y-12">
        {/* Header grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-6">
          <motion.div
            {...fadeInUp}
            className="lg:col-span-7 space-y-3"
          >
            <span className="text-[11px] font-mono tracking-[0.25em] text-muted-foreground uppercase block font-semibold">
              SELECTED WORK
            </span>
            <h2 className="font-display text-5xl md:text-6xl font-extrabold tracking-tight text-ink">
              Things I've built.
            </h2>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.15 }}
            className="lg:col-span-5 lg:pt-8 flex flex-col items-start lg:items-end gap-3"
          >
            <p className="text-[14px] sm:text-[15px] leading-relaxed text-muted-foreground font-sans max-w-md lg:text-right lg:ml-auto">
              A small selection of client and personal projects — from healthcare websites to corporate platforms and React applications.
            </p>
            <a
              href="#"
              className="text-xs font-mono uppercase tracking-widest text-ember hover:text-ember/80 hover:underline flex items-center gap-1.5 transition-colors duration-250 focus:outline-none"
            >
              view insights
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Projects Rows List */}
        <div className="border-t border-token-border divide-y divide-token-border">
          {localProjectsData.map((item, index) => (
            <motion.div
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: index * 0.1 }}
              key={item.id}
              onClick={() => handleRowClick(item.id)}
              className="grid grid-cols-12 items-center gap-4 sm:gap-6 py-8 sm:py-10 group cursor-pointer hover:bg-secondary-muted/30 px-3 sm:px-6 -mx-3 sm:-mx-6 rounded-xl transition-all duration-300"
            >
              {/* Row number */}
              <div className="col-span-1 text-[11px] sm:text-xs font-mono text-muted-foreground">
                {item.number}
              </div>

              {/* Title Column */}
              <div className="col-span-11 md:col-span-5 pr-4">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-ink group-hover:text-ember group-hover:translate-x-1.5 transition-all duration-300 truncate">
                  {item.displayTitle}
                </h3>
              </div>

              {/* Description Column */}
              <div className="col-span-12 md:col-span-5 text-[13px] sm:text-[14px] leading-relaxed text-muted-foreground font-sans">
                {item.desc}
              </div>

              {/* Year Column */}
              <div className="col-span-12 md:col-span-1 text-right text-xs sm:text-sm font-mono text-muted-foreground">
                {item.year}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
