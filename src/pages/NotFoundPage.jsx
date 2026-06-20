import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <main className="app-main not-found">
    <h2>404 — Page not found</h2>
    <p>The page you're looking for doesn't exist.</p>
    <Link to="/">← Back to Home</Link>
  </main>
);

export default NotFoundPage;
