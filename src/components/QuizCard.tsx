

interface QuizCardProps  {
title: string,
  description: string,
  code: string,
  category: string,
  status: "Published" | "Draft",
  onManage: () => void,
  onToggleStatus: () => void,
  onDelete: () => void,
}


export default function QuizCard(props: QuizCardProps) {
  return (
    <div className="qc">
      <div className="qc-body">
        <div className="qc-head">
          <h3>{props.title}</h3>
          <span className={props.status === "Published" ? "qc-badge pub" : "qc-badge draft"}>
            {props.status}
          </span>
        </div>

        <p className="qc-desc">{props.description}</p>

        <p><b>Code:</b> {props.code}</p>
        <p><b>Category:</b> {props.category}</p>

        <div className="qc-foot">
          <button className="qc-btn" onClick={props.onManage}>Manage</button>

          <div>
            <button className="qc-icon" onClick={props.onToggleStatus}>
              {props.status === "Published" ? "🙈" : "👁️"}
            </button>
            <button className="qc-icon del" onClick={props.onDelete}>🗑️</button>
          </div>
        </div>
      </div>
    </div>
  );
}
