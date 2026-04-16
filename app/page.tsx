"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Atom,
  Bot,
  Brain,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Send,
  Sparkles,
  X,
} from "lucide-react";

type Message = {
  role: "assistant" | "user";
  content: string;
};

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "publications", label: "Publications" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const education = [
  {
    school: "Avila University",
    degree: "Master's in Artificial Intelligence",
    field: "Artificial Intelligence",
    dates: "August 2024 – December 2026",
  },
  {
    school: "Osmania University",
    degree: "Bachelor's of Commerce in Computer Applications",
    field: "Commerce",
    dates: "June 2020 – June 2023",
  },
];

const starterMessage =
  "Hi, I’m Abdul’s AI assistant. Ask me about his background, skills, and projects.";

const glass =
  "border border-white/20 bg-white/10 backdrop-blur-2xl shadow-[0_8px_30px_rgba(15,23,42,0.12)]";
const liquidGlass =
  "border border-white/25 bg-white/[0.08] backdrop-blur-[22px] shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_20px_70px_rgba(15,23,42,0.18)]";
const clay =
  "border border-white/50 bg-white/75 shadow-[inset_-8px_-8px_18px_rgba(255,255,255,0.9),inset_8px_8px_18px_rgba(148,163,184,0.14),0_14px_40px_rgba(15,23,42,0.10)]";

function MouseGlow() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px) and (pointer: fine)");

    const update = () => setEnabled(media.matches);
    update();

    const move = (e: MouseEvent) => {
      x.set(e.clientX - 160);
      y.set(e.clientY - 160);
    };

    media.addEventListener("change", update);

    if (media.matches) {
      window.addEventListener("mousemove", move, { passive: true });
    }

    return () => {
      media.removeEventListener("change", update);
      window.removeEventListener("mousemove", move);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18),rgba(59,130,246,0.10),transparent_70%)] blur-3xl"
      style={{ x, y }}
    />
  );
}


function FloatingBackground() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 24]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -18]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        style={{ y: y1, rotate: rotate1 }}
        className="absolute -left-24 top-20 hidden h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.18),rgba(96,165,250,0.10),transparent_68%)] blur-3xl md:block"
      />
      <motion.div
        style={{ y: y2, rotate: rotate2 }}
        className="absolute right-[-6rem] top-[18rem] hidden h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.14),rgba(255,255,255,0.08),transparent_70%)] blur-3xl md:block"
      />
      <motion.div
        style={{ y: y1 }}
        className="absolute bottom-[-6rem] left-1/3 hidden h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.12),rgba(255,255,255,0.06),transparent_72%)] blur-3xl md:block"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(148,163,184,0.10),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.08),transparent_30%),linear-gradient(to_bottom,rgba(248,250,252,0.88),rgba(241,245,249,0.94))]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(15,23,42,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.35)_1px,transparent_1px)] [background-size:80px_80px]" />
    </div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.2,
  });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500"
      style={{ scaleX }}
    />
  );
}

