// src/App.jsx
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { PROJECTS_DATA, TRIBBY } from './projectsData';
import SkillSchematic from './SkillSchematic';
import Reveal from './Reveal';
import CursorGlow from './CursorGlow';
import profilePhoto from './bene.jpg';
import './App.css';

const FOCUS_AREAS = [
  { tag: '01', title: 'Web development',         body: 'Full-stack builds across React, PHP, and MySQL — from schema design to shipped interface.' },
  { tag: '02', title: 'Hardware deployment',      body: 'Custom build assembly, diagnostics, and on-site repair for client and personal systems.' },
  { tag: '03', title: 'System optimization',      body: 'Shell scripting, environment configuration, and tuning for stable day-to-day performance.' },
  { tag: '04', title: 'Desktop & app development',body: 'Currently exploring native desktop and mobile app development to extend past the browser.' },
];

// ── Modal body (unchanged) ──────────────────────────────────────────────
function ModalBody({ project, onClose }) {
  const isTribby = project.id === 'tribby';
  return (
    <div className="modal-veil" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>CLOSE</button>

        {isTribby ? (
          <>
            <span className="unit-id">{project.unitId}</span>
            <h3>{project.title}</h3>
            <p className="tribby-tagline" style={{ marginBottom: '16px', color: 'var(--muted)' }}>
              {project.tagline}
            </p>
            <p className="modal-desc">{project.details}</p>
            <div className="modal-platform-list">
              {project.platforms.map(p => (
                <div key={p.label} className={`modal-platform-row ${p.label.toLowerCase()}`}>
                  <span className="modal-platform-label">
                    <span className="platform-label-dot" />
                    {p.label}
                  </span>
                  <div className="platform-stack-row" style={{ flex: 1 }}>
                    {p.stack.map(s => <span key={s} className="stack-pill">{s}</span>)}
                  </div>
                  <span className={`platform-status ${p.status}`}>
                    {p.status === 'live' ? '● Live' : '○ Soon'}
                  </span>
                  {p.link
                    ? <a href={p.link} target="_blank" rel="noreferrer" className="btn-link">{p.linkLabel}</a>
                    : <span className="btn-link" style={{ opacity: 0.3, cursor: 'default' }}>{p.linkLabel}</span>
                  }
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <span className="unit-id">{project.unitId}</span>
            <h3>{project.title}</h3>
            <div className="stack-row">
              {project.stack.map(s => <span key={s} className="stack-pill">{s}</span>)}
            </div>
            {project.spec && (
              <table className="spec-table modal-spec-table">
                <tbody>
                  {Object.entries(project.spec).map(([key, val]) => (
                    <tr key={key}>
                      <td className="spec-key">{key}</td>
                      <td className="spec-val">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <p className="modal-desc">{project.details || project.summary}</p>
            <div className="modal-actions">
              {project.liveLink     && <a href={project.liveLink}     target="_blank" rel="noreferrer" className="btn-link primary">View live</a>}
              {project.codeLink     && <a href={project.codeLink}     target="_blank" rel="noreferrer" className="btn-link">Source code</a>}
              {project.downloadLink && <a href={project.downloadLink} download className="btn-link">Download .zip</a>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Main App ─────────────────────────────────────────────────────────────
export default function App() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [openProject, setOpenProject]   = useState(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'

  const visibleProjects = activeFilter === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === activeFilter);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // ⭐ EmailJS integration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    // ⚠️ Replace this with your actual Template ID
    const SERVICE_ID = 'service_31p4jxt';
    const TEMPLATE_ID = 'template_v84zy1a';  // <-- PASTE YOUR TEMPLATE ID HERE
    const PUBLIC_KEY  = 'ET8iCwkVEDVhN5E06';

    const templateParams = {
      from_name: form.name || 'Anonymous',
      from_email: form.email || 'no-email@example.com',
      message: form.message,
      time: new Date().toLocaleString(), // optional: adds current date/time
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    } finally {
      setSending(false);
    }
  };

  const showTribby = activeFilter === 'all' || activeFilter === 'applications';

  return (
    <div className="site-root">
      <CursorGlow />
      <div className="crt-overlay" aria-hidden="true" />

      {/* TOP RAIL */}
      <div className="top-rail">
        <span className="doc-id">DOC // BR-PORTFOLIO</span>
        <span>Manila, PH</span>
        <span className="rev-tag"><span className="dot" />Available for work</span>
      </div>
git status
      {/* ── NAMEPLATE ── */}
      <section className="nameplate">
        <div className="nameplate-inner">
          <div className="nameplate-top">
            <div>
              <p className="nameplate-eyebrow">IT Technician / Developer</p>
              <h1 className="nameplate-name" data-text="Benedict">Benedict</h1>
              <p className="nameplate-role">
                I build for the web, deploy and repair hardware, and I'm currently branching
                into desktop and app development. Based in the Philippines, working primarily on Windows.
              </p>
            </div>
            <div className="nameplate-photo">
              <div className="photo-bezel">
                <div className="photo-screen">
                  <img src={profilePhoto} alt="Benedict, IT technician and developer" />
                  <div className="photo-scanlines" aria-hidden="true" />
                  <div className="photo-glare"    aria-hidden="true" />
                </div>
                <div className="photo-plate">
                  <span className="plate-dot" />
                  <span className="plate-label">REF.01 — LIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="readout-strip">
          <div className="readout"><p className="readout-label">Primary OS</p>    <p className="readout-value">Windows</p></div>
          <div className="readout"><p className="readout-label">Core Stack</p>    <p className="readout-value">Web Dev</p></div>
          <div className="readout"><p className="readout-label">Shipped Builds</p><p className="readout-value">4<span className="unit">projects</span></p></div>
          <div className="readout"><p className="readout-label">Exploring</p>     <p className="readout-value">Desktop<span className="unit">+ apps</span></p></div>
        </div>
      </section>

      {/* ── SCHEMATIC ── */}
      <Reveal as="section" className="section">
        <div className="section-inner">
          <p className="section-eyebrow">How the work connects</p>
          <h2 className="section-heading">Web first, hardware grounded</h2>
        </div>
        <div className="schematic-figure">
          <SkillSchematic />
        </div>
        <div className="section-inner">
          <p className="schematic-caption">FIG. 1 — from hardware support to shipped application, desktop &amp; app dev in active exploration</p>
        </div>
      </Reveal>

      {/* ── ABOUT + STACK ── */}
      <Reveal as="section" className="split-section section">
        <div className="split-col left">
          <p className="section-eyebrow">Background</p>
          <h2 className="section-heading">About</h2>
          <p className="about-text">
            I'm a web developer working primarily across <strong>React</strong> and{' '}
            <strong>PHP/MySQL</strong>, with a background in IT support — hardware
            troubleshooting, custom build assembly, and client deployments on{' '}
            <strong>Windows</strong> environments. I'm currently expanding into desktop
            and mobile app development, building outward from the web work that's been my main focus.
          </p>
        </div>
        <div className="split-col">
          <p className="section-eyebrow">Specification</p>
          <h2 className="section-heading">Stack</h2>
          <table className="spec-table">
            <tbody>
              <tr><td className="spec-key">Languages</td>  <td className="spec-val">React, Next.js, Node.js, PHP, Python, C#</td></tr>
              <tr><td className="spec-key">Database</td>   <td className="spec-val">MySQL</td></tr>
              <tr><td className="spec-key">Tooling</td>    <td className="spec-val">VS Code, Git, Bash</td></tr>
              <tr><td className="spec-key">Environment</td><td className="spec-val">Windows, exploring desktop &amp; app dev</td></tr>
            </tbody>
          </table>
        </div>
      </Reveal>

      {/* ── PROJECTS ── */}
      <Reveal as="section" className="section">
        <div className="section-inner">
          <div className="projects-header-row">
            <div>
              <p className="section-eyebrow">Selected work</p>
              <h2 className="section-heading tight">Projects</h2>
            </div>
            <div className="filter-rail">
              {['all','systems','applications'].map(f => (
                <button
                  key={f}
                  className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f === 'all' ? 'All' : f === 'systems' ? 'Systems' : 'Applications'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* TRIBBY — featured */}
        {showTribby && (
          <div className="tribby-card">
            <div className="tribby-inner">
              <div className="tribby-header">
                <div className="tribby-title-block">
                  <span className="tribby-badge">{TRIBBY.unitId} // Cross-platform</span>
                  <h3 className="tribby-name">{TRIBBY.title}</h3>
                  <p className="tribby-tagline">{TRIBBY.tagline}</p>
                </div>
                <button className="btn-link" onClick={() => setOpenProject(TRIBBY)}>View details</button>
              </div>
              <p className="tribby-summary">{TRIBBY.summary}</p>
              <div className="tribby-platforms">
                {TRIBBY.platforms.map(p => (
                  <div key={p.label} className={`platform-col ${p.label.toLowerCase()}`}>
                    <p className="platform-label">
                      <span className="platform-label-dot" />{p.label}
                    </p>
                    <div className="platform-stack-row">
                      {p.stack.map(s => <span key={s} className="stack-pill">{s}</span>)}
                    </div>
                    <p className={`platform-status ${p.status}`}>
                      {p.status === 'live' ? '● Live' : '○ Coming soon'}
                    </p>
                    {p.link
                      ? <a href={p.link} target="_blank" rel="noreferrer" className="btn-link full">{p.linkLabel}</a>
                      : <button className="btn-link full" disabled style={{ opacity: 0.35 }}>{p.linkLabel}</button>
                    }
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* UNIT GRID */}
        <div className="unit-grid">
          {visibleProjects.map(project => (
            <div key={project.id} className="unit-card">
              <div>
                <div className="unit-card-top">
                  <span className="unit-id">{project.unitId}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className="stack-row">
                  {project.stack.map(s => <span key={s} className="stack-pill">{s}</span>)}
                </div>
              </div>
              <div className="unit-card-footer">
                <button className="btn-link full" onClick={() => setOpenProject(project)}>
                  View specification
                </button>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ── FOCUS + CONTACT ── */}
      <Reveal as="section" className="lower-section section">
        <div className="focus-col">
          <p className="section-eyebrow">Areas of work</p>
          <h2 className="section-heading">Focus</h2>
          <div className="focus-list">
            {FOCUS_AREAS.map(area => (
              <div key={area.tag} className="focus-item">
                <span className="focus-tag">{area.tag}</span>
                <div><h4>{area.title}</h4><p>{area.body}</p></div>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-col">
          <p className="section-eyebrow">Get in touch</p>
          <h2 className="section-heading">Contact</h2>
          <form onSubmit={handleSubmit}>
            <div className="contact-form-field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your name" required />
            </div>
            <div className="contact-form-field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
            </div>
            <div className="contact-form-field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder="What are you working on?" required />
            </div>
            <button type="submit" className="btn-link primary full" disabled={sending}>
              {sending ? 'Sending...' : 'Send message'}
            </button>
            {status === 'success' && (
              <p style={{ color: 'var(--cyan)', marginTop: '8px' }}>✓ Message sent! I'll get back to you soon.</p>
            )}
            {status === 'error' && (
              <p style={{ color: 'var(--pink)', marginTop: '8px' }}>✗ Something went wrong. Please try again or email me directly.</p>
            )}
          </form>
          <p className="contact-note">Messages are sent directly to my inbox via EmailJS.</p>
          <div className="contact-divider" />
          <div className="social-row">
            <a href="https://github.com/hokagegamerr"                                  target="_blank" rel="noreferrer" className="btn-link">GitHub</a>
            <a href="https://www.linkedin.com/in/john-benedict-ravic-76758b2b2/"        target="_blank" rel="noreferrer" className="btn-link">LinkedIn</a>
          </div>
        </div>
      </Reveal>

      {/* ── FOOTER ── */}
      <div className="bottom-rail">
        <span>Benedict — IT Technician / Developer</span>
        <span>© 2026</span>
      </div>

      {/* ── MODAL ── */}
      {openProject && <ModalBody project={openProject} onClose={() => setOpenProject(null)} />}
    </div>
  );
}