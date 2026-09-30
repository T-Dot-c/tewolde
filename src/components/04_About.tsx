import React from "react";
import { motion } from "framer-motion";

const INK = 'var(--ink, #050507)';
const MUTE = 'var(--muted, #71717a)';
const BG = 'var(--bg, #ffffff)';
const CHIP = 'var(--chip, #f4f4f5)';
const BORDER = 'var(--line-faint, rgba(5,5,7,0.08))';
const BORDER_SOLID = 'var(--line, rgba(5,5,7,0.12))';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-20px" },
  transition: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }
};

export default function About() {
  const frontendSkills = ["React", "JavaScript", "HTML5", "CSS3", "WordPress"];
  const backendSkills = ["Python", "Java", "C#", "C++"];
  const designSkills = ["Figma", "Wireframing", "UI/UX", "Prototyping"];

  const sectionStyle: React.CSSProperties = {
    background: BG,
    color: INK,
    padding: 'clamp(48px, 8vw, 96px) clamp(24px, 5vw, 64px)',
    borderTop: `1px solid ${BORDER}`,
  };

  return (
    <div id="about">
      {/* ── Section 1: Bio ── */}
      <section style={sectionStyle}>
        <div className="max-w-[1200px] mx-auto space-y-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Left */}
            <motion.div {...fadeInUp} className="lg:col-span-5 space-y-4">
              <span style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', color: MUTE, textTransform: 'uppercase', display: 'block' }}>
                ABOUT
              </span>
              <h2 style={{ fontFamily: '"Bricolage Grotesque", Figtree, sans-serif', fontSize: 'clamp(2.8rem, 6vw, 4.8rem)', fontWeight: 800, letterSpacing: '-0.035em', color: INK, lineHeight: 1.05, margin: 0 }}>
                A curious builder.
              </h2>
            </motion.div>

            {/* Right */}
            <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.2 }} className="lg:col-span-7 space-y-6">
              <p style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 'clamp(1rem, 2vw, 1.35rem)', color: INK, lineHeight: 1.65, fontWeight: 400, margin: 0 }}>
                I'm a graduated Computer Science professional with hands-on experience in web development. I'm passionate about building end-to-end products — from documentation to deployment — with a strong focus on user experience and scalable systems.
              </p>
              <p style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 'clamp(1rem, 2vw, 1.35rem)', color: INK, lineHeight: 1.65, fontWeight: 400, margin: 0 }}>
                I'm a collaborative team player who actively leverages AI tools to design, develop, and deliver impactful, business-driven solutions.
              </p>
            </motion.div>
          </div>

          {/* Metadata Row */}
          <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            style={{ paddingTop: 40, borderTop: `1px solid ${BORDER}` }}
          >
            {[
              { label: 'EDUCATION', title: 'B.Sc. Computer Science', sub: "St. Mary's University" },
              { label: 'BASED IN', title: 'Addis Ababa', sub: 'Ethiopia' },
              { label: 'FOCUS', title: 'Web Development', sub: 'React & WordPress' },
            ].map((item) => (
              <div key={item.label}>
                <span style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', color: MUTE, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                  {item.label}
                </span>
                <p style={{ fontFamily: '"Bricolage Grotesque", Figtree, sans-serif', fontSize: 18, fontWeight: 800, color: INK, margin: 0 }}>{item.title}</p>
                <p style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 14, color: MUTE, margin: '4px 0 0' }}>{item.sub}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Section 2: Skills ── */}
      <section style={sectionStyle}>
        <div className="max-w-[1200px] mx-auto space-y-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Left */}
            <motion.div {...fadeInUp} className="lg:col-span-5 space-y-4">
              <span style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', color: MUTE, textTransform: 'uppercase', display: 'block' }}>
                TOOLKIT
              </span>
              <h2 style={{ fontFamily: '"Bricolage Grotesque", Figtree, sans-serif', fontSize: 'clamp(2.8rem, 6vw, 4.8rem)', fontWeight: 800, letterSpacing: '-0.035em', color: INK, lineHeight: 1.05, margin: 0 }}>
                Skills &amp; tools.
              </h2>
            </motion.div>

            {/* Right — Skills columns */}
            <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.2 }}
              className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-12"
            >
              {[
                { label: 'FRONTEND', items: frontendSkills },
                { label: 'BACKEND', items: backendSkills },
                { label: 'DESIGN', items: designSkills },
              ].map((col) => (
                <div key={col.label} style={{ paddingTop: 16, borderTop: `1px solid ${BORDER}` }}>
                  <span style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', color: MUTE, textTransform: 'uppercase', display: 'block', marginBottom: 24 }}>
                    {col.label}
                  </span>
                  <div className="space-y-3">
                    {col.items.map((skill) => (
                      <div key={skill} className="flex items-baseline justify-between select-none group">
                        <span style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 18, color: INK, transition: 'transform 0.2s' }}
                          className="group-hover:translate-x-1">{skill}</span>
                        <div style={{ flexGrow: 1, borderBottom: `1px dotted ${BORDER_SOLID}`, margin: '0 8px 4px' }} />
                        <span style={{ color: MUTE, fontSize: 10 }}>.</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Certifications */}
          <motion.div {...fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pt-6">
            {[
              { title: 'Responsive Web Design', sub: 'FreeCodeCamp · ~300 hours' },
              { title: 'Foundations of Project Management', sub: 'Google · Coursera' },
            ].map((cert) => (
              <div key={cert.title}
                style={{ padding: 24, borderRadius: 14, border: `2px solid ${BORDER}`, background: CHIP, transition: 'box-shadow 0.2s, border-color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = INK; e.currentTarget.style.boxShadow = `4px 4px 0 ${INK}`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <span style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.25em', color: MUTE, textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>
                  CERTIFICATION
                </span>
                <h3 style={{ fontFamily: '"Bricolage Grotesque", Figtree, sans-serif', fontSize: 20, fontWeight: 800, color: INK, margin: 0 }}>{cert.title}</h3>
                <p style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 12, color: MUTE, margin: '8px 0 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{cert.sub}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Section 3: Experience ── */}
      <section style={sectionStyle}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Left */}
            <motion.div {...fadeInUp} className="lg:col-span-5 space-y-4">
              <span style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', color: MUTE, textTransform: 'uppercase', display: 'block' }}>
                EXPERIENCE
              </span>
              <h2 style={{ fontFamily: '"Bricolage Grotesque", Figtree, sans-serif', fontSize: 'clamp(2.8rem, 6vw, 4.8rem)', fontWeight: 800, letterSpacing: '-0.035em', color: INK, lineHeight: 1.05, margin: 0 }}>
                In the field.
              </h2>
            </motion.div>

            {/* Right */}
            <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.2 }} className="lg:col-span-7 space-y-8">
              <div style={{ paddingTop: 24, borderTop: `1px solid ${BORDER}` }}>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                  <div>
                    <div className="inline-block p-1 rounded-md bg-white/95 dark:bg-white/90 mb-2">
                      <img
                        src="https://zergaw.com/wp-content/uploads/2023/10/blue-by-black@4x.png"
                        alt="Zergaw Cloud"
                        style={{ height: 32, width: 'auto', display: 'block', objectFit: 'contain' }}
                      />
                    </div>
                    <p style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 13, color: MUTE, margin: '4px 0 0', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                      Web Infrastructure & Cloud Services
                    </p>
                  </div>
                </div>
                <ul style={{ margin: '32px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    'Gained hands-on experience in real-world client project lifecycles.',
                    'Performed WordPress site cloning and developed custom plugins and child themes.',
                  ].map((bullet) => (
                    <li key={bullet} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <span style={{ color: MUTE, fontWeight: 600, flexShrink: 0 }}>—</span>
                      <span style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 15, color: INK, lineHeight: 1.65 }}>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
