import { useState, useRef, useEffect, useCallback, PointerEvent, CSSProperties } from "react";

export default function Hero() {
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

  // Intro sweep animation: sketch to live (100% down to 38%)
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
        // Cubic ease-out curve
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
      // Ignore if pointer capture was already released
    }
  };

  return (
    <section
      className="hero-wrapper relative min-h-screen pt-24 md:pt-28 pb-12 px-4 md:px-8 border-b border-token-border"
      id="hero"
    >
      <div className="hero-grid">
        {/* Left Column: Headline, Bio & CTAs */}
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
            {/* Browser Mockup Top Bar */}
            <div className="hero-bar">
              <i />
              <i />
              <i />
              <em>abed-dermatology.example</em>
            </div>

            {/* Split Screen Stage */}
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
              {/* Underneath Wireframe / Sketch Layer */}
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

              {/* Overlaid Live Finished Product Layer (Clipped by --x) */}
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

              {/* Draggable Divider Handle */}
              <div className="hero-handle" />

              {/* Floating Pill Labels */}
              <span className="hero-tag l">Live</span>
              <span className="hero-tag r">Sketch</span>
            </div>

            {/* Range Slider Controller */}
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
    </section>
  );
}
