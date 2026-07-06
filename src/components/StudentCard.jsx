// Styling method: CSS Modules
import { Link } from "react-router-dom";
import styles from "../styles/StudentCard.module.css";

const getGrade = (score) => {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
};

const getBorderClass = (score) => {
  const grade = getGrade(score);
  if (grade === "A" || grade === "B") return styles.gradeAB;
  if (grade === "C") return styles.gradeC;
  return styles.gradeDF;
};

const StudentCard = ({ id, firstName, lastName, email, track, score, isActive, avatar }) => (
  <div className={`${styles.card} ${getBorderClass(score)} ${!isActive ? styles.inactive : ""}`}>
    <img src={avatar} alt={`${firstName} ${lastName}`} className={styles.avatar} />
    <div className={styles.info}>
      <Link to={`/students/${id}`} className={styles.nameLink}>
        <h3>{`${firstName} ${lastName}`}</h3>
      </Link>
      <p className={styles.meta}>{`${track} · ${email}`}</p>
      <p className={styles.score}>
        {`Score: ${score} (Grade: ${getGrade(score)})`}
        <span className={`${styles.badge} ${isActive ? styles.badgeActive : styles.badgeInactive}`}>
          {isActive ? "Active" : "Inactive"}
        </span>
      </p>
    </div>
  </div>
);

export default StudentCard;
