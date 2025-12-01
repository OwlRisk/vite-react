import { useEffect, FC } from 'react';

// CSS content is now included as a string constant
const AppStyles = `
/*
  Theme Variables & Global Reset
*/
:root {
  --bg-0: #07090e;
  --bg-1: #0b0f18;
  --bg-2: #0e1422;
  --text: #e6e7eb;
  --muted: #9aa3b2;
  --line: rgba(255, 255, 255, 0.06);
  --card: rgba(255, 255, 255, 0.04);
  --card-strong: rgba(255, 255, 255, 0.08);
  --accent-1: #62f0c8;
  --accent-2: #7b6cff;
  --accent-3: #00c2ff;
  --font-family: 'Inter', sans-serif;
}

/* Reset and Global Styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-family: var(--font-family);
  color: var(--text);
  scroll-behavior: smooth;
  background-color: var(--bg-0);
}

body {
  /* Set initial background for systems with reduced motion */
  background: linear-gradient(180deg, var(--bg-0), var(--bg-2) 60%, var(--bg-1));
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  line-height: 1.6;
}

/* Base Typography */
h1, h2, h3, h4 {
  font-weight: 700;
  line-height: 1.2;
}

h1 { font-size: 3rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.5rem; }

@media (max-width: 768px) {
  h1 { font-size: 2rem; }
  h2 { font-size: 1.5rem; }
  h3 { font-size: 1.25rem; }
}

p {
  color: var(--muted);
}

a {
  color: var(--text);
  text-decoration: none;
  transition: color 0.2s, opacity 0.2s;
}

a:hover {
  color: var(--accent-1);
}

a.cta, button.cta {
  background-color: var(--accent-1);
  color: var(--bg-0);
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  border: 1px solid transparent;
  transition: transform 0.2s, background-color 0.2s, box-shadow 0.2s;
}

a.cta:hover, button.cta:hover {
  background-color: var(--accent-1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(98, 240, 200, 0.3);
  color: var(--bg-0); /* Keep text black on hover */
}

a.ghost {
  background-color: transparent;
  color: var(--text);
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  border: 1px solid var(--line);
}

a.ghost:hover {
  border-color: var(--accent-1);
  color: var(--accent-1);
}

/* Utility Classes */
.container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 24px;
}

section {
  padding: 80px 0;
  position: relative;
  z-index: 10; /* Ensures content is above the background glow */
}

@media (max-width: 768px) {
  section {
    padding: 60px 0;
  }
}

.card {
  background-color: var(--card);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 32px;
  backdrop-filter: blur(5px);
}

.stack {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  align-items: start;
}

.icon {
  width: 24px;
  height: 24px;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}

/* Grid Overlay (Visual Element) */
.grid-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background-image: linear-gradient(to right, var(--line) 1px, transparent 1px),
    linear-gradient(to bottom, var(--line) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.15;
  z-index: 1;
}

/* Header and Navigation */
header {
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: var(--bg-0);
  border-bottom: 1px solid var(--line);
  backdrop-filter: blur(10px);
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.25rem;
  font-weight: 700;
}

.logo {
  width: 24px;
  height: 24px;
  background-color: var(--accent-1);
  border-radius: 4px;
}

.nav-links {
  display: flex;
  gap: 24px;
}

.nav-links a {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--muted);
}

.nav-links a:hover {
  color: var(--accent-1);
}

@media (max-width: 992px) {
  .nav-links {
    display: none; /* Hide main nav on smaller screens */
  }
}

/* Hero Section - UPDATED TO 100VH AND ABSOLUTELY CENTERED CONTENT */
.hero {
  /* Use strict height for perfect centering effect */
  height: 100vh; 
  width: 100%;
  
  /* Flexbox for centering the container */
  display: flex; 
  align-items: center; /* Vertical center */
  justify-content: center; /* Horizontal center */
  
  /* Remove old padding to allow strict centering */
  padding-top: 0;
  padding-bottom: 0;
}

.hero-inner {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 60px;
  align-items: start;
  
  /* Add margin to push content down past the typical sticky header height (approx 56px) */
  margin-top: 56px; 
}

@media (max-width: 992px) {
  .hero-inner {
    grid-template-columns: 1fr;
    gap: 40px;
    margin-top: 0; /* Remove margin on mobile where the layout is often fluid */
  }
  .hero {
    /* Revert to min-height/auto height on mobile to ensure content doesn't get cut off */
    height: auto;
    min-height: 100vh;
    padding-top: 60px;
    padding-bottom: 60px;
    justify-content: start; /* Reset horizontal justification */
    align-items: start; /* Reset vertical justification */
  }
}

.eyebrow {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--accent-1);
  font-weight: 600;
  margin-bottom: 16px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.eyebrow .sep {
  color: var(--muted);
  opacity: 0.5;
}

.h1 {
  margin-bottom: 24px;
}

.sub {
  font-size: 1.25rem;
  margin-bottom: 32px;
}

.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 32px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background-color: var(--card-strong);
  color: var(--text);
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid var(--line);
}

.badge .icon {
  width: 18px;
  height: 18px;
  color: var(--accent-1);
}

.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

/* Features Grid */
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin-top: 40px;
}

.features .card {
  padding: 24px;
}

.features .card h3 {
  margin: 12px 0 8px;
  color: var(--accent-3);
  font-size: 1.15rem;
}

.features .card .icon {
  color: var(--accent-3);
}

.features .card p {
  font-size: 0.95rem;
  color: var(--muted);
}

/* Bot Card (Sidebar) */
.bot-card {
  background-color: var(--bg-1);
  border: 1px solid var(--line);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  padding: 0;
  align-self: flex-start;
  position: sticky;
  top: 80px; /* Stick below the header */
}

@media (max-width: 992px) {
  .bot-card {
    position: relative;
    top: 0;
    max-width: 400px;
    margin: 0 auto;
  }
}

.bot-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--line);
}

.bot-id {
  display: flex;
  align-items: center;
  gap: 12px;
}

.bot-avatar {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, var(--accent-2), var(--accent-3));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bot-avatar svg {
  width: 20px;
  height: 20px;
}

.bot-name {
  font-weight: 600;
}

.bot-tag {
  color: var(--muted);
  font-size: 0.85rem;
}

.bot-header .ghost {
  padding: 6px 12px;
  font-size: 0.85rem;
}

.bot-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.msg {
  background-color: var(--card-strong);
  padding: 12px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.msg .row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.msg .pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: var(--bg-0);
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--accent-1);
  border: 1px solid var(--line);
}

.msg .pill .icon {
  width: 16px;
  height: 16px;
  color: var(--accent-1);
}

.msg .spread {
  font-size: 0.9rem;
}

.msg .levels {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  font-size: 0.85rem;
  color: var(--muted);
  margin-top: 4px;
}

.msg .levels strong {
  color: var(--text);
  font-weight: 600;
}

/* Feature Stack Section */
.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--accent-1);
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.section-title .icon {
  color: var(--accent-1);
}

.title {
  margin-bottom: 12px;
  color: var(--text);
}

.kicker {
  font-size: 1.1rem;
  margin-bottom: 24px;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.li {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.li-icon {
  width: 20px;
  height: 20px;
  color: var(--accent-1);
  stroke-width: 2;
  flex-shrink: 0;
  margin-top: 2px;
}

.li strong {
  display: block;
  font-size: 1.05rem;
  margin-bottom: 4px;
}

.li span {
  color: var(--muted);
  font-size: 0.95rem;
}

.foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border: 1px solid var(--line);
  border-radius: 12px;
  margin-top: 40px;
  background-color: var(--card);
}

@media (max-width: 600px) {
  .foot {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
}

/* Footer */
.footer {
  padding: 40px 0;
  border-top: 1px solid var(--line);
  background-color: var(--bg-1);
  z-index: 10;
  position: relative;
}

.f-grid {
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  gap: 40px;
}

@media (max-width: 768px) {
  .f-grid {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
  .f-grid .f-col:first-child {
    grid-column: span 2;
  }
}

.f-col h4 {
  font-size: 1rem;
  color: var(--text);
  margin-bottom: 16px;
}

.f-col a {
  display: block;
  font-size: 0.9rem;
  color: var(--muted);
  margin-bottom: 8px;
}

.f-col a:hover {
  color: var(--accent-1);
}
`;

