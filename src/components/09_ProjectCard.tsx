import { useState, useEffect, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Project } from "../types";
import { ICON_MAP, isProjectDeployed } from "./ProjectsData";

export interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const images = project.images || [];

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  const isDeployed = isProjectDeployed(project);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="group glass-card-interactive rounded-xl overflow-hidden block cursor-pointer flex flex-col justify-between h-full"
    >
      <div>
        <div className="aspect-video bg-zinc-100 flex items-center justify-center relative overflow-hidden p-0 border-b border-zinc-200">
          <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />

          <AnimatePresence mode="wait">
            {images.length > 0 ? (
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex]}
                alt={project.title}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0 }}
                className="w-full h-full object-cover transition-opacity relative z-10 opacity-90 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="text-zinc-500 font-mono font-bold text-2xl tracking-tighter uppercase relative z-10">
                &lt;{project.title.split(" ")[0]}/&gt;
              </div>
            )}
          </AnimatePresence>

          {/* Manual Navigation */}
          {images.length > 1 && (
            <>
              <button
                aria-label="Previous image"
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-40 hover:bg-black/90 border border-white/10"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                aria-label="Next image"
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentImageIndex((prev) => (prev + 1) % images.length);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-40 hover:bg-black/90 border border-white/10"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Carousel Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === currentImageIndex ? "bg-white w-4" : "bg-white/20"
                  }`}
                />
              ))}
            </div>
          )}

          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 z-30 pointer-events-none backdrop-blur-[2px]">
            <div className="p-3 bg-black rounded-lg text-white shadow-xl pointer-events-auto border border-black/10">
              <ExternalLink className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="p-6 relative overflow-hidden">
          {/* Main Content */}
          <div className="transition-opacity duration-300 group-hover:opacity-0">
            <h3 className="text-lg font-bold mb-2 text-[#050507] group-hover:text-black transition-colors font-display">
              {project.title}
            </h3>
            <p className="text-zinc-600 text-sm leading-relaxed mb-4 font-sans line-clamp-3">
              {project.description}
            </p>
            <div className="pt-4 border-t border-zinc-100 flex justify-between items-center">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">
                Status: {isDeployed ? "Deployed" : "Undeployed"}
              </span>
              <div className={`w-2 h-2 rounded-full ${isDeployed ? "bg-black shadow-[0_0_8px_rgba(0,0,0,0.4)]" : "bg-zinc-400"}`} />
            </div>
          </div>

          {/* Tags Hover Overlay */}
          <div className="absolute inset-0 bg-[#f5f5f7]/98 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out flex flex-col justify-center z-20 border border-zinc-200 rounded-xl backdrop-blur-xl">
            <div className="text-[10px] font-mono text-[#050507] mb-4 uppercase tracking-[0.2em] border-b border-zinc-200 pb-2 font-bold">
              Technical Stack
            </div>
            <motion.div
              initial={false}
              animate={isHovered ? "show" : "hidden"}
              variants={{
                show: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2,
                  },
                },
                hidden: {
                  transition: {
                    staggerChildren: 0.05,
                    staggerDirection: -1,
                  },
                },
              }}
              className="flex flex-wrap gap-3"
            >
              {project.techStack.map((tag) => {
                const iconName = ICON_MAP[tag] || "code";
                return (
                  <motion.div
                    key={tag}
                    variants={{
                      show: { opacity: 1, y: 0, scale: 1 },
                      hidden: { opacity: 0, y: 10, scale: 0.8 },
                    }}
                    className="group/tag relative"
                  >
                    <div className="p-1.5 bg-black/5 border border-black/10 rounded-lg hover:border-black/30 hover:bg-black/10 hover:scale-110 transition-all duration-300">
                      <img
                        src={`https://skillicons.dev/icons?i=${iconName}`}
                        alt={tag}
                        className="w-8 h-8"
                      />
                    </div>
                    {/* Tooltip */}
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[8px] font-mono rounded opacity-0 group-hover/tag:opacity-100 transition-opacity whitespace-nowrap z-30 pointer-events-none font-bold">
                      {tag.toUpperCase()}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
            <div className="mt-6">
              <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-black text-white hover:bg-zinc-900 rounded font-bold text-[10px] uppercase tracking-[0.2em] transition-all duration-300 shadow-md">
                View Project
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
