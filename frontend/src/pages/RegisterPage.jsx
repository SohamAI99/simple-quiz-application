import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function RegisterPage({ onSwitch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    const res = await register(name, email, password);
    setLoading(false);
    if (res.success) {
      setSuccess("Account created successfully!");
      setTimeout(onSwitch, 1500);
    } else setError(res.message);
  };

  return (
    <div style={{ maxWidth: '420px', margin: '4rem auto' }}>
      <h1 className="page-heading" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Create Account
      </h1>
      
      <div className="card">
        {error && (
          <div style={{ color: 'var(--red)', background: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: 'var(--radius)', marginBottom: '1.5rem', fontSize: '0.85rem', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            {error}
          </div>
        )}
        {success && (
          <div style={{ color: 'var(--green)', background: 'rgba(34, 197, 94, 0.1)', padding: '10px', borderRadius: 'var(--radius)', marginBottom: '1.5rem', fontSize: '0.85rem', textAlign: 'center', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label className="input-label">Full Name</label>
            <input
              className="input-field"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
            {loading ? "Creating..." : "Register Now"}
          </button>
        </form>
      </div>

      <p style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-sub)', fontSize: '0.9rem' }}>
        Already have an account? <button onClick={onSwitch} style={{ background: 'none', border: 'none', color: 'var(--blue-light)', fontWeight: 700, cursor: 'pointer' }}>Login here</button>
      </p>
    </div>
  );
}

export default RegisterPage;