function Section({
  id,
  title,
  eyebrow,
  children,
}: {
  id: string;
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 15%"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 1], [0.7, 1, 1]);

  return (
    <motion.section
      ref={ref}
      id={id}
      className="scroll-mt-24 py-16 sm:py-20"
      style={{
        y,
        opacity,
      }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mb-8 sm:mb-10">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.35em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.25em" }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-slate-500 sm:text-sm"
        >
          {eyebrow}
        </motion.p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </div>
      {children}
    </motion.section>
  );
}

function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.6 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    x.set((px - 0.5) * 10);
    y.set((py - 0.5) * 10);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{
        x: springX,
        y: springY,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}


function GlassPill({
  children,
  href,
  target,
  rel,
  className = "",
}: {
  children: React.ReactNode;
  href: string;
  target?: string;
  rel?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
     className={`group inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/40 bg-white/60 px-6 py-3 text-sm font-semibold text-slate-900 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white/80 hover:shadow-[0_16px_40px_rgba(15,23,42,0.16)] ${className}`}
    >
      {children}
    </a>
  );
}

function SkillChip({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-white/40 bg-white/30 px-3 py-1 text-xs text-slate-700 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition hover:-translate-y-0.5 hover:bg-white/45">
      {label}
    </span>
  );
}

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: starterMessage },
  ]);

  const sendMessage = async (preset?: string) => {
    const value = (preset ?? input).trim();
    if (!value || loading) return;

    const nextMessages: Message[] = [
      ...messages,
      { role: "user", content: value },
    ];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data: { reply?: string } = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || "Sorry, something went wrong.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I couldn't reach the AI service.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    "Who is Abdul Rahman?",
    "What are his skills?",
    "What is he studying?",
    "How can I contact him?",
  ];

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen((v) => !v)}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold text-slate-900 ${liquidGlass}`}
      >
        <span className="rounded-full bg-white/70 p-2 shadow-[0_8px_20px_rgba(15,23,42,0.08)]">
          {open ? <X className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
        </span>
        {open ? "Close chat" : "Ask Abdul AI"}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className={`fixed bottom-24 right-4 z-50 flex h-[min(32rem,70vh)] w-[min(23rem,calc(100vw-1rem))] max-w-[calc(100vw-1rem)] flex-col overflow-hidden rounded-[2rem] ${liquidGlass} sm:right-6`}
          >
            <div className="border-b border-white/20 bg-white/10 p-4 backdrop-blur-2xl">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white/70 p-2.5 text-slate-900 shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">
                    Abdul’s AI Assistant
                  </h3>
                  <p className="text-xs text-slate-600">Live portfolio chatbot</p>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto bg-white/5 p-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`max-w-[85%] rounded-[1.4rem] px-4 py-3 text-sm leading-relaxed backdrop-blur-xl ${
                    message.role === "assistant"
                      ? "bg-white/70 text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.08)]"
                      : "ml-auto bg-slate-900 text-white shadow-[0_14px_30px_rgba(15,23,42,0.22)]"
                  }`}
                >
                  {message.content}
                </div>
              ))}

              {loading && (
                <div className="max-w-[85%] rounded-[1.4rem] bg-white/70 px-4 py-3 text-sm text-slate-500 shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
                  Thinking...
                </div>
              )}
            </div>

            <div className="border-t border-white/20 p-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      void sendMessage(q);
                    }}
                    className="rounded-full border border-white/40 bg-white/50 px-3 py-1.5 text-xs text-slate-700 backdrop-blur-xl transition hover:bg-white/70"
                  >
                    {q}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      void sendMessage();
                    }
                  }}
                  placeholder="Ask anything..."
                  className="flex-1 rounded-2xl border border-white/30 bg-white/55 px-4 py-3 text-sm text-slate-800 outline-none backdrop-blur-xl placeholder:text-slate-500 focus:border-white/60"
                />
                <button
                  onClick={() => {
                    void sendMessage();
                  }}
                  className="rounded-2xl bg-slate-900 p-3 text-white transition hover:scale-[1.03]"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function HeroScene() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 70]);
const scale = useTransform(scrollYProgress, [0, 1], [1, 0.985]);

  return (
    <motion.div
      ref={ref}
    style={{ y, scale }}
      className={`relative overflow-hidden rounded-[2rem] p-[1px] ${glass}`}
    >
      <div className="relative overflow-hidden rounded-[calc(2rem-1px)] bg-[linear-gradient(135deg,rgba(255,255,255,0.72),rgba(255,255,255,0.36))] p-6 sm:p-7">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.85),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.12),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(168,85,247,0.10),transparent_30%)]" />
        <div className="relative">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl bg-white/75 p-3 text-slate-900 shadow-[0_14px_30px_rgba(15,23,42,0.10)]">
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">Focus Areas</p>
              <p className="text-sm text-slate-600">
                Current learning and career direction
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-600">
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              className={`rounded-[1.4rem] p-4 ${clay}`}
            >
              <p className="font-medium text-slate-900">Machine Learning</p>
              <p className="mt-1">
                Building a strong base in applied ML, model development, and structured problem solving.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              className={`rounded-[1.4rem] p-4 ${clay}`}
            >
              <p className="font-medium text-slate-900">Data + SQL</p>
              <p className="mt-1">
                Using data analysis and query skills to support insights, pipelines, and decision-making.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              className={`rounded-[1.4rem] p-4 ${clay}`}
            >
              <p className="font-medium text-slate-900">GenAI</p>
              <p className="mt-1">
                Exploring practical AI interfaces, assistants, and portfolio ready product experiences.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({
  title,
  description,
  badge,
  skills,
  projectUrl,
  codeUrl,
  delay = 0,
}: {
  title: string;
  description: string;
  badge: string;
  skills: string[];
  projectUrl: string;
  codeUrl: string;
  delay?: number;
}) {
  return (
    <TiltCard className="h-full">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.55, delay }}
        whileHover={{ y: -4 }}
        className={`group relative h-full overflow-hidden rounded-[2rem] p-[1px] ${glass}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.75),transparent_20%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.10),transparent_24%)] opacity-80" />
        <div className="relative flex h-full flex-col rounded-[calc(2rem-1px)] bg-[linear-gradient(135deg,rgba(255,255,255,0.74),rgba(255,255,255,0.38))] p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-slate-600">{description}</p>
            </div>
            <span className="rounded-full border border-white/40 bg-white/50 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur-xl">
              {badge}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <SkillChip key={skill} label={skill} />
            ))}
          </div>

         <div className="mt-6 flex flex-wrap gap-3">
  <GlassPill
    href={projectUrl}
    target="_blank"
    rel="noreferrer"
    className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-200 hover:opacity-90 shadow-[0_10px_30px_rgba(99,102,241,0.15)]"
  >
    View Project
  </GlassPill>

  <GlassPill
    href={codeUrl}
    target="_blank"
    rel="noreferrer"
    className="bg-white/80 !text-slate-900 border-white/60 shadow-[0_10px_24px_rgba(15,23,42,0.10)]"
  >
    View Code
  </GlassPill>
