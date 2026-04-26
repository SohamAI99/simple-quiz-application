import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Award, Trophy, Globe, Code, Calculator } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const CATEGORY_CONFIG = {
  gk:          { label: "General Knowledge", icon: <Globe size={24} color="var(--blue-light)" />, pill: "pill-gk" },
  programming:  { label: "Programming",       icon: <Code size={24} color="var(--green)" />, pill: "pill-programming" },
  aptitude:     { label: "Aptitude",          icon: <Calculator size={24} color="var(--gold)" />, pill: "pill-aptitude" },
};

function RankCell({ rank }) {
  if (rank === 1) return <span className="rank-cell rank-1"><Award size={20} color="var(--gold)" /></span>;
  if (rank === 2) return <span className="rank-cell rank-2"><Award size={20} color="#94a3b8" /></span>;
  if (rank === 3) return <span className="rank-cell rank-3"><Award size={20} color="#b45309" /></span>;
  return <span className="rank-cell rank-n">#{rank}</span>;
}

function LeaderboardSection({ title, icon, data }) {
  return (
    <div className="lb-table-card" style={{ marginBottom: '2.5rem' }}>
      <div className="section-header" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '20px', borderBottom: '1px solid var(--border)' }}>
        {icon}
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{title}</h2>
      </div>
      
      {data.length === 0 ? (
        <div className="lb-empty" style={{ padding: '40px' }}>
          <p style={{ color: 'var(--text-muted)' }}>No records yet</p>
        </div>
      ) : (
        <table className="lb-table">
          <thead>
            <tr>
              <th style={{ width: '80px' }}>Rank</th>
              <th>Name</th>
              <th style={{ textAlign: 'right' }}>Score</th>
              <th style={{ textAlign: 'right' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, i) => (
              <tr key={entry._id || i}>
                <td><RankCell rank={i + 1} /></td>
                <td className="lb-name">{entry.name}</td>
                <td style={{ textAlign: 'right', fontWeight: 700, color: 'var(--blue-light)', fontSize: '1.1rem' }}>
                  {entry.score}/10
                </td>
                <td style={{ textAlign: 'right', color: "var(--text-muted)", fontSize: "0.82rem" }}>
                  {new Date(entry.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function LeaderboardPage({ onGoHome }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);
  const intervalRef                   = useRef(null);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_BASE}/leaderboard`);
      setLeaderboard(res.data.leaderboard);
      setError(null);
    } catch (err) {
      setError("Failed to sync leaderboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    intervalRef.current = setInterval(fetchData, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const getCategorizedData = (cat) => {
    return leaderboard.filter(item => item.category === cat).slice(0, 10);
  };

  return (
    <div className="fade-in">
      <div className="lb-page-header" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 className="lb-heading" style={{ fontSize: '2.5rem' }}>Global Rankings</h1>
          <p style={{ color: "var(--text-muted)", marginTop: 4 }}>
            Top performers across all categories
          </p>
        </div>
        <button className="btn-landing-secondary" onClick={onGoHome} style={{ padding: '12px 24px' }}>
          Back to Quiz
        </button>
      </div>

      {loading ? (
        <div className="loader-center">
          <div className="spinner" />
        </div>
      ) : error ? (
        <div className="error-card">{error}</div>
      ) : (
        <div className="categorized-leaderboards">
          {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
            <LeaderboardSection 
              key={key}
              title={config.label}
              icon={config.icon}
              data={getCategorizedData(key)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default LeaderboardPage;
