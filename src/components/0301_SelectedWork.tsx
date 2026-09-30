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
    },
    {
      number: "04",
      id: "trh-construction",
      displayTitle: "TRH Construction & Trading",
      desc: "A construction and trading company website built around six service areas and a photo-led project portfolio, designed to show the work with clarity and confidence.",
      year: "2026"
    }
  ];

  const handleRowClick = (projectId: string) => {
    const proj = PROJECTS.find((p) => p.id === projectId);
    if (proj) {
      onSelectProject(proj);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-20px" },
    transition: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }
  };

  return (
    <section className="py-24 px-6 md:px-12 border-b transition-colors duration-300" style={{ background: 'var(--bg, #ffffff)', color: 'var(--ink, #050507)', borderColor: 'var(--line-faint, rgba(5,5,7,0.08))' }} id="selected-work">
      <div className="max-w-[1200px] mx-auto space-y-12">
        {/* Header grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-6">
          <motion.div
            {...fadeInUp}
            className="lg:col-span-7 space-y-3"
          >
            <span style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', color: 'var(--muted, #71717a)', textTransform: 'uppercase', display: 'block' }}>
              SELECTED WORK
            </span>
            <h2 style={{ fontFamily: '"Bricolage Grotesque", Figtree, sans-serif', fontSize: 'clamp(2.6rem, 6vw, 4.8rem)', fontWeight: 800, letterSpacing: '-0.035em', color: 'var(--ink, #050507)', margin: 0, lineHeight: 1.05 }}>
              Things I've built.
            </h2>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.15 }}
            className="lg:col-span-5 lg:pt-8 flex flex-col items-start lg:items-end gap-3"
          >
            <p style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 14, lineHeight: 1.65, color: 'var(--muted, #71717a)', maxWidth: 420 }} className="lg:text-right lg:ml-auto">
              A small selection of client and personal projects — from healthcare websites to corporate platforms and React applications.
            </p>
            <a
              href="#"
              style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent, #ea580c)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, transition: 'opacity 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              view insights
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Projects Rows List */}
        <div style={{ borderTop: '1px solid var(--line-faint, rgba(5,5,7,0.08))' }}>
          {localProjectsData.map((item, index) => (
            <motion.div
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: index * 0.1 }}
              key={item.id}
              onClick={() => handleRowClick(item.id)}
              className="grid grid-cols-12 items-center gap-4 sm:gap-6 py-8 sm:py-10 group cursor-pointer px-3 sm:px-6 -mx-3 sm:-mx-6 rounded-xl transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/5"
              style={{ borderBottom: '1px solid var(--line-faint, rgba(5,5,7,0.08))' }}
            >
              {/* Row number */}
              <div className="col-span-1" style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 11, color: 'var(--muted, #71717a)', fontWeight: 600 }}>
                {item.number}
              </div>

              {/* Title Column */}
              <div className="col-span-11 md:col-span-5 pr-4">
                <h3
                  className="group-hover:translate-x-1.5 transition-all duration-300 truncate"
                  style={{ fontFamily: '"Bricolage Grotesque", Figtree, sans-serif', fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: 800, color: 'var(--ink, #050507)', margin: 0, transition: 'color 0.15s, transform 0.3s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent, #ea580c)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink, #050507)')}
                >
                  {item.displayTitle}
                </h3>
              </div>

              {/* Description Column */}
              <div className="col-span-12 md:col-span-5" style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 14, lineHeight: 1.65, color: 'var(--muted, #71717a)' }}>
                {item.desc}
              </div>

              {/* Year Column */}
              <div className="col-span-12 md:col-span-1 text-right" style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 12, color: 'var(--muted, #71717a)', fontWeight: 600 }}>
                {item.year}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