// Main App component
const App: FC = function() {
  const currentYear = new Date().getFullYear();

  // 1. useEffect for dynamically injecting CSS.
  // This resolves the 'Could not resolve "./App.css"' error by combining the files.
  useEffect(() => {
    // Check if styles have already been injected to prevent duplication on re-render
    if (!document.getElementById('app-styles')) {
      const styleTag = document.createElement('style');
      styleTag.id = 'app-styles';
      styleTag.textContent = AppStyles;
      document.head.appendChild(styleTag);
    }
  }, []); // Run only once on mount

  // 2. useEffect hook to handle the subtle mouse-following background glow.
  useEffect(() => {
    const body = document.body;
    let raf: number | null = null;

    function move(e: globalThis.MouseEvent) {
      // Calculate normalized cursor position (0-100%)
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;

      if (raf !== null) cancelAnimationFrame(raf);

      // Use requestAnimationFrame to smooth the background change
      raf = requestAnimationFrame(() => {
        // Set the background using two radial gradients tied to cursor position,
        // layered over a fixed linear gradient.
        body.style.background = `
          radial-gradient(1200px 600px at ${x}% ${y - 10}%, rgba(123,108,255,0.18), transparent 60%),
          radial-gradient(900px 500px at ${Math.max(0, x - 60)}% 30%, rgba(0,194,255,0.14), transparent 60%),
          linear-gradient(180deg, #07090e, #0e1422 60%, #0b0f18)
        `;
      });
    }

    // Check for reduced motion preference for accessibility and performance
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!media.matches) {
      window.addEventListener('mousemove', move as EventListener);
    }

    // Cleanup function: removes listener and cancels pending animation frame
    return () => {
      window.removeEventListener('mousemove', move as EventListener);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Grid overlay for aesthetic background structure */}
      <div className="grid-overlay" aria-hidden="true"></div>

      <header>
        <div className="container nav">
          <div className="brand">
            <div className="logo" aria-hidden="true"></div>
            <a href="#" aria-label="Syncrade home">
              Syncrade
            </a>
          </div>
          <nav className="nav-links" aria-label="Primary">
            <a href="#bot">Telegram Bot</a>
            <a href="#signals">Signals</a>
            <a href="#education">Education</a>
            <a href="#monitoring">Monitoring</a>
            <a href="#ratings">Ratings</a>
            <a href="/blog">Blog</a>
            <a href="https://t.me/syncrade" target="_blank" rel="noopener noreferrer">Community</a>
          </nav>
          <a className="cta" href="https://t.me/syncradebot" target="_blank" rel="noopener noreferrer" aria-label="Launch Syncrade Telegram Bot">
            <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M21.8 3.2L2.7 10.5c-.9.35-.88 1.68.03 2l5.1 1.8 1.9 5.3c.32.88 1.53.92 1.97.06l2.9-5.46 5.2-9.79c.44-.83-.37-1.77-1.3-1.31Z" stroke="#0a0b10" strokeWidth="1.6" fill="white"/>
            </svg>
            Launch Bot
          </a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-inner">
            <div>
              <div className="eyebrow">
                <span>Official community of Syncrade AI Hub</span>
                <span className="sep">|</span>
                <span>Transparency</span>
                <span className="sep">|</span>
                <span>Data</span>
                <span className="sep">|</span>
                <span>AI</span>
              </div>

              <h1 className="h1">AI-driven trading intelligence<br />for blockchain markets</h1>
              <p className="sub">Powered by bots, signals, and risk analytics. No deposits. Support via Telegram Stars only.</p>

              <div className="badges">
                <span className="badge" title="No deposits required">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3l7 3v5a9 9 0 0 1-7 8 9 9 0 0 1-7-8V6l7-3Z" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  No deposits
                </span>
                <span className="badge" title="Support via Telegram Stars">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3.5l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.9 6.4 20.7l1.1-6.2L3 10.1l6.2-.9L12 3.5Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round"/>
                  </svg>
                  Telegram Stars only
                </span>
                <span className="badge" title="Risk analytics">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M12 12l6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                    <circle cx="12" cy="12" r="2" fill="currentColor"/>
                  </svg>
                  Risk analytics
                </span>
              </div>

              <div className="hero-ctas">
                <a className="cta" href="https://t.me/syncradebot" target="_blank" rel="noopener noreferrer">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M21.8 3.2L2.7 10.5c-.9.35-.88 1.68.03 2l5.1 1.8 1.9 5.3c.32.88 1.53.92 1.97.06l2.9-5.46 5.2-9.79c.44-.83-.37-1.77-1.3-1.31Z" stroke="#0a0b10" strokeWidth="1.6" fill="white"/>
                  </svg>
                  Launch Telegram Bot
                </a>
                <a className="ghost" href="https://t.me/syncrade" target="_blank" rel="noopener noreferrer">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M3.5 18a5.5 5.5 0 0 1 11 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                    <circle cx="17" cy="10" r="2" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M14.5 18.5a4.5 4.5 0 0 1 7 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                  Join Community
                </a>
                <a className="ghost" href="/blog">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 5.5a3 3 0 0 1 3-3h11v18H8a3 3 0 0 0-3 3V5.5Z" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M8 2.5v18" stroke="currentColor" strokeWidth="1.6"/>
                  </svg>
                  Read the Blog
                </a>
              </div>

              <div className="features" id="signals">
                <div className="card">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M2 12h3M19 12h3M6 12c2-4 10-4 12 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                  <h3>Signals</h3>
                  <p>Algorithmic trade signals with clear entry, levels, and risk context to keep you decisive.</p>
                </div>
                <div className="card" id="education">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M3 9l9-4 9 4-9 4-9-4Z" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M7 11v5c3 2 7 2 10 0v-5" stroke="currentColor" strokeWidth="1.6"/>
                  </svg>
                  <h3>Education</h3>
                  <p>Market structure, playbooks, and tutorials designed to turn signals into repeatable decisions.</p>
                </div>
                <div className="card" id="monitoring">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" stroke="currentColor" strokeWidth="1.6"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6"/>
                  </svg>
                  <h3>Monitoring</h3>
                  <p>Real-time market monitoring with alerts that surface meaningful moves, not noise.</p>
                </div>
                <div className="card" id="ratings">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3.3l2.4 4.9 5.4.8-3.9 3.8.9 5.3L12 15.9 7.2 18.1l.9-5.3-3.9-3.8 5.4-.8L12 3.3Z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round"/>
                  </svg>
                  <h3>Ratings</h3>
                  <p>Data-led ratings and risk scoring to benchmark tokens, strategies, and signal quality.</p>
                </div>
              </div>
            </div>

            <aside className="bot-card" id="bot" aria-label="Telegram bot preview">
              <div className="bot-header">
                <div className="bot-id">
                  <div className="bot-avatar" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <rect x="4" y="5" width="16" height="14" rx="3" stroke="white" strokeWidth="1.6" opacity="0.9"/>
                      <circle cx="9" cy="12" r="1.6" fill="white"/>
                      <circle cx="15" cy="12" r="1.6" fill="white"/>
                    </svg>
                  </div>
                  <div>
                    <div className="bot-name">Syncrade Bot</div>
                    <div className="bot-tag">@syncradebot</div>
                  </div>
                </div>
                <a className="ghost" href="https://t.me/syncradebot" target="_blank" rel="noopener noreferrer">Open in Telegram</a>
              </div>

              <div className="bot-body">
                <div className="msg">
                  <div className="row">
                    <div className="pill">
                      <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M13 3L4 14h6l-1 7 9-11h-6l1-7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                      </svg>
                      Signal
                    </div>
                    <span className="spread">
                      <strong>PAIR</strong> BTC/USDT
                    </span>
                  </div>
                  <div className="row">
                    <div className="levels">
                      <span className="lvl"><strong>Entry</strong> 67,420</span>
                      <span className="lvl"><strong>Target 1</strong> 68,200</span>
                      <span className="lvl"><strong>Target 2</strong> 69,050</span>
                      <span className="lvl"><strong>Invalidation</strong> 66,580</span>
                    </div>
                  </div>
                  <div className="row">
                    <span className="pill">
                      <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M12 4l6 2.5V12a7.5 7.5 0 0 1-6 7.3A7.5 7.5 0 0 1 6 12V6.5L12 4Z" stroke="currentColor" strokeWidth="1.6"/>
                        <path d="M9.5 12.5l1.7 1.7 3.3-3.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Confidence: Medium
                    </span>
                    <span className="pill">
                      <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M4 14a8 8 0 1 1 16 0" stroke="currentColor" strokeWidth="1.6"/>
                        <path d="M12 14l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                      </svg>
                      Risk: Balanced
                    </span>
                  </div>
                </div>

                <div className="msg">
                  <div className="row">
                    <div className="pill">
                      <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M18 10a6 6 0 1 0-12 0c0 4-2 5-2 5h16s-2-1-2-5Z" stroke="currentColor" strokeWidth="1.6"/>
                        <path d="M10 20a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.6"/>
                      </svg>
                      Monitoring
                    </div>
                    <span className="spread">
                      <strong>ALERT</strong> Volatility spike
                    </span>
                  </div>
                  <div className="row">
                    <span className="pill">
                      <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6"/>
                        <path d="M12 7v5l4 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                      </svg>
                      Real-time push
                    </span>
                    <span className="pill">
                      <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M12 4l6 2.5V12a7.5 7.5 0 0 1-6 7.3A7.5 7.5 0 0 1 6 12V6.5L12 4Z" stroke="currentColor" strokeWidth="1.6"/>
                        <path d="M9.5 12.5l1.7 1.7 3.3-3.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      No deposits
                    </span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section>
          <div className="container stack">
            <div className="card">
              <div className="section-title">
                <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 3l9 5-9 5-9-5 9-5Z" stroke="currentColor" strokeWidth="1.6"/>
                  <path d="M3 13l9 5 9-5" stroke="currentColor" strokeWidth="1.6" opacity=".8"/>
                </svg>
                Telegram-first product
              </div>
              <h2 className="title">One bot. Signals, monitoring, and risk—together.</h2>
              <p className="kicker">Start in Telegram. Stay in flow. Syncrade’s bot surfaces opportunities and context in real time.</p>
              <div className="list">
                <div className="li">
                  <svg className="li-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <strong>Actionable signals</strong>
                    <span>Entries, targets, invalidation, and confidence—so you can act with discipline.</span>
                  </div>
                </div>
                <div className="li">
                  <svg className="li-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <strong>Risk analytics</strong>
                    <span>Risk-weighted views and ratings to compare setups and strategies.</span>
                  </div>
                </div>
                <div className="li">
                  <svg className="li-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <strong>Education built-in</strong>
                    <span>From definitions to playbooks, learn while you trade—then dive deeper on the blog.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="section-title">
                <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 3l7 3v5a9 9 0 0 1-7 8 9 9 0 0 1-7-8V6l7-3Z" stroke="currentColor" strokeWidth="1.6"/>
                </svg>
                Principles
              </div>
              <div className="list">
                <div className="li">
                  <svg className="li-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3l8 3.5V12a8 8 0 0 1-8 8 8 8 0 0 1-8-8V6.5L12 3Z" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <strong>Transparency</strong>
                    <span>Clear methodology, visible performance, and data-backed decisions.</span>
                  </div>
                </div>
                <div className="li">
                  <svg className="li-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M3 12h18M12 3v18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                  <div>
                    <strong>Data first</strong>
                    <span>Everything grounded in measurable signals and risk context.</span>
                  </div>
                </div>
                <div className="li">
                  <svg className="li-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                  <div>
                    <strong>AI-native</strong>
                    <span>Automation and intelligence where it matters—timing, context, and risk.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container foot">
            <div>
              <strong>Get started in seconds</strong> — open the bot and follow the prompts.
            </div>
            <div style={{ textAlign: 'right' }}>
              <a className="ghost" href="https://t.me/syncradebot" target="_blank" rel="noopener noreferrer">
                Launch Bot
              </a>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="card" style={{ padding: '24px' }}>
              <div className="section-title">
                <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 12a4 4 0 0 1 4-4h4a4 4 0 1 1 0 8h-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  <path d="M15 12a4 4 0 0 1-4 4H7a4 4 0 1 1 0-8h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
                Quick links
              </div>
              <div className="badges" style={{ margin: '6px 0 0' }}>
                <a className="badge" href="https://t.me/syncradebot" target="_blank" rel="noopener noreferrer">
                  Open Telegram Bot
                </a>
                <a className="badge" href="https://t.me/syncrade" target="_blank" rel="noopener noreferrer">
                  Join Syncrade AI Hub
                </a>
                <a className="badge" href="/blog">Visit Blog</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container f-grid">
          <div className="f-col">
            <div className="brand" style={{ marginBottom: '8px' }}>
              <div className="logo" aria-hidden="true"></div>
              <strong>Syncrade</strong>
            </div>
            <p style={{ margin: '0 0 10px' }}>
              Syncrade AI Hub — an AI-driven trading intelligence ecosystem. Powered by bots, signals, and risk analytics.
            </p>
            <div className="badges">
              <span className="badge">No deposits</span>
              <span className="badge">Telegram Stars only</span>
              <span className="badge">Transparency | Data | AI</span>
            </div>
          </div>

          <div className="f-col">
            <h4>Product</h4>
            <a href="#bot">Telegram Bot</a>
            <a href="#signals">Signals</a>
            <a href="#monitoring">Monitoring</a>
            <a href="#ratings">Ratings</a>
          </div>

          <div className="f-col">
            <h4>Resources</h4>
            <a href="/blog">Blog</a>
            <a href="https://t.me/syncrade" target="_blank" rel="noopener noreferrer">Community</a>
            <a href="#" aria-disabled="true">Docs (coming soon)</a>
          </div>

          <div className="f-col">
            <h4>Legal</h4>
            <a href="#" aria-disabled="true">Terms</a>
            <a href="#" aria-disabled="true">Privacy</a>
            <a href="#" aria-disabled="true">Cookies</a>
          </div>
        </div>

        <div className="container" style={{ marginTop: '18px', color: 'var(--muted)', fontSize: '12.5px' }}>
          <p style={{ margin: 0 }}>
            Risk disclaimer: Trading digital assets involves significant risk and can result in the loss of your capital. Nothing here is financial advice. Syncrade does not accept deposits; support is available via Telegram Stars only.
          </p>
          <p style={{ margin: '8px 0 0' }}>© {currentYear} Syncrade. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;