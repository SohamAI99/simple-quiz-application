// ResultPage.jsx — Two-column: score details on left, actions on right

const CAT_LABELS = {
  gk:          "General Knowledge 🌍",
  programming:  "Programming 💻",
  aptitude:     "Aptitude 🧮",
};

function getFeedback(score, total) {
  const pct = (score / total) * 100;
  if (pct === 100) return { emoji: "🏆", label: "Perfect!",   cls: "badge-excellent" };
  if (pct >= 80)   return { emoji: "🌟", label: "Excellent!", cls: "badge-excellent" };
  if (pct >= 60)   return { emoji: "👍", label: "Good job!",  cls: "badge-good"      };
  if (pct >= 40)   return { emoji: "😊", label: "Not bad!",   cls: "badge-good"      };
  return                  { emoji: "😅", label: "Try again!", cls: "badge-tryagain"  };
}

function ResultPage({ userName, category, score, total, onRestart, onViewLeaderboard }) {
  const fb      = getFeedback(score, total);
  const catLabel = CAT_LABELS[category] || category;
  const pct     = Math.round((score / total) * 100);

  return (
    <div>
      <h2 className="page-heading" style={{ marginBottom: 28 }}>
        Quiz <span>complete.</span>
      </h2>

      <div className="result-layout">
        {/* ── Left: Score breakdown ── */}
        <div className="result-main card">
          <div style={{ fontSize: "2.5rem", marginBottom: 8 }}>{fb.emoji}</div>

          {/* Big score number */}
          <div className="result-score-big">
            {score}
            <span className="result-score-denom">/{total}</span>
          </div>

          <div className="result-name-text">{userName}</div>
          <div className="result-cat-text">{catLabel}</div>

          <span className={`result-badge ${fb.cls}`}>{fb.label}</span>

          <p className="result-bar-label">{pct}% correct</p>
          <div className="result-bar-track">
            <div
              className="result-bar-fill"
              style={{ width: `${pct}%` }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "14px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--green)" }}>{score}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 3 }}>Correct</div>
            </div>
            <div style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "14px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--red)" }}>{total - score}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 3 }}>Wrong</div>
            </div>
          </div>
        </div>

        {/* ── Right: Actions ── */}
        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <p style={{ color: "var(--text-sub)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: 16 }}>
              Your score has been submitted to the leaderboard. Want to try a different category or beat your score?
            </p>
            <div className="result-action-stack">
              <button id="btn-restart" className="btn-primary" onClick={onRestart}>
                🔄 Play Again
              </button>
              <button id="btn-leaderboard" className="btn-outline" onClick={onViewLeaderboard}>
                🏆 View Leaderboard
              </button>
            </div>
          </div>

          {/* Tip box */}
          <div className="card" style={{ background: "var(--bg-elevated)" }}>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700, marginBottom: 8 }}>
              Did you know?
            </p>
            <p style={{ fontSize: "0.85rem", color: "var(--text-sub)", lineHeight: 1.6 }}>
              {score === total
                ? "You got a perfect score! That's impressive — try a different category next."
                : pct >= 60
                  ? "You're doing well! Reviewing the topics you missed can push you to 100%."
                  : "Practice makes perfect. Try the quiz again to improve your score!"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
