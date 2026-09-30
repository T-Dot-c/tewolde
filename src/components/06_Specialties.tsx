import { useState } from "react";
import { motion } from "framer-motion";
import { SPECIALTY_SERVICES, WORKFLOW_STEPS } from "./SpecialtiesData";

const INK = 'var(--ink, #050507)';
const MUTE = 'var(--muted, #71717a)';
const ACCENT = 'var(--accent, #ea580c)';
const CARD = 'var(--card, #ffffff)';
const CHIP = 'var(--chip, #f4f4f5)';
const BORDER = 'var(--line-faint, rgba(5,5,7,0.08))';

export default function Specialties() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  return (
    <section
      className="py-24 md:py-32 px-6"
      style={{ background: CARD, borderTop: `1px solid ${BORDER}` }}
      id="services"
    >
      <div className="max-w-[1200px] mx-auto space-y-16">
        {/* Section Header */}
        <div style={{ borderTop: `3px solid ${INK}`, paddingTop: 12 }} className="flex justify-between items-center mb-16">
          <span style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', color: INK, textTransform: 'uppercase' }}>
            What I Build
          </span>
          <span style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 11, fontWeight: 700, color: INK }}>03</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SPECIALTY_SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                className="group relative overflow-hidden flex flex-col justify-between"
                style={{
                  background: CARD,
                  border: `2px solid ${INK}`,
                  borderRadius: 14,
                  boxShadow: `6px 6px 0 ${INK}`,
                  height: 380,
                  padding: 32,
                  transition: 'box-shadow 0.2s',
                }}
              >
                {/* Main Content */}
                <div className="transition-all duration-300 group-hover:opacity-0 group-hover:scale-95 flex flex-col h-full justify-between text-center">
                  <div>
                    <div className="mx-auto w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: CHIP, border: `1px solid ${BORDER}` }}>
                      <Icon className="w-6 h-6" style={{ color: INK }} />
                    </div>
                    <h3 style={{ fontFamily: '"Bricolage Grotesque", Figtree, sans-serif', fontSize: 20, fontWeight: 800, color: INK, margin: 0 }}>
                      {service.title}
                    </h3>
                    <p style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 14, color: MUTE, lineHeight: 1.6, marginTop: 16, textAlign: 'justify' }}>
                      {service.description}
                    </p>
                  </div>
                  <div style={{ paddingTop: 16, borderTop: `1px solid ${BORDER}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 10, fontWeight: 700, color: MUTE, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                      {service.standard}
                    </span>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: ACCENT }} className="animate-pulse" />
                  </div>
                </div>

                {/* Tech Stack Hover Overlay */}
                <div
                  className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out flex flex-col justify-center z-20 text-left"
                  style={{ background: CARD, border: `2px solid ${INK}`, borderRadius: 14, padding: 32 }}
                >
                  <div style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 10, fontWeight: 700, color: INK, letterSpacing: '0.2em', textTransform: 'uppercase', borderBottom: `1px solid ${BORDER}`, paddingBottom: 8, marginBottom: 16 }}>
                    Technical Stack
                  </div>
                  <motion.div
                    initial={false}
                    animate={hoveredService === service.id ? "show" : "hidden"}
                    variants={{
                      show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
                      hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
                    }}
                    className="flex flex-wrap gap-3"
                  >
                    {service.techs.map((tech) => (
                      <motion.div
                        key={tech.name}
                        variants={{
                          show: { opacity: 1, y: 0, scale: 1 },
                          hidden: { opacity: 0, y: 10, scale: 0.8 },
                        }}
                        className="group/tag relative"
                      >
                        <div style={{ padding: 8, background: CHIP, border: `1px solid ${BORDER}`, borderRadius: 10, transition: 'all 0.2s' }}
                          className="hover:scale-110">
                          <img
                            src={`https://skillicons.dev/icons?i=${tech.key}`}
                            alt={tech.name}
                            className="w-8 h-8"
                          />
                        </div>
                        <span
                          className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/tag:opacity-100 transition-opacity whitespace-nowrap z-30 pointer-events-none"
                          style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 8, fontWeight: 700, background: INK, color: '#fff', borderRadius: 4, padding: '2px 6px' }}
                        >
                          {tech.name.toUpperCase()}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                  <div style={{ marginTop: 24, fontSize: 12, fontFamily: '"Figtree", system-ui, sans-serif', color: MUTE, lineHeight: 1.6, borderTop: `1px solid ${BORDER}`, paddingTop: 16 }}>
                    {service.hoverFooter}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Workflow Steps */}
        <div className="pt-20 space-y-12 text-left">
          <div style={{ borderTop: `3px solid ${INK}`, paddingTop: 12 }} className="flex justify-between items-center mb-16">
            <span style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', color: INK, textTransform: 'uppercase' }}>
              Workflow
            </span>
            <span style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 11, fontWeight: 700, color: INK }}>04</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {WORKFLOW_STEPS.map((item) => (
              <div
                key={item.step}
                className="relative group"
                style={{ background: CARD, border: `2px solid ${BORDER}`, borderRadius: 14, padding: 24, transition: 'border-color 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = INK; e.currentTarget.style.boxShadow = `4px 4px 0 ${INK}`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <span style={{ fontFamily: '"Bricolage Grotesque", Figtree, sans-serif', fontSize: 32, fontWeight: 800, color: BORDER, transition: 'color 0.2s' }}
                  className="group-hover:opacity-100">
                  0{item.step}
                </span>
                <h4 style={{ fontFamily: '"Bricolage Grotesque", Figtree, sans-serif', fontSize: 18, fontWeight: 800, color: INK, margin: '8px 0 0' }}>
                  {item.title}
                </h4>
                <p style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 13, color: MUTE, lineHeight: 1.6, marginTop: 8 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
