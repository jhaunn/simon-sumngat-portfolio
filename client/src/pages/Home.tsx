// Style direction: Scuderia Editorial — asymmetric 12-column composition, near-black surfaces, Rosso Corsa signal color, precise metadata, motion that feels mechanical.
import { useState, type FormEvent, type PointerEvent } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Check,
  Database,
  Download,
  ExternalLink,
  Gamepad2,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Send,
  Smartphone,
  Terminal,
  X,
} from "lucide-react";
import {
  SiSharp,
  SiCss,
  SiDart,
  SiExpress,
  SiFirebase,
  SiFlask,
  SiFlutter,
  SiGit,
  SiGoogle,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiSpringboot,
  SiSupabase,
  SiTypescript,
  SiUnity,
} from "@icons-pack/react-simple-icons";

// TODO: Add custom mark
const markImage = "/mark.png";

// TODO: Improve Background animation
function HeroMotionVisual() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const heroVisualY = useTransform(scrollY, [0, 900], [0, 120]);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 150, damping: 24, mass: 0.45 });
  const springY = useSpring(pointerY, { stiffness: 150, damping: 24, mass: 0.45 });
  const coreX = useTransform(springX, [-1, 1], [-24, 24]);
  const coreY = useTransform(springY, [-1, 1], [-18, 18]);
  const orbitX = useTransform(springX, [-1, 1], [-13, 13]);
  const orbitY = useTransform(springY, [-1, 1], [-10, 10]);
  const orbitTwoX = useTransform(springX, [-1, 1], [-7, 7]);
  const orbitTwoY = useTransform(springY, [-1, 1], [-5, 5]);
  const loop = prefersReducedMotion ? undefined : { duration: 9, repeat: Infinity, ease: "linear" as const };
  const pulse = prefersReducedMotion ? undefined : { duration: 2.8, repeat: Infinity, ease: "easeInOut" as const, repeatType: "mirror" as const };
  const drift = prefersReducedMotion ? undefined : { duration: 12, repeat: Infinity, ease: "easeInOut" as const, repeatType: "mirror" as const };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - (bounds.left + bounds.width / 2)) / (bounds.width / 2));
    pointerY.set((event.clientY - (bounds.top + bounds.height / 2)) / (bounds.height / 2));
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.div className="hero-visual" aria-hidden="true" style={{ y: heroVisualY }} onPointerMove={handlePointerMove} onPointerLeave={resetPointer}>
      <motion.div className="hero-visual-grid" style={{ x: orbitTwoX, y: orbitTwoY }} />
      <motion.div className="hero-glow hero-glow-one" style={{ x: coreX, y: coreY }} animate={prefersReducedMotion ? undefined : { x: [0, 28, -12, 0], y: [0, -18, 14, 0], scale: [1, 1.12, .94, 1] }} transition={{ ...drift, duration: 14 }} />
      <motion.div className="hero-glow hero-glow-two" style={{ x: orbitTwoX, y: orbitTwoY }} animate={prefersReducedMotion ? undefined : { x: [0, -24, 14, 0], y: [0, 18, -10, 0], scale: [1, .92, 1.08, 1] }} transition={{ ...drift, duration: 18, delay: 1 }} />
      <motion.div className="hero-orbit hero-orbit-one" style={{ x: orbitX, y: orbitY }} animate={prefersReducedMotion ? undefined : { rotate: 360 }} transition={loop} />
      <motion.div className="hero-orbit hero-orbit-two" style={{ x: orbitTwoX, y: orbitTwoY }} animate={prefersReducedMotion ? undefined : { rotate: -360 }} transition={{ ...loop, duration: 14 }} />
      <motion.div className="hero-core" style={{ x: coreX, y: coreY }} animate={prefersReducedMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.72, 1, 0.72] }} transition={pulse}>
        <span />
      </motion.div>
      <motion.div className="hero-signal hero-signal-one" style={{ x: orbitX }} animate={prefersReducedMotion ? undefined : { opacity: [0.35, 0.9, 0.35] }} transition={{ ...pulse, duration: 3.6 }} />
      <motion.div className="hero-signal hero-signal-two" style={{ x: orbitTwoX }} animate={prefersReducedMotion ? undefined : { opacity: [0.25, 0.75, 0.25] }} transition={{ ...pulse, duration: 4.2, delay: 0.4 }} />
      <svg className="hero-circuit" viewBox="0 0 760 520" fill="none">
        <motion.path d="M28 374H176L228 322H388L431 365H722" stroke="rgba(218,41,28,.82)" strokeWidth="2" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.8, delay: 0.4 }} />
        <motion.path d="M122 95H260L317 152V259H500L566 193H730" stroke="rgba(218,41,28,.52)" strokeWidth="1" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 2.2, delay: 0.9 }} />
        <motion.path d="M446 20V124L408 162V282" stroke="rgba(248,247,244,.3)" strokeWidth="1" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.4, delay: 1.1 }} />
        <circle cx="388" cy="322" r="5" fill="#da291c" />
        <circle cx="500" cy="259" r="4" fill="#f8f7f4" />
        <circle cx="260" cy="95" r="4" fill="#da291c" />
      </svg>
    </motion.div>
  );
}

