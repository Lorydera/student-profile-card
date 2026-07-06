import { createContext, useContext, useReducer } from "react";

const StudentContext = createContext(null);

const initialState = {
  students: [],
  loading:  true,
  error:    null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_STUDENTS":
      return { ...state, students: action.payload };
    case "ADD_STUDENT":
      return { ...state, students: [action.payload, ...state.students] };
    case "REMOVE_STUDENT":
      return { ...state, students: state.students.filter((s) => s.id !== action.payload) };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const StudentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StudentContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudents = () => {
  const ctx = useContext(StudentContext);
  if (!ctx) throw new Error("useStudents must be used inside StudentProvider");
  return ctx;
};
