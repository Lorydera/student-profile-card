// Styling method: Tailwind CSS
import { useState } from "react";
import { NavLink } from "react-router-dom";
import MenuIcon  from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? "font-semibold text-white border-b-2 border-white pb-0.5"
      : "text-blue-200 hover:text-white pb-0.5";

  return (
    <nav className="bg-[#1a1a2e] px-6 py-3">
      <div className="flex items-center justify-between">
        <span className="text-white font-bold text-lg">KodeCamp</span>

        {/* Desktop links */}
        <div className="hidden md:flex gap-6">
          <NavLink to="/"       end className={linkClass}>Home</NavLink>
          <NavLink to="/enroll"     className={linkClass}>Enroll</NavLink>
        </div>

        {/* Hamburger button — mobile only */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden flex flex-col gap-3 mt-3">
          <NavLink to="/"       end className={linkClass} onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/enroll"     className={linkClass} onClick={() => setOpen(false)}>Enroll</NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
