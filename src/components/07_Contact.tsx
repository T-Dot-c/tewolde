import { FormEvent, MouseEvent } from "react";

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
  onOpenConsole,
  messagesCount,
}: ContactProps) {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-cream text-ink" id="contact">
      <div className="max-w-[1200px] mx-auto space-y-16">
        {/* Eyebrow and Headline */}
        <div className="space-y-4">
          <span className="text-[11px] font-mono tracking-[0.25em] text-muted-foreground uppercase block font-semibold">
            GET IN TOUCH
          </span>
          <h2 className="font-display text-5xl md:text-7xl font-extrabold tracking-tight text-ink leading-[1.1] max-w-3xl">
            Let's build <br />
            something <span className="text-ember">worthwhile.</span>
          </h2>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 pt-8">
          {/* Left Column (Email & Phone) */}
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.25em] text-muted-foreground uppercase block font-semibold">
                EMAIL
              </span>
              <a
                href="mailto:tewolde.m50@gmail.com"
                className="font-display text-xl sm:text-2xl font-bold text-ink hover:text-ember transition-colors duration-250 underline underline-offset-8 decoration-token-border hover:decoration-ember"
              >
                tewolde.m50@gmail.com
              </a>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.25em] text-muted-foreground uppercase block font-semibold">
                PHONE
              </span>
              <a
                href="tel:+251988157550"
                className="font-display text-xl sm:text-2xl font-bold text-ink hover:text-ember transition-colors duration-250 underline underline-offset-8 decoration-token-border hover:decoration-ember"
              >
                +251 988 15 75 50
              </a>
            </div>
          </div>

          {/* Right Column (Github & Location) */}
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.25em] text-muted-foreground uppercase block font-semibold">
                GITHUB
              </span>
              <a
                href="https://github.com/T-Dot-c"
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-xl sm:text-2xl font-bold text-ink hover:text-ember transition-colors duration-250 underline underline-offset-8 decoration-token-border hover:decoration-ember"
              >
                github.com/T-Dot-c
              </a>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.25em] text-muted-foreground uppercase block font-semibold">
                LOCATION
              </span>
              <p className="font-display text-xl sm:text-2xl font-bold text-ink">
                Addis Ababa, Ethiopia
              </p>
            </div>
          </div>
        </div>

        {/* Hidden CLI Access button */}
        <div className="flex justify-start pt-8">
          <button
            onClick={onOpenConsole}
            className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/45 hover:text-ink transition-colors duration-250 flex items-center gap-1.5 focus:outline-none"
          >
            [cli terminal]
            {messagesCount > 0 && (
              <span className="w-1.5 h-1.5 rounded-full bg-ember animate-ping" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
