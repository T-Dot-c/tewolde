import { useState, useRef, useEffect, useCallback, PointerEvent, CSSProperties } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTheme } from "../ThemeContext";

interface Plan {
  id: string;
  name: string;
  price: number;
  desc: string;
}

interface Extra {
  id: string;
  name: string;
  price: number;
}

const PLANS: Plan[] = [
  { id: "s", name: "Starter", price: 9, desc: "1 project" },
  { id: "p", name: "Pro", price: 29, desc: "10 projects" },
  { id: "t", name: "Team", price: 79, desc: "Unlimited" },
];

const EXTRAS: Extra[] = [
  { id: "seat", name: "Extra seats", price: 5 },
  { id: "sup", name: "Priority support", price: 10 },
  { id: "dom", name: "Custom domain", price: 4 },
];

const INITIAL_BARS = [38, 44, 41, 52, 49, 58, 55, 63, 68, 66, 74, 82];

export default function Hero() {
  const { INK, MUTE, ACCENT, ACCENT_INK, BORDER, CARD, NAV_BORDER } = useTheme();
  const [activeSlide, setActiveSlide] = useState<number>(0);

  // ── Slide 1 State: Sketch to Live Comparison ───────────────────────
  const [sliderPos, setSliderPos] = useState<number>(100);
  const stageRef = useRef<HTMLDivElement>(null);
  const isPointerDownRef = useRef<boolean>(false);

  const updatePosition = useCallback((val: number) => {
    const clamped = Math.max(0, Math.min(100, val));
    setSliderPos(clamped);
    if (stageRef.current) {
      stageRef.current.style.setProperty("--x", `${clamped}%`);
    }
  }, []);

  // Intro sweep animation for Slide 1
  useEffect(() => {
    updatePosition(100);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      let t0: number | null = null;
      const targetPos = 38;
      let animId: number;

      const step = (t: number) => {
        if (isPointerDownRef.current) return;
        if (t0 === null) t0 = t + 350;
        const p = Math.min(1, Math.max(0, (t - t0) / 1400));
        const eased = 100 - (100 - targetPos) * (1 - Math.pow(1 - p, 3));
        updatePosition(eased);
        if (p < 1) {
          animId = requestAnimationFrame(step);
        }
      };

      animId = requestAnimationFrame(step);
      return () => cancelAnimationFrame(animId);
    } else {
      updatePosition(38);
    }
  }, [updatePosition]);

  const handlePointerAt = (clientX: number) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const percent = ((clientX - rect.left) / rect.width) * 100;
    updatePosition(percent);
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    isPointerDownRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    handlePointerAt(e.clientX);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (isPointerDownRef.current) {
      handlePointerAt(e.clientX);
    }
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    isPointerDownRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
  };

  // ── Slide 2 State: Interactive SaaS Pricing & Billing Builder ─────
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [isYearly, setIsYearly] = useState(false);
  const [mrr, setMrr] = useState(12480);
  const [displayedMrr, setDisplayedMrr] = useState(0);
  const [chartBars, setChartBars] = useState<number[]>(INITIAL_BARS);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [receiptEmail, setReceiptEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [toastMsg, setToastMsg] = useState<{ who: string; planName: string; amount: number } | null>(null);
  const [statusText, setStatusText] = useState("");

  // Drag and Drop tracking
  const zoneRef = useRef<HTMLDivElement>(null);
  const [dragState, setDragState] = useState<{
    item: { type: "plan" | "extra"; id: string; name: string; price: number; desc?: string };
    x: number;
    y: number;
    isDragging: boolean;
  } | null>(null);
  const [isZoneHot, setIsZoneHot] = useState(false);

  const isPointInZone = (clientX: number, clientY: number) => {
    if (!zoneRef.current) return false;
    const rect = zoneRef.current.getBoundingClientRect();
    return (
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom
    );
  };

  const handleDragStart = (
    e: PointerEvent<HTMLButtonElement>,
    item: { type: "plan" | "extra"; id: string; name: string; price: number; desc?: string }
  ) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragState({
      item,
      x: e.clientX,
      y: e.clientY,
      isDragging: false,
    });
  };

  const handleDragMove = (e: PointerEvent<HTMLButtonElement>) => {
    if (!dragState) return;
    const inZone = isPointInZone(e.clientX, e.clientY);
    setIsZoneHot(inZone);
    const dist = Math.hypot(e.clientX - dragState.x, e.clientY - dragState.y);
    if (!dragState.isDragging && dist > 5) {
      setDragState(prev => prev ? { ...prev, isDragging: true, x: e.clientX, y: e.clientY } : null);
    } else if (dragState.isDragging) {
      setDragState(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : null);
    }
  };

  const handleDragEnd = (e: PointerEvent<HTMLButtonElement>) => {
    if (!dragState) return;
    const inZone = isPointInZone(e.clientX, e.clientY);
    setIsZoneHot(false);

    if (inZone || !dragState.isDragging) {
      if (dragState.item.type === "plan") {
        const found = PLANS.find(p => p.id === dragState.item.id);
        if (found) {
          setSelectedPlan(found);
          setStatusText(`${found.name} plan added.`);
        }
      } else {
        if (!selectedExtras.includes(dragState.item.id)) {
          setSelectedExtras(prev => [...prev, dragState.item.id]);
          const found = EXTRAS.find(x => x.id === dragState.item.id);
          if (found) setStatusText(`${found.name} added.`);
        }
      }
    } else {
      setStatusText("Drop it inside the dashed box to add it.");
    }

    setDragState(null);
  };

  // Animated MRR counter
  const animateMrr = useCallback((fromVal: number, toVal: number, durationMs = 1000) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayedMrr(toVal);
      return;
    }
    const t0 = performance.now();
    let frameId: number;
    const step = (t: number) => {
      const progress = Math.min(1, (t - t0) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayedMrr(Math.round(fromVal + (toVal - fromVal) * eased));
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };
    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (activeSlide === 1) {
      animateMrr(0, mrr, 1200);
    }
  }, [activeSlide, animateMrr, mrr]);

  const baseMonthly = (selectedPlan ? selectedPlan.price : 0) +
    selectedExtras.reduce((sum, id) => {
      const extra = EXTRAS.find(e => e.id === id);
      return sum + (extra ? extra.price : 0);
    }, 0);

  const effectiveMonthly = isYearly ? (baseMonthly * 10) / 12 : baseMonthly;
  const yearlyTotal = baseMonthly * 10;

  const handleConfirmPurchase = () => {
    const trimmed = receiptEmail.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!isValid) {
      setEmailError("Enter an email like name@example.com.");
      return;
    }
    setEmailError("");
    const addedAmount = Math.round(isYearly ? (baseMonthly * 10) / 12 : baseMonthly);
    const prevMrr = mrr;
    const nextMrr = mrr + addedAmount;
    setMrr(nextMrr);
    animateMrr(prevMrr, nextMrr, 900);

    // Expand chart last bar
    setChartBars(prev => {
      const copy = [...prev];
      copy[copy.length - 1] = Math.min(100, copy[copy.length - 1] + Math.max(5, Math.round(addedAmount / 3)));
      return copy;
    });

    const pName = selectedPlan?.name || "Pro";
    const initial = trimmed[0].toUpperCase();
    setToastMsg({ who: initial, planName: pName, amount: addedAmount });
    setStatusText(`Subscribed to ${pName}. Monthly recurring revenue grew by $${addedAmount}/mo.`);

    setTimeout(() => {
      setToastMsg(null);
    }, 5200);

    setSelectedPlan(null);
    setSelectedExtras([]);
    setReceiptEmail("");
    setIsCheckoutOpen(false);
  };

  return (
    <section
      className="hero-wrapper relative min-h-screen pt-24 md:pt-28 pb-14 border-b border-token-border overflow-hidden"
      id="hero"
    >
      {/* ── Left Side Floating Arrow Button ───────────────────────── */}
      <button
        type="button"
        onClick={() => setActiveSlide(prev => (prev === 0 ? 1 : 0))}
        aria-label="Previous showcase"
        className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95"
        style={{
          border: `2px solid ${INK}`,
          background: CARD,
          color: INK,
          boxShadow: `3px 3px 0 ${INK}`,
        }}
        title={activeSlide === 0 ? "Switch to SaaS Showcase" : "Switch to Web Showcase"}
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* ── Right Side Floating Arrow Button ──────────────────────── */}
      <button
        type="button"
        onClick={() => setActiveSlide(prev => (prev === 0 ? 1 : 0))}
        aria-label="Next showcase"
        className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95"
        style={{
          border: `2px solid ${INK}`,
          background: CARD,
          color: INK,
          boxShadow: `3px 3px 0 ${INK}`,
        }}
        title={activeSlide === 0 ? "Switch to SaaS Showcase" : "Switch to Web Showcase"}
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* ── Sliding Track ─────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden">
        <div
          className="hero-slider-track"
          style={{
            transform: `translateX(-${activeSlide * 50}%)`,
          }}
        >
          {/* ══════════════════════════════════════════════════════════════
              SLIDE 1: Websites, Sketch to Live (Original Showcase)
             ══════════════════════════════════════════════════════════════ */}
          <div className="hero-slide">
            <div className="hero-grid">
              {/* Left Column */}
              <div>
                <h1 className="hero-title">
                  Websites,
                  <span>sketch to live.</span>
                </h1>

                <p className="hero-sub">
                  I'm Tewolde, a web developer. I design the pages, build them in React or WordPress, and ship them so your customers can use them.
                </p>

                <div className="hero-cta">
                  <a className="hero-btn main" href="#demos">
                    See my work
                  </a>
                  <a className="hero-btn" href="#contact">
                    Start a project
                  </a>
                </div>
              </div>

              {/* Right Column: Interactive Comparison Stage */}
              <section aria-label="Sketch to finished site comparison">
                <div className="hero-frame">
                  <div className="hero-bar">
                    <i />
                    <i />
                    <i />
                    <em>abed-dermatology.example</em>
                  </div>

                  <div
                    ref={stageRef}
                    className="hero-stage"
                    id="stage"
                    style={{ "--x": `${sliderPos}%` } as CSSProperties}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                  >
                    <div className="hero-layer hero-wire" aria-hidden="true">
                      <div className="hero-wire-nav">
                        <span>logo</span>
                        <span>services · about · book</span>
                      </div>
                      <div className="hero-wire-big">headline + one clear action</div>
                      <div className="hero-wire-row">
                        <div>service</div>
                        <div>service</div>
                        <div>service</div>
                      </div>
                    </div>

                    <div className="hero-layer hero-live">
                      <div className="hero-live-nav">
                        <span className="hero-live-logo">Abed Skin</span>
                        <span>Services &nbsp; About &nbsp; Book</span>
                      </div>
                      <h2>Clear skin starts with a plan.</h2>
                      <p>Book a visit in two taps and see a doctor this week.</p>
                      <span className="hero-live-btn">Book a visit</span>
                      <div className="hero-live-img" />
                      <div className="hero-live-row">
                        <span>Acne care</span>
                        <span>Laser</span>
                        <span>Kids</span>
                      </div>
                    </div>

                    <div className="hero-handle" />
                    <span className="hero-tag l">Live</span>
                    <span className="hero-tag r">Sketch</span>
                  </div>

                  <input
                    className="hero-range"
                    type="range"
                    min="0"
                    max="100"
                    value={Math.round(sliderPos)}
                    onChange={(e) => updatePosition(Number(e.target.value))}
                    aria-label="Compare finished site and sketch"
                  />
                </div>

                <p className="hero-cap">
                  Drag across the page to move between the sketch and the finished site.
                </p>
              </section>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              SLIDE 2: SaaS Products People Pay For (Interactive Demo)
             ══════════════════════════════════════════════════════════════ */}
          <div className="hero-slide">
            <div className="hero-grid">
              {/* Left Column: SaaS Value Proposition */}
              <div>
                <h1 className="hero-title hero-title-saas">
                  SaaS products people
                  <span>pay for.</span>
                </h1>

                <p className="hero-sub">
                  I'm Tewolde. I build the product and the website that sells it: sign-up, the dashboard your customers use every day, and the pricing page that turns visitors into subscribers.
                </p>

                <div className="hero-cta">
                  <a className="hero-btn main" href="#contact">
                    Plan my product
                  </a>
                  <a className="hero-btn" href="#demos">
                    See my work
                  </a>
                </div>

                <ul className="flex flex-wrap gap-2 list-none p-0 mt-7" aria-label="What I build">
                  {["Sign-up and login", "Customer dashboard", "Pricing and billing", "Marketing site"].map(item => (
                    <li key={item} className="saas-scope-tag">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column: Interactive SaaS Demo App */}
              <section aria-label="Interactive SaaS demo" className="relative">
                <div className="hero-frame relative">
                  {/* Browser Bar */}
                  <div className="hero-bar">
                    <i />
                    <i />
                    <i />
                    <em>app.yoursaas.example/plans</em>
                  </div>

                  {/* App Body */}
                  <div className="p-4 md:p-6 grid gap-4 bg-inherit">
                    {/* Top Metrics Row */}
                    <div className="flex justify-between items-end gap-3 pb-3 border-b border-token-border">
                      <div>
                        <small className="block text-xs font-semibold" style={{ color: MUTE }}>
                          Monthly recurring revenue
                        </small>
                        <div
                          className="font-extrabold text-2xl md:text-3xl font-mono tracking-tight"
                          style={{ color: INK }}
                        >
                          ${displayedMrr.toLocaleString()}
                        </div>
                      </div>

                      {/* Bar Chart */}
                      <div className="flex items-end gap-1 h-12 w-44" aria-hidden="true">
                        {chartBars.map((height, idx) => (
                          <span
                            key={idx}
                            className="flex-1 rounded-t transition-all duration-500"
                            style={{
                              height: `${height}%`,
                              background: idx === chartBars.length - 1 ? ACCENT : INK,
                              opacity: idx === chartBars.length - 1 ? 1 : 0.25,
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Step 1: Drag a plan */}
                    <div>
                      <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: MUTE }}>
                        1. Drag a plan into the box
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {PLANS.map(p => (
                          <button
                            key={p.id}
                            type="button"
                            onPointerDown={(e) => handleDragStart(e, { type: "plan", id: p.id, name: p.n || p.name, price: p.price, desc: p.desc })}
                            onPointerMove={handleDragMove}
                            onPointerUp={handleDragEnd}
                            onPointerCancel={handleDragEnd}
                            className="saas-drag flex-1 min-w-[100px]"
                          >
                            <div className="font-bold flex justify-between items-center text-sm">
                              <span>{p.name}</span>
                              <span style={{ color: ACCENT }}>${p.price}</span>
                            </div>
                            <small className="block text-xs" style={{ color: MUTE }}>
                              {p.desc}
                            </small>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Step 2: Add extras */}
                    <div>
                      <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: MUTE }}>
                        2. Add extras
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {EXTRAS.map(extra => (
                          <button
                            key={extra.id}
                            type="button"
                            onPointerDown={(e) => handleDragStart(e, { type: "extra", id: extra.id, name: extra.name, price: extra.price })}
                            onPointerMove={handleDragMove}
                            onPointerUp={handleDragEnd}
                            onPointerCancel={handleDragEnd}
                            className="saas-drag extra flex-1 min-w-[100px]"
                          >
                            <div className="font-bold flex justify-between items-center text-xs">
                              <span>{extra.name}</span>
                              <span style={{ color: ACCENT }}>+${extra.price}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Step 3: Dashed Drop Zone */}
                    <div
                      ref={zoneRef}
                      className={`saas-drop-zone ${isZoneHot ? "hot" : ""}`}
                      aria-label="Your customized plan box"
                    >
                      {!selectedPlan && selectedExtras.length === 0 ? (
                        <p className="m-auto text-center text-sm font-medium" style={{ color: MUTE }}>
                          Drop a plan here
                        </p>
                      ) : (
                        <div className="flex flex-wrap gap-2 w-full items-center">
                          {selectedPlan && (
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedPlan(null);
                                setStatusText("Plan removed.");
                              }}
                              className="saas-tag pl cursor-pointer"
                              title="Click to remove plan"
                            >
                              <span>{selectedPlan.name}</span>
                              <span>${selectedPlan.price}</span>
                              <X className="w-3.5 h-3.5 ml-1" />
                            </button>
                          )}
                          {selectedExtras.map(id => {
                            const extra = EXTRAS.find(e => e.id === id);
                            if (!extra) return null;
                            return (
                              <button
                                key={id}
                                type="button"
                                onClick={() => {
                                  setSelectedExtras(prev => prev.filter(x => x !== id));
                                  setStatusText(`${extra.name} removed.`);
                                }}
                                className="saas-tag cursor-pointer"
                                title="Click to remove extra"
                              >
                                <span>{extra.name}</span>
                                <span>+${extra.price}</span>
                                <X className="w-3.5 h-3.5 ml-1" />
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Step 4: Total & Period Switcher */}
                    <div className="flex flex-wrap justify-between items-center gap-3 pt-2">
                      <div>
                        <div className="font-extrabold text-2xl font-mono" style={{ color: INK }}>
                          {selectedPlan ? `$${(Math.round(effectiveMonthly * 100) / 100)}/mo` : "$0"}
                        </div>
                        <small className="block text-xs" style={{ color: MUTE }}>
                          {!selectedPlan
                            ? (selectedExtras.length ? "Extras need a plan. Add one first." : "Pick a plan to start")
                            : (isYearly ? `Billed $${yearlyTotal} a year. 2 months free.` : "Billed monthly")}
                        </small>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Monthly / Yearly Segmented Toggle */}
                        <div
                          role="group"
                          aria-label="Billing period"
                          className="inline-flex rounded-full overflow-hidden p-0.5 border-2"
                          style={{ borderColor: INK, background: CARD }}
                        >
                          <button
                            type="button"
                            aria-pressed={!isYearly}
                            onClick={() => setIsYearly(false)}
                            className="px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer"
                            style={{
                              background: !isYearly ? INK : "transparent",
                              color: !isYearly ? (INK === "#ffffff" ? "#050507" : "#ffffff") : MUTE,
                            }}
                          >
                            Monthly
                          </button>
                          <button
                            type="button"
                            aria-pressed={isYearly}
                            onClick={() => setIsYearly(true)}
                            className="px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer"
                            style={{
                              background: isYearly ? INK : "transparent",
                              color: isYearly ? (INK === "#ffffff" ? "#050507" : "#ffffff") : MUTE,
                            }}
                          >
                            Yearly
                          </button>
                        </div>

                        {/* Step 5: Subscribe Button */}
                        <button
                          type="button"
                          disabled={!selectedPlan}
                          onClick={() => {
                            setIsCheckoutOpen(true);
                            setStatusText("");
                          }}
                          className="px-5 py-2.5 rounded-full text-xs font-bold cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow"
                          style={{
                            background: ACCENT,
                            color: ACCENT_INK,
                          }}
                        >
                          Subscribe
                        </button>
                      </div>
                    </div>

                    {/* Step 6: Checkout Drawer */}
                    {isCheckoutOpen && (
                      <div
                        className="p-3.5 rounded-xl border-2 grid gap-2.5 mt-2 animate-fadeIn"
                        style={{ borderColor: INK, background: CARD }}
                      >
                        <div>
                          <label htmlFor="checkout-email" className="block text-xs font-bold mb-1" style={{ color: INK }}>
                            Email for your receipt
                          </label>
                          <input
                            id="checkout-email"
                            type="email"
                            value={receiptEmail}
                            onChange={(e) => setReceiptEmail(e.target.value)}
                            placeholder="name@example.com"
                            className="w-full text-xs p-2.5 rounded-lg border-2 outline-none font-sans"
                            style={{
                              borderColor: emailError ? "#ef4444" : BORDER,
                              background: CARD,
                              color: INK,
                            }}
                            autoFocus
                          />
                          {emailError && <p className="text-xs text-red-500 mt-1 font-medium">{emailError}</p>}
                        </div>
                        <small className="text-[11px]" style={{ color: MUTE }}>
                          Demo only. No card is needed and nothing is charged.
                        </small>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handleConfirmPurchase}
                            className="px-4 py-1.5 rounded-full text-xs font-bold cursor-pointer"
                            style={{ background: ACCENT, color: ACCENT_INK }}
                          >
                            Confirm purchase
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setIsCheckoutOpen(false);
                              setEmailError("");
                            }}
                            className="px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer border"
                            style={{ borderColor: BORDER, color: INK }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {statusText && (
                      <p className="text-xs font-medium m-0" style={{ color: MUTE }}>
                        {statusText}
                      </p>
                    )}
                  </div>

                  {/* Toast Notification */}
                  {toastMsg && (
                    <div className="saas-toast">
                      <span
                        className="w-7 h-7 rounded-full flex items-center justify-center font-extrabold text-xs flex-none"
                        style={{ background: ACCENT, color: ACCENT_INK }}
                      >
                        {toastMsg.who}
                      </span>
                      <div>
                        <b>New subscriber</b>
                        <br />
                        {toastMsg.planName} plan, +${toastMsg.amount}/mo
                      </div>
                    </div>
                  )}
                </div>

                <p className="hero-cap">
                  Sample data. You can drag with a mouse or finger, or click on a plan or extra to add it.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Ghost Element during drag */}
      {dragState?.isDragging && (
        <div
          className="saas-ghost"
          style={{
            left: `${dragState.x}px`,
            top: `${dragState.y}px`,
          }}
        >
          {dragState.item.name} (${dragState.item.price})
        </div>
      )}

      {/* Slide Pagination Indicator Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <button
          type="button"
          onClick={() => setActiveSlide(0)}
          aria-label="Go to slide 1"
          className="w-2.5 h-2.5 rounded-full transition-all duration-200 cursor-pointer"
          style={{
            background: activeSlide === 0 ? INK : NAV_BORDER,
            transform: activeSlide === 0 ? "scale(1.3)" : "scale(1)",
          }}
        />
        <button
          type="button"
          onClick={() => setActiveSlide(1)}
          aria-label="Go to slide 2"
          className="w-2.5 h-2.5 rounded-full transition-all duration-200 cursor-pointer"
          style={{
            background: activeSlide === 1 ? ACCENT : NAV_BORDER,
            transform: activeSlide === 1 ? "scale(1.3)" : "scale(1)",
          }}
        />
      </div>
    </section>
  );
}
