import { NavLink } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar">
    <NavLink
      to="/"
      end
      className={({ isActive }) => (isActive ? "nav-link nav-active" : "nav-link")}
    >
      Home
    </NavLink>
    <NavLink
      to="/enroll"
      className={({ isActive }) => (isActive ? "nav-link nav-active" : "nav-link")}
    >
      Enroll
    </NavLink>
  </nav>
);

export default Navbar;
