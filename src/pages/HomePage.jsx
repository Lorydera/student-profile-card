import StudentList   from "../components/StudentList";
import StatusMessage from "../components/StatusMessage";
import ClassButton   from "../components/ClassButton";

const HomePage = ({ students, loading, error, onRefresh }) => (
  <main className="app-main">
    {loading && <StatusMessage type="loading" />}
    {!loading && error && <StatusMessage type="error" />}

    {!loading && (
      <StudentList students={students} title="Student Roster">
        <p className="roster-footer">{`End of roster — ${students.length} total`}</p>
      </StudentList>
    )}

    <div className="refresh-row">
      <ClassButton title="↻ Refresh Roster" onClick={onRefresh} className="btn-outline" />
    </div>
  </main>
);

export default HomePage;
