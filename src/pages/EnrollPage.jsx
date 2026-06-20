import { useNavigate } from "react-router-dom";
import EnrollForm from "../components/EnrollForm";

const TRACKS = ["Frontend", "Backend", "Mobile", "Data"];

const EnrollPage = ({ onEnroll }) => {
  const navigate = useNavigate();

  const handleEnroll = (newStudent) => {
    onEnroll(newStudent);
    navigate("/");
  };

  return (
    <main className="app-main">
      <EnrollForm tracks={TRACKS} onEnroll={handleEnroll} />
    </main>
  );
};

export default EnrollPage;
