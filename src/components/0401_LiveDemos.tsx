import React, { useState, useRef, useEffect } from "react";

const INK = 'var(--ink, #050507)';
const MUTE = 'var(--muted, #71717a)';
const ACCENT = 'var(--accent, #ea580c)';
const CHIP = 'var(--chip, #f4f4f5)';
const BORDER = 'var(--line, rgba(5,5,7,0.12))';
const BORDER_FAINT = 'var(--line-faint, rgba(5,5,7,0.08))';

interface ProjectDemo {
  id: string;
  type: "Website" | "SaaS";
  title: string;
  line: string;
  url: string;
  embedUrl: string;
  stack: { name: string; icon: string }[];
  color: string;
}

// skillicons.dev key for each technology
const TECH_ICON: Record<string, string> = {
  WordPress: "wordpress",
  PHP: "php",
  CSS: "css",
  React: "react",
  Vite: "vite",
  Tailwind: "tailwind",
  TypeScript: "typescript",
  Vercel: "vercel",
  Supabase: "supabase",
};


const DEMO_PROJECTS: ProjectDemo[] = [
  {
    id: "derm",
    type: "Website",
    title: "Abed Dermatology",
    line: "Clinic site with online booking",
    url: "abeddermatology.com",
    embedUrl: "https://abeddermatology.com/",
    stack: [
      { name: "WordPress", icon: "wordpress" },
      { name: "PHP", icon: "php" },
      { name: "CSS", icon: "css" },
    ],
    color: "#ea580c",
  },
  {
    id: "yarc",
    type: "Website",
    title: "YARC Systems",
    line: "Corporate platform for YARC PLC",
    url: "yarcsystems.com",
    embedUrl: "https://yarcsystems.com/",
    stack: [
      { name: "WordPress", icon: "wordpress" },
      { name: "PHP", icon: "php" },
      { name: "CSS", icon: "css" },
    ],
    color: "#2563eb",
  },
  {
    id: "trh",
    type: "Website",
    title: "TRH Construction",
    line: "Construction & trading company site",
    url: "trhconstructionandtrade.com",
    embedUrl: "https://trhconstructionandtrade.com/",
    stack: [
      { name: "WordPress", icon: "wordpress" },
      { name: "PHP", icon: "php" },
      { name: "CSS", icon: "css" },
    ],
    color: "#16a34a",
  },
  {
    id: "kulu",
    type: "SaaS",
    title: "Kulu Workspace",
    line: "Project & team management tool",
    url: "kulu-management-tool.vercel.app",
    embedUrl: "https://kulu-management-tool.vercel.app/",
    stack: [
      { name: "React", icon: "react" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Vercel", icon: "vercel" },
    ],
    color: "#7c3aed",
  },
];

type DeviceMode = "desktop" | "phone";

// Verified embeddable: no X-Frame-Options, no frame-ancestors CSP on any of the three sites.
// TRH only has object-src 'none' which does not block iframe embedding.
function IframePreview({
  project,
  device,
}: {
  project: ProjectDemo;
  device: DeviceMode;
}) {
  const [loaded, setLoaded] = useState(false);
  const [scale, setScale] = useState(1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const isPhone = device === "phone";
  const nativeW = isPhone ? 390 : 1280;
  const nativeH = isPhone ? 844 : 900;

  // Measure the container and compute scale so the iframe always fits
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const compute = () => {
      const containerW = el.clientWidth || el.offsetWidth;
      if (containerW > 0) setScale(containerW / nativeW);
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, [nativeW]);

  // Reset loaded state when project or device changes
  useEffect(() => {
    setLoaded(false);
  }, [project.id, device]);

  const scaledH = nativeH * scale;

  return (
    <div
      ref={wrapperRef}
      style={{ position: "relative", width: "100%", height: scaledH, background: CHIP, overflow: "hidden" }}
    >
      {/* Loading skeleton */}
      {!loaded && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 10,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          background: CHIP, gap: 16,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            border: `3px solid ${BORDER}`,
            borderTopColor: project.color,
            animation: "demos-spin 0.8s linear infinite",
          }} />
          <span style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 13, color: MUTE, fontWeight: 600 }}>
            Loading {project.title}…
          </span>
          <div style={{ width: 220, display: "flex", flexDirection: "column", gap: 8 }}>
            {[80, 60, 90, 50].map((w, i) => (
              <div key={i} style={{
                height: 10, width: `${w}%`, borderRadius: 6,
                background: `linear-gradient(90deg, ${BORDER_FAINT} 25%, rgba(5,5,7,0.04) 50%, ${BORDER_FAINT} 75%)`,
                backgroundSize: "200% 100%",
                animation: "demos-shimmer 1.4s ease infinite",
                animationDelay: `${i * 0.12}s`,
              }} />
            ))}
          </div>
        </div>
      )}

      {/* Scaled iframe */}
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: nativeW,
        height: nativeH,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.5s ease",
        pointerEvents: loaded ? "auto" : "none",
      }}>
        <iframe
          src={project.embedUrl}
          title={project.title}
          width={nativeW}
          height={nativeH}
          onLoad={() => setLoaded(true)}
          style={{ border: "none", display: "block", background: "#fff" }}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>

      <style>{`
        @keyframes demos-spin { to { transform: rotate(360deg); } }
        @keyframes demos-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

export default function LiveDemos() {
  const [filter, setFilter] = useState<"all" | "Website" | "SaaS">("all");
  const [device, setDevice] = useState<DeviceMode>("desktop");
  const [currentId, setCurrentId] = useState<string>("derm");

  const filteredProjects = filter === "all"
    ? DEMO_PROJECTS
    : DEMO_PROJECTS.filter((p) => p.type === filter);

  const activeProject = filteredProjects.find((p) => p.id === currentId)
    || filteredProjects[0]
    || DEMO_PROJECTS[0];

  const segBtnStyle = (active: boolean): React.CSSProperties => ({
    border: 0,
    background: active ? INK : "none",
    padding: "8px 16px",
    fontFamily: '"Figtree", system-ui, sans-serif',
    fontWeight: 600,
    fontSize: 13,
    color: active ? "var(--bg, #ffffff)" : INK,
    cursor: "pointer",
    transition: "background-color 0.15s, color 0.15s",
  });

  return (
    <section className="demos-wrapper border-b border-token-border" id="demos">
      <div className="demos-container">

        {/* Header */}
        <h2 className="demos-title">Try the work, not screenshots.</h2>
        <p className="demos-lead">
          Browse the real, deployed sites right here. Switch to phone view to see how each one responds.
        </p>

        {/* Controls Row */}
        <div className="demos-tools">
          {/* Type Filter */}
          <div className="demos-seg" role="group" aria-label="Project type">
            {(["all", "Website", "SaaS"] as const).map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => {
                  setFilter(f);
                  const matched = f === "all" ? DEMO_PROJECTS : DEMO_PROJECTS.filter((p) => p.type === f);
                  if (matched.length > 0 && !matched.some((p) => p.id === currentId)) {
                    setCurrentId(matched[0].id);
                  }
                }}
                style={segBtnStyle(filter === f)}
              >
                {f === "all" ? "All" : f}
              </button>
            ))}
          </div>

          {/* Device Switcher */}
          <div className="demos-seg" role="group" aria-label="Screen size">
            <button type="button" aria-pressed={device === "desktop"} onClick={() => setDevice("desktop")} style={segBtnStyle(device === "desktop")}>
              Desktop
            </button>
            <button type="button" aria-pressed={device === "phone"} onClick={() => setDevice("phone")} style={segBtnStyle(device === "phone")}>
              Phone
            </button>
          </div>
        </div>

        {/* Grid: List + Frame */}
        <div className="demos-grid">

          {/* Left — Project List */}
          <div className="demos-list">
            {filteredProjects.map((p) => {
              const isActive = p.id === currentId;
              return (
                <button
                  key={p.id}
                  type="button"
                  className="demos-item"
                  aria-current={isActive}
                  onClick={() => setCurrentId(p.id)}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
                    <b style={{ fontFamily: '"Bricolage Grotesque", Figtree, sans-serif', fontWeight: 800, fontSize: 17, color: INK }}>{p.title}</b>
                  </div>
                  <span style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 13, color: MUTE, display: "block" }}>
                    {p.line}
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
                    <small style={{
                      background: isActive ? INK : CHIP,
                      color: isActive ? "var(--bg, #fff)" : MUTE,
                      borderRadius: 99, padding: "2px 10px",
                      fontSize: 11, fontFamily: '"Figtree", system-ui, sans-serif', fontWeight: 700,
                    }}>
                      {p.type}
                    </small>
                    <span style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 11, color: MUTE }}>
                      {p.url}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right — Browser Mockup Frame */}
          <div>
            <div className="demos-frame" data-device={device}>

              {/* Browser top bar */}
              <div className="demos-bar">
                <i /><i /><i />
                <em>{activeProject.url}</em>
                {/* Live badge */}
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
                  <div style={{
                    width: 7, height: 7, borderRadius: "50%",
                    background: "#22c55e",
                    boxShadow: "0 0 6px rgba(34,197,94,0.6)",
                    animation: "demos-pulse 2s ease infinite",
                  }} />
                  <span style={{
                    fontFamily: '"Figtree", system-ui, sans-serif',
                    fontSize: 10, fontWeight: 700, color: "#16a34a", letterSpacing: "0.08em",
                  }}>LIVE</span>
                </div>
              </div>
              <style>{`@keyframes demos-pulse { 0%,100%{opacity:1} 50%{opacity:.4} }`}</style>

              {/* Iframe screen */}
              <div className="demos-screen" key={activeProject.id + "-" + device}>
                <IframePreview
                  project={activeProject}
                  device={device}
                />
              </div>
            </div>

            {/* Meta row: stack icons + open link */}
            <div style={{ marginTop: 16, display: "flex", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <span style={{ fontFamily: '"Figtree", system-ui, sans-serif', fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTE }}>
                Technical Stack
              </span>
              {/* Divider */}
              <div style={{ width: 1, height: 16, background: BORDER, flexShrink: 0 }} />
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {activeProject.stack.map((tech) => (
                  <div
                    key={tech.name}
                    className="group/tag relative"
                  >
                    {/* Icon chip — matches ProjectCard style exactly */}
                    <div
                      className="p-1.5 bg-black/5 border border-black/10 rounded-lg hover:border-black/30 hover:bg-black/10 hover:scale-110 transition-all duration-300"
                    >
                      <img
                        src={`https://skillicons.dev/icons?i=${tech.icon}`}
                        alt={tech.name}
                        className="w-8 h-8"
                      />
                    </div>
                    {/* Tooltip — matches ProjectCard tooltip */}
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[8px] font-mono rounded opacity-0 group-hover/tag:opacity-100 transition-opacity whitespace-nowrap z-30 pointer-events-none font-bold">
                      {tech.name.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
              <a
                href={activeProject.embedUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginLeft: "auto",
                  display: "inline-flex", alignItems: "center", gap: 6,
                  fontFamily: '"Figtree", system-ui, sans-serif',
                  fontSize: 12, fontWeight: 700,
                  color: ACCENT, textDecoration: "none",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                Open live demo ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
