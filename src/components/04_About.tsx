import {
  FaReact, FaJs, FaHtml5, FaCss3Alt, FaWordpress,
  FaPython, FaJava, FaCog, FaDraftingCompass
} from 'react-icons/fa';
import {
  SiTailwindcss, SiFigma, SiCplusplus
} from 'react-icons/si';
import {
  TbBrandCSharp
} from 'react-icons/tb';

export default function About() {
  return (
    <section
      className="py-24 md:py-32 px-6 bg-zinc-100"
      id="about"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Top Accent Line Header */}
        <div className="border-t border-black pt-3 flex justify-between items-center mb-16">
          <span className="text-[11px] font-extrabold tracking-[0.25em] text-black uppercase font-mono">
            Info
          </span>
          <span className="text-[11px] font-extrabold text-black font-mono">01</span>
        </div>

        {/* Split layout: Big text Left, Process rows Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (Big Typography Display Header) */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#050507] tracking-tight leading-[1.1] font-display">
              Professional Summary
            </h2>
            <div className="space-y-4 font-body-md text-zinc-600 text-base leading-relaxed">
              <p><strong>Tewolde Lisanwork Mekonnen</strong></p>
              <p><strong>Role:</strong> Software Engineer</p>
              <p><strong>Mission:</strong> Passionate about building complete web solutions that solve real business problems.</p>
              <p><strong>Expertise:</strong> Manages the development lifecycle—from planning and UI/UX design to frontend development and backend integration.</p>
              <p><strong>Core Delivery:</strong> Delivers websites that are visually engaging, scalable, secure, and easy to maintain using React, WordPress, and modern design practices.</p>
            </div>
          </div>

          {/* Right Column (Structured key-value rows with thin dividers) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="divide-y divide-zinc-200 border-t border-b border-zinc-200">
              {/* Row 1: Design */}
              <div className="grid grid-cols-1 sm:grid-cols-4 py-6 gap-3 sm:gap-4 items-start">
                <div className="text-xs font-bold text-[#050507] uppercase tracking-widest font-mono sm:col-span-1">
                  Strategy & Design
                </div>
                <div className="text-sm text-zinc-600 leading-relaxed sm:col-span-3">
                  Starts with understanding the problem. Focuses on intuitive interfaces created through wireframes, prototypes, and thoughtful interaction design before writing code.
                </div>
              </div>

              {/* Row 2: Develop */}
              <div className="grid grid-cols-1 sm:grid-cols-4 py-6 gap-3 sm:gap-4 items-start">
                <div className="text-xs font-bold text-[#050507] uppercase tracking-widest font-mono sm:col-span-1">
                  Core Development
                </div>
                <div className="text-sm text-zinc-600 leading-relaxed sm:col-span-3">
                  Builds clean, scalable React applications and professional WordPress websites. Prioritizes maintainable architecture, performance, accessibility, and quality.
                </div>
              </div>

              {/* Row 3: Deploy */}
              <div className="grid grid-cols-1 sm:grid-cols-4 py-6 gap-3 sm:gap-4 items-start">
                <div className="text-xs font-bold text-[#050507] uppercase tracking-widest font-mono sm:col-span-1">
                  Project Delivery
                </div>
                <div className="text-sm text-zinc-600 leading-relaxed sm:col-span-3">
                  Focuses on delivering high-quality, professional web solutions. Configures projects with a focus on usability, scalability, and long-term maintainability.
                </div>
              </div>
            </div>

            {/* Technical Skills Sub-Grid (Hover-triggered glassmorphism) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-6">
              {[
                {
                  title: "Frontend Engineering",
                  skills: [
                    { name: "React", icon: <FaReact /> },
                    { name: "JavaScript", icon: <FaJs /> },
                    { name: "HTML5", icon: <FaHtml5 /> },
                    { name: "CSS3", icon: <FaCss3Alt /> },
                    { name: "Tailwind CSS", icon: <SiTailwindcss /> },
                  ],
                },
                {
                  title: "CMS & Web Ecosystem",
                  skills: [
                    { name: "WordPress", icon: <FaWordpress /> },
                    { name: "Custom Themes", icon: <FaDraftingCompass /> },
                    { name: "Plugins", icon: <FaCog /> },
                  ],
                },
                {
                  title: "Programming & UX",
                  skills: [
                    { name: "Python", icon: <FaPython /> },
                    { name: "Java", icon: <FaJava /> },
                    { name: "C#", icon: <TbBrandCSharp /> },
                    { name: "C++", icon: <SiCplusplus /> },
                    { name: "Figma (UI/UX)", icon: <SiFigma /> },
                  ],
                },
              ].map((category) => (
                <div key={category.title} className="space-y-4">
                  <h4 className="text-[10px] font-bold text-black uppercase tracking-widest font-mono">
                    {category.title}
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="group relative p-3 rounded-xl transition-all duration-300 hover:backdrop-blur-md hover:bg-white/10 hover:border hover:border-white/20 hover:shadow-lg cursor-default"
                        title={skill.name}
                      >
                        <div className="text-xl text-zinc-400 group-hover:text-black transition-colors">
                          {skill.icon}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row: Inline Metadata */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-zinc-200 text-left">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold font-mono">Focus</p>
            <p className="text-sm text-zinc-800 font-semibold mt-1">Full Lifecycle Development</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold font-mono">Education</p>
            <p className="text-sm text-zinc-800 font-semibold mt-1">B.S. Computer Science — St. Mary's University</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold font-mono">Certifications</p>
            <p className="text-sm text-zinc-800 font-semibold mt-1">Responsive Web Design Developer Certification - FreeCodeCamp (~300 hours</p>
            <p className="text-sm text-zinc-800 font-semibold mt-1">Foundations of Project Management - Google (Coursera)</p>
          </div>
        </div>
      </div>
    </section>
  );
}
