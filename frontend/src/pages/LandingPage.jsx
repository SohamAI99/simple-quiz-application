import { BrainCircuit, ArrowRight } from "lucide-react";

function LandingPage({ onNavigate }) {
  return (
    <div className="landing-container fade-in">
      <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
        <div className="cat-icon-large" style={{ margin: '0 auto 1.5rem', background: 'var(--blue-faint)', width: '80px', height: '80px', borderRadius: '20px' }}>
          <BrainCircuit size={40} color="var(--blue-light)" />
        </div>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-2px', lineHeight: 1.1 }}>
          Test what you<br />
          <span style={{ color: 'var(--blue-light)' }}>actually know.</span>
        </h1>
        <p style={{ color: 'var(--text-sub)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.5 }}>
          A modern full-stack platform to challenge your knowledge across domains, track your growth, and compete with others.
        </p>

        <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center' }}>
          <button className="btn-landing-large" onClick={() => onNavigate("register")}>
            Get Started <ArrowRight size={20} />
          </button>
          <button className="btn-landing-secondary" onClick={() => onNavigate("login")}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
