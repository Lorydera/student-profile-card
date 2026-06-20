import { Link } from "react-router-dom";

const getGrade = (score) => {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
};

const StudentCard = ({ id, firstName, lastName, email, track, score, isActive, avatar }) => (
  <div className={`student-card ${isActive ? "card-active" : "card-inactive"}`}>
    <img src={avatar} alt={`${firstName} ${lastName}`} className="avatar" />
    <div className="card-info">
       <Link to={`/students/${id}`} className="card-name-link">
        <h3>{`${firstName} ${lastName}`}</h3>
      </Link>
      <p className="card-meta">{`${track} · ${email}`}</p>
      <p className="card-score">
        {`Score: ${score} (Grade: ${getGrade(score)})`}
        <span className={`badge ${isActive ? "badge-active" : "badge-inactive"}`}>
          {isActive ? "Active" : "Inactive"}
        </span>
      </p>
    </div>
  </div>
);

export default StudentCard;
