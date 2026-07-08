import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';
import { ArrowRight, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-32"
      id="hero"
    >
      <div className="relative z-10 max-w-[1200px] mx-auto text-center space-y-8">

        {/* Main Heading: Typewriter Effect */}
        <h1 className="font-display-xl-mobile md:font-display-xl text-5xl md:text-7xl max-w-4xl mx-auto text-[#050507] tracking-tight leading-[1.1] min-h-[2.2em] md:min-h-[2em] flex flex-col items-center justify-center">
          <TypeAnimation
            sequence={[
              'Building Complete\n Web Solutions.',
              2000,
              '',
              1000,
            ]}
            wrapper="span"
            speed={55}
            // Setting repeat to Infinity makes it loop forever
            repeat={Infinity}
            style={{ whiteSpace: 'pre-line', display: 'inline-block' }}
          />
        </h1>

        {/* Body Paragraph: Adjusted delay to wait for typing sequence to finish */}
        <motion.p
          initial={{ opacity: 0, y: 20 }} // Starts lower and invisible
          animate={{ opacity: 1, y: 0 }}   // Slides up and fades in
          transition={{
            duration: 1.0,
            delay: 3.0, // Triggers once the heading typing sequence finishes
            ease: [0.21, 0.47, 0.32, 0.98]
          }}
          className="font-body-lg text-lg text-zinc-600 max-w-3xl mx-auto leading-relaxed"
        >
          I build end-to-end web products — from UI design to cloud deployment — combining frontend development, DevOps practices, and AI-assisted workflows to deliver scalable, user-centered solutions.
        </motion.p>

        {/* CTA Buttons: We'll fade these in slightly after the paragraph for hierarchy */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.7,
            delay: 3.2, // Pushed back to appear after the paragraph slides up
            ease: "easeOut"
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <motion.a
            whileHover={{ scale: 1.05, y: -2, opacity: 0.8 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto bg-[#050507]/80 backdrop-blur-md border border-black/10 text-white px-2 py-2 pr-6 rounded-full font-body-md text-sm shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex justify-center items-center gap-3 cursor-pointer transition-colors hover:bg-black"
            href="#work"
          >
            <motion.div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center" whileHover={{ x: 8 }} whileTap={{ x: 4 }}>
              <ArrowRight className="w-5 h-5 text-white" />
            </motion.div>
            Explore My Work
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05, y: -2, opacity: 0.8 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto bg-black/5 backdrop-blur-md border border-black/10 text-[#050507] px-2 py-2 pr-6 rounded-full font-body-md text-sm flex justify-center items-center gap-3 cursor-pointer transition-colors hover:bg-black/10"
            href="#contact"
          >
            <motion.div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center" whileHover={{ x: 8 }} whileTap={{ x: 4 }}>
              <Mail className="w-5 h-5 text-[#050507]" />
            </motion.div>
            Get In Touch
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
