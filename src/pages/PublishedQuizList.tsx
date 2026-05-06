import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  //Container,
  Link,
  Typography,
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
      <div className="qc-wrap">
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

        {!loading && quizzes.length > 0 && (
          <Box className="published-quiz-grid">
            {quizzes
              .slice()
              .sort((a, b) => a.id - b.id)
              .map((q) => (
                <Card
                  key={q.id}
                  variant="outlined"
                  className="published-quiz-card"
                >
                  <CardContent>
                    <Typography variant="subtitle1" component="div" gutterBottom>
                      <Link
                        component={RouterLink}
                        to={`/student/quizzes/${q.id}/take`}
                        underline="hover"
                        color="primary"
                        className="published-quiz-title-link"
                      >
                        {q.name}
                      </Link>
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="published-quiz-description"
                    >
                      {q.description || "—"}
                    </Typography>
                    <br />
                    <Typography
                      variant="body2"
                      className="published-quiz-meta-date"
                    >
                      <strong>Created at:</strong>{" "}
                      {new Date(q.createdAt).toLocaleDateString("en-GB")}
                    </Typography>
                    <Typography variant="body2" className="published-quiz-meta">
                      <strong>Course Code:</strong>{" "}
                      {q.courseCode ?? "—"}
                    </Typography>
                    <Typography variant="body2" className="published-quiz-meta">
                      <strong>Category:</strong>{" "}
                      {q.category?.name ?? "—"}
                    </Typography>
                    <br />

                    <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                      <Typography variant="body2">
                        <Link
                          component={RouterLink}
                          to={`/publishedquizz/${q.id}/results`}
                          state={{ quizName: q.name }}
                          color="primary"
                          className="published-quiz-results-link"
                        >
                          View results
                        </Link>
                      </Typography>

                      <Typography variant="body2">
                        <Link
                          component={RouterLink}
                          to={`/publishedquizz/${q.id}/reviews/new`}
                          color="primary"
                          className="published-quiz-results-link"
                        >
                          Add review
                        </Link>
                      </Typography>

                      <Typography variant="body2">
                        <Link
                          component={RouterLink}
                          to={`/publishedquizz/${q.id}/reviews`}
                          color="primary"
                          className="published-quiz-results-link"
                        >
                          See reviews
                        </Link>
                      </Typography>
                    </Box>

                  </CardContent>
                </Card>
              ))}
          </Box>
        )}
      </div>
    </>
  );
}