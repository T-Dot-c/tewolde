import { ArrowRight } from "lucide-react";

interface NavigationProps {
  isScrolled: boolean;
  activeSection: string;
  onBlogClick: () => void;
  isBlogOpen: boolean;
}

export default function Navigation({ isScrolled, activeSection, onBlogClick, isBlogOpen }: NavigationProps) {
  return (
    <nav className={`fixed top-0 left-0 w-full z-40 px-6 py-4 transition-all duration-300 ${isScrolled
      ? "glass-nav"
      : "bg-transparent border-b border-transparent"
      }`}>
      <div className="max-w-[1200px] mx-auto flex items-center justify-between font-label-sm text-[11px] tracking-widest uppercase">
        {/* Left Side */}
        <div className="flex items-center gap-2 text-[#050507]">
          <ArrowRight className="w-3.5 h-3.5 animate-pulse text-[#050507]" />
          <span className="font-semibold text-[#050507]">Tewolde.</span>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-4 text-zinc-500 font-medium">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors hover:opacity-100"
          >
            LinkedIn
          </a>
          <span className="opacity-20 text-zinc-400">/</span>
          <a
            href="https://github.com/T-Dot-c"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors hover:opacity-100"
          >
            GitHub
          </a>
          <span className="opacity-20 text-zinc-400">/</span>
          <button
            onClick={onBlogClick}
            className={`hover:text-black transition-colors hover:opacity-100 bg-none border-0 p-0 cursor-pointer font-medium ${
              isBlogOpen ? "text-black" : ""
            }`}
          >
            Blog
          </button>
        </div>

        {/* Right Side Navigation */}
        <div className="flex items-center gap-6">
          <a
            href="#about"
            className={`transition-colors font-semibold ${activeSection === "about" ? "text-black border-b border-black pb-0.5" : "text-zinc-500 hover:text-black"
              }`}
          >
            Info
          </a>
          <a
            href="#work"
            className={`transition-colors font-semibold ${activeSection === "work" ? "text-black border-b border-black pb-0.5" : "text-zinc-500 hover:text-black"
              }`}
          >
            Work
          </a>
          <a
            href="#services"
            className={`transition-colors font-semibold ${activeSection === "services" ? "text-black border-b border-black pb-0.5" : "text-zinc-500 hover:text-black"
              }`}
          >
            Specialties
          </a>
          <a
            href="#contact"
            className={`transition-colors font-semibold ${activeSection === "contact" ? "text-black border-b border-black pb-0.5" : "text-zinc-500 hover:text-black"
              }`}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
