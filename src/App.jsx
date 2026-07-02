import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiMail, FiDownload, FiExternalLink, FiGithub, FiMapPin, FiAward,
  FiBriefcase, FiCode, FiChevronDown, FiMenu, FiX, FiSend,
  FiDatabase, FiLayout, FiCheck, FiArrowRight, FiZap, FiStar
} from 'react-icons/fi'
import {
  SiGithub, SiDotnet, SiJavascript, SiPython, SiMysql, SiHtml5,
  SiBootstrap, SiJquery, SiGit, SiPostman, SiNuget, SiReact
} from 'react-icons/si'
import { FaLinkedinIn, FaMicrosoft, FaDatabase, FaCode, FaCss3Alt } from 'react-icons/fa'
import { DiVisualstudio } from 'react-icons/di'
import './index.css'
import './App.css'
import resumeUrl from './assets/Yuvraj_Resume.docx?url'

/* ── Icon aliases for react-icons v5 ─────────────────── */
const SiLinkedin = FaLinkedinIn
const SiMicrosoftazure = FaMicrosoft
const SiMicrosoftsqlserver = FaDatabase
const SiCss3 = FaCss3Alt
const SiVisualstudio = DiVisualstudio
const SiVisualstudiocode = ({ size, color, ...p }) =>
  <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: size ? `${size * 0.9}px` : '0.9em', color: color || 'inherit' }} {...p}>VSC</span>
const SiCsharp = ({ size, color, ...p }) =>
  <span style={{ fontFamily: 'var(--font-code)', fontWeight: 700, fontSize: size ? `${size}px` : '1em', color: color || 'inherit' }} {...p}>C#</span>
const SiSwagger = ({ size, color, ...p }) =>
  <span style={{ fontFamily: 'var(--font-code)', fontWeight: 700, fontSize: size ? `${size * 0.8}px` : '0.8em', color: color || 'inherit', letterSpacing: '-0.5px' }} {...p}>API</span>

/* ============================================================
   DOT GRID BACKGROUND
============================================================ */
function DotGrid() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
      backgroundImage: 'radial-gradient(rgba(59,130,246,0.13) 1px, transparent 1px)',
      backgroundSize: '32px 32px',
      maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
      WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
    }} />
  )
}

