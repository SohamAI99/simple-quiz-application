// LeaderboardPage.jsx — Full-width table with live auto-refresh

import { useState, useEffect, useRef } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const PILL_CLASS = {
  gk:          "pill-gk",
  programming:  "pill-programming",
  aptitude:     "pill-aptitude",
};

function RankCell({ rank }) {
  if (rank === 1) return <span className="rank-cell rank-1">🥇</span>;
  if (rank === 2) return <span className="rank-cell rank-2">🥈</span>;
  if (rank === 3) return <span className="rank-cell rank-3">🥉</span>;
  return <span className="rank-cell rank-n">#{rank}</span>;
}

function LeaderboardPage({ onGoHome }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const intervalRef                   = useRef(null);

  const fetchData = async () => {
    try {
      const res  = await fetch(`${API_BASE}/leaderboard`);
      if (!res.ok) throw new Error("Could not reach the server.");
      const data = await res.json();
      setLeaderboard(data.leaderboard);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch immediately, then every 5 seconds
  useEffect(() => {
    fetchData();
    intervalRef.current = setInterval(fetchData, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const timeStr = lastUpdated
    ? lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    : "—";

  return (
    <div>
      {/* Page header */}
      <div className="lb-page-header">
        <div>
          <h1 className="lb-heading">🏆 Leaderboard</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", marginTop: 4 }}>
            Last updated: {timeStr}
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div className="lb-live-badge">
            <span className="live-dot" />
            Live · refreshes every 5s
          </div>
          <button id="lb-home-btn" className="btn-primary" onClick={onGoHome}
            style={{ width: "auto", padding: "8px 18px" }}>
            + New Quiz
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="loader-center">
          <div className="spinner" />
          <p className="loader-text">Loading leaderboard...</p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="error-card" style={{ maxWidth: 480 }}>
          <p>⚠️ {error}</p>
          <p style={{ fontSize: "0.82rem", marginTop: 6 }}>
            Make sure the backend is running at <strong>http://localhost:5000</strong>
          </p>
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <div className="lb-table-card">
          {leaderboard.length === 0 ? (
            <div className="lb-empty">
              <span className="lb-empty-icon">📋</span>
              <p style={{ fontWeight: 600 }}>No scores yet</p>
              <p style={{ fontSize: "0.83rem", marginTop: 6 }}>Complete a quiz to appear here.</p>
            </div>
          ) : (
            <table className="lb-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Score</th>
                  <th>Category</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, i) => (
                  <tr key={entry.id}>
                    <td><RankCell rank={i + 1} /></td>
                    <td className="lb-name">{entry.name}</td>
                    <td className="lb-score">{entry.score}/{entry.total}</td>
                    <td>
                      <span className={`pill ${PILL_CLASS[entry.category] || ""}`}>
                        {entry.category}
                      </span>
                    </td>
                    <td style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
                      {entry.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default LeaderboardPage;