function HeroStatusPanel() {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pinned, setPinned] = useState(false);
  const revealed = hovered || focused || pinned;

  return (
    <motion.button className="hero-status-panel" type="button" aria-controls="hero-status-details" aria-expanded={revealed} onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onClick={() => setPinned((open) => !open)} whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
      <span className="hero-status-heading"><span className="status-dot" /> Simon Sumngat <strong>.dev</strong></span>
      <span className="hero-status-rule" />
      <span className="hero-status-caption">Status<b>All good</b></span>
      <AnimatePresence initial={false}>
        {revealed && <motion.span id="hero-status-details" className="hero-status-details" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22 }}>
          <span><small>Usually</small><b>Building things</b></span>
          <span><small>Currently</small><b>somewhere online</b></span>
          <span><small>Next</small><b>See where it goes</b></span>
        </motion.span>}
      </AnimatePresence>
    </motion.button>
  );
}

function BrandMark() {
  const [failed, setFailed] = useState(false);
  return failed ? <span className="brand-mark-fallback" aria-hidden="true">S</span> : <img src={markImage} alt="" className="brand-mark" width={64} height={64} onError={() => setFailed(true)} />;
}

const projects = [
  {
    number: "01",
    type: "Systems / Web",
    title: "Lorenzo Ruiz Academy\nGrade Management System V2",
    description:
      "A PERN-based rebuild for academic operations, shaped around maintainability, scalable data flow, and a more intuitive grade management experience.",
    stack: ["Supabase", "Express.js", "React.js", "Node.js"],
    demo: null,
    repo: "https://github.com/jhaunn/LRA-GMS-V2",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=86",
    accent: "Featured build",
  },
  {
    number: "02",
    type: "Research / Computer Vision",
    title: "Semantic-VJEPA\n/ SemVJEPA",
    description:
      "thesis work extending the original V-JEPA by introducing a semantic masking strategy that replaces the default random masking mechanism used in self-supervised video representation learning..",
    stack: ["Python", "V-JEPA", "Self-Supervised Learning", "Representation Learning"],
    demo: null,
    repo: "https://github.com/AjDesuuu/Semantic-VJEPA",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=86",
    accent: "Research thread",
  },
  {
    number: "03",
    type: "Interactive / Unity",
    title: "Game Prototypes\n& Game Jam Submission",
    description:
      "Complete solo prototypes built from core mechanics and UI systems to basic animation and art.",
    stack: ["C#", "Unity"],
    demo: "https://nomiiii.itch.io",
    repo: "https://github.com/jhaunn",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=86",
    accent: "Long-running practice",
  },
];

