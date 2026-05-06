import "../index.css";

interface StudentQuizCardProps {
  name: string;
  description: string;
  courseCode: string;
  category?: { name: string } | null;
  createdAt: string;
  onAttempt: () => void;
  onViewResults: () => void;
  onSeeReviews: () => void;
  onAddReview: () => void;
}

export default function StudentQuizCard(props: StudentQuizCardProps) {
  return (
    <div className="sqc">
      <div className="sqc-body">
        <div className="sqc-head">
          <div className="sqc-title">{props.name}</div>
          <p className="sqc-desc">{props.description}</p>
        </div>

        <div className="sqc-meta">
          <p>
            <b>Created:</b>{" "}
            {new Date(props.createdAt).toLocaleDateString("en-GB")}
          </p>
          <p>
            <b>Code:</b> {props.courseCode}
          </p>
          <p>
            <b>Category:</b> {props.category.name}
          </p>
        </div>

        <div className="sqc-foot">
          <button className="sqc-btn" onClick={props.onAttempt}>
            Attempt
          </button>
          <button className="sqc-btn" onClick={props.onViewResults}>
            View results
          </button>
          <button className="sqc-btn" onClick={props.onSeeReviews}>
            See reviews
          </button>
          <button className="sqc-btn" onClick={props.onAddReview}>
            Add review
          </button>
        </div>
      </div>
    </div>
  );
}