import "./QuizCard.css";

interface QuizCardProps {
  title: string;
  description: string;
  code: string;
  category: string;
  published: boolean ;
  onManage: () => void;
  onToggleStatus: () => void;
  onDelete: () => void;
}

export default function QuizCard(props: QuizCardProps) {
  return (
    <div className="qc">
      <div className="qc-body">
        <div className="qc-head">
          <div className="qc-quiz">
            <div className="qc-title">{props.title}</div>
        <p className="qc-desc">{props.description}</p>

          </div>
          <span
            className={
              props.published === true ? "qc-badge pub" : "qc-badge draft"
            }
          >
            {props.published === true ? "Published" : "Draft"}
          </span>
        </div>


        <p>
          <b>Code:</b> {props.code}
        </p>
        <p>
          <b>Category:</b> {props.category}
        </p>

        <div className="qc-foot">
          <button className="qc-btn" onClick={props.onManage}>
            Manage
          </button>

          <div>
            <button className="qc-icon" onClick={props.onToggleStatus}>
              {props.published === true ? "🙈" : "👁️"}
            </button>
            <button className="qc-icon del" onClick={props.onDelete}>
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
