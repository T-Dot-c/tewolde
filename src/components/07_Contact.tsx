import { FormEvent, MouseEvent } from "react";
import { Mail, MapPin, ExternalLink, Download, Link as LinkIcon, Terminal as TerminalIcon } from "lucide-react";

interface ContactProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  messageText: string;
  setMessageText: (text: string) => void;
  isSubmitting: boolean;
  onSubmit: (e: FormEvent) => void;
  onCopyLink: (e: MouseEvent) => void;
  onOpenConsole: () => void;
  messagesCount: number;
  onToastRequest: (text: string) => void;
}

export default function Contact({
  name,
  setName,
  email,
  setEmail,
  messageText,
  setMessageText,
  isSubmitting,
  onSubmit,
  onCopyLink,
  onOpenConsole,
  messagesCount,
  onToastRequest,
}: ContactProps) {
  return (
    <section className="py-24 md:py-32 px-6 bg-transparent border-t border-zinc-200" id="contact">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Info Side */}
        <div className="space-y-8 flex flex-col justify-between">
          <div className="space-y-6">
            <h2 className="font-headline-lg text-3xl md:text-4xl text-[#050507] tracking-tight leading-[1.2] font-display font-black">
              Let's Build Something <br /> Meaningful.
            </h2>
            <p className="font-body-lg text-base text-zinc-600 leading-relaxed">
              Whether you need a modern web application, a professional business website, or help deploying reliable web infrastructure, I'm always interested in collaborating on projects that create real impact.
            </p>
            <p className="font-body-lg text-sm text-zinc-500 leading-relaxed">
              Let's turn your ideas into production-ready solutions.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-black/5 text-[#050507] border border-black/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-[#050507]" />
                </div>
                <span className="font-body-md text-sm text-[#050507] font-semibold">
                  tewolde1574@gmail.com
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-black/5 text-[#050507] border border-black/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-[#050507]" />
                </div>
                <span className="font-body-md text-sm text-[#050507] font-semibold">Based in Addis Ababa, Ethiopia</span>
              </div>

              {/* Direct links */}
              <div className="pt-6 border-t border-zinc-200 space-y-3">
                <p className="text-xs uppercase tracking-widest text-zinc-600 font-bold font-display">Direct Links</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="mailto:tewolde1574@gmail.com"
                    className="flex items-center gap-2 text-[11px] font-mono text-zinc-700 hover:text-black transition-colors bg-black/5 border border-black/10 rounded-lg px-3 py-2 hover:bg-black/10 hover:border-black/20"
                  >
                    <Mail className="w-3.5 h-3.5 text-black" /> Email Direct
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[11px] font-mono text-zinc-700 hover:text-black transition-colors bg-black/5 border border-black/10 rounded-lg px-3 py-2 hover:bg-black/10 hover:border-black/20"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-black" /> GitHub
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onToastRequest("Starting download for CV (PDF)...");
                    }}
                    className="flex items-center gap-2 text-[11px] font-mono text-zinc-700 hover:text-black transition-colors bg-black/5 border border-black/10 rounded-lg px-3 py-2 hover:bg-black/10 hover:border-black/20"
                  >
                    <Download className="w-3.5 h-3.5 text-black" /> Download CV (PDF)
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Extra Utility Action Row */}
          <div className="flex gap-4 pt-6">
            <button
              onClick={onCopyLink}
              className="w-12 h-12 flex items-center justify-center rounded-xl border border-black/10 text-zinc-600 hover:bg-black/10 hover:border-black/20 hover:text-black transition-all duration-300 shadow-sm"
              title="Copy business email"
            >
              <LinkIcon className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={onOpenConsole}
              className="w-12 h-12 flex items-center justify-center rounded-xl border border-black/10 text-zinc-600 hover:bg-black/10 hover:border-black/20 hover:text-black transition-all duration-300 shadow-sm relative group"
              title="Open secure CLI terminal"
            >
              <TerminalIcon className="w-4.5 h-4.5" />
              {messagesCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#ba1a1a] text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-bold font-mono animate-bounce border-2 border-[#f5f5f7]">
                  {messagesCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Form Side */}
        <div className="glass-card p-8 md:p-10 rounded-2xl relative overflow-hidden">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="font-label-sm text-xs text-zinc-600 uppercase tracking-wider block">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="John Doe"
                className="w-full bg-transparent border-b border-black/15 focus:border-black focus:ring-0 px-0 py-3 transition-colors outline-none font-body-md text-sm text-[#050507] placeholder-zinc-450"
              />
            </div>

            <div className="space-y-2">
              <label className="font-label-sm text-xs text-zinc-600 uppercase tracking-wider block">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="john@example.com"
                className="w-full bg-transparent border-b border-black/15 focus:border-black focus:ring-0 px-0 py-3 transition-colors outline-none font-body-md text-sm text-[#050507] placeholder-zinc-450"
              />
            </div>

            <div className="space-y-2">
              <label className="font-label-sm text-xs text-zinc-600 uppercase tracking-wider block">
                Message
              </label>
              <textarea
                rows={4}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                required
                placeholder="Tell me about your project..."
                className="w-full bg-transparent border-b border-black/15 focus:border-black focus:ring-0 px-0 py-3 transition-colors outline-none font-body-md text-sm text-[#050507] placeholder-zinc-450 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white py-4 rounded-xl font-label-sm text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:bg-zinc-900 hover:shadow-lg hover:translate-y-[-1px] font-bold disabled:bg-black/10 disabled:text-zinc-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Delivering secure records...
                </span>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