</div>
</div>
        </motion.div>
    </TiltCard>
  );
}

export default function Page() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pageRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18, 0.3], [1, 1, 0.9]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <div
      ref={pageRef}
      className="relative min-h-screen overflow-x-hidden bg-slate-100 text-slate-700 selection:bg-sky-200/70"
    >
      <ScrollProgress />
      <FloatingBackground />
      <MouseGlow />

      <header className="sticky top-0 z-40 border-b border-white/20 bg-white/30 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a
            href="#home"
            className="group flex items-center gap-3 font-semibold tracking-tight text-slate-900"
          >
            <span className="rounded-2xl bg-white/70 p-2 text-slate-900 shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition group-hover:rotate-6">
              <Sparkles className="h-4 w-4" />
            </span>
            Abdul Rahman
          </a>

          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="rounded-full border border-transparent px-4 py-2 text-sm text-slate-700 transition hover:border-white/30 hover:bg-white/35 hover:backdrop-blur-xl hover:text-slate-900"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-xl border border-white/30 bg-white/40 p-2 text-slate-700 backdrop-blur-xl md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="border-t border-white/20 bg-white/35 backdrop-blur-2xl md:hidden"
            >
              <div className="mx-auto flex max-w-6xl flex-col px-4 py-3 sm:px-6 lg:px-8">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-3 py-3 text-sm text-slate-700 hover:bg-white/40"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Section
          id="home"
          eyebrow="AI / ML / GenAI"
          title="Building intelligent systems with ML, Data, and GenAI."
        >
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="grid items-center gap-8 lg:grid-cols-[1.18fr_0.82fr]"
          >
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55 }}
              className="relative"
            >
              <div className="pointer-events-none absolute -left-8 top-0 hidden h-32 w-32 rounded-full bg-sky-300/20 blur-3xl sm:block" />
              <p className="mb-5 inline-flex rounded-full border border-white/35 bg-white/35 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-slate-700 backdrop-blur-xl shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
                ABDUL RAHMAN · AI/ML ENGINEER
              </p>

              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
               Working on ideas and turning them into{" "}
                <span className="bg-gradient-to-r from-slate-900 via-blue-700 to-violet-700 bg-clip-text text-transparent">
                  AI Systems
                </span>{" "}
                people can actually use.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
               I'm an AI/ML Engineer Specializing in GenAI, focused on building scalable, data driven systems that transform complex problems into intelligent digital solution.
              </p>

<div className="mt-8 flex flex-wrap gap-3">
  <GlassPill
    href="#projects"
className="bg-gradient-to-r from-sky-100 to-indigo-100 text-blue-800 border-blue-300 hover:from-sky-200 hover:to-indigo-200 shadow-[0_12px_30px_rgba(99,102,241,0.18)]"
  >

    View Projects
  </GlassPill>

  <GlassPill href="/resume.pdf">
    Download Resume
  </GlassPill>
