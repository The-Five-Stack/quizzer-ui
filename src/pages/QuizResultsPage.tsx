import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getQuizResults } from "../api";
import type { QuizResult } from "../types/quiz";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function formatDifficulty(difficulty: string): string {
  if (!difficulty || difficulty === "N/A") return "N/A";
  const value = difficulty.toLowerCase();
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

export default function QuizResultsPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const quizNameFromNavigation = location.state?.quizName as string | undefined;
  const [data, setData] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const invalidQuizId = !quizId || Number.isNaN(Number(quizId));
  const displayQuizName =
    data?.quizName && data.quizName !== "Quiz"
      ? data.quizName
      : quizNameFromNavigation ?? "Quiz";

  useEffect(() => {
    if (invalidQuizId) return;

    getQuizResults(Number(quizId))
      .then(setData)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to fetch quiz results");
      })
      .finally(() => setLoading(false));
  }, [invalidQuizId, quizId]);

  if (invalidQuizId) {
    return (
      <Container maxWidth="lg" className="quiz-results-page">
        <Alert severity="error">Invalid quiz id.</Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container maxWidth="lg" className="quiz-results-page">
        <Box className="quiz-results-loading">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error || !data) {
    return (
      <Container maxWidth="lg" className="quiz-results-page">
        <Alert severity="error">{error ?? "Failed to load quiz results."}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className="quiz-results-page">
      <Button
        startIcon={<ArrowBackIcon />}
        className="quiz-detail-back-btn"
        onClick={() => navigate(-1)}
      >
        Back
      </Button>

      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        className="quiz-results-title"
      >
        Results of "{displayQuizName}"
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        className="quiz-results-subtitle"
      >
        {data.totalAnswers} answers to {data.totalQuestions} questions
      </Typography>

      <TableContainer
        component={Paper}
        variant="outlined"
        className="quiz-results-table-wrap"
      >
        <Table className="quiz-results-table">
          <TableHead className="quiz-results-table-head">
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell>Difficulty</TableCell>
              <TableCell align="right">Total answers</TableCell>
              <TableCell align="right">Correct answer %</TableCell>
              <TableCell align="right">Correct answers</TableCell>
              <TableCell align="right">Wrong answers</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.questions.map((q) => (
              <TableRow key={q.questionId}>
                <TableCell>{q.questionText}</TableCell>
                <TableCell>{formatDifficulty(q.difficulty)}</TableCell>
                <TableCell align="right">{q.totalAnswers}</TableCell>
                <TableCell align="right">{q.correctAnswerPercentage}%</TableCell>
                <TableCell align="right">{q.correctCount}</TableCell>
                <TableCell align="right">{q.wrongCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}