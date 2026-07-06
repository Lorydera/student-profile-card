// Styling method: Plain/External CSS
import { useParams, Link } from "react-router-dom";
import { useStudents } from "../context/StudentContext";
import "../styles/StudentDetailPage.css";

const getGrade = (score) => {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
};

const StudentDetailPage = () => {
  const { id } = useParams();
  const { students } = useStudents();
  const student = students.find((s) => s.id === id);

  if (!student) {
    return (
      <main className="detail-main">
        <p className="not-found-msg">Student not found. <Link to="/">← Back to Roster</Link></p>
      </main>
    );
  }

  return (
    <main className="detail-main">
      <Link to="/" className="back-link">← Back to Roster</Link>
      <div className="detail-card">
        <img src={student.avatar} alt={`${student.firstName} ${student.lastName}`} className="detail-avatar" />
        <h2>{`${student.firstName} ${student.lastName}`}</h2>
        <p>{`Track: ${student.track}`}</p>
        <p>{`Email: ${student.email}`}</p>
        <p>{`Score: ${student.score} (Grade: ${getGrade(student.score)})`}</p>
        <p>{`Status: ${student.isActive ? "Active" : "Inactive"}`}</p>
      </div>
    </main>
  );
};

export default StudentDetailPage;
