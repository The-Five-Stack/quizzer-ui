import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  //Container,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import type { QuizInfo } from "../types/quiz";
import { fetchPublishedQuizzes } from "../api";

/**
 * Student-facing list of published quizzes from GET /api/quizzes/publishedquizz.
 */
export default function PublishedQuizList() {
  const [quizzes, setQuizzes] = useState<QuizInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchPublishedQuizzes()
      .then((data) => {
        if (!cancelled) {
          setQuizzes(data);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load quizzes.",
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
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

      {/* Quiz cards grid - same as QuizList */}
      <div className="qc-wrap">
        {!loading && quizzes
          .slice()
          .sort((a, b) => a.id - b.id)
          .map((q) => (
            <div key={q.id} className="qc">
              <div className="qc-body">
                <div className="qc-head">
                  <div className="qc-quiz">
                    <div className="qc-title">
                      <Link
                        component={RouterLink}
                        to={`/student/quizzes/${q.id}/take`}
                        underline="hover"
                        color="primary"
                      >
                        {q.name}
                      </Link>
                    </div>
                    <p className="qc-desc">{q.description || "—"}</p>
                  </div>
                  <span className="qc-badge pub">Published</span>
                </div>

                <p>
                  <b>Created:</b>{" "}
                  {new Date(q.createdAt).toLocaleDateString("en-GB")}
                </p>
                <p>
                  <b>Code:</b> {q.courseCode ?? "—"}
                </p>
                {q.category?.name && (
                  <p>
                    <b>Category:</b> {q.category.name}
                  </p>
                )}

                <div className="qc-foot">
                  <div className="qc-foot-left">
                    <Link
                      component={RouterLink}
                      to={`/publishedquizz/${q.id}/results`}
                      state={{ quizName: q.name }}
                      underline="none"
                    >
                      <button className="qc-btn">View results</button>
                    </Link>
                    <Link
                      component={RouterLink}
                      to={`/publishedquizz/${q.id}/reviews`}
                      underline="none"
                    >
                      <button className="qc-btn">See reviews</button>
                    </Link>
                    <Link
                      component={RouterLink}
                      to={`/publishedquizz/${q.id}/reviews/new`}
                      underline="none"
                    >
                      <button className="qc-btn">Add review</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}