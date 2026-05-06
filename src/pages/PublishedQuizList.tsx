import { useEffect, useState } from "react";
import { Alert, Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { QuizInfo } from "../types/quiz";
import { fetchPublishedQuizzes } from "../api";
import StudentQuizCard from "../components/StudentQuizCard";

/**
 * Student-facing list of published quizzes from GET /api/quizzes/publishedquizz.
 */
export default function PublishedQuizList() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<QuizInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchPublishedQuizzes()
      .then((data) => {
        if (!cancelled) setQuizzes(data);
      })
      .catch((err: unknown) => {
        if (!cancelled)
          setError(err instanceof Error ? err.message : "Failed to load quizzes.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      <div className="quiz-list-header">
        <div className="quiz-list-title">
          <h2>Published quizzes</h2>
          <p>Browse available quizzes and view your results.</p>
        </div>
      </div>

      {loading && (
        <Box className="published-quiz-loading">
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" className="published-quiz-alert-margin">
          {error}
        </Alert>
      )}

      {!loading && !error && quizzes.length === 0 && (
        <Alert severity="info">No published quizzes yet.</Alert>
      )}

      <div className="qc-wrap">
        {!loading && quizzes
          .slice()
          .sort((a, b) => a.id - b.id)
          .map((q) => (
            <StudentQuizCard
              key={q.id}
              {...q}
              onAttempt={() => navigate(`/student/quizzes/${q.id}/take`)}
              onViewResults={() => navigate(`/publishedquizz/${q.id}/results`, { state: { quizName: q.name } })}
              onSeeReviews={() => navigate(`/publishedquizz/${q.id}/reviews`)}
              onAddReview={() => navigate(`/publishedquizz/${q.id}/reviews/new`)} />
          ))}
      </div>
    </>
  );
}