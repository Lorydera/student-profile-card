import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useStudents }   from "./context/StudentContext";
import Navbar            from "./components/Navbar";
import Header            from "./components/Header";
import HomePage          from "./pages/HomePage";
import StudentDetailPage from "./pages/StudentDetailPage";
import EnrollPage        from "./pages/EnrollPage";
import NotFoundPage      from "./pages/NotFoundPage";
import useFetch          from "./hooks/useFetch";

const TRACKS = ["Frontend", "Backend", "Mobile", "Data"];

const SEED_STUDENTS = [
  { id: "seed-1", firstName: "Amara",  lastName: "Johnson", email: "amara@kodecamp.dev",  track: "Frontend", score: 92, isActive: true,  avatar: "https://i.pravatar.cc/150?img=1" },
  { id: "seed-2", firstName: "Chidi",  lastName: "Okafor",  email: "chidi@kodecamp.dev",  track: "Backend",  score: 67, isActive: false, avatar: "https://i.pravatar.cc/150?img=3" },
];

const AppInner = () => {
  const { students, dispatch } = useStudents();
  const { data, loading, error } = useFetch("https://randomuser.me/api/?results=6&nat=us,gb");

  useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: loading });
  }, [loading, dispatch]);

  useEffect(() => {
    dispatch({ type: "SET_ERROR", payload: error });
  }, [error, dispatch]);

  useEffect(() => {
    if (!data) return;
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
    dispatch({ type: "SET_STUDENTS", payload: [...SEED_STUDENTS, ...fetched] });
  }, [data, dispatch]);

  const handleRefresh = () => {
    window.location.reload();
  };

  const average = students.length
    ? students.reduce((sum, s) => sum + s.score, 0) / students.length
    : 0;

  return (
    <div className="app">
      <Header
        title="KodeCamp 6.0 — Enrollment Portal"
        studentCount={students.length}
        averageScore={average}
      />
      <Navbar />
      <Routes>
        <Route path="/"            element={<HomePage onRefresh={handleRefresh} />} />
        <Route path="/students/:id" element={<StudentDetailPage />} />
        <Route path="/enroll"      element={<EnrollPage />} />
        <Route path="*"            element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default AppInner;
