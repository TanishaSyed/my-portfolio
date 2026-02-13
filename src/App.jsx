import { useState, useEffect, useRef } from "react";
import { ArrowRight, ExternalLink, Mail, Linkedin, ChevronDown, Zap, Shield, Brain, GitBranch, Users, BarChart3, Award, Terminal, Layers, Target, CheckCircle2 } from "lucide-react";

// ─── Intersection Observer Hook ───
function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold: 0.15, ...options }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);
  return [ref, isInView];
}

// ─── Animated Section Wrapper ───
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, isInView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Typing Animation Component ───
function TypingText({ text, speed = 40 }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) { clearInterval(iv); setDone(true); }
    }, speed);
    return () => clearInterval(iv);
  }, [text, speed]);
  return (
    <span>
      {displayed}
      {!done && <span style={{ animation: "blink 1s step-end infinite" }}>▌</span>}
    </span>
  );
}

// ─── Metric Card ───
function MetricCard({ value, label, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
        transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
      className="relative group"
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(135deg, rgba(99,145,255,0.08), rgba(139,92,246,0.06))", filter: "blur(1px)" }} />
      <div className="relative p-6 rounded-2xl border" style={{ borderColor: "rgba(148,163,184,0.08)", background: "rgba(15,23,42,0.6)", backdropFilter: "blur(12px)" }}>
        <div className="text-3xl font-bold mb-1" style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: "#93bbff" }}>{value}</div>
        <div className="text-sm" style={{ color: "rgba(148,163,184,0.7)", fontFamily: "'DM Sans', sans-serif" }}>{label}</div>
      </div>
    </div>
  );
}

// ─── Skill Pill ───
function SkillPill({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-300 hover:scale-105 cursor-default"
      style={{ borderColor: "rgba(148,163,184,0.1)", background: "rgba(15,23,42,0.5)", backdropFilter: "blur(8px)" }}>
      <Icon size={15} style={{ color: "#7da6f7" }} />
      <span className="text-sm" style={{ color: "rgba(203,213,225,0.9)", fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
    </div>
  );
}

// ─── Badge ───
function CertBadge({ title, sub }) {
  return (
    <div className="flex items-center gap-3 px-5 py-3 rounded-xl border transition-all duration-300 hover:border-opacity-30 group"
      style={{ borderColor: "rgba(99,145,255,0.15)", background: "linear-gradient(135deg, rgba(15,23,42,0.8), rgba(30,41,59,0.4))" }}>
      <Award size={18} style={{ color: "#7da6f7" }} className="group-hover:rotate-12 transition-transform duration-300" />
      <div>
        <div className="text-sm font-semibold" style={{ color: "#e2e8f0", fontFamily: "'DM Sans', sans-serif" }}>{title}</div>
        <div className="text-xs" style={{ color: "rgba(148,163,184,0.6)" }}>{sub}</div>
      </div>
    </div>
  );
}

// ─── Timeline Item ───
function TimelineItem({ title, org, description, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className="relative pl-8 pb-10 group"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-20px)",
        transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 transition-colors duration-300 group-hover:scale-125"
        style={{ borderColor: "#6391ff", background: "rgba(99,145,255,0.2)" }} />
      <div className="absolute left-[5px] top-5 w-px bottom-0" style={{ background: "linear-gradient(to bottom, rgba(99,145,255,0.3), transparent)" }} />
      <h4 className="text-lg font-semibold mb-1" style={{ color: "#e2e8f0", fontFamily: "'DM Sans', sans-serif" }}>{org}</h4>
      <p className="text-sm mb-2" style={{ color: "#7da6f7", fontFamily: "'DM Sans', sans-serif" }}>{title}</p>
      <p className="text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.75)", fontFamily: "'DM Sans', sans-serif" }}>{description}</p>
    </div>
  );
}

