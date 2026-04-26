import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function LoginPage({ onSwitch, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.success) onLoginSuccess();
    else setError(res.message);
  };

  return (
    <div style={{ maxWidth: '420px', margin: '4rem auto' }}>
      <h1 className="page-heading" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Welcome Back
      </h1>
      
      <div className="card">
        {error && (
          <div style={{ color: 'var(--red)', background: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: 'var(--radius)', marginBottom: '1.5rem', fontSize: '0.85rem', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label className="input-label">Email Address</label>
            <input
              className="input-field"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label className="input-label">Password</label>
            <input
              className="input-field"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-landing-large" style={{ width: '100%' }} disabled={loading}>
            {loading ? "Verifying..." : "Sign In"}
          </button>
        </form>
      </div>

      <p style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-sub)', fontSize: '0.9rem' }}>
        New here? <button onClick={onSwitch} style={{ background: 'none', border: 'none', color: 'var(--blue-light)', fontWeight: 700, cursor: 'pointer' }}>Create an account</button>
      </p>
    </div>
  );
}

export default LoginPage;