const skillGroups = [
  {
    label: "01 / Frontend",
    description: "Interfaces & component systems",
    icon: Terminal,
    skills: [
      { name: "HTML5", note: "Semantic structure", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS", note: "Responsive styling", icon: SiCss, color: "#1572B6" },
      { name: "JavaScript", note: "Vanilla + modern JS", icon: SiJavascript, color: "#F7DF1E" },
      { name: "React", note: "Composable UI", icon: SiReact, color: "#61DAFB" },
    ],
  },
  {
    label: "02 / Backend",
    description: "APIs, services & application logic",
    icon: Database,
    skills: [
      { name: "Node.js", note: "Server-side JavaScript", icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Express", note: "API development", icon: SiExpress, color: "#F8F7F4" },
      { name: "Flask", note: "Python web services", icon: SiFlask, color: "#F8F7F4" },
      { name: "Spring Boot", note: "Java backend", icon: SiSpringboot, color: "#6DB33F" },
    ],
  },
  {
    label: "03 / Data & cloud",
    description: "Persistence, auth & collaboration",
    icon: BrainCircuit,
    skills: [
      { name: "MongoDB", note: "Document databases", icon: SiMongodb, color: "#47A248" },
      { name: "Firebase", note: "Cloud app services", icon: SiFirebase, color: "#FFCA28" },
      { name: "Supabase", note: "Postgres platform", icon: SiSupabase, color: "#3ECF8E" },
      { name: "GitHub / GitLab", note: "Version control", icon: SiGit, color: "#F05032" },
    ],
  },
  {
    label: "04 / Interactive & mobile",
    description: "Prototypes, games & handheld products",
    icon: Gamepad2,
    skills: [
      { name: "C#", note: "Gameplay + systems", icon: SiSharp, color: "#9B4F96" },
      { name: "Unity", note: "Game prototyping", icon: SiUnity, color: "#F8F7F4" },
      { name: "Flutter", note: "Cross-platform apps", icon: SiFlutter, color: "#54C5F8" },
      { name: "Dart", note: "Mobile application logic", icon: SiDart, color: "#0175C2" },
      { name: "Python", note: "ML + research utilities", icon: SiPython, color: "#3776AB" },
      { name: "Google Workspace", note: "Docs, Slides, Sheets", icon: SiGoogle, color: "#4285F4" },
    ],
  },
];


const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

function SectionMarker({ number, label, light = false }: { number: string; label: string; light?: boolean }) {
  return (
    <motion.div className={`section-marker ${light ? "section-marker-light" : ""}`} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.45 }}>
      <span className="marker-number">{number}</span>
      <span className="marker-line" aria-hidden="true" />
      <span>{label}</span>
    </motion.div>
  );
}

function ExternalAction({ label, primary = false, onClick }: { label: string; primary?: boolean; onClick: () => void }) {
  return (
    <button className={`inline-action ${primary ? "inline-action-primary" : ""}`} type="button" onClick={onClick}>
      {label}
      <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" />
    </button>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");
//   const [formSent, setFormSent] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const heroCopyY = useTransform(scrollY, [0, 900], [0, -32]);

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3600);
  };

