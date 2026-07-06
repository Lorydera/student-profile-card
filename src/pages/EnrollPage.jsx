import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useStudents } from "../context/StudentContext";
import EnrollForm      from "../components/EnrollForm";

const TRACKS = ["Frontend", "Backend", "Mobile", "Data"];

const EnrollPage = () => {
  const { dispatch } = useStudents();
  const navigate     = useNavigate();

  const handleEnroll = useCallback((newStudent) => {
    dispatch({ type: "ADD_STUDENT", payload: newStudent });
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/");
  }, [dispatch, navigate]);

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <EnrollForm tracks={TRACKS} onEnroll={handleEnroll} />
    </main>
  );
};

export default EnrollPage;
