import { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import { BrainCircuit } from "lucide-react";

function App() {
  const { user, logout, loading } = useAuth();
  const [page, setPage] = useState("landing");
  const [category, setCategory] = useState("");
  const [quizResult, setQuizResult] = useState(null);

  // Sync page with auth state
  useEffect(() => {
    if (!loading) {
      if (user) {
        if (page === "landing" || page === "login" || page === "register") {
          setPage("home");
        }
      } else {
        if (page !== "landing" && page !== "login" && page !== "register") {
          setPage("landing");
        }
      }
    }
  }, [user, loading]);

  const handleStartQuiz = (name, cat) => {
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
  const handleGoHome = () => { 
    setQuizResult(null); 
    setPage(user ? "home" : "landing"); 
  };

  if (loading) return <div className="app-shell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;

  const isAuthPage = !user && (page === "landing" || page === "login" || page === "register");

  return (
    <div className="app-shell">
      {/* ── Top Navigation Bar ── */}
      <nav className={`topbar ${isAuthPage ? 'topbar-centered' : ''}`}>
        <div className="topbar-brand" onClick={handleGoHome} style={{ cursor: "pointer" }}>
          <span className="topbar-brand-icon"><BrainCircuit size={24} color="var(--blue-light)" /></span>
          Smart Quiz App
        </div>
        {!isAuthPage && (
          <div className="topbar-nav" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button className={`topbar-btn ${page === "home" || page === "landing" ? "active" : ""}`} onClick={handleGoHome}>
              Home
            </button>
            {user && (
              <button className={`topbar-btn ${page === "leaderboard" ? "active" : ""}`} onClick={handleViewLeaderboard}>
                Leaderboard
              </button>
            )}
            {user ? (
              <button className="topbar-btn" onClick={logout} style={{ color: 'var(--red)' }}>
                Logout ({user.name})
              </button>
            ) : (
              <button className={`topbar-btn ${page === "login" ? "active" : ""}`} onClick={() => setPage("login")}>
                Login
              </button>
            )}
          </div>
        )}
      </nav>

      {/* ── Page Content ── */}
      <main className="main-content page-enter">
        {page === "landing" && <LandingPage onNavigate={setPage} />}
        {page === "login" && <LoginPage onSwitch={() => setPage("register")} onLoginSuccess={() => setPage("home")} />}
        {page === "register" && <RegisterPage onSwitch={() => setPage("login")} />}
        
        {page === "home" && <HomePage onStartQuiz={handleStartQuiz} />}
        
        {page === "quiz" && (
          <QuizPage
            userName={user?.name || "Guest"}
            userId={user?.id}
            category={category}
            onFinish={handleQuizFinish}
            onGoHome={handleGoHome}
          />
        )}
        
        {page === "result" && (
          <ResultPage
            userName={user?.name || "Guest"}
            category={category}
            score={quizResult?.score}
            total={quizResult?.total}
            onRestart={handleRestart}
            onViewLeaderboard={handleViewLeaderboard}
          />
        )}
        
        {page === "leaderboard" && <LeaderboardPage onGoHome={handleGoHome} />}
      </main>
    </div>
  );
}

export default App;
