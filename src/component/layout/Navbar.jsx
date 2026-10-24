import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-neutral-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="page-container flex items-center justify-between py-4 border-b border-white/[0.08]">
        <Link to="/" className="text-2xl font-display font-bold">
          <span className="font-extrabold text-3xl">Food<span className="text-orange-500 font-bold"> Hub</span></span>
        </Link>

        <nav className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link ${isActive ? "nav-link-active" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `nav-link ${isActive ? "nav-link-active" : ""}`
            }
          >
            Orders
          </NavLink>
          <NavLink
            to="/admin/menu"
            className={({ isActive }) =>
              `nav-link ${isActive ? "nav-link-active" : ""}`
            }
          >
            Admin
          </NavLink>
        </nav>

        <Link to="/orders">
          <button className="btn btn-primary px-3" aria-label="Shopping Cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="8" cy="21" r="1"></circle>
              <circle cx="19" cy="21" r="1"></circle>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
            </svg>
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