/* ============================================================
   PARTICLE CANVAS
============================================================ */
function ParticleCanvas() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const particles = []
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    class Particle {
      constructor() { this.init() }
      init() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 1.4 + 0.4
        this.vx = (Math.random() - 0.5) * 0.28
        this.vy = (Math.random() - 0.5) * 0.28
        this.alpha = Math.random() * 0.35 + 0.08
        this.color = Math.random() > 0.5 ? '59,130,246' : '6,182,212'
      }
      update() {
        this.x += this.vx; this.y += this.vy
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.init()
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${this.color},${this.alpha})`
        ctx.fill()
      }
    }
    for (let i = 0; i < 80; i++) particles.push(new Particle())
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { p.update(); p.draw() })
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(59,130,246,${0.05 * (1 - d / 120)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: 0.5 }} />
}

/* ============================================================
   TYPING ANIMATION
============================================================ */
function TypingText({ texts }) {
  const [idx, setIdx] = useState(0)
  const [shown, setShown] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (paused) { const t = setTimeout(() => setPaused(false), 1500); return () => clearTimeout(t) }
    const word = texts[idx]
    if (!deleting) {
      if (shown.length < word.length) {
        const t = setTimeout(() => setShown(word.slice(0, shown.length + 1)), 70)
        return () => clearTimeout(t)
      } else { setPaused(true); setDeleting(true) }
    } else {
      if (shown.length > 0) {
        const t = setTimeout(() => setShown(shown.slice(0, -1)), 38)
        return () => clearTimeout(t)
      } else { setDeleting(false); setIdx((idx + 1) % texts.length) }
    }
  }, [shown, deleting, paused, idx, texts])
  return (
    <span style={{ fontFamily: 'var(--font-code)' }}>
      <span className="gradient-text">{shown}</span>
      <span className="cursor-blink">|</span>
    </span>
  )
}

/* ============================================================
   NAVBAR
============================================================ */
const NAV_LINKS = ['About', 'Services', 'Skills', 'Projects', 'Experience', 'Education', 'Certifications', 'Contact']

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 60)
      let cur = ''
      NAV_LINKS.forEach(n => {
        const el = document.getElementById(n.toLowerCase())
        if (el && window.scrollY >= el.offsetTop - 150) cur = n.toLowerCase()
      })
      setActive(cur)
    }
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const go = (id) => { setOpen(false); document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <motion.nav className={`navbar${scrolled ? ' navbar-scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
      <div className="navbar-inner">
        <button className="navbar-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="logo-bracket">&lt;</span>
          <span className="gradient-text">YR</span>
          <span className="logo-bracket">/&gt;</span>
        </button>
        <ul className="navbar-links">
          {NAV_LINKS.map(l => (
            <li key={l}>
              <button className={`nav-link${active === l.toLowerCase() ? ' nav-link-active' : ''}`} onClick={() => go(l)}>{l}</button>
            </li>
          ))}
        </ul>
        <button className="menu-toggle" onClick={() => setOpen(v => !v)}>{open ? <FiX size={21} /> : <FiMenu size={21} />}</button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.18 }}>
            {NAV_LINKS.map(l => (
              <button key={l} className={`mobile-link${active === l.toLowerCase() ? ' nav-link-active' : ''}`} onClick={() => go(l)}>{l}</button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

/* ============================================================
   HERO — Floating Tech-Card visual
============================================================ */
/* Cards are placed in a circle: 5 cards at 72° steps, starting at -90° (top) */
const ORBIT_RADIUS = 115
const HERO_TECH_CARDS = [
  { icon: <SiCsharp size={20} color="#06b6d4" />, label: 'C#', angleDeg: -90 },
  { icon: <SiMicrosoftazure size={18} color="#3b82f6" />, label: 'Azure', angleDeg: -18 },
  { icon: <SiReact size={20} color="#61dafb" />, label: 'React', angleDeg: 54 },
  { icon: <SiMicrosoftsqlserver size={18} color="#f59e0b" />, label: 'SQL', angleDeg: 126 },
  { icon: <SiGit size={18} color="#f97316" />, label: 'Git', angleDeg: 198 },
]

function Hero() {
  const goProjects = () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  return (
    <section id="hero" className="hero-section">
      <div className="container hero-content">
        {/* Left — Text */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.p className="hero-greeting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <span className="code-tag">&lt;hello world /&gt;</span>
          </motion.p>
          <motion.h1 className="hero-name" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.7 }}>
            Hi, I'm <br /><span className="gradient-text">Yuvraj Rotliwala</span>
          </motion.h1>
          <motion.div className="hero-role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}>
            <TypingText texts={['.NET Developer', 'C# Developer', 'ASP.NET MVC Developer', 'Backend Developer']} />
          </motion.div>
          <motion.p className="hero-sub" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}>
            Building scalable web applications with{' '}
            <span className="gradient-text">C#, ASP.NET,</span> and{' '}
            <span className="gradient-text">.NET Core</span>
          </motion.p>
          <motion.div className="hero-cta" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}>
            <button className="btn-primary" onClick={goProjects}><FiCode size={17} /> View My Work</button>
            <a className="btn-outline" href={resumeUrl} download="Yuvraj_Resume.docx"><FiDownload size={17} /> Download Resume</a>
          </motion.div>
          <motion.div className="hero-socials" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
            {[
              { href: 'https://github.com/Yuvraj-1508', icon: <SiGithub size={19} />, label: 'GitHub' },
              { href: 'https://linkedin.com/in/yuvraj_rotliwala', icon: <SiLinkedin size={19} />, label: 'LinkedIn' },
              { href: 'mailto:yuvrajrotliwala@email.com', icon: <FiMail size={19} />, label: 'Email' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label={s.label}>{s.icon}</a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — Floating Tech Card Cloud */}
        <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.9 }}>
          <div className="tech-cloud">
            {/* Dashed orbit ring at 115px radius */}
            <div className="tech-cloud-orbit-path" />
            <div className="tech-cloud-core">
              <div className="tech-cloud-core-glow" />
              <div className="tech-cloud-core-ring" />
              <div className="tech-cloud-core-inner">
                <SiDotnet size={52} color="#3b82f6" />
              </div>
            </div>
            {HERO_TECH_CARDS.map((t, i) => {
              const rad = (t.angleDeg * Math.PI) / 180
              const x = Math.round(ORBIT_RADIUS * Math.cos(rad))
              const y = Math.round(ORBIT_RADIUS * Math.sin(rad))
              return (
                <div
                  key={t.label}
                  style={{
                    position: 'absolute',
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 3,
                  }}>
                  <motion.div
                    animate={{ y: [0, -7, 0] }}
                    transition={{ repeat: Infinity, duration: 2.6 + i * 0.5, ease: 'easeInOut', delay: i * 0.18 }}>
                    <div className="tech-card-float-inner">
                      {t.icon}
                      <span className="tech-card-float-label">{t.label}</span>
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
      <motion.div className="scroll-indicator" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
        <FiChevronDown size={24} />
      </motion.div>
    </section>
  )
}

/* ============================================================
   ABOUT SECTION
============================================================ */
function About() {
  const stats = [
    { icon: <FiCode size={20} />, label: 'Projects', val: '2', color: '#3b82f6' },
    { icon: <FiBriefcase size={20} />, label: 'Internship', val: '1', color: '#06b6d4' },
    { icon: <FiAward size={20} />, label: 'AZ-900', val: '✓', color: '#8b5cf6' },
  ]
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeader num="01" label="// who am i" title="About Me" />
        <div className="about-grid">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}>
            <p className="about-bio">Motivated <span className="gradient-text">Computer Science graduate</span> from Surat, Gujarat, passionate about backend development, clean architecture, and the <span className="gradient-text">.NET ecosystem</span>.</p>
            <p className="about-bio" style={{ marginTop: 16 }}>Currently interning at <strong style={{ color: '#3b82f6' }}>OM Software Pvt. Ltd.</strong> as a .NET Developer Intern, building real-world enterprise applications. </p>
            <p className="about-bio" style={{ marginTop: 16 }}>I love writing clean C# code and applying <span className="gradient-text">SOLID, DI, and Repository Pattern</span> principles to create scalable APIs and web apps.</p>
            <div className="about-stats">
              {stats.map((s, i) => (
                <motion.div key={s.label} className="stat-card glass-card"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  whileHover={{ y: -6, boxShadow: `0 16px 40px ${s.color}30` }}>
                  <span className="stat-icon" style={{ color: s.color }}>{s.icon}</span>
                  <span className="stat-value" style={{ color: s.color }}>{s.val}</span>
                  <span className="stat-label">{s.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, delay: 0.15 }}>
            <div className="code-card glass-card">
              <div className="code-header">
                <span className="dot dot-r" /><span className="dot dot-y" /><span className="dot dot-g" />
                <span className="code-filename">yuvraj.cs</span>
              </div>
              <pre className="code-body"><code>{`public class Yuvraj {
  public string Name   = "Yuvraj Rotliwala";
  public string Role   = ".NET Developer";
  public string City   = "Surat, Gujarat";
  public float  CGPA   = 7.73f;

  public string[] Stack = {
    "C#", "ASP.NET MVC",
    ".NET Core 6/8", "EF Core",
    "SQL Server", "REST APIs",
    "React", "Tailwind CSS"
  };

  public string Passion =>
    "Clean Architecture & SOLID";

  public bool OpenToWork() => true;
}`}</code></pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   SERVICES SECTION
============================================================ */
const SERVICES = [
  {
    icon: <FiLayout size={26} />,
    color: '#3b82f6',
    title: 'Business Landing Pages',
    subtitle: 'High-Conversion Static Sites',
    description: 'Design and build clean, fast-loading landing pages tailored to present your business, products, or service portfolios with a premium, modern feel.',
    features: [
      'Responsive & Mobile-First layout grids',
      'SEO-friendly semantic HTML structure',
      'Performance-tuned React/Vite builds',
      'Interactive Framer Motion animations'
    ],
    tech: ['HTML5', 'CSS3', 'React.js', 'Framer Motion']
  },
  {
    icon: <FiDatabase size={26} />,
    color: '#06b6d4',
    title: 'Database & CRUD Operations',
    subtitle: 'Structured Data Solutions',
    description: 'Implement secure, reliable database management systems with custom admin layouts, data entry flows, and search functionality.',
    features: [
      'SQL Server / MySQL schema design',
      'EF Core & direct stored procedures',
      'Clean admin data grids & filters',
      'Secure CRUD operations & search logic'
    ],
    tech: ['C#', '.NET Core', 'SQL Server', 'EF Core']
  }
]

function Services() {
  const goContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="services" className="section section-alt">
      <div className="container">
        <SectionHeader num="02" label="// what i do for you" title="Services I Offer" />
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <motion.div key={s.title} className="service-card glass-card"
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ y: -8, boxShadow: `0 24px 60px ${s.color}25` }}>

              <div className="service-card-glow" style={{ background: s.color }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div className="service-icon-container">
                  <div className="service-icon-orbit" style={{ borderColor: `${s.color}33` }} />
                  <div className="service-icon-glow" style={{ background: s.color }} />
                  <div className="service-icon-inner" style={{ color: s.color, borderColor: `${s.color}55` }}>
                    {s.icon}
                  </div>
                </div>
                <div>
                  <h3 className="service-title">{s.title}</h3>
                  <p className="service-subtitle" style={{ color: s.color }}>{s.subtitle}</p>
                </div>
              </div>

              <p className="service-desc">{s.description}</p>
              <div className="service-accent-line" style={{ background: `linear-gradient(90deg, ${s.color}, transparent)` }} />

              <ul className="service-features">
                {s.features.map(f => (
                  <li key={f} className="service-feature-item">
                    <span className="service-feature-icon" style={{ color: s.color }}><FiCheck size={14} /></span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="service-tech-wrapper">
                {s.tech.map(t => (
                  <span key={t} className="service-tech-badge">{t}</span>
                ))}
              </div>

              <button className="service-action-link" onClick={goContact}>
                Inquire details <FiArrowRight size={13} style={{ marginLeft: 4 }} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   SKILLS SECTION — with real brand icons
============================================================ */
const SKILL_GROUPS = [
  {
    title: 'Languages', color: '#3b82f6',
    skills: [
      { name: 'C#', icon: <SiCsharp size={18} /> },
      { name: 'JavaScript', icon: <SiJavascript size={18} /> },
      { name: 'Python', icon: <SiPython size={18} /> },
    ]
  },
  {
    title: 'Frameworks', color: '#06b6d4',
    skills: [
      { name: 'ASP.NET MVC', icon: <SiDotnet size={18} /> },
      { name: '.NET Core 6/8', icon: <SiDotnet size={18} /> },
      { name: 'EF Core', icon: <FaDatabase size={16} /> },
      { name: 'Web API', icon: <SiSwagger size={17} /> },
      { name: 'Win Forms', icon: <FaCode size={15} /> },
    ]
  },
  {
    title: 'Frontend', color: '#8b5cf6',
    skills: [
      { name: 'React', icon: <SiReact size={18} /> },
      { name: 'HTML5', icon: <SiHtml5 size={18} /> },
      { name: 'CSS3', icon: <SiCss3 size={18} /> },
      { name: 'Bootstrap 5', icon: <SiBootstrap size={18} /> },
      { name: 'jQuery', icon: <SiJquery size={18} /> },
    ]
  },
  {
    title: 'Databases', color: '#f59e0b',
    skills: [
      { name: 'SQL Server', icon: <SiMicrosoftsqlserver size={17} /> },
      { name: 'MySQL', icon: <SiMysql size={18} /> },
      { name: 'Stored Procs', icon: <FaDatabase size={16} /> },
    ]
  },
  {
    title: 'Tools', color: '#10b981',
    skills: [
      { name: 'Visual Studio', icon: <SiVisualstudio size={17} /> },
      { name: 'VS Code', icon: <SiVisualstudiocode size={17} /> },
      { name: 'Postman', icon: <SiPostman size={18} /> },
      { name: 'Git', icon: <SiGit size={18} /> },
      { name: 'GitHub', icon: <SiGithub size={18} /> },
      { name: 'NuGet', icon: <SiNuget size={17} /> },
    ]
  },
  {
    title: 'Concepts', color: '#f43f5e',
    skills: [
      { name: 'MVC Pattern', icon: <FiZap size={16} /> },
      { name: 'Dependency Injection', icon: <FiZap size={16} /> },
      { name: 'SOLID Principles', icon: <FiStar size={16} /> },
      { name: 'Agile / Scrum', icon: <FiStar size={16} /> },
    ]
  },
]

function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeader num="03" label="// what i know" title="Tech Stack" />
        <div className="skills-grid">
          {SKILL_GROUPS.map((g, gi) => (
            <motion.div key={g.title} className="skill-group glass-card"
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: gi * 0.08, duration: 0.5 }}>
              <div className="skill-group-header">
                <div className="skill-group-indicator" style={{ background: g.color }} />
                <h3 className="skill-group-title" style={{ color: g.color }}>{g.title}</h3>
              </div>
              <div className="skill-pills">
                {g.skills.map((sk, si) => (
                  <motion.span key={sk.name} className="skill-pill"
                    initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                    transition={{ delay: gi * 0.05 + si * 0.04, duration: 0.3 }}
                    whileHover={{ scale: 1.06, boxShadow: `0 0 16px ${g.color}55`, borderColor: g.color }}
                    style={{ borderColor: `${g.color}28`, color: 'var(--text-secondary)' }}>
                    <span style={{ color: g.color, display: 'flex', alignItems: 'center' }}>{sk.icon}</span>
                    {sk.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   PROJECTS SECTION — numbered badge instead of emoji
============================================================ */
const PROJECTS = [
  {
    num: '01', color: '#3b82f6',
    title: 'Student Fees Management System',
    stack: 'C# · Windows Forms · SQL Server',
    duration: 'Feb 2025 – May 2025',
    points: ['Desktop app with full CRUD for student fee records', 'SQL Server integration with normalized schema', 'RDLC report generation for printable fee receipts'],
    tags: ['C#', 'Windows Forms', 'SQL Server', 'RDLC'],
    icons: [<SiCsharp size={14} />, <SiMicrosoftsqlserver size={14} />],
  },
  {
    num: '02', color: '#8b5cf6',
    title: 'E-Commerce Product Catalog',
    stack: 'ASP.NET MVC · C# · Bootstrap · SQL Server',
    duration: 'Jul 2024 – Sep 2024',
    points: ['Multi-page catalog with category filtering & pagination', 'Repository Pattern + Dependency Injection architecture', 'Session-based cart with smooth user experience'],
    tags: ['ASP.NET MVC', 'C#', 'Bootstrap', 'Repository Pattern'],
    icons: [<SiDotnet size={14} />, <SiBootstrap size={14} />],
  },
]

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeader num="04" label="// what i've built" title="Featured Projects" />
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <motion.div key={p.title} className="project-card glass-card"
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -10, boxShadow: `0 24px 60px ${p.color}33` }}>
              <div className="proj-top">
                <div className="proj-num-badge" style={{ color: p.color, borderColor: `${p.color}30` }}>
                  <span className="proj-num-label">{p.num}</span>
                  <div className="proj-num-icons">
                    {p.icons.map((ic, idx) => <span key={idx} style={{ color: p.color, display: 'flex' }}>{ic}</span>)}
                  </div>
                </div>
                <a href="https://github.com/Yuvraj-1508" target="_blank" rel="noopener noreferrer" className="proj-github"><SiGithub size={20} /></a>
              </div>
              <div className="proj-line" style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }} />
              <h3 className="proj-title">{p.title}</h3>
              <p className="proj-stack">{p.stack}</p>
              <p className="proj-duration"><FiBriefcase size={12} /> {p.duration}</p>
              <ul className="proj-points">
                {p.points.map(pt => <li key={pt}><span style={{ color: p.color, flexShrink: 0 }}>▸</span>{pt}</li>)}
              </ul>
              <div className="proj-tags">
                {p.tags.map(t => <span key={t} className="tag-pill">{t}</span>)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   EXPERIENCE SECTION
============================================================ */
function Experience() {
  return (
    <section id="experience" className="section section-alt">
      <div className="container">
        <SectionHeader num="05" label="// my journey" title="Experience" />
        <div className="timeline">
          <div className="timeline-line" />
          <motion.div className="timeline-item"
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}>
            <div className="timeline-dot" />
            <div className="timeline-card glass-card">
              <div className="timeline-header">
                <div>
                  <h3 className="timeline-role">.NET Developer Intern</h3>
                  <p className="timeline-company gradient-text">OM Software Pvt. Ltd.</p>
                  <p className="timeline-meta"><FiMapPin size={13} /> Surat, Gujarat &nbsp;·&nbsp; Nov 2025 – Aug 2026</p>
                </div>
                <span className="badge">Internship</span>
              </div>
              <ul className="timeline-points">
                {[
                  'Developed ASP.NET MVC modules for a client inventory management system',
                  'Optimised T-SQL queries, stored procedures, and EF Core migrations for performance',
                  'Participated in Agile stand-ups, code reviews, and sprint planning sessions',
                ].map(pt => <li key={pt}><span style={{ color: '#3b82f6', flexShrink: 0 }}>▸</span>{pt}</li>)}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   EDUCATION SECTION
============================================================ */
function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <SectionHeader num="06" label="// my background" title="Education" />
        <motion.div className="edu-card glass-card"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}
          whileHover={{ y: -6 }}>
          <div className="edu-top">
            <div className="edu-icon-badge">
              <FiAward size={28} color="#3b82f6" />
            </div>
            <div>
              <h3 className="edu-degree">Bachelor of Computer Applications (BCA)</h3>
              <p className="edu-uni gradient-text">Veer Narmad South Gujarat University · Surat Campus</p>
              <p className="edu-meta">2023 – 2026 &nbsp;|&nbsp; CGPA: <strong style={{ color: '#3b82f6' }}>7.73 / 10</strong></p>
            </div>
          </div>
          <div className="edu-divider" />
          <p className="edu-courses-label">Relevant Coursework</p>
          <div className="edu-tags">
            {['Data Structures & Algorithms', 'DBMS', 'Web Technologies', 'OOP', 'Software Engineering'].map(c => (
              <span key={c} className="tag-pill">{c}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ============================================================
   CERTIFICATIONS SECTION — real brand icons
============================================================ */
const CERTS = [
  {
    icon: <SiMicrosoftazure size={32} color="#3b82f6" />,
    color: '#3b82f6', title: 'Microsoft Certified: Azure Fundamentals',
    sub: 'AZ-900', issuer: 'Microsoft', year: '2024', link: '#'
  },
  {
    icon: <SiDotnet size={32} color="#10b981" />,
    color: '#10b981', title: 'ASP.NET Core Foundations Course',
    sub: 'Foundations Certificate', issuer: 'OM Software', year: '2025',
    link: '/certifications/Yuvraj Rotliwala_ASP.NET Core Foundations Course.pdf'
  },
  {
    icon: <SiCsharp size={28} color="#06b6d4" />,
    color: '#06b6d4', title: 'C# and .NET Fundamentals',
    sub: 'Tim Corey Course', issuer: 'Udemy', year: '2023', link: '#'
  },
  {
    icon: <SiDotnet size={30} color="#8b5cf6" />,
    color: '#8b5cf6', title: 'ASP.NET Core Web API Development',
    sub: 'Professional Certificate', issuer: 'Coursera', year: '2023', link: '#'
  },
]

function Certifications() {
  return (
    <section id="certifications" className="section section-alt">
      <div className="container">
        <SectionHeader num="07" label="// achievements" title="Certifications" />
        <div className="certs-grid">
          {CERTS.map((c, i) => (
            <motion.div key={c.title} className="cert-card glass-card"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.14, duration: 0.5 }}
              whileHover={{ y: -8, boxShadow: `0 20px 50px ${c.color}33` }}>
              <div className="cert-glow" style={{ background: c.color }} />
              <div className="cert-icon-wrapper" style={{ borderColor: `${c.color}30` }}>
                {c.icon}
              </div>
              <h3 className="cert-title">{c.title}</h3>
              <p className="cert-sub" style={{ color: c.color }}>{c.sub}</p>
              <div className="cert-meta">
                <span className="cert-issuer">{c.issuer}</span>
                <span className="cert-year" style={{ borderColor: `${c.color}40`, color: c.color }}>{c.year}</span>
              </div>
              {c.link && c.link !== '#' && (
                <motion.a href={c.link} target="_blank" rel="noopener noreferrer" className="cert-link"
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  style={{ color: c.color, borderColor: `${c.color}33` }}
                  whileHover={{ background: `${c.color}11`, borderColor: c.color }}>
                  <FiExternalLink size={13} /> View Certificate
                </motion.a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   CONTACT SECTION
============================================================ */
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const onSubmit = e => {
    e.preventDefault(); setSent(true)
    setTimeout(() => setSent(false), 3000)
    setForm({ name: '', email: '', message: '' })
  }
  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center' }}>
          <p className="section-label">// reach out</p>
          <h2 className="section-title">Let's Connect</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>Open to new opportunities — feel free to reach out anytime!</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            <FiMapPin size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
            Surat, Gujarat, India &nbsp;·&nbsp; Open to relocation across India (on-site / hybrid / remote)
          </p>
          <div className="section-divider" style={{ margin: '20px auto 52px' }} />
        </motion.div>
        <div className="contact-grid">
          <motion.div className="contact-info glass-card" initial={{ opacity: 0, x: -36 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h3 className="contact-title">Get in touch</h3>
            {[
              { icon: <FiMail size={20} />, label: 'Email', value: 'yuvrajrotliwala@email.com', href: 'mailto:yuvrajrotliwala@email.com', color: '#3b82f6' },
              { icon: <SiGithub size={20} />, label: 'GitHub', value: 'github.com/Yuvraj-1508', href: 'https://github.com/Yuvraj-1508', color: '#06b6d4' },
              { icon: <SiLinkedin size={20} />, label: 'LinkedIn', value: 'linkedin.com/in/yuvraj_rotliwala', href: 'https://www.linkedin.com/in/yuvraj-rotliwala/', color: '#8b5cf6' },
            ].map(item => (
              <motion.a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="contact-link" whileHover={{ x: 6 }}>
                <span style={{ color: item.color, display: 'flex' }}>{item.icon}</span>
                <div>
                  <p className="contact-link-label">{item.label}</p>
                  <p className="contact-link-value">{item.value}</p>
                </div>
                <FiExternalLink size={15} style={{ marginLeft: 'auto', opacity: 0.35 }} />
              </motion.a>
            ))}
          </motion.div>
          <motion.form className="contact-form glass-card" onSubmit={onSubmit}
            initial={{ opacity: 0, x: 36 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <h3 className="contact-title">Send a message</h3>
            {[
              { label: 'Name', name: 'name', type: 'text', placeholder: 'Your name' },
              { label: 'Email', name: 'email', type: 'email', placeholder: 'your@email.com' },
            ].map(f => (
              <div key={f.name} className="form-group">
                <label className="form-label">{f.label}</label>
                <input type={f.type} name={f.name} value={form[f.name]} onChange={onChange} className="form-input" placeholder={f.placeholder} required />
              </div>
            ))}
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea name="message" value={form.message} onChange={onChange} className="form-input form-textarea" placeholder="Tell me about your project or opportunity..." rows={4} required />
            </div>
            <motion.button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              {sent ? '✅ Message Sent!' : <><FiSend size={16} /> Send Message</>}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   FOOTER
============================================================ */
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-copy">
          © 2026 <span className="gradient-text">Yuvraj Rotliwala</span>
        </p>
        <div className="footer-socials">
          {[
            { href: 'https://github.com/Yuvraj-1508', icon: <SiGithub size={18} />, label: 'GitHub' },
            { href: 'https://www.linkedin.com/in/yuvraj-rotliwala/', icon: <SiLinkedin size={18} />, label: 'LinkedIn' },
            { href: 'mailto:yuvrajrotliwala@email.com', icon: <FiMail size={18} />, label: 'Email' },
          ].map(s => <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label={s.label}>{s.icon}</a>)}
        </div>
      </div>
    </footer>
  )
}

/* ============================================================
   SHARED SECTION HEADER — with numbered counter
============================================================ */
function SectionHeader({ num, label, title }) {
  return (
    <motion.div className="section-header-wrap" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.55 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
        {num && <span className="section-num">{num}</span>}
        <p className="section-label" style={{ margin: 0 }}>{label}</p>
      </div>
      <h2 className="section-title">{title}</h2>
      <div className="section-divider" />
    </motion.div>
  )
}

/* ============================================================
   APP ROOT
============================================================ */
export default function App() {
  return (
    <>
      <DotGrid />
      <ParticleCanvas />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Certifications />
      <Contact />
      <Footer />
    </>
  )
}
