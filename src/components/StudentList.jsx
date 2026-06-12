import StudentCard from "./StudentCard";

const StudentList = ({ students, title = "All Students", children }) => (
  <section className="student-list">
    <h2>{title}</h2>
    {students.length === 0 ? (
      <p>No students to display yet</p>
    ) : (
      <div className="card-grid">
        {students.map((student) => (
          <StudentCard key={student.id} {...student} />
        ))}
      </div>
    )}
    {children}
  </section>
);

export default StudentList;
