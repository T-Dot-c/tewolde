import { useRef, useState } from "react";

interface ContactProps {
  onOpenConsole: () => void;
  messagesCount: number;
}

const TO = "tewolde.m50@gmail.com";

const GitHubIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" width={22} height={22}>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

const SOCIALS = [
  { n: "GitHub", u: "https://github.com/T-Dot-c", icon: <GitHubIcon />, ext: true },
  { n: "Email", u: `mailto:${TO}`, icon: <EmailIcon />, ext: false },
];

function validate(name: string, email: string, message: string) {
  return {
    name: name ? "" : "Enter your name.",
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "Enter an email like name@example.com.",
    message: message.length >= 10 ? "" : "Write at least a sentence about your project.",
  };
}

export default function Contact({ onOpenConsole, messagesCount }: ContactProps) {
  const [projectType, setProjectType] = useState("Website");
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [copyLabel, setCopyLabel] = useState("Copy");

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const msgRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = nameRef.current!.value.trim();
    const em = emailRef.current!.value.trim();
    const m = msgRef.current!.value.trim();
    const errs = validate(n, em, m);
    setErrors(errs);
    if (errs.name || errs.email || errs.message) {
      setStatus("");
      // focus first invalid field
      if (errs.name) nameRef.current?.focus();
      else if (errs.email) emailRef.current?.focus();
      else msgRef.current?.focus();
      return;
    }
    const body = `${m}\n\n${n}\n${em}`;
    window.location.href = `mailto:${TO}?subject=${encodeURIComponent(projectType + " project from " + n)}&body=${encodeURIComponent(body)}`;
    setStatus("Your email app should open with the message ready. Press send there. If nothing opens, copy my address and write to me directly.");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(TO);
      setCopyLabel("Copied");
    } catch {
      setCopyLabel("Select and copy");
    }
    setTimeout(() => setCopyLabel("Copy"), 2000);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-inner">
        {/* Left: headline + direct info */}
        <div className="contact-left">
          <h1 className="contact-heading">Tell me about your project.</h1>
          <p className="contact-lead">
            Say what you want to build and who it's for. I'll reply with questions or next steps.
          </p>

          <div className="contact-direct">
            <div className="contact-direct-row">
              <span className="contact-label">Email</span>
              <a href={`mailto:${TO}`} id="contact-mail" className="contact-link">{TO}</a>
              <button className="contact-copy" type="button" onClick={handleCopy}>{copyLabel}</button>
            </div>
            <div className="contact-direct-row">
              <span className="contact-label">Find me</span>
              <ul className="contact-soc" aria-label="Social media">
                {SOCIALS.map((s) => (
                  <li key={s.n}>
                    <a
                      href={s.u}
                      {...(s.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      aria-label={`${s.n}${s.ext ? " (opens in a new tab)" : ""}`}
                      title={s.n}
                      className="contact-soc-link"
                    >
                      {s.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Hidden CLI access */}
          <button
            onClick={onOpenConsole}
            className="contact-cli-btn"
          >
            [cli terminal]
            {messagesCount > 0 && <span className="contact-cli-ping" />}
          </button>
        </div>

        {/* Right: form */}
        <form id="contact-form" className="contact-form" noValidate onSubmit={handleSubmit}>
          <fieldset className="contact-fieldset">
            <legend className="contact-legend">What do you need?</legend>
            <div className="contact-opts">
              {["Website", "Web app", "Design", "Something else"].map((opt, i) => (
                <span key={opt}>
                  <input
                    type="radio"
                    name="type"
                    id={`ct${i + 1}`}
                    value={opt}
                    checked={projectType === opt}
                    onChange={() => setProjectType(opt)}
                    className="contact-radio"
                  />
                  <label htmlFor={`ct${i + 1}`} className="contact-opt-label">{opt}</label>
                </span>
              ))}
            </div>
          </fieldset>

          <div className="contact-two">
            <div>
              <label htmlFor="contact-name" className="contact-field-label">Your name</label>
              <input
                type="text"
                id="contact-name"
                ref={nameRef}
                autoComplete="name"
                aria-describedby="contact-name-err"
                aria-invalid={!!errors.name}
                className={`contact-input${errors.name ? " contact-input--err" : ""}`}
              />
              <p className="contact-err" id="contact-name-err">{errors.name}</p>
            </div>
            <div>
              <label htmlFor="contact-email" className="contact-field-label">Your email</label>
              <input
                type="email"
                id="contact-email"
                ref={emailRef}
                autoComplete="email"
                aria-describedby="contact-email-err"
                aria-invalid={!!errors.email}
                className={`contact-input${errors.email ? " contact-input--err" : ""}`}
              />
              <p className="contact-err" id="contact-email-err">{errors.email}</p>
            </div>
          </div>

          <div>
            <label htmlFor="contact-msg" className="contact-field-label">Your message</label>
            <textarea
              id="contact-msg"
              ref={msgRef}
              aria-describedby="contact-msg-err"
              aria-invalid={!!errors.message}
              placeholder="What are you building? Is there a deadline?"
              className={`contact-textarea${errors.message ? " contact-input--err" : ""}`}
            />
            <p className="contact-err" id="contact-msg-err">{errors.message}</p>
          </div>

          <button className="contact-send" type="submit">Open email to send</button>

          {status && (
            <p className="contact-status" role="status">
              <b>{status}</b>
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
