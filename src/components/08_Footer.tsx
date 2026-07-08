import { ChevronUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full py-16 bg-[#f5f5f7] border-t border-zinc-200">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-[1200px] mx-auto px-6 space-y-8 md:space-y-0">
        <div className="space-y-2 text-center md:text-left">
          <div className="font-headline-md text-xl font-bold text-[#050507] font-display">Tewolde</div>
          <p className="font-body-md text-xs font-mono text-zinc-500 tracking-widest uppercase">
            Designing. Developing. Deploying.
          </p>
          <p className="font-body-md text-xs text-zinc-400 mt-1">
            © 2026 Tewolde Lisanwork Mekonnen. Software Engineer.
          </p>
        </div>

        <div className="flex gap-8 items-center font-label-sm text-xs uppercase tracking-wider">
          <button
            onClick={scrollToTop}
            className="text-zinc-600 hover:text-black transition-colors flex items-center gap-1 font-bold cursor-pointer"
          >
            Back to Top <ChevronUp className="w-3.5 h-3.5" />
          </button>
          <a
            className="text-zinc-600 hover:text-black transition-colors font-bold"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="text-zinc-600 hover:text-black transition-colors font-bold"
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
