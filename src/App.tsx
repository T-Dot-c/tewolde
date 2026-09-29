import { useState, useEffect } from "react";

import { PROJECTS } from "./components/ProjectsData";
import { Project, ContactMessage } from "./types";
import ProjectDetailModal from "./components/10_ProjectDetailModal";
import TerminalConsole from "./components/11_TerminalConsole";
import Toast, { ToastMessage } from "./components/12_Toast";

// Refactored modular subcomponents
import Navigation from "./components/02_Navigation";
import Hero from "./components/03_Hero";
import SelectedWork from "./components/0301_SelectedWork";
import About from "./components/04_About";
import LiveDemos from "./components/0401_LiveDemos";
import Work from "./components/05_Work";
import Specialties from "./components/06_Specialties";
import Contact from "./components/07_Contact";
import Footer from "./components/08_Footer";
import Blog from "./components/Blog";

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);


  // Load message logs from local storage
  useEffect(() => {
    const saved = localStorage.getItem("portfolio_messages");
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error("Error reading saved messages", e);
      }
    }
  }, []);

  // Throttled scroll listener — only for nav background (no layout reads)
  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 20);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // IntersectionObserver-based scroll spy — zero layout thrashing
  useEffect(() => {
    const sections = ["hero", "about", "work", "services", "contact"];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Toast helper
  const addToast = (text: string, type: "success" | "info" = "success") => {
    const newToast: ToastMessage = {
      id: Math.random().toString(),
      text,
      type,
    };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Filter project cards
  const filteredProjects = activeFilter === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter || p.tags.includes(activeFilter));



  // Clear contact messages local log
  const handleClearMessages = () => {
    setMessages([]);
    localStorage.removeItem("portfolio_messages");
    addToast("Message logs cleared successfully.");
  };

  return (
    <div className="bg-cream min-h-screen text-ink font-sans antialiased relative selection:bg-ember/20 selection:text-ink">
      {/* Main landing page content wrapper */}
      <div className="w-full flex flex-col">
        {/* Fixed Sticky Glassmorphic Header */}
        <Navigation
          isScrolled={isScrolled}
          activeSection={activeSection}
          onBlogClick={() => setIsBlogOpen((v) => !v)}
          isBlogOpen={isBlogOpen}
        />

        {isBlogOpen ? (
          <Blog />
        ) : (
          <>
            <main>
              {/* Hero Section */}
              <Hero />

              {/* Selected Work Section */}
              <SelectedWork onSelectProject={setSelectedProject} />

              {/* About Section */}
              <About />

              {/* Live Demos Section */}
              <LiveDemos />

              {/* Work Section */}
              <Work
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                filteredProjects={filteredProjects}
                onSelectProject={setSelectedProject}
              />

              {/* Specialties & Workflow Section */}
              <Specialties />

              {/* Contact Section */}
              <Contact
                onOpenConsole={() => setIsConsoleOpen(true)}
                messagesCount={messages.length}
              />
            </main>

            {/* Footer */}
            <Footer />
          </>
        )}

        {/* Drawer Overlay for Selected Project Details */}
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        {/* Secure Developer Sandboxed Terminal Drawer */}
        <TerminalConsole
          isOpen={isConsoleOpen}
          onClose={() => setIsConsoleOpen(false)}
          messages={messages}
          onClearMessages={handleClearMessages}
        />

        {/* Toast Notification Container */}
        <Toast toasts={toasts} onClose={removeToast} />
      </div>
    </div>
  );
}
