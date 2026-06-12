import { useState, useEffect } from "react";
import Header        from "./components/Header";
import ClassButton   from "./components/ClassButton";
import StudentList   from "./components/StudentList";
import EnrollForm    from "./components/EnrollForm";
import StatusMessage from "./components/StatusMessage";
import "./App.css";

const TRACKS = ["Frontend", "Backend", "Mobile", "Data"];

const SEED_STUDENTS = [
  {
    id: "seed-1",
    firstName: "Amara",
    lastName: "Johnson",
    email: "amara@kodecamp.dev",
    track: "Frontend",
    score: 92,
    isActive: true,
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "seed-2",
    firstName: "Chidi",
    lastName: "Okafor",
    email: "chidi@kodecamp.dev",
    track: "Backend",
    score: 67,
    isActive: false,
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

const getAverage = (list) => {
  if (list.length === 0) return 0;
  return list.reduce((sum, s) => sum + s.score, 0) / list.length;
};

export default function App() {
  const [students, setStudents] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  const fetchRoster = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://randomuser.me/api/?results=6&nat=us,gb");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const fetched = data.results.map((u, i) => ({
        id:        u.login.uuid,
        firstName: u.name.first,
        lastName:  u.name.last,
        email:     u.email,
        avatar:    u.picture.thumbnail,
        track:     TRACKS[i % TRACKS.length],
        score:     Math.floor(Math.random() * 61) + 40,
        isActive:  true,
      }));
      setStudents([...SEED_STUDENTS, ...fetched]);
    } catch (err) {
      setError(err.message);
      setStudents(SEED_STUDENTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadRoster = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("https://randomuser.me/api/?results=6&nat=us,gb");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const fetched = data.results.map((u, i) => ({
          id:        u.login.uuid,
          firstName: u.name.first,
          lastName:  u.name.last,
          email:     u.email,
          avatar:    u.picture.thumbnail,
          track:     TRACKS[i % TRACKS.length],
          score:     Math.floor(Math.random() * 61) + 40,
          isActive:  true,
        }));
        setStudents([...SEED_STUDENTS, ...fetched]);
      } catch (err) {
        setError(err.message);
        setStudents(SEED_STUDENTS);
      } finally {
        setLoading(false);
      }
    };

    loadRoster();
  }, []);

  const handleEnroll = (newStudent) => {
    setStudents((prev) => [newStudent, ...prev]);
  };

  const average = getAverage(students);

  return (
    <div className="app">
      <Header
        title="KodeCamp 6.0 — Enrollment Portal"
        studentCount={students.length}
        averageScore={average}
      />

      <main className="app-main">
        <EnrollForm tracks={TRACKS} onEnroll={handleEnroll} />

        {loading && <StatusMessage type="loading" />}
        {!loading && error && <StatusMessage type="error" />}

        {!loading && (
          <StudentList students={students} title="Student Roster">
            <p className="roster-footer">
              {`End of roster — ${students.length} total`}
            </p>
          </StudentList>
        )}

        <div className="refresh-row">
          <ClassButton
            title="↻ Refresh Roster"
            onClick={fetchRoster}
            className="btn-outline"
          />
        </div>
      </main>
    </div>
  );
}
