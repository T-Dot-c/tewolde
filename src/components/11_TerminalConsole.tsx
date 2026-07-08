import { useState, useRef, useEffect, FormEvent } from "react";
import { Terminal, Send, X, ShieldAlert, Cpu } from "lucide-react";
import { ContactMessage } from "../types";

interface TerminalConsoleProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ContactMessage[];
  onClearMessages: () => void;
}

export default function TerminalConsole({
  isOpen,
  onClose,
  messages,
  onClearMessages,
}: TerminalConsoleProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    "Tewolde Lisanwork Mekonnen — Portfolio Terminal v3.0.0",
    "Software Engineer · Building Complete Web Solutions",
    "Type 'help' to list available commands.",
    "",
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isOpen]);

  if (!isOpen) return null;

  const handleCommand = (e: FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, `> ${input}`];

    switch (cmd) {
      case "help":
        newHistory.push(
          "Available Commands:",
          "  whoami           - Identity",
          "  role             - Current role",
          "  focus            - Areas of expertise",
          "  stack            - Technology stack",
          "  currently_building - Active projects",
          "  status           - Availability",
          "  messages         - Contact form logs",
          "  clear            - Clear console"
        );
        break;
      case "whoami":
        newHistory.push("Tewolde Lisanwork Mekonnen");
        break;
      case "role":
        newHistory.push("Software Engineer");
        break;
      case "focus":
        newHistory.push(
          "",
          "  ✔ Frontend Engineering",
          "  ✔ WordPress Development",
          "  ✔ Cloud Infrastructure",
          "  ✔ DevOps Practices",
          "  ✔ UI/UX Design",
          ""
        );
        break;
      case "stack":
        newHistory.push(
          "",
          "  React",
          "  TypeScript",
          "  Tailwind CSS",
          "  WordPress",
          "  Ubuntu Server",
          "  ISPConfig",
          "  Python",
          "  Java",
          ""
        );
        break;
      case "currently_building":
        newHistory.push(
          "",
          "  • Modern React Applications",
          "  • Business Websites",
          "  • Deployment Workflows",
          "  • Better User Experiences",
          ""
        );
        break;
      case "status":
        newHistory.push(
          "",
          "  ✔ Available for Internship",
          "  ✔ Available for Freelance",
          "  ✔ Open to Full-Time Opportunities",
          ""
        );
        break;
      case "about":
      case "skills":
        newHistory.push("Try: whoami | role | focus | stack | status");
        break;
      case "messages":
        if (messages.length === 0) {
          newHistory.push("No contact form messages yet. Submit one via the contact section!");
        } else {
          newHistory.push(`Retrieved ${messages.length} message(s):`);
          messages.forEach((m, i) => {
            newHistory.push(
              `[#${i + 1}] ${m.timestamp}`,
              `  From: ${m.name} <${m.email}>`,
              `  Msg:  "${m.message}"`,
              "----------------------------------------"
            );
          });
        }
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "exit":
        newHistory.push("", "  Session terminated...", "");
        break;
      default:
        newHistory.push(`Command not recognized: '${cmd}'. Type 'help' for options.`);
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
      <div className="w-full max-w-xl bg-[#f5f5f7]/95 border border-zinc-200 text-[#050507] shadow-xl rounded-xl overflow-hidden font-mono flex flex-col h-[400px]">
        {/* Terminal Header */}
        <div className="bg-black/5 px-4 py-3 border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#050507]" />
            <span className="text-xs font-semibold text-zinc-700">System Sandbox Console</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close terminal"
            className="text-zinc-500 hover:text-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Output */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2 text-xs text-zinc-700 bg-white/40">
          {history.map((line, idx) => (
            <div key={idx} className="whitespace-pre-wrap leading-relaxed">
              {line}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Input */}
        <form
          onSubmit={handleCommand}
          className="bg-black/5 px-4 py-3 border-t border-zinc-200 flex items-center gap-2"
        >
          <span className="text-zinc-700 text-xs">{">"}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help' and press Enter..."
            className="flex-1 bg-transparent text-[#050507] border-none outline-none focus:ring-0 p-0 text-xs font-mono placeholder-zinc-400"
            autoFocus
          />
          <button
            type="submit"
            aria-label="Submit command"
            className="text-zinc-500 hover:text-black transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
