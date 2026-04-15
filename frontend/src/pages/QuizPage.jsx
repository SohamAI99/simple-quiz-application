// QuizPage.jsx — Two-column: question on left, sidebar on right

import { useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const CAT_META = {
  gk:          { label: "General Knowledge", icon: "🌍" },
  programming:  { label: "Programming",       icon: "💻" },
  aptitude:     { label: "Aptitude",          icon: "🧮" },
};

function QuizPage({ userName, category, onFinish, onGoHome }) {
  const [questions,      setQuestions]      = useState([]);
  const [currentIndex,   setCurrentIndex]   = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [answers,        setAnswers]        = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [error,          setError]          = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res  = await fetch(`${API_BASE}/questions?category=${category}`);
        if (!res.ok) throw new Error("Server error — is the backend running?");
        const data = await res.json();
        setQuestions(data.questions);
        setAnswers(new Array(data.questions.length).fill(""));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [category]);

  // Pre-fill already-answered question when navigating back (not exposed yet, but safe)
  useEffect(() => {
    setSelectedOption(answers[currentIndex] || "");
  }, [currentIndex]);

  const handleSelect = (option) => {
    setSelectedOption(option);
    const updated = [...answers];
    updated[currentIndex] = option;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = async () => {
    let score = 0;
    questions.forEach((q, i) => { if (answers[i] === q.answer) score++; });
    const total = questions.length;

    try {
      await fetch(`${API_BASE}/score`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ name: userName, score, total, category }),
      });
    } catch (_) {}

    onFinish({ score, total });
  };

  const meta     = CAT_META[category] || { label: category, icon: "📝" };
  const progress = questions.length ? ((currentIndex + 1) / questions.length) * 100 : 0;
  const isLast   = currentIndex === questions.length - 1;

  // ── Loading / Error ──
  if (loading) return (
    <div className="loader-center">
      <div className="spinner" />
      <p className="loader-text">Fetching questions...</p>
    </div>
  );

  if (error) return (
    <div style={{ maxWidth: 520, margin: "0 auto" }}>
      <div className="error-card">
        <p style={{ fontSize: "1.8rem" }}>⚠️</p>
        <p style={{ fontWeight: 600, marginTop: 10 }}>Could not load questions</p>
        <p style={{ fontSize: "0.83rem", marginTop: 6 }}>{error}</p>
        <button className="btn-outline" onClick={onGoHome}
          style={{ marginTop: 18, width: "auto", padding: "8px 20px" }}>
          ← Go Home
        </button>
      </div>
    </div>
  );

  const q = questions[currentIndex];

  return (
    <div>
      {/* Header row */}
      <div className="quiz-header">
        <div className="quiz-breadcrumb">
          <span>{meta.icon} <strong>{meta.label}</strong></span>
          <span style={{ color: "var(--border)" }}>·</span>
          <span>{userName}</span>
        </div>
        <button id="quiz-exit-btn" className="quiz-exit-btn" onClick={onGoHome}>
          Exit Quiz
        </button>
      </div>

      {/* Progress */}
      <div className="progress-row">
        <span className="progress-label">Progress</span>
        <span className="progress-fraction">{currentIndex + 1} / {questions.length}</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Two-column layout */}
      <div className="quiz-layout">
        {/* ── Left: Question ── */}
        <div className="quiz-main">
          <div className="question-card">
            <p className="question-label">Question {currentIndex + 1}</p>
            <p className="question-text">{q.question}</p>
          </div>

          <div className="options-grid">
            {q.options.map((opt, idx) => {
              const id = `opt-${currentIndex}-${idx}`;
              return (
                <div className="option-item" key={idx}>
                  <input
                    type="radio"
                    id={id}
                    name={`q-${currentIndex}`}
                    className="option-radio"
                    value={opt}
                    checked={selectedOption === opt}
                    onChange={() => handleSelect(opt)}
                  />
                  <label htmlFor={id} className="option-label">
                    <span className="option-dot">
                      {selectedOption === opt && (
                        <span style={{
                          width: 5, height: 5,
                          background: "#fff",
                          borderRadius: "50%",
                          display: "block",
                        }} />
                      )}
                    </span>
                    <span className="option-text">{opt}</span>
                  </label>
                </div>
              );
            })}
          </div>

          <button
            id="quiz-next-btn"
            className="btn-next"
            onClick={handleNext}
            disabled={!selectedOption}
          >
            {isLast ? "Submit Quiz ✓" : "Next →"}
          </button>

          {!selectedOption && (
            <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.8rem", marginTop: 10 }}>
              Choose an option to continue
            </p>
          )}
        </div>

        {/* ── Right: Sidebar ── */}
        <div className="quiz-sidebar">
          {/* User Info */}
          <div className="sidebar-card">
            <div className="sidebar-title">Player</div>
            <div className="sidebar-user-info">
              <div className="user-avatar">👤</div>
              <div>
                <div className="user-name">{userName}</div>
                <div className="user-cat">{meta.label}</div>
              </div>
            </div>
          </div>

          {/* Question Map */}
          <div className="sidebar-card">
            <div className="sidebar-title">Questions</div>
            <div className="question-grid">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`q-dot ${
                    i === currentIndex
                      ? "current"
                      : answers[i]
                        ? "answered"
                        : ""
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
