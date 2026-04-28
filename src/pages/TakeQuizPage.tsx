import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import type { Quiz } from "../types/quiz";
import { normalizeQuiz } from "../mappers/quizNormalizer";
import { fetchWithAuth } from "../api";
import StudentQuestionCard from "../components/StudentQuestionCard";

function formatDisplayDate(iso: string | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function TakeQuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selections, setSelections] = useState<Record<number, number | null>>(
    {},
  );

  const quizId = Number(id);
  const invalidId = !id || Number.isNaN(quizId);

  useEffect(() => {
    if (invalidId) return;

    let cancelled = false;

    fetchWithAuth(`/api/quizzes/${id}`)
      .then((data) => {
        if (cancelled) return;
        const loadedQuiz = normalizeQuiz(data);
        setQuiz(loadedQuiz);

        const initialSelections: Record<number, number | null> = {};
        for (const question of loadedQuiz.questions) {
          initialSelections[question.id] = null;
        }
        setSelections(initialSelections);
        setError(null);
      })
      .catch(() => {
        if (!cancelled) {
          setError("Could not load this quiz.");
          setQuiz(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id, invalidId]);

  const handleSelectAnswer = useCallback(
    (questionId: number, answerId: number) => {
      setSelections((prev) => ({ ...prev, [questionId]: answerId }));
    },
    [],
  );

  if (invalidId) {
    return (
      <Container maxWidth="md" className="quiz-detail-page">
        <Alert severity="error">Invalid quiz link.</Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container maxWidth="md" className="quiz-detail-page">
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error || !quiz) {
    return (
      <Container maxWidth="md" className="quiz-detail-page">
        <Button
          startIcon={<ArrowBackIcon />}
          className="quiz-detail-back-btn"
          onClick={() => navigate("/student/categories")}
        >
          Back
        </Button>
        <Alert severity="error">{error ?? "Quiz not found."}</Alert>
      </Container>
    );
  }

  if (!quiz.published) {
    return (
      <Container maxWidth="md" className="quiz-detail-page">
        <Button
          startIcon={<ArrowBackIcon />}
          className="quiz-detail-back-btn"
          onClick={() => navigate("/student/categories")}
        >
          Back
        </Button>
        <Alert severity="warning">
          This quiz is not published, so it cannot be taken right now.
        </Alert>
      </Container>
    );
  }

  const createdDateDisplay = formatDisplayDate(quiz.createdAt);

  return (
    <Container maxWidth="md" className="quiz-detail-page">
      <Button
        startIcon={<ArrowBackIcon />}
        className="quiz-detail-back-btn"
        onClick={() => navigate(-1)}
      >
        Back
      </Button>

      <Box className="quiz-detail-header">
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h3" gutterBottom className="quiz-detail-title">
            {quiz.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
            {quiz.description || "No description provided."}
          </Typography>

          <Box
            className="quiz-detail-meta"
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Chip label={quiz.courseCode} variant="outlined" size="small" />
            <Chip label="Published" color="success" size="small" />
            {quiz.category?.name ? (
              <Chip label={quiz.category.name} variant="outlined" size="small" />
            ) : null}
          </Box>

          <Typography variant="body2" sx={{ mt: 2 }}>
            <strong>Created:</strong> {createdDateDisplay}
          </Typography>
        </Box>
      </Box>

      <Divider className="quiz-detail-divider" />

      <Typography variant="h5" className="quiz-detail-questions-title" gutterBottom>
        Questions
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Select one answer for each question.
      </Typography>

      {quiz.questions.length === 0 ? (
        <Typography variant="body1" color="text.secondary" className="quiz-detail-empty">
          This quiz has no questions yet.
        </Typography>
      ) : (
        quiz.questions.map((question, index) => (
          <StudentQuestionCard
            key={question.id}
            question={question}
            index={index}
            selectedAnswerId={selections[question.id] ?? null}
            onSelectAnswer={(answerId) => handleSelectAnswer(question.id, answerId)}
          />
        ))
      )}
    </Container>
  );
}