// ═══════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════
export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ background: "#060b18", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      {/* ── Google Fonts ── */}
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes grain {
          0%, 100% { transform: translate(0,0); }
          10% { transform: translate(-5%,-10%); }
          30% { transform: translate(3%,5%); }
          50% { transform: translate(-3%,2%); }
          70% { transform: translate(7%,-5%); }
          90% { transform: translate(-2%,8%); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        ::selection { background: rgba(99,145,255,0.3); color: #fff; }
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>

      {/* ── Grain Overlay ── */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 50, opacity: 0.03, background: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", animation: "grain 8s steps(10) infinite" }} />

      {/* ── Nav ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 transition-all duration-500"
        style={{
          background: scrollY > 50 ? "rgba(6,11,24,0.85)" : "transparent",
          backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
          borderBottom: scrollY > 50 ? "1px solid rgba(148,163,184,0.06)" : "1px solid transparent",
        }}
      >
        <div className="flex items-center gap-2">
          <Terminal size={18} style={{ color: "#6391ff" }} />
          <span className="text-sm font-semibold tracking-wide" style={{ color: "#e2e8f0" }}>tanisha.ai</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["projects", "skills", "journey", "contact"].map((s) => (
            <button key={s} onClick={() => scrollTo(s)}
              className="text-sm capitalize tracking-wide transition-colors duration-300 bg-transparent border-none cursor-pointer"
              style={{ color: "rgba(148,163,184,0.6)", fontFamily: "'DM Sans', sans-serif" }}
              onMouseEnter={(e) => (e.target.style.color = "#93bbff")}
              onMouseLeave={(e) => (e.target.style.color = "rgba(148,163,184,0.6)")}
            >
              {s}
            </button>
          ))}
        </div>
      </nav>

      {/* ═══════════════════════════════════════ */}
      {/* HERO SECTION */}
      {/* ═══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
        {/* Background orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute rounded-full" style={{ width: 600, height: 600, top: "-10%", right: "-10%", background: "radial-gradient(circle, rgba(99,145,255,0.06) 0%, transparent 70%)", animation: "float 8s ease-in-out infinite" }} />
          <div className="absolute rounded-full" style={{ width: 500, height: 500, bottom: "-5%", left: "-8%", background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)", animation: "float 10s ease-in-out infinite 2s" }} />
          <div className="absolute rounded-full" style={{ width: 200, height: 200, top: "40%", left: "60%", background: "radial-gradient(circle, rgba(99,145,255,0.04) 0%, transparent 70%)", animation: "float 6s ease-in-out infinite 1s" }} />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(99,145,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(99,145,255,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border" style={{ borderColor: "rgba(99,145,255,0.15)", background: "rgba(99,145,255,0.05)" }}>
              <div className="w-2 h-2 rounded-full" style={{ background: "#6391ff", animation: "pulseGlow 2s ease-in-out infinite" }} />
              <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(148,163,184,0.7)", fontFamily: "'JetBrains Mono', monospace" }}>Open to opportunities</span>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <h1 className="text-5xl md:text-7xl leading-tight mb-6" style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: "#f1f5f9" }}>
              Bridging the Gap Between{" "}
              <span style={{ background: "linear-gradient(135deg, #6391ff, #a78bfa, #6391ff)", backgroundSize: "200% 200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "gradientShift 4s ease infinite" }}>
                AI Innovation
              </span>
              {" "}and Scalable Business Value
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed" style={{ color: "rgba(148,163,184,0.75)" }}>
              AI Product Manager specializing in LLMOps, Responsible AI, and turning complex technical constraints into shippable products.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex items-center justify-center gap-3 flex-wrap mb-10">
              {["CAPM®", "CSPO®", "CPMAI™"].map((c) => (
                <span key={c} className="px-3 py-1 rounded-md text-xs font-medium tracking-wide" style={{ background: "rgba(99,145,255,0.08)", color: "#7da6f7", border: "1px solid rgba(99,145,255,0.12)", fontFamily: "'JetBrains Mono', monospace" }}>{c}</span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <button onClick={() => scrollTo("projects")}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 border-none cursor-pointer"
                style={{ background: "linear-gradient(135deg, #4a7cff, #6391ff)", color: "#fff", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 0 30px rgba(99,145,255,0.2)" }}
                onMouseEnter={(e) => (e.target.style.boxShadow = "0 0 40px rgba(99,145,255,0.35)")}
                onMouseLeave={(e) => (e.target.style.boxShadow = "0 0 30px rgba(99,145,255,0.2)")}
              >
                View My Projects <ArrowRight size={16} />
              </button>
              <button className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer"
                style={{ background: "transparent", color: "rgba(148,163,184,0.8)", border: "1px solid rgba(148,163,184,0.15)", fontFamily: "'DM Sans', sans-serif" }}
                onMouseEnter={(e) => { e.target.style.borderColor = "rgba(99,145,255,0.3)"; e.target.style.color = "#93bbff"; }}
                onMouseLeave={(e) => { e.target.style.borderColor = "rgba(148,163,184,0.15)"; e.target.style.color = "rgba(148,163,184,0.8)"; }}
              >
                Download Resume
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.7}>
            <button onClick={() => scrollTo("projects")} className="mt-16 bg-transparent border-none cursor-pointer" style={{ color: "rgba(148,163,184,0.3)", animation: "float 3s ease-in-out infinite" }}>
              <ChevronDown size={24} />
            </button>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* FEATURED PROJECTS */}
      {/* ═══════════════════════════════════════ */}
      <section id="projects" className="relative px-6 py-28">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px flex-1 max-w-12" style={{ background: "rgba(99,145,255,0.4)" }} />
              <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(99,145,255,0.6)", fontFamily: "'JetBrains Mono', monospace" }}>Featured Work</span>
            </div>
            <h2 className="text-4xl md:text-5xl mb-16" style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: "#f1f5f9" }}>
              From Concept to<br /><span style={{ color: "#7da6f7" }}>Measurable Impact</span>
            </h2>
          </Reveal>

          {/* ── DecisionEase Card ── */}
          <Reveal delay={0.1}>
            <div className="relative rounded-2xl p-8 md:p-10 mb-8 overflow-hidden group"
              style={{ background: "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.5))", border: "1px solid rgba(99,145,255,0.1)" }}>
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, rgba(99,145,255,0.06) 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full" style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.15)" }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#34d399", animation: "pulseGlow 2s ease-in-out infinite" }} />
                    <span className="text-xs font-medium" style={{ color: "#34d399", fontFamily: "'JetBrains Mono', monospace" }}>In Progress</span>
                  </div>
                  <span className="text-xs" style={{ color: "rgba(148,163,184,0.5)", fontFamily: "'JetBrains Mono', monospace" }}>Current Project</span>
                </div>

                <h3 className="text-3xl mb-2" style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: "#f1f5f9" }}>DecisionEase</h3>
                <p className="text-lg mb-6" style={{ color: "#7da6f7" }}>Gen-Z Personalized AI Agent</p>

                <p className="leading-relaxed mb-8 max-w-2xl" style={{ color: "rgba(148,163,184,0.75)", fontSize: "0.95rem" }}>
                  Navigating the ambiguity of early-stage development, I am building DecisionEase to streamline daily choices for Gen-Z. Currently managing the roadmap and backlog to ensure this solution is both innovative and user-centric—moving from "What if" to "How it works."
                </p>

                <div className="flex flex-wrap gap-3">
                  {["Product Vision", "User Requirements", "Data-Driven Iteration", "User-Centric Design"].map((t) => (
                    <span key={t} className="px-3 py-1.5 rounded-lg text-xs" style={{ background: "rgba(99,145,255,0.06)", color: "rgba(148,163,184,0.7)", border: "1px solid rgba(99,145,255,0.08)", fontFamily: "'JetBrains Mono', monospace" }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── RAG Training Bot ── */}
          <Reveal delay={0.2}>
            <div className="relative rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.5))", border: "1px solid rgba(99,145,255,0.1)" }}>
              {/* Top accent */}
              <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(99,145,255,0.4), transparent)" }} />

              <div className="p-8 md:p-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs" style={{ background: "rgba(99,145,255,0.08)", color: "#7da6f7", border: "1px solid rgba(99,145,255,0.12)", fontFamily: "'JetBrains Mono', monospace" }}>Case Study</span>
                </div>

                <h3 className="text-3xl mb-2" style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: "#f1f5f9" }}>RAG-Based Employee Training Bot</h3>
                <p className="text-lg mb-8" style={{ color: "#7da6f7" }}>Scaling Efficiency Through Verified Data</p>

                {/* Problem / Solution / Impact */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="p-5 rounded-xl" style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.08)" }}>
                    <h4 className="text-xs tracking-widest uppercase mb-3 font-semibold" style={{ color: "rgba(239,68,68,0.7)", fontFamily: "'JetBrains Mono', monospace" }}>The Problem</h4>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.75)" }}>
                      Traditional training for 250+ employees across 10 departments was fragmented, inconsistent, and consuming valuable time.
                    </p>
                  </div>
                  <div className="p-5 rounded-xl" style={{ background: "rgba(99,145,255,0.04)", border: "1px solid rgba(99,145,255,0.08)" }}>
                    <h4 className="text-xs tracking-widest uppercase mb-3 font-semibold" style={{ color: "rgba(99,145,255,0.7)", fontFamily: "'JetBrains Mono', monospace" }}>The Solution</h4>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.75)" }}>
                      Engineered a custom Retrieval-Augmented Generation system using rigorously cleaned and verified data with strict data processing protocols.
                    </p>
                  </div>
                  <div className="p-5 rounded-xl" style={{ background: "rgba(52,211,153,0.04)", border: "1px solid rgba(52,211,153,0.08)" }}>
                    <h4 className="text-xs tracking-widest uppercase mb-3 font-semibold" style={{ color: "rgba(52,211,153,0.7)", fontFamily: "'JetBrains Mono', monospace" }}>The Impact</h4>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.75)" }}>
                      Measurable improvements across training speed, data accuracy, and employee satisfaction.
                    </p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <MetricCard value="30%" label="Reduction in training time" delay={0} />
                  <MetricCard value="55%" label="Fewer model hallucinations" delay={0.1} />
                  <MetricCard value="91%" label="User satisfaction rate" delay={0.2} />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* CORE COMPETENCIES */}
      {/* ═══════════════════════════════════════ */}
      <section id="skills" className="relative px-6 py-28">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(99,145,255,0.02) 50%, transparent 100%)" }} />
        <div className="relative max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px flex-1 max-w-12" style={{ background: "rgba(99,145,255,0.4)" }} />
              <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(99,145,255,0.6)", fontFamily: "'JetBrains Mono', monospace" }}>The Toolkit</span>
            </div>
            <h2 className="text-4xl md:text-5xl mb-16" style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: "#f1f5f9" }}>
              Core <span style={{ color: "#7da6f7" }}>Competencies</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {/* AI Governance */}
            <Reveal delay={0.1}>
              <div className="p-6 rounded-2xl border" style={{ borderColor: "rgba(148,163,184,0.06)", background: "rgba(15,23,42,0.5)" }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(99,145,255,0.08)", border: "1px solid rgba(99,145,255,0.12)" }}>
                    <Shield size={18} style={{ color: "#6391ff" }} />
                  </div>
                  <h3 className="text-base font-semibold" style={{ color: "#e2e8f0" }}>AI Governance</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { icon: Brain, label: "LLMOps" },
                    { icon: Layers, label: "RAG Systems" },
                    { icon: Shield, label: "Data Governance" },
                    { icon: Target, label: "Responsible AI Ethics" },
                  ].map((s) => <SkillPill key={s.label} {...s} />)}
                </div>
              </div>
            </Reveal>

            {/* Product Strategy */}
            <Reveal delay={0.2}>
              <div className="p-6 rounded-2xl border" style={{ borderColor: "rgba(148,163,184,0.06)", background: "rgba(15,23,42,0.5)" }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.12)" }}>
                    <BarChart3 size={18} style={{ color: "#a78bfa" }} />
                  </div>
                  <h3 className="text-base font-semibold" style={{ color: "#e2e8f0" }}>Product Strategy</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { icon: Layers, label: "PRD Authoring" },
                    { icon: GitBranch, label: "Backlog Grooming" },
                    { icon: CheckCircle2, label: "UAT" },
                    { icon: Target, label: "Product Lifecycle" },
                  ].map((s) => <SkillPill key={s.label} {...s} />)}
                </div>
              </div>
            </Reveal>

            {/* Technical Execution */}
            <Reveal delay={0.3}>
              <div className="p-6 rounded-2xl border" style={{ borderColor: "rgba(148,163,184,0.06)", background: "rgba(15,23,42,0.5)" }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.12)" }}>
                    <Zap size={18} style={{ color: "#34d399" }} />
                  </div>
                  <h3 className="text-base font-semibold" style={{ color: "#e2e8f0" }}>Process & Execution</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { icon: GitBranch, label: "Agile / Scrum" },
                    { icon: Users, label: "PMI Methodologies" },
                    { icon: Shield, label: "Risk Mitigation" },
                    { icon: BarChart3, label: "SDLC" },
                  ].map((s) => <SkillPill key={s.label} {...s} />)}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Trust Bar */}
          <Reveal delay={0.4}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <CertBadge title="CAPM®" sub="PMI Certified" />
              <CertBadge title="CSPO®" sub="Scrum Alliance" />
              <CertBadge title="CPMAI™" sub="AI Product Mgmt" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* PROFESSIONAL JOURNEY */}
      {/* ═══════════════════════════════════════ */}
      <section id="journey" className="relative px-6 py-28">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px flex-1 max-w-12" style={{ background: "rgba(99,145,255,0.4)" }} />
              <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(99,145,255,0.6)", fontFamily: "'JetBrains Mono', monospace" }}>Experience</span>
            </div>
            <h2 className="text-4xl md:text-5xl mb-16" style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: "#f1f5f9" }}>
              Professional <span style={{ color: "#7da6f7" }}>Journey</span>
            </h2>
          </Reveal>

          <div className="ml-2">
            <TimelineItem
              org="Xeo Marketing"
              title="AI Product Validation & Enhancement"
              description="Validated AI visibility tools and shipped enhancements that grew client satisfaction by 40%. Worked across cross-functional teams to ensure product-market fit and data-driven decision-making."
              delay={0.1}
            />
            <TimelineItem
              org="BioM Research Group"
              title="AI Governance & Ethics Leadership"
              description="Established AI governance frameworks and ethical standards for healthcare diagnostics. Led initiatives to ensure responsible AI deployment in sensitive clinical environments."
              delay={0.2}
            />
            <TimelineItem
              org="Yorkville University"
              title="Program & Portfolio Leadership"
              description="Managed a portfolio of 6+ concurrent initiatives and scaled a peer-mentoring program to 10,000+ students. Applied PMI methodologies to deliver projects on time and within scope."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* CONTACT / FOOTER */}
      {/* ═══════════════════════════════════════ */}
      <section id="contact" className="relative px-6 py-28">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent, rgba(99,145,255,0.03))" }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: "#f1f5f9" }}>
              Let's Build<br /><span style={{ color: "#7da6f7" }}>Something Together</span>
            </h2>
            <p className="mb-10" style={{ color: "rgba(148,163,184,0.6)", maxWidth: 420, margin: "0 auto 2.5rem" }}>
              Looking to bring AI products from vision to execution? I'd love to connect.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a href="mailto:tanisha.s3184@gmail.com" className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 no-underline"
                style={{ background: "linear-gradient(135deg, #4a7cff, #6391ff)", color: "#fff", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 0 30px rgba(99,145,255,0.2)" }}>
                <Mail size={16} /> Get in Touch
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 no-underline"
                style={{ background: "transparent", color: "rgba(148,163,184,0.8)", border: "1px solid rgba(148,163,184,0.15)", fontFamily: "'DM Sans', sans-serif" }}>
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </Reveal>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 text-center" style={{ borderTop: "1px solid rgba(148,163,184,0.06)" }}>
          <p className="text-xs" style={{ color: "rgba(148,163,184,0.3)", fontFamily: "'JetBrains Mono', monospace" }}>
            © 2026 Tanisha · Built with intention · AI Product Manager
          </p>
        </div>
      </section>
    </div>
  );
}