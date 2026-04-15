// HomePage.jsx — Two-column layout: form on left, live mini-leaderboard on right

import { useState, useEffect, useRef } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const CATEGORIES = [
  { key: "gk",          icon: "🌍", name: "General Knowledge", desc: "Geography, science & world facts" },
  { key: "programming", icon: "💻", name: "Programming",        desc: "HTML, CSS, JavaScript & web dev"  },
  { key: "aptitude",    icon: "🧮", name: "Aptitude",           desc: "Math, logic & problem solving"    },
];

const RANK_EMOJI = { 0: "🥇", 1: "🥈", 2: "🥉" };

function HomePage({ onStartQuiz }) {
  const [name, setName]               = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const intervalRef                   = useRef(null);

  // Fetch leaderboard immediately and then every 5 seconds
  const fetchLeaderboard = async () => {
    try {
      const res  = await fetch(`${API_BASE}/leaderboard`);
      const data = await res.json();
      setLeaderboard(data.leaderboard.slice(0, 6)); // show top 6 in mini view
    } catch (_) {}
  };

  useEffect(() => {
    fetchLeaderboard();
    intervalRef.current = setInterval(fetchLeaderboard, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const canStart = name.trim().length > 0;

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
          <label className="input-label" htmlFor="name-input">Your name</label>
          <input
            id="name-input"
            className="input-field"
            type="text"
            placeholder="e.g. Soham"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={30}
            autoFocus
            onKeyDown={(e) => {
              // Allow pressing Enter then clicking the first enabled category
              if (e.key === "Enter" && canStart) {
                onStartQuiz(name.trim(), "gk");
              }
            }}
          />

          <div className="category-list">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                id={`start-${cat.key}`}
                className="category-btn"
                onClick={() => onStartQuiz(name.trim(), cat.key)}
                disabled={!canStart}
                title={canStart ? `Start ${cat.name}` : "Enter your name first"}
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

          {!canStart && (
            <p className="name-hint">Enter your name above to start a quiz.</p>
          )}
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
            <div className="stat-number">{leaderboard.length}</div>
            <div className="stat-label">Players</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">
              {leaderboard.length > 0 ? `${leaderboard[0].score}/${leaderboard[0].total}` : "—"}
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
              <div className="mini-lb-row" key={entry.id}>
                <span className="mini-rank">
                  {RANK_EMOJI[i] ?? `#${i + 1}`}
                </span>
                <span className="mini-name">{entry.name}</span>
                <span className="mini-score">{entry.score}/{entry.total}</span>
                <span className="mini-cat">{entry.category}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
