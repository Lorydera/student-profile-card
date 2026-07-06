// Styling method: Inline styles
import { Link } from "react-router-dom";

const styles = {
  wrapper: {
    display:        "flex",
    flexDirection:  "column",
    alignItems:     "center",
    justifyContent: "center",
    minHeight:      "60vh",
    gap:            "1rem",
    textAlign:      "center",
  },
  heading: { fontSize: "3rem", color: "#1a1a2e" },
  text:    { color: "#666" },
  link:    { color: "#1a1a2e", fontWeight: 600 },
};

const NotFoundPage = () => (
  <main style={styles.wrapper}>
    <h2 style={styles.heading}>404</h2>
    <p style={styles.text}>The page you're looking for doesn't exist.</p>
    <Link to="/" style={styles.link}>← Back to Home</Link>
  </main>
);

export default NotFoundPage;
