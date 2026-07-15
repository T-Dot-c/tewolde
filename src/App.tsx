import { useState, useEffect, FormEvent, MouseEvent } from "react";
import { motion } from "framer-motion";

import { PROJECTS } from "./components/ProjectsData";
import { Project, ContactMessage } from "./types";
import ProjectDetailModal from "./components/10_ProjectDetailModal";
import TerminalConsole from "./components/11_TerminalConsole";
import Toast, { ToastMessage } from "./components/12_Toast";

// Refactored modular subcomponents
import IntroPreloader from "./components/01_IntroPreloader";
import Navigation from "./components/02_Navigation";
import Hero from "./components/03_Hero";
import SelectedWork from "./components/0301_SelectedWork";
import About from "./components/04_About";
import Work from "./components/05_Work";
import Specialties from "./components/06_Specialties";
import Contact from "./components/07_Contact";
import Footer from "./components/08_Footer";

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Intro preloader state
  const [showIntro, setShowIntro] = useState(true);
  const [introStep, setIntroStep] = useState(0);

  useEffect(() => {
    if (!showIntro) return;
    const interval = setInterval(() => {
      setIntroStep((prev) => prev + 1);
    }, 700);
    return () => clearInterval(interval);
  }, [showIntro]);

  useEffect(() => {
    // Disable scroll during intro
    if (showIntro) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2400);
    return () => {
      document.body.style.overflow = "unset";
      clearTimeout(timer);
    };
  }, [showIntro]);

  // Contact Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [messageText, setMessageText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Scroll spy to update current section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const sections = ["hero", "about", "work", "services", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.clientHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  // Handle message submission
  const handleSubmitMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !messageText.trim()) {
      addToast("Please fill in all form fields.", "info");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newMessage: ContactMessage = {
        id: Math.random().toString(),
        name: name.trim(),
        email: email.trim(),
        message: messageText.trim(),
        timestamp: new Date().toLocaleString(),
      };

      const updated = [newMessage, ...messages];
      setMessages(updated);
      localStorage.setItem("portfolio_messages", JSON.stringify(updated));

      // Reset form states
      setName("");
      setEmail("");
      setMessageText("");
      setIsSubmitting(false);

      addToast("Message successfully sent! View console logs to review secure delivery.");
    }, 1200);
  };

  // Copy portfolio link
  const handleCopyLink = (e: MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("tewolde1574@gmail.com");
    addToast("Email copied to clipboard: tewolde1574@gmail.com", "info");
  };

  // Clear contact messages local log
  const handleClearMessages = () => {
    setMessages([]);
    localStorage.removeItem("portfolio_messages");
    addToast("Message logs cleared successfully.");
  };

  return (
    <div className="bg-cream min-h-screen text-ink font-sans antialiased relative selection:bg-ember/20 selection:text-ink">
      {/* Intro Preloader Screen */}
      <IntroPreloader showIntro={showIntro} introStep={introStep} />

      {/* Main landing page content wrapper with dismissal curtain fade-in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={showIntro ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
        className="w-full flex flex-col"
      >
        {/* Fixed Sticky Glassmorphic Header */}
        <Navigation isScrolled={isScrolled} activeSection={activeSection} />

        <main>
          {/* Hero Section */}
          <Hero />

          {/* Selected Work Section */}
          <SelectedWork onSelectProject={setSelectedProject} />

          {/* About Section */}
          <About />

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
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            messageText={messageText}
            setMessageText={setMessageText}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmitMessage}
            onCopyLink={handleCopyLink}
            onOpenConsole={() => setIsConsoleOpen(true)}
            messagesCount={messages.length}
            onToastRequest={(text) => addToast(text, "info")}
          />
        </main>

        {/* Footer */}
        <Footer />

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
      </motion.div>
    </div>
  );
}
