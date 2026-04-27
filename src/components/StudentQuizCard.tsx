import "../index.css"

interface StudentQuizCardProps {
  name: string;
  description: string;
  courseCode: string;
  createdAt: string;
  onAttempt: () => void;
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
        </div>

        <div className="sqc-foot">
          <button className="qc-btn" onClick={props.onAttempt}>
            Attempt
          </button>
        </div>
      </div>
    </div>
  );
}
