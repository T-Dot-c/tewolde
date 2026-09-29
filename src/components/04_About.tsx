import { motion } from "framer-motion";

export default function About() {
  const frontendSkills = ["React", "JavaScript", "HTML5", "CSS3", "WordPress"];
  const backendSkills = ["Python", "Java", "C#", "C++"];
  const designSkills = ["Figma", "Wireframing", "UI/UX", "Prototyping"];

  // Animations configuration
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-20px" },
    transition: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }
  };

  return (
    <div id="about">
      {/* ── Section 1: About Bio & Metadata (Cream Background) ───────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-cream text-ink relative">
        <div className="max-w-[1200px] mx-auto space-y-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Left Column */}
            <motion.div 
              {...fadeInUp}
              className="lg:col-span-5 space-y-4"
            >
              <span className="text-[11px] font-mono tracking-[0.25em] text-muted-foreground uppercase block font-semibold">
                ABOUT
              </span>
              <h2 className="font-display text-5xl md:text-6xl font-extrabold tracking-tight text-ink leading-[1.1]">
                A curious builder.
              </h2>
            </motion.div>

            {/* Right Column */}
            <motion.div 
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
              className="lg:col-span-7 space-y-8 font-sans"
            >
              <p className="text-xl md:text-2xl text-ink/90 leading-relaxed font-light">
                I'm a graduated Computer Science professional with hands-on experience in web development. I'm passionate about building end-to-end products — from documentation to deployment — with a strong focus on user experience and scalable systems.
              </p>
              <p className="text-xl md:text-2xl text-ink/90 leading-relaxed font-light">
                I'm a collaborative team player who actively leverages AI tools to design, develop, and deliver impactful, business-driven solutions.
              </p>
            </motion.div>
          </div>

          {/* Bottom Row: Metadata info */}
          <motion.div 
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-token-border"
          >
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] text-muted-foreground uppercase block font-semibold mb-2">
                EDUCATION
              </span>
              <p className="font-display text-lg font-bold text-ink">
                B.Sc. Computer Science
              </p>
              <p className="text-sm text-muted-foreground font-sans mt-0.5">
                St. Mary's University
              </p>
            </div>
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] text-muted-foreground uppercase block font-semibold mb-2">
                BASED IN
              </span>
              <p className="font-display text-lg font-bold text-ink">
                Addis Ababa
              </p>
              <p className="text-sm text-muted-foreground font-sans mt-0.5">
                Ethiopia
              </p>
            </div>
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] text-muted-foreground uppercase block font-semibold mb-2">
                FOCUS
              </span>
              <p className="font-display text-lg font-bold text-ink">
                Web Development
              </p>
              <p className="text-sm text-muted-foreground font-sans mt-0.5">
                React & WordPress
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 2: Toolkit: Skills & Tools (Cream Background) ─────────────── */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-cream text-ink border-t border-token-border relative">
        <div className="max-w-[1200px] mx-auto space-y-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Left Column */}
            <motion.div 
              {...fadeInUp}
              className="lg:col-span-5 space-y-4"
            >
              <span className="text-[11px] font-mono tracking-[0.25em] text-muted-foreground uppercase block font-semibold">
                TOOLKIT
              </span>
              <h2 className="font-display text-5xl md:text-6xl font-extrabold tracking-tight text-ink leading-[1.1]">
                Skills & tools.
              </h2>
            </motion.div>

            {/* Right Column (Skills items list) */}
            <motion.div 
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
              className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-12"
            >
              {/* Frontend Column */}
              <div className="space-y-4">
                <div className="border-t border-token-border pt-4">
                  <span className="text-[11px] font-mono tracking-[0.25em] text-muted-foreground uppercase block font-semibold mb-6">
                    FRONTEND
                  </span>
                  <div className="space-y-3">
                    {frontendSkills.map((skill) => (
                      <div key={skill} className="flex items-baseline justify-between select-none group">
                        <span className="font-sans text-lg text-ink group-hover:translate-x-1 transition-transform duration-300">
                          {skill}
                        </span>
                        <div className="flex-grow border-b border-dotted border-token-border mx-2 mb-1" />
                        <span className="text-muted-foreground font-mono text-[10px]">.</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Backend Column */}
              <div className="space-y-4">
                <div className="border-t border-token-border pt-4">
                  <span className="text-[11px] font-mono tracking-[0.25em] text-muted-foreground uppercase block font-semibold mb-6">
                    BACKEND
                  </span>
                  <div className="space-y-3">
                    {backendSkills.map((skill) => (
                      <div key={skill} className="flex items-baseline justify-between select-none group">
                        <span className="font-sans text-lg text-ink group-hover:translate-x-1 transition-transform duration-300">
                          {skill}
                        </span>
                        <div className="flex-grow border-b border-dotted border-token-border mx-2 mb-1" />
                        <span className="text-muted-foreground font-mono text-[10px]">.</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Design Column */}
              <div className="space-y-4">
                <div className="border-t border-token-border pt-4">
                  <span className="text-[11px] font-mono tracking-[0.25em] text-muted-foreground uppercase block font-semibold mb-6">
                    DESIGN
                  </span>
                  <div className="space-y-3">
                    {designSkills.map((skill) => (
                      <div key={skill} className="flex items-baseline justify-between select-none group">
                        <span className="font-sans text-lg text-ink group-hover:translate-x-1 transition-transform duration-300">
                          {skill}
                        </span>
                        <div className="flex-grow border-b border-dotted border-token-border mx-2 mb-1" />
                        <span className="text-muted-foreground font-mono text-[10px]">.</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Certifications Sub-Grid */}
          <motion.div 
            {...fadeInUp}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pt-6"
          >
            {/* Cert 1 */}
            <div className="p-6 rounded-2xl border border-token-border bg-secondary-muted hover:shadow-md hover:border-token-border/90 transition-all duration-300">
              <span className="text-[10px] font-mono tracking-[0.25em] text-muted-foreground uppercase block font-semibold mb-3">
                CERTIFICATION
              </span>
              <h3 className="font-display text-lg md:text-xl font-bold text-ink">
                Responsive Web Design
              </h3>
              <p className="text-xs font-sans tracking-wide text-muted-foreground uppercase mt-2">
                FreeCodeCamp <span className="opacity-40">·</span> ~300 hours
              </p>
            </div>

            {/* Cert 2 */}
            <div className="p-6 rounded-2xl border border-token-border bg-secondary-muted hover:shadow-md hover:border-token-border/90 transition-all duration-300">
              <span className="text-[10px] font-mono tracking-[0.25em] text-muted-foreground uppercase block font-semibold mb-3">
                CERTIFICATION
              </span>
              <h3 className="font-display text-lg md:text-xl font-bold text-ink">
                Foundations of Project Management
              </h3>
              <p className="text-xs font-sans tracking-wide text-muted-foreground uppercase mt-2">
                Google <span className="opacity-40">·</span> Coursera
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 3: Experience: In the field (Cream Background, Ink Foreground) ─── */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-cream text-ink border-t border-token-border relative">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Left Column */}
            <motion.div 
              {...fadeInUp}
              className="lg:col-span-5 space-y-4"
            >
              <span className="text-[11px] font-mono tracking-[0.25em] text-muted-foreground uppercase block font-semibold">
                EXPERIENCE
              </span>
              <h2 className="font-display text-5xl md:text-6xl font-extrabold tracking-tight text-ink leading-[1.1]">
                In the field.
              </h2>
            </motion.div>

            {/* Right Column */}
            <motion.div 
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="border-t border-token-border pt-6">
                {/* Job Title Header Block */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-ink leading-tight">
                      Zegaw Cloud
                    </h3>
                    <p className="text-sm font-sans tracking-wide text-muted-foreground mt-1 uppercase font-semibold">
                      Web Infrastructure & Cloud Services
                    </p>
                  </div>
                  <span className="font-sans text-muted-foreground text-md sm:text-lg italic mt-1 sm:mt-0 font-medium">
                    Intern
                  </span>
                </div>

                {/* Bullets */}
                <ul className="space-y-4 mt-8 text-ink/90 font-sans text-[15px] sm:text-base leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="text-muted-foreground/60 font-semibold shrink-0">—</span>
                    <span>Gained hands-on experience in real-world client project lifecycles.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-muted-foreground/60 font-semibold shrink-0">—</span>
                    <span>Performed WordPress site cloning and developed custom plugins and child themes.</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
