import "./QuizCard.css";
/**
 * Props for QuizCard component
 */
interface StudentQuizCardProps {
  name: string;
  description: string;
  courseCode: string;
  createdAt: string;
  onAttempt: () => void;
}

/**
 * QuizCard displays a single quiz in the quiz list.
 * Shows quiz name, description, course code, publish status, and action buttons.
 */
export default function StudentQuizCard(props: StudentQuizCardProps) {
  return (
    <div className="qc">
      <div className="qc-body">
        <div className="qc-head">
          <div className="qc-quiz">
            <div className="qc-title">{props.name}</div>
            <p className="qc-desc">{props.description}</p>
          </div>

          {/* Created date display */}
          <p>
            <b>Created:</b>{" "}
            {new Date(props.createdAt).toLocaleDateString("en-GB")}
          </p>

          {/* Course code display */}
          <p>
            <b>Code:</b> {props.courseCode}
          </p>

          {/* Action buttons */}
          <div className="qc-foot">
            <button className="qc-btn" onClick={props.onAttempt}>
              Attempt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
