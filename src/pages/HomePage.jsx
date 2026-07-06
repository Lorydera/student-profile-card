import { useMemo, useCallback } from "react";
import { useStudents }    from "../context/StudentContext";
import { useNavigate }    from "react-router-dom";
import useLocalStorage    from "../hooks/useLocalStorage";
import StudentCard        from "../components/StudentCard";
import StatusMessage      from "../components/StatusMessage";
import ClassButton        from "../components/ClassButton";

const HomePage = ({ onRefresh }) => {
  const { students, loading, error, dispatch } = useStudents();
  const [filter, setFilter] = useLocalStorage("rosterFilter", "");
  const navigate = useNavigate();

  const average = useMemo(() => {
    console.log("useMemo: recalculating average");
    if (students.length === 0) return 0;
    return students.reduce((sum, s) => sum + s.score, 0) / students.length;
  }, [students]);

  const filtered = useMemo(() => {
    console.log("useMemo: recalculating filtered list");
    if (!filter) return students;
    return students.filter((s) =>
      s.track.toLowerCase().includes(filter.toLowerCase()) ||
      `${s.firstName} ${s.lastName}`.toLowerCase().includes(filter.toLowerCase())
    );
  }, [students, filter]);

  const handleRemove = useCallback((id) => {
    console.log("useCallback: handleRemove called");
    dispatch({ type: "REMOVE_STUDENT", payload: id });
  }, [dispatch]);

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">
          Student Roster — Avg: {average.toFixed(1)}%
        </h2>
        <ClassButton title="↻ Refresh" onClick={onRefresh} className="btn-outline" />
      </div>

      <input
        type="text"
        placeholder="Filter by name or track..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-lg text-sm"
      />

      {loading && <StatusMessage type="loading" />}
      {!loading && error && <StatusMessage type="error" />}

      {!loading && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.length === 0
              ? <p className="col-span-full text-gray-500">No students match your filter.</p>
              : filtered.map((student) => (
                  <StudentCard key={student.id} {...student} onRemove={handleRemove} />
                ))
            }
          </div>
          <p className="text-sm text-gray-400 mt-4">{`End of roster — ${students.length} total`}</p>
        </>
      )}
    </main>
  );
};

export default HomePage;