//   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setFormSent(true);
//     showNotice("Message staged locally. Email Simon directly to continue the conversation.");
//     event.currentTarget.reset();
//   };

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className={`site-nav ${menuOpen ? "site-nav-open" : ""}`}>
        <a className="brand-lockup" href="#top" onClick={() => setMenuOpen(false)} aria-label="Simon Sumngat home">
          <BrandMark />
          <span className="brand-name">SIMON<br />SUMNGAT</span>
        </a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
        </button>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>Work <span>01</span></a>
          <a href="#skills" onClick={() => setMenuOpen(false)}>Skills <span>02</span></a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience <span>03</span></a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact <span>04</span></a>
        </nav>
        <div className="nav-status"><span className="status-dot" aria-hidden="true" /> Open to opportunities</div>
      </header>
      <motion.div className="nav-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />

      <main id="main-content">
        <section className="hero" id="top">
          <HeroMotionVisual />
          <HeroStatusPanel />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-grid-overlay" aria-hidden="true" />
          <motion.div className="hero-copy" style={{ y: heroCopyY }}>
            <motion.div initial="hidden" animate="visible" variants={stagger} className="hero-content">
              <motion.div variants={reveal} className="eyebrow"><span className="eyebrow-pin" /> Software Engineer · Imus, Philippines</motion.div>
              <motion.h1 variants={reveal}>Somewhere<br />everything is <em>connected</em></motion.h1>
              <motion.p variants={reveal} className="hero-lede">Hi, I'm Simon, a Computer Science Graduate and Software Engineer, I like making things, understanding the systems behind them, and following ideas until they become something real. This space is a collection of the things I’ve built, learned, and left a little trace of.</motion.p>
              <motion.div variants={reveal} className="hero-actions">
                <a className="hero-button" href="#work">View selected work <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" /></a>
                <a className="hero-text-link" href="https://github.com/jhaunn" target="_blank" rel="noreferrer">GitHub profile <Github size={16} strokeWidth={1.8} aria-hidden="true" /></a>
              </motion.div>
            </motion.div>
          </motion.div>
          <div className="hero-footline">
            <span>01 — Portfolio / 2026</span>
            <span className="hero-scroll">Scroll to explore <ArrowRight size={14} aria-hidden="true" /></span>
            <span>Software engineer · CS</span>
          </div>
          {/* <div className="hero-corner hero-corner-top">IMUS / MAKING IT USEFUL</div> */}
          {/* <div className="hero-corner hero-corner-bottom">Built end to end <span aria-hidden="true">↗</span></div> */}
        </section>

        <section className="intro-band">
          <div className="container intro-layout">
            <SectionMarker number="00" label="The short version" />
            <div className="intro-statement">
              <div className="statement-registration"><BrandMark /><span>SS / 2026 — CONNECTION ESTABLISHED</span></div>
              <p className="display-statement">Committed problem solver, dedicated to <span>learning and creation.</span></p>
              {/* TODO: Add short description */}
              {/* <p className="intro-body">I work across frontend, backend, data, and interactive systems.</p> */}
              <div className="intro-signals">
                <div><span>Currently</span><strong>Exploring opportunities in the field of technology</strong></div>
                <div><span>Education</span><strong>BS Computer Science · University of Santo Tomas</strong></div>
                <div><span>Record</span><strong>Best Thesis Award · Core Computer Science Track · Dean's Lister</strong></div>
              </div>
            </div>
          </div>
        </section>

        <section className="work-section" id="work">
          <div className="container">
            <div className="section-heading-row">
              <SectionMarker number="01" label="Selected work" />
              {/* TODO: Add short description aside the selected work header */}
              {/* <p className="section-aside">Some of my most recent projects.<br /><em>Feel free to check them out</em></p> */}
            </div>
            <motion.div className="project-list" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-12%" }} variants={stagger}>
              {projects.map((project) => (
                <motion.article className="project-card" key={project.number} variants={reveal} whileHover={{ y: -6 }} whileTap={{ scale: 0.995 }}>
                  <div className="project-image-frame">
                    <img src={project.image} alt="" className="project-image" width={1600} height={1067} loading="lazy" />
                    <div className="project-image-meta"><span>{project.number}</span><span>{project.accent}</span></div>
                  </div>
                  <div className="project-detail">
                    <div className="project-kicker"><span>{project.type}</span><span>Case {project.number}</span></div>
                    <h2>{project.title.split("\n").map((line) => <span key={line}>{line}<br /></span>)}</h2>
                    <p>{project.description}</p>
                    <div className="project-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                    <div className="project-actions">
                      <ExternalAction label="Demo link" primary onClick={() => project.demo != null ? window.location.href = project.demo.toString() : showNotice("This project is not publicly deployed yet. Ask Simon for a walkthrough.")} />
                      <a className="inline-action" href={project.repo} target="_blank" rel="noreferrer">Repo / profile <Github size={14} strokeWidth={1.8} /></a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="red-band">
          <div className="container red-band-inner">
            <div className="red-band-mark">S</div>
            <p>From websites to games <br />and everything in between. <br />Have something in mind? <br />Let’s see where it goes.</p>
            <a href="#contact">Establish a connection <ArrowUpRight size={17} /></a>
          </div>
        </section>

        <section className="skills-section" id="skills">
          <div className="container">
            <div className="section-heading-row skills-heading-row">
              <SectionMarker number="02" label="Skills index" />
              <p className="section-aside">Languages, frameworks,<br />platforms, and tools<br />used in <em>real builds.</em></p>
            </div>
            <div className="skills-showcase">
              <div className="skills-legend">
                <div className="skill-symbol"><Terminal size={22} strokeWidth={1.3} aria-hidden="true" /></div>
                <h2>Skills<br /><em>in practice</em></h2>
                <p>An icon-led index of the technologies Simon uses across frontend, backend, data, interactive, mobile, and research work.</p>
                <div className="legend-key"><span className="legend-swatch" /> current working toolkit</div>
              </div>
              <motion.div className="skills-groups" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-12%" }} variants={stagger}>
                {skillGroups.map((group) => {
                  const GroupIcon = group.icon;
                  return (
                    <motion.section className="skill-group" key={group.label} variants={reveal} aria-labelledby={`skill-group-${group.label}`}>
                      <div className="skill-group-heading">
                        <div className="skill-group-icon"><GroupIcon size={18} strokeWidth={1.4} aria-hidden="true" /></div>
                        <div><h3 id={`skill-group-${group.label}`}>{group.label}</h3><span>{group.description}</span></div>
                      </div>
                      <div className="skill-chip-grid">
                        {group.skills.map((skill) => {
                          const SkillIcon = skill.icon;
                          return <motion.div className="skill-chip" key={skill.name} whileHover={{ y: -4 }}><SkillIcon size={22} color={skill.color} aria-hidden="true" focusable="false" /><span><strong>{skill.name}</strong><small>{skill.note}</small></span></motion.div>;
                        })}
                      </div>
                    </motion.section>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>

        <section className="experience-section" id="experience">
          <div className="container experience-layout">
            <SectionMarker number="03" label="Experience & education" />
            <motion.div className="timeline" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-12%" }} variants={stagger}>
              <motion.article className="timeline-item timeline-item-highlight" variants={reveal} whileHover={{ x: 7 }}>
                <div className="timeline-date">FEB 2026 — PRESENT</div>
                <div><h2>Pilvot Technologies</h2><p>Full-stack Developer, Co-Founder</p><span>Led backend and frontend development of the LRAGMS, including APIs, database structures, and core application functionality.</span></div>
              </motion.article>
              <motion.article className="timeline-item" variants={reveal} whileHover={{ x: 7 }}>
                <div className="timeline-date">AUGUST 2026 — PRESENT</div>
                <div><h2>Equitable Computing Services</h2><p>Software Engineer</p><span>Engineered software solutions for banking and fintech clients contributing to systems, integrations, and reliable services.</span></div>
              </motion.article>
              <motion.article className="timeline-item" variants={reveal} whileHover={{ x: 7 }}>
                <div className="timeline-date">JAN — AUG 2026</div>
                <div><h2>Exist Software Labs</h2><p>Software Engineer Intern</p><span>Developed tests, practiced software development concepts, and supported documentation and technical tasks.</span></div>
              </motion.article>
              <motion.article className="timeline-item" variants={reveal} whileHover={{ x: 7 }}>
                <div className="timeline-date">JUN 2024 — JUN 2025</div>
                <div><h2>ElevEight</h2><p>Full-stack Developer</p><span>Developed the Lorenzo Ruiz Academy Grade Management System across frontend and backend components.</span></div>
              </motion.article>
              <motion.article className="timeline-item" variants={reveal} whileHover={{ x: 7 }}>
                <div className="timeline-date">DEC 2020 — PRESENT</div>
                <div><h2>Freelance Game Developer</h2><p>Unity Game Developer</p><span>Designed and built complete prototypes, gameplay mechanics, UI systems, and basic animation and art.</span></div>
              </motion.article>
            </motion.div>
            <motion.aside className="education-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.5, delay: 0.16 }}>
              <span className="education-label">Academic record</span>
              <h2>University of<br />Santo Tomas</h2>
              <p>BS Computer Science<br />2022 — 2026</p>
              <div className="education-rule" />
              <ul><li><Check size={13} aria-hidden="true" /> Best Thesis Award</li><li><Check size={13} aria-hidden="true" /> Core Computer Science Track</li><li><Check size={13} aria-hidden="true" /> Dean’s List · multiple terms</li></ul>
            </motion.aside>
          </div>
        </section>


        <section className="contact-section" id="contact">
          <motion.div className="container contact-layout" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-12%" }} variants={stagger}>
            <motion.div className="contact-copy" variants={reveal}>
              <SectionMarker number="04" label="Make contact" />
              <h2>Are you <em>There?</em></h2>
              <p>leave a message. I'll be here at <a href="mailto:simonsumngat21@gmail.com">simonsumngat21@gmail.com</a>.</p>
              <div className="contact-links"><a href="mailto:simonsumngat21@gmail.com"><Mail size={16} aria-hidden="true" /> Email Simon</a><a href="https://www.linkedin.com/in/simonsumngat" target="_blank" rel="noreferrer"><Linkedin size={16} aria-hidden="true" /> LinkedIn</a></div>
            </motion.div>
            {/* TODO: Implement Contact Function */}
            {/* <motion.form className="contact-form" onSubmit={handleSubmit} variants={reveal}>
              <div className="form-row"><label htmlFor="name">Your name</label><input id="name" name="name" autoComplete="name" required placeholder="Name…" /></div>
              <div className="form-row"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" autoComplete="email" required placeholder="you@company.com…" /></div>
              <div className="form-row"><label htmlFor="message">A few words</label><textarea id="message" name="message" rows={4} required placeholder="What are you working on?" /></div>
              <button className="form-submit" type="submit">{formSent ? "Message staged" : "Send a note"} <Send size={15} aria-hidden="true" /></button>
            </motion.form> */}
          </motion.div>
          
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-top"><div className="footer-brand"><BrandMark /><span>SIMON<br />SUMNGAT</span></div><p>Curious, <br />Still learning,<br />stil building.</p><a className="resume-link" href="/Resume.pdf" download><Download size={15} aria-hidden="true" /> Download resume</a></div>
        <div className="container footer-bottom"><span>© 2026 Simon Sumngat</span><span className="footer-location"><MapPin size={14} aria-hidden="true" /> Imus City, Cavite · Philippines</span><div className="footer-social"><a href="https://github.com/jhaunn" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={16} aria-hidden="true" /></a><a href="https://www.linkedin.com/in/simonsumngat" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={16} aria-hidden="true" /></a><a href="mailto:simonsumngat21@gmail.com" aria-label="Email"><Mail size={16} aria-hidden="true" /></a><a href="#top" aria-label="Back to top"><ArrowUpRight size={16} aria-hidden="true" /></a></div></div>
      </footer>

      <AnimatePresence>
        {notice && <motion.div className="toast-notice" role="status" aria-live="polite" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}><ExternalLink size={15} aria-hidden="true" /> {notice}</motion.div>}
      </AnimatePresence>
    </div>
  );
}
