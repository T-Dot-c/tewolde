import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Github,
  Clock,
  User,
  Layers,
  CheckCircle,
  ChevronRight,
  Cpu,
  BarChart2,
  Monitor,
  Smartphone,
  ArrowUpRight,
  Zap,
  Shield,
  Box,
} from "lucide-react";
import { Project } from "../types";
import { ICON_MAP } from "./ProjectsData";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

// ─── Animation Variants ────────────────────────────────────────────────────────
const pageVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", damping: 38, stiffness: 320, mass: 0.9 },
  },
  exit: {
    y: "100%",
    opacity: 0,
    transition: { duration: 0.35, ease: [0.4, 0, 1, 1] },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

// ─── Helper: Device Preview Frame ──────────────────────────────────────────────
function DevicePreview({
  src,
  image,
  alt,
  type,
}: {
  src?: string;
  image?: string;
  alt: string;
  type: "desktop" | "mobile";
}) {
  const [iframeError, setIframeError] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isLive = src && !src.includes("github.com") && !iframeError;

  // Attempt to detect iframe block via timeout
  useEffect(() => {
    if (!isLive) return;
    const timer = setTimeout(() => {
      // If still not loaded after 4s, fallback
      if (!iframeLoaded) setIframeError(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, [isLive, iframeLoaded]);

  const isDesktop = type === "desktop";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`relative ${isDesktop ? "flex-[0_0_64%]" : "flex-[0_0_34%]"}`}
    >
      {/* Device frame label */}
      <div className="flex items-center gap-2 mb-3">
        {isDesktop ? (
          <Monitor className="w-3.5 h-3.5 text-zinc-400" />
        ) : (
          <Smartphone className="w-3.5 h-3.5 text-zinc-400" />
        )}
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">
          {isDesktop ? "Desktop Preview" : "Mobile Preview"}
        </span>
      </div>

      {/* Frame */}
      <div
        className={`relative overflow-hidden border border-zinc-200 bg-zinc-100 shadow-[0_8px_40px_rgba(5,5,7,0.08)]
          ${isDesktop ? "rounded-2xl aspect-[16/10]" : "rounded-3xl aspect-[9/18] max-w-[200px] mx-auto"}`}
      >
        {/* Browser chrome (desktop only) */}
        {isDesktop && (
          <div className="flex items-center gap-1.5 px-4 py-3 bg-white border-b border-zinc-100">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
            <div className="ml-3 flex-1 h-5 rounded-md bg-zinc-100 flex items-center px-2">
              <span className="text-[9px] text-zinc-400 font-mono truncate">
                {src || "localhost:5173"}
              </span>
            </div>
          </div>
        )}

        {/* Content area */}
        <div className={`relative ${isDesktop ? "device-content-desktop" : "h-full"}`}>
          {isLive && !iframeError ? (
            <>
              {!iframeLoaded && <PreviewPlaceholder label="Loading preview…" shimmer />}
              <iframe
                ref={iframeRef}
                src={src}
                title={`${alt} preview`}
                className={`w-full h-full border-0 transition-opacity duration-500 pointer-events-none ${
                  iframeLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setIframeLoaded(true)}
                onError={() => setIframeError(true)}
                sandbox="allow-scripts allow-same-origin"
              />
            </>
          ) : image ? (
            <img
              src={image}
              alt={alt}
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
          ) : (
            <PreviewPlaceholder label="Preview Unavailable" />
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Branded glass placeholder
function PreviewPlaceholder({ label, shimmer }: { label: string; shimmer?: boolean }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-200">
      {shimmer && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[shimmer_2s_infinite]" />
        </div>
      )}
      <div className="w-10 h-10 rounded-xl bg-white/80 border border-zinc-200 flex items-center justify-center">
        <Monitor className="w-5 h-5 text-zinc-300" />
      </div>
      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

// ─── Helper: Slide-Right CTA Link ──────────────────────────────────────────────
function CTALink({
  href,
  icon: Icon,
  label,
  variant = "primary",
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  variant?: "primary" | "secondary";
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest overflow-hidden transition-all duration-300
        ${
          variant === "primary"
            ? "bg-[#050507] text-white hover:bg-zinc-800 shadow-[0_2px_12px_rgba(5,5,7,0.2)] hover:shadow-[0_4px_20px_rgba(5,5,7,0.3)]"
            : "bg-white text-zinc-700 border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
        }`}
    >
      <Icon className="w-3.5 h-3.5 shrink-0" />
      {label}
      <ArrowUpRight
        className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
      />
    </a>
  );
}

// ─── Helper: Section Wrapper ───────────────────────────────────────────────────
function Section({
  index,
  title,
  subtitle,
  icon: Icon,
  children,
}: {
  index: number;
  title: string;
  subtitle?: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      custom={index}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="w-full"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-zinc-500" />
        </div>
        <div>
          <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 font-bold leading-none">
            {title}
          </h3>
          {subtitle && (
            <p className="text-[10px] text-zinc-400 mt-0.5 font-mono">{subtitle}</p>
          )}
        </div>
        <div className="flex-1 h-px bg-zinc-100 ml-2" />
      </div>
      {children}
    </motion.section>
  );
}

// ─── Helper: Metric Stat Card ──────────────────────────────────────────────────
function MetaPill({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1 px-4 py-3 rounded-xl bg-white border border-zinc-150 shadow-[0_1px_4px_rgba(5,5,7,0.04)]">
      <div className="flex items-center gap-1.5">
        <Icon className="w-3 h-3 text-zinc-400" />
        <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400">{label}</span>
      </div>
      <span className="text-sm font-semibold text-[#050507] leading-snug">{value}</span>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [project]);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Full-Page Panel */}
          <motion.article
            key="case-study"
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} case study`}
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-x-0 bottom-0 z-50 h-[96vh] bg-[#f5f5f7] rounded-t-3xl overflow-hidden flex flex-col shadow-[0_-12px_60px_rgba(5,5,7,0.18)]"
          >
            {/* ── TOP CHROME BAR ── */}
            <div className="shrink-0 flex items-center justify-center pt-3 pb-1">
              <div className="w-12 h-1 rounded-full bg-zinc-300" />
            </div>

            {/* ── SCROLLABLE CONTENT ── */}
            <div className="flex-1 overflow-y-auto overscroll-contain scroll-smooth">

              {/* ═══════════════════════════════════════════════
                  HERO HEADER
              ═══════════════════════════════════════════════ */}
              <motion.header
                custom={0}
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                className="relative px-8 md:px-16 pt-8 pb-10 border-b border-zinc-200 bg-white/60 backdrop-blur-xl"
              >
                {/* Close button */}
                <button
                  onClick={onClose}
                  aria-label="Close case study"
                  className="absolute top-6 right-8 p-2 rounded-xl hover:bg-zinc-100 transition-colors group"
                >
                  <X className="w-5 h-5 text-zinc-400 group-hover:text-zinc-700 transition-colors" />
                </button>

                {/* Category + chips */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.25em]">
                    {project.category}
                  </span>
                  {project.sidebarStatusChips?.map((chip) => (
                    <span
                      key={chip}
                      className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200 uppercase tracking-wider"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="font-headline-lg text-[#050507] leading-tight max-w-3xl mb-3">
                  {project.title}
                </h2>

                {/* Description */}
                <p className="text-base text-zinc-500 max-w-2xl leading-relaxed mb-8">
                  {project.description}
                </p>

                {/* CTA + Meta row */}
                <div className="flex flex-wrap items-center gap-4">
                  {/* CTA links */}
                  <div className="flex flex-wrap items-center gap-3">
                    {project.link && !project.link.includes("github.com") && (
                      <CTALink
                        href={project.link}
                        icon={ExternalLink}
                        label="Live Site"
                        variant="primary"
                      />
                    )}
                    {project.github && (
                      <CTALink
                        href={project.github}
                        icon={Github}
                        label="GitHub"
                        variant="secondary"
                      />
                    )}
                  </div>

                  {/* Divider */}
                  <div className="hidden md:block w-px h-8 bg-zinc-200" />

                  {/* Meta pills */}
                  <div className="flex flex-wrap gap-3">
                    {project.timeline && (
                      <MetaPill icon={Clock} label="Timeline" value={project.timeline} />
                    )}
                    {project.role && (
                      <MetaPill icon={User} label="Role" value={project.role} />
                    )}
                    {project.techStack?.length > 0 && (
                      <MetaPill
                        icon={Layers}
                        label="Stack"
                        value={`${project.techStack.length} technologies`}
                      />
                    )}
                  </div>
                </div>
              </motion.header>

              {/* ═══════════════════════════════════════════════
                  SECTION 1 — DUAL-DEVICE PREVIEW
              ═══════════════════════════════════════════════ */}
              <div className="px-8 md:px-16 py-12 border-b border-zinc-150 bg-gradient-to-b from-zinc-50 to-[#f5f5f7]">
                <motion.div
                  custom={1}
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  className="flex gap-6 items-start"
                >
                  {/* Desktop preview */}
                  <DevicePreview
                    src={project.link && !project.link.includes("github.com") ? project.link : undefined}
                    image={project.uiPreview?.image ?? project.image}
                    alt={project.title}
                    type="desktop"
                  />

                  {/* Mobile preview */}
                  <DevicePreview
                    src={project.link && !project.link.includes("github.com") ? project.link : undefined}
                    image={project.uiPreview?.image ?? project.image}
                    alt={`${project.title} mobile`}
                    type="mobile"
                  />
                </motion.div>

                {/* Caption */}
                {project.uiPreview?.caption && (
                  <motion.p
                    custom={2}
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mt-4 text-xs text-zinc-400 font-mono text-center"
                  >
                    {project.uiPreview.caption}
                  </motion.p>
                )}
              </div>

              {/* ═══════════════════════════════════════════════
                  SECTION 2 — THREE-COLUMN CONTENT
              ═══════════════════════════════════════════════ */}
              <div className="px-8 md:px-16 py-12 border-b border-zinc-150">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                  {/* ─── COL 01: Challenge ─────────────────────── */}
                  <motion.div
                    custom={3}
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-5"
                  >
                    <ColHeader number="01" title="Challenge" />

                    {project.challenge ? (
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-white border border-zinc-200">
                          <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-2">
                            Problem
                          </p>
                          <p className="text-sm text-zinc-600 leading-relaxed">
                            {project.challenge}
                          </p>
                        </div>
                        {project.solution && (
                          <div className="p-4 rounded-xl bg-[#050507] text-white">
                            <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-2">
                              Solution
                            </p>
                            <p className="text-sm text-zinc-200 leading-relaxed">
                              {project.solution}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <EmptyCol label="Challenge details coming soon." />
                    )}

                    {/* Key Benefits */}
                    {project.keyBenefits?.length > 0 && (
                      <div className="space-y-2">
                        {project.keyBenefits.map((b) => (
                          <div key={b} className="flex items-start gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="text-xs text-zinc-600 leading-relaxed">{b}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>

                  {/* ─── COL 02: Tech Stack ────────────────────── */}
                  <motion.div
                    custom={4}
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-5"
                  >
                    <ColHeader number="02" title="Tech Stack" />

                    {project.techStack?.length > 0 ? (
                      <div className="space-y-3">
                        {project.techStack.map((tech) => {
                          const iconKey = ICON_MAP[tech] ?? tech.toLowerCase();
                          const rationale = project.techRationale?.[tech];
                          return (
                            <div
                              key={tech}
                              className="group p-3 rounded-xl bg-white border border-zinc-200 hover:border-zinc-300 hover:shadow-sm transition-all duration-200"
                            >
                              <div className="flex items-center gap-2.5 mb-1.5">
                                <img
                                  src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconKey}/${iconKey}-original.svg`}
                                  alt={tech}
                                  className="w-4 h-4 object-contain"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = "none";
                                  }}
                                />
                                <span className="text-xs font-semibold text-[#050507]">{tech}</span>
                              </div>
                              {rationale ? (
                                <p className="text-[11px] text-zinc-500 leading-relaxed pl-6.5">
                                  {rationale}
                                </p>
                              ) : (
                                <p className="text-[11px] text-zinc-400 leading-relaxed pl-6.5 italic">
                                  Core technology for this project.
                                </p>
                              )}
                            </div>
                          );
                        })}

                        {/* Assessment badges */}
                        <div className="pt-2 space-y-2">
                          <AssessmentBadge icon={Zap} label="Performance" text="Optimized for fast load times" />
                          <AssessmentBadge icon={Shield} label="Accessibility" text="Semantic HTML & ARIA compliant" />
                          <AssessmentBadge icon={Box} label="Architecture" text="Component-based, maintainable" />
                        </div>
                      </div>
                    ) : (
                      <EmptyCol label="Tech stack details coming soon." />
                    )}
                  </motion.div>

                  {/* ─── COL 03: Design & Process ─────────────── */}
                  <motion.div
                    custom={5}
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-5"
                  >
                    <ColHeader number="03" title="Design & Process" />

                    {project.engineeringProcess?.length > 0 ? (
                      <div className="relative space-y-0">
                        {/* Vertical line */}
                        <div className="absolute left-[13px] top-4 bottom-4 w-px bg-zinc-200" />
                        {project.engineeringProcess.map((step, i) => {
                          const isLast = i === project.engineeringProcess.length - 1;
                          return (
                            <div key={step} className="relative flex items-start gap-4 pb-5">
                              {/* Node */}
                              <div
                                className={`relative z-10 shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-mono font-bold border transition-colors
                                  ${isLast
                                    ? "bg-[#050507] text-white border-[#050507]"
                                    : "bg-white text-zinc-500 border-zinc-200"
                                  }`}
                              >
                                {String(i + 1).padStart(2, "0")}
                              </div>
                              <div className="pt-1">
                                <span className={`text-sm font-semibold ${isLast ? "text-[#050507]" : "text-zinc-600"}`}>
                                  {step}
                                </span>
                                {isLast && (
                                  <span className="ml-2 text-[9px] font-mono text-emerald-500 uppercase tracking-widest">
                                    Complete
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <EmptyCol label="Process details coming soon." />
                    )}
                  </motion.div>
                </div>
              </div>

              {/* ═══════════════════════════════════════════════
                  SECTION 3 — ARCHITECTURE
              ═══════════════════════════════════════════════ */}
              {project.architectureModules?.length > 0 && (
                <div className="px-8 md:px-16 py-12 border-b border-zinc-150">
                  <Section index={6} icon={Cpu} title="Architecture" subtitle="System design breakdown">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {project.architectureModules.map((mod) => (
                        <div
                          key={mod.name}
                          className="p-5 rounded-2xl bg-white border border-zinc-200 hover:shadow-md transition-shadow duration-200"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                            <span className="text-sm font-bold text-[#050507]">{mod.name}</span>
                          </div>
                          <p className="text-xs text-zinc-500 leading-relaxed pl-5 mb-3">
                            {mod.purpose}
                          </p>
                          {mod.responsibilities?.length > 0 && (
                            <ul className="pl-5 space-y-1.5">
                              {mod.responsibilities.map((r) => (
                                <li key={r} className="flex items-start gap-2 text-xs text-zinc-500">
                                  <span className="mt-1.5 w-1 h-1 rounded-full bg-zinc-300 shrink-0" />
                                  {r}
                                </li>
                              ))}
                            </ul>
                          )}
                          {mod.inputsOutputs && (
                            <div className="mt-3 pt-3 border-t border-zinc-100">
                              <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 mb-1">
                                I/O
                              </p>
                              <p className="text-[11px] text-zinc-500 leading-relaxed">
                                {mod.inputsOutputs}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </Section>
                </div>
              )}

              {/* ═══════════════════════════════════════════════
                  SECTION 4 — OUTCOMES & METRICS
              ═══════════════════════════════════════════════ */}
              {project.detailedOutcomes?.length > 0 && (
                <div className="px-8 md:px-16 py-12 border-b border-zinc-150">
                  <Section index={7} icon={BarChart2} title="Outcomes" subtitle="Measurable results">
                    <div className="space-y-4">
                      {project.detailedOutcomes.map((o, idx) => (
                        <motion.div
                          key={o.problem}
                          initial={{ opacity: 0, x: -16 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-white border border-zinc-200"
                        >
                          <div>
                            <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                              Problem
                            </p>
                            <p className="text-xs text-zinc-700 leading-relaxed">{o.problem}</p>
                          </div>
                          <div>
                            <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                              Result
                            </p>
                            <p className="text-xs text-zinc-700 leading-relaxed">{o.result}</p>
                          </div>
                          <div>
                            <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                              Measurement
                            </p>
                            <p className="text-sm font-bold text-[#050507]">{o.measurement}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </Section>
                </div>
              )}

              {/* ═══════════════════════════════════════════════
                  FOOTER ACTIONS
              ═══════════════════════════════════════════════ */}
              <div className="px-8 md:px-16 py-10 flex flex-wrap items-center justify-between gap-4 bg-white/50">
                <div className="flex flex-wrap gap-3">
                  {project.link && !project.link.includes("github.com") && (
                    <CTALink href={project.link} icon={ExternalLink} label="View Live Site" variant="primary" />
                  )}
                  {project.github && (
                    <CTALink href={project.github} icon={Github} label="View on GitHub" variant="secondary" />
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-700 transition-colors font-mono uppercase tracking-widest group"
                >
                  <X className="w-3 h-3 group-hover:rotate-90 transition-transform duration-200" />
                  Close
                </button>
              </div>
            </div>
          </motion.article>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Helper: Column Header ─────────────────────────────────────────────────────
function ColHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-3 pb-4 border-b border-zinc-150">
      <span className="text-[10px] font-mono text-zinc-300 leading-none">{number}</span>
      <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 font-bold">
        {title}
      </h3>
    </div>
  );
}

// ─── Helper: Empty Column ──────────────────────────────────────────────────────
function EmptyCol({ label }: { label: string }) {
  return (
    <div className="p-4 rounded-xl border border-dashed border-zinc-200 flex items-center justify-center">
      <span className="text-[10px] font-mono text-zinc-400">{label}</span>
    </div>
  );
}

// ─── Helper: Assessment Badge ──────────────────────────────────────────────────
function AssessmentBadge({
  icon: Icon,
  label,
  text,
}: {
  icon: React.ElementType;
  label: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-50 border border-zinc-100">
      <Icon className="w-3 h-3 text-zinc-400 shrink-0 mt-0.5" />
      <div>
        <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 block">
          {label}
        </span>
        <span className="text-[11px] text-zinc-600">{text}</span>
      </div>
    </div>
  );
}
