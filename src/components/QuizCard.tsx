import "./QuizCard.css";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
/**
 * Props for QuizCard component
 */
interface QuizCardProps {
  name: string;
  description: string;
  courseCode: string;
  categoryName?: string;
  published: boolean ;
  onManage: () => void;
  onToggleStatus: () => void;
  onDelete: () => void;
}

/**
 * QuizCard displays a single quiz in the quiz list.
 * Shows quiz name, description, course code, publish status, and action buttons.
 */
export default function QuizCard(props: QuizCardProps) {
  return (
    <div className="qc">
      <div className="qc-body">
        <div className="qc-head">
          <div className="qc-quiz">
            <div className="qc-title">{props.name}</div>
            <p className="qc-desc">{props.description}</p>
          </div>
          {/* Publish status badge */}
          <span
            className={
              props.published === true ? "qc-badge pub" : "qc-badge draft"
            }
          >
            {props.published === true ? "Published" : "Draft"}
          </span>
        </div>

        {/* Course code display */}
        <p>
          <b>Code:</b> {props.courseCode}
        </p>
        <p>
          <b>Category:</b> {props.categoryName}
        </p>

        {/* Action buttons */}
        <div className="qc-foot">
          <button className="qc-btn" onClick={props.onManage}>
            Manage
          </button>

          <div>
            {/* Toggle publish status button */}
            <button className="qc-icon" onClick={props.onToggleStatus}>
              {props.published === true ? <VisibilityOffIcon fontSize="small"/> : <VisibilityIcon fontSize="small"/>}
            </button>
            {/* Delete button */}
            <button className="qc-icon del" onClick={props.onDelete}>
              <DeleteIcon fontSize="small"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