</div>
              
            </motion.div>

            <HeroScene />
          </motion.div>
        </Section>

        <Section
          id="about"
          eyebrow="About Abdul Rahman"
          title="A bit about who I am and what I do!"
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <TiltCard>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55 }}
                className={`rounded-[2rem] p-[1px] ${glass}`}
              >
                <div className="rounded-[calc(2rem-1px)] bg-[linear-gradient(135deg,rgba(255,255,255,0.76),rgba(255,255,255,0.42))] p-8">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="rounded-2xl bg-white/75 p-3 text-slate-900 shadow-[0_12px_24px_rgba(15,23,42,0.08)]">
                      <Atom className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-slate-900">
                        AI/ML Engineer focused on GenAI
                      </p>
                      <p className="text-sm text-slate-500">
                        Machine learning, intelligent systems, and scalable AI applications
                      </p>
                    </div>
                  </div>

                  <p className="text-base leading-8 text-slate-600">
                    I’m an AI/ML Engineer with a strong focus on GenAI, based in Chicago and currently pursuing a Master’s in Artificial Intelligence. I build intelligent and data-driven systems by combining machine learning, structured problem solving, and modern AI technologies.
                  </p>

                  <p className="mt-5 text-base leading-8 text-slate-600">
                    My work focuses on developing scalable applications that integrate predictive modeling, natural language processing, and interactive user experiences. I’m particularly interested in building practical AI systems that demonstrate technical depth, strong usability, and thoughtful design.
                  </p>
                </div>
              </motion.div>
            </TiltCard>

            <TiltCard>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6 }}
                className={`rounded-[2rem] p-[1px] ${glass}`}
              >
                <div className="rounded-[calc(2rem-1px)] bg-[linear-gradient(135deg,rgba(255,255,255,0.76),rgba(255,255,255,0.42))] p-8">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="rounded-2xl bg-white/75 p-3 text-slate-900 shadow-[0_12px_24px_rgba(15,23,42,0.08)]">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">Education</h3>
                  </div>

                  <div className="space-y-5">
                    {education.map((item) => (
                      <motion.div
                        key={item.school}
                        whileHover={{ y: -4, scale: 1.01 }}
                        className={`rounded-[1.4rem] p-5 ${clay}`}
                      >
                        <p className="font-semibold text-slate-900">{item.school}</p>
                        <p className="mt-1 text-sm text-slate-700">{item.degree}</p>
                        <p className="mt-1 text-sm text-slate-500">{item.field}</p>
                        <p className="mt-2 text-sm text-slate-500">{item.dates}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </TiltCard>
          </div>
        </Section>

        <Section id="projects" eyebrow="Projects" title="Featured Project">
          <div className="grid gap-6 md:grid-cols-2">
            
            <ProjectCard
              title="AI Stock Prediction + News Sentiment Dashboard"
              description="Worked on developing an AI based market intelligence dashboard that brings together stock trend and analysis, technical indicators, and sentiment analysis to present structured and data driven insight."
              badge="ML"
              skills={[
                "Python",
                "Streamlit",
                "Machine Learning",
                "NLP",
                "yFinance",
                "Plotly",
              ]}
              projectUrl="https://stock-prediction-dashboard1.streamlit.app/"
              codeUrl="https://github.com/abdulxrahman-ai/stock-prediction-dashboard"
              delay={0.05}
             />
            
            <ProjectCard
              title="IntervueIQ"
              description="Built an AI-powered interview preparation platform that helps users practice interviews through an interactive and intelligent experience. The project is designed to simulate real-world interview flow, strengthen preparation, and deliver a polished portfolio-ready AI product experience."
              badge="AI/ML"
              skills={["Python", "GenAI", "NLP", "LLMs", "Hugging Face"]}
              projectUrl="https://huggingface.co/spaces/abdulxrahman/intervueiq"
              codeUrl="https://github.com/abdulxrahman-ai/intervueiq"
              delay={0.1}
            />
                        
            <ProjectCard
              title="Resume Intelligence"
              description="Developed an AI-powered resume analysis system that evaluates resumes, extracts key insights, and provides intelligent feedback using modern NLP and GenAI techniques. The system is designed to reflect ATS style evaluation and support more informed hiring decisions."
              badge="GenAI"
              skills={["Python", "Streamlit", "OpenAI", "NLP"]}
              projectUrl="https://abdul-resume-intelligence.streamlit.app/"
              codeUrl="https://github.com/abdulxrahman-ai/resume-intelligence"
              delay={0}
            />
          </div>
        </Section>

        <Section
          id="publications"
          eyebrow="Publications"
          title="Research & publication work."
        >
          <TiltCard>
            <div className={`rounded-[2rem] p-[1px] ${glass}`}>
              <div className="rounded-[calc(2rem-1px)] bg-[linear-gradient(135deg,rgba(255,255,255,0.76),rgba(255,255,255,0.42))] p-8">
                <div className="space-y-6">

  <div className={`rounded-[1.6rem] p-6 ${clay}`}>
    <h3 className="text-xl font-semibold text-slate-900">
  Self Improving Autonomous AI Agents
</h3>

    <p className="mt-2 text-xs text-slate-500">
 Review Research Paper
</p>

    <div className="mt-4 flex gap-3">
      <GlassPill
        href="/AI-Agents-Review.pdf"
        target="_blank"
        rel="noreferrer"
        className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-200 shadow-[0_10px_30px_rgba(99,102,241,0.15)]"
      >
        View Paper
      </GlassPill>

      <GlassPill
  href="/AI-Agents-Review.pdf"
  target="_blank"
  rel="noreferrer"
        className="bg-white/80 !text-slate-900 border-white/60 shadow-[0_10px_24px_rgba(15,23,42,0.10)]"
      >
        Download PDF
      </GlassPill>
    </div>
  </div>

</div>
              </div>
            </div>
          </TiltCard>
        </Section>

        <Section
          id="skills"
          eyebrow="Skills"
          title="Skills I use to build intelligent AI/ML Solutions."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55 }}
              whileHover={{ y: -6 }}
              className={`rounded-[2rem] p-[1px] ${glass}`}
            >
              <div className="rounded-[calc(2rem-1px)] bg-[linear-gradient(135deg,rgba(255,255,255,0.76),rgba(255,255,255,0.42))] p-6">
                <h3 className="mb-4 text-lg font-semibold text-slate-900">AI / ML & GenAI</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "PyTorch",
                    "TensorFlow",
                    "Scikit-learn",
                    "LangChain",
                    "Hugging Face",
                    "LLMs",
                    "RAG",
                    "NLP",
                    "Computer Vision",
                    "Deep Learning",
                    "Prompt Engineering",
                    "MLOps",
                  ].map((skill) => (
                    <SkillChip key={skill} label={skill} />
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -6 }}
              className={`rounded-[2rem] p-[1px] ${glass}`}
            >
              <div className="rounded-[calc(2rem-1px)] bg-[linear-gradient(135deg,rgba(255,255,255,0.76),rgba(255,255,255,0.42))] p-6">
                <h3 className="mb-4 text-lg font-semibold text-slate-900">Development & Frameworks</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Python",
                    "JavaScript",
                    "React.js",
                    "Node.js",
                    "Flask",
                    "REST APIs",
                    "Docker",
                    "Git",
                    "Linux CLI",
                  ].map((skill) => (
                    <SkillChip key={skill} label={skill} />
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65 }}
              whileHover={{ y: -6 }}
              className={`rounded-[2rem] p-[1px] ${glass}`}
            >
              <div className="rounded-[calc(2rem-1px)] bg-[linear-gradient(135deg,rgba(255,255,255,0.76),rgba(255,255,255,0.42))] p-6">
                <h3 className="mb-4 text-lg font-semibold text-slate-900">Data, Analytics & Visualization</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "SQL",
                    "PySpark MLlib",
                    "Matplotlib",
                    "Plotly",
                    "CNN",
                    "YOLO",
                    "ResNet",
                  ].map((skill) => (
                    <SkillChip key={skill} label={skill} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </Section>

        <Section id="contact" eyebrow="Contact" title="Let’s connect.">
          <TiltCard>
            <div className={`rounded-[2rem] p-[1px] ${glass}`}>
              <div className="rounded-[calc(2rem-1px)] bg-[linear-gradient(135deg,rgba(255,255,255,0.76),rgba(255,255,255,0.42))] p-8">
                <div className="mt-2 space-y-4 text-sm text-slate-700">
                  <a
                    href="mailto:abdulxrahman.ai@gmail.com"
                    className={`flex items-center gap-3 rounded-[1.4rem] px-4 py-4 transition hover:-translate-y-1 ${clay}`}
                  >
                    <Mail className="h-4 w-4" />
                    abdulxrahman.ai@gmail.com
                  </a>

                  <a
                    href="https://github.com/abdulxrahman-ai"
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center gap-3 rounded-[1.4rem] px-4 py-4 transition hover:-translate-y-1 ${clay}`}
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>

                  <a
                    href="https://www.linkedin.com/in/abdulxrahman"
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center gap-3 rounded-[1.4rem] px-4 py-4 transition hover:-translate-y-1 ${clay}`}
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </TiltCard>
        </Section>
      </main>

      <footer className="relative z-10 border-t border-white/20 bg-white/25 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-slate-500 lg:flex-row">
          <p>© 2026 Abdul Rahman. Built for AI/ML, data, and GenAI opportunities.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/abdulxrahman-ai"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-800"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/abdulxrahman"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-800"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
}
