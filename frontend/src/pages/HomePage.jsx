import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

import { Globe, Code, Calculator, TrendingUp, Award, Clock } from "lucide-react";

const CATEGORIES = [
  { key: "gk",          icon: <Globe size={20} />, name: "General Knowledge", desc: "Geography, science & world facts" },
  { key: "programming", icon: <Code size={20} />, name: "Programming",        desc: "HTML, CSS, JavaScript & web dev"  },
  { key: "aptitude",    icon: <Calculator size={20} />, name: "Aptitude",           desc: "Math, logic & problem solving"    },
];

const RANK_ICONS = { 0: <Award size={18} color="var(--gold)" />, 1: <Award size={18} color="#94a3b8" />, 2: <Award size={18} color="#b45309" /> };

function HomePage({ onStartQuiz }) {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [stats, setStats] = useState(null);
  const intervalRef = useRef(null);

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get(`${API_BASE}/leaderboard`);
      setLeaderboard(res.data.leaderboard.slice(0, 6));
    } catch (_) {}
  };

  const fetchUserStats = async () => {
    if (!user) return;
    try {
      const res = await axios.get(`${API_BASE}/user-history/${user.id}`);
      setStats(res.data.stats);
    } catch (_) {}
  };

  useEffect(() => {
    fetchLeaderboard();
    fetchUserStats();
    intervalRef.current = setInterval(fetchLeaderboard, 5000);
    return () => clearInterval(intervalRef.current);
  }, [user]);

  const canStart = true; // User is logged in if they are on this page

  return (
    <div className="home-layout">
      {/* ──────── LEFT: Form ──────── */}
      <div className="home-left">
        <h1 className="page-heading">
          Test what you<br />
          <span>actually know.</span>
        </h1>
        <p className="page-sub">
          Pick a category, answer 10 questions, and see where you rank on the leaderboard.
        </p>

        <div className="card">
          <h2 className="sidebar-title" style={{ marginBottom: 12 }}>Welcome, {user?.name}!</h2>
          <div className="stats-strip">
            <div className="stat-box">
              <div className="sidebar-title" style={{ fontSize: '0.65rem' }}>Attempts</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--blue-light)' }}>{stats?.totalAttempts || 0}</div>
            </div>
            <div className="stat-box">
              <div className="sidebar-title" style={{ fontSize: '0.65rem' }}>Best Score</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--gold)' }}>{stats?.bestScore || 0}/10</div>
            </div>
          </div>

          <label className="input-label" style={{ marginTop: 20 }}>Select Category</label>
          <div className="category-list">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                className="category-btn"
                onClick={() => onStartQuiz(user.name, cat.key)}
              >
                <span className="cat-icon">{cat.icon}</span>
                <div className="cat-info">
                  <div className="cat-name">{cat.name}</div>
                  <div className="cat-desc">{cat.desc}</div>
                </div>
                <span className="cat-badge">10 Qs</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ──────── RIGHT: Stats + Live Leaderboard ──────── */}
      <div className="home-right">
        <div className="stats-strip">
          <div className="stat-box">
            <div className="stat-number">30</div>
            <div className="stat-label">Total Questions</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">3</div>
            <div className="stat-label">Categories</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">
              {leaderboard.length > 0 ? `${leaderboard[0].score}/10` : "—"}
            </div>
            <div className="stat-label">Top Score</div>
          </div>
        </div>

        <div className="card">
          <div className="mini-leaderboard-title">
            <span className="live-dot" />
            Live Leaderboard
          </div>

          {leaderboard.length === 0 ? (
            <div className="empty-mini">No scores yet — be the first!</div>
          ) : (
            leaderboard.map((entry, i) => (
              <div className="mini-lb-row" key={entry.id || i}>
                <span className="mini-rank">
                  {RANK_ICONS[i] ?? `#${i + 1}`}
                </span>
                <span className="mini-name">{entry.name}</span>
                <span className="mini-score">{entry.score}/10</span>
                <span className="mini-cat" style={{ fontSize: '0.65rem', textTransform: 'capitalize' }}>{entry.category}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
