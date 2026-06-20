import { useParams, Link } from "react-router-dom";

const getGrade = (score) => {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
};

const StudentDetailPage = ({ students }) => {
  const { id } = useParams();
  const student = students.find((s) => s.id === id);

  if (!student) {
    return (
      <main className="app-main">
        <p>Student not found</p>
        <Link to="/">← Back to Roster</Link>
      </main>
    );
  }

  return (
    <main className="app-main detail-page">
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
