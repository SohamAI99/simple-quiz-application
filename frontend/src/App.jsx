// App.jsx - Root component with topbar + page routing

import { useState } from "react";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import LeaderboardPage from "./pages/LeaderboardPage";

function App() {
  const [page, setPage] = useState("home");
  const [userName, setUserName] = useState("");
  const [category, setCategory] = useState("");
  const [quizResult, setQuizResult] = useState(null);

  const handleStartQuiz = (name, cat) => {
    setUserName(name);
    setCategory(cat);
    setPage("quiz");
  };

  const handleQuizFinish = (result) => {
    setQuizResult(result);
    setPage("result");
  };

  const handleRestart = () => {
    setQuizResult(null);
    setCategory("");
    setPage("home");
  };

  const handleViewLeaderboard = () => setPage("leaderboard");
  const handleGoHome = () => { setQuizResult(null); setPage("home"); };

  return (
    <div className="app-shell">
      {/* ── Top Navigation Bar ── */}
      <nav className="topbar">
        <div className="topbar-brand" onClick={handleGoHome} style={{ cursor: "pointer" }}>
          <span className="topbar-brand-icon">🧠</span>
          Smart Quiz App
        </div>
        <div className="topbar-nav">
          <button
            className={`topbar-btn ${page === "home" ? "active" : ""}`}
            onClick={handleGoHome}
          >
            Home
          </button>
          <button
            className={`topbar-btn ${page === "leaderboard" ? "active" : ""}`}
            onClick={handleViewLeaderboard}
          >
            🏆 Leaderboard
          </button>
        </div>
      </nav>

      {/* ── Page Content ── */}
      <main className="main-content page-enter">
        {page === "home" && (
          <HomePage onStartQuiz={handleStartQuiz} />
        )}
        {page === "quiz" && (
          <QuizPage
            userName={userName}
            category={category}
            onFinish={handleQuizFinish}
            onGoHome={handleGoHome}
          />
        )}
        {page === "result" && (
          <ResultPage
            userName={userName}
            category={category}
            score={quizResult?.score}
            total={quizResult?.total}
            onRestart={handleRestart}
            onViewLeaderboard={handleViewLeaderboard}
          />
        )}
        {page === "leaderboard" && (
          <LeaderboardPage onGoHome={handleGoHome} />
        )}
      </main>
    </div>
  );
}

export default App;
