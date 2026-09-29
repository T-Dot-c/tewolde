import { useState } from "react";
import { motion } from "framer-motion";
import { SPECIALTY_SERVICES, WORKFLOW_STEPS } from "./SpecialtiesData";

export default function Specialties() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 px-6 bg-white border-t border-zinc-200" id="services">
      <div className="max-w-[1200px] mx-auto space-y-16">
        <div className="border-t border-black pt-3 flex justify-between items-center mb-16">
          <span className="text-[11px] font-extrabold tracking-[0.25em] text-black uppercase font-mono">
            What I Build
          </span>
          <span className="text-[11px] font-extrabold text-black font-mono">03</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SPECIALTY_SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                className="group relative glass-card-interactive p-8 rounded-2xl border border-zinc-200 bg-white hover:border-black/30 transition-all duration-300 overflow-hidden flex flex-col justify-between h-[380px]"
              >
                {/* Main Content (fades on hover) */}
                <div className="transition-all duration-300 group-hover:opacity-0 group-hover:scale-95 flex flex-col h-full justify-between text-center">
                  <div>
                    <div className="mx-auto w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center text-black mb-6 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#050507] font-display">{service.title}</h3>
                    <p className="text-sm text-zinc-600 leading-relaxed mt-4 text-justify">{service.description}</p>
                  </div>
                  <div className="pt-4 border-t border-zinc-200 flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase">
                    <span>{service.standard}</span>
                    <div className="w-2 h-2 rounded-full bg-black shadow-[0_0_8px_rgba(0,0,0,0.4)] animate-pulse" />
                  </div>
                </div>

                {/* Tags Hover Overlay (slides up on hover) */}
                <div className="absolute inset-0 bg-white/98 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out flex flex-col justify-center z-20 border border-zinc-200 rounded-2xl backdrop-blur-xl text-left">
                  <div className="text-[10px] font-mono text-black mb-4 uppercase tracking-[0.2em] border-b border-zinc-200 pb-2 font-bold">
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
                        <div className="p-2 bg-black/5 border border-black/10 rounded-lg hover:border-black/30 hover:bg-black/10 hover:scale-110 transition-all duration-300">
                          <img
                            src={`https://skillicons.dev/icons?i=${tech.key}`}
                            alt={tech.name}
                            className="w-8 h-8"
                          />
                        </div>
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[8px] font-mono rounded opacity-0 group-hover/tag:opacity-100 transition-opacity whitespace-nowrap z-30 pointer-events-none font-bold">
                          {tech.name.toUpperCase()}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                  <div className="mt-6 text-xs text-zinc-600 font-mono leading-relaxed border-t border-zinc-200 pt-4">
                    {service.hoverFooter}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Development Process */}
        <div className="pt-20 space-y-12 text-left">
          <div className="border-t border-black pt-3 flex justify-between items-center mb-16">
            <span className="text-[11px] font-extrabold tracking-[0.25em] text-black uppercase font-mono">
              Workflow
            </span>
            <span className="text-[11px] font-extrabold text-black font-mono">04</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {WORKFLOW_STEPS.map((item) => (
              <div key={item.step} className="glass-card p-6 rounded-2xl border border-zinc-200 bg-white hover:border-black/20 transition-all duration-300 relative group">
                <span className="font-mono text-3xl font-extrabold text-black/10 group-hover:text-black/25 transition-colors duration-300">
                  0{item.step}
                </span>
                <h4 className="text-lg font-bold text-[#050507] font-display mt-2">{item.title}</h4>
                <p className="text-xs text-zinc-600 leading-relaxed mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
