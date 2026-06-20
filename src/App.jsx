import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar             from "./components/Navbar";
import HomePage            from "./pages/HomePage";
import StudentDetailPage   from "./pages/StudentDetailPage";
import EnrollPage          from "./pages/EnrollPage";
import NotFoundPage        from "./pages/NotFoundPage";
import Header              from "./components/Header";
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
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              students={students}
              loading={loading}
              error={error}
              onRefresh={fetchRoster}
            />
          }
        />
        <Route
          path="/students/:id"
          element={<StudentDetailPage students={students} />}
        />
        <Route
          path="/enroll"
          element={<EnrollPage onEnroll={handleEnroll} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
