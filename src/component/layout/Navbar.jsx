import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const { cartItems } = useCart();


  const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-neutral-900/80 backdrop-blur-md">
      <div className="page-container flex items-center justify-between border-b border-white/[0.08] py-4">
        <Link to="/" className="text-2xl font-display font-bold">
          <span className="text-3xl font-extrabold">
            Food<span className="font-bold text-orange-500"> Hub</span>
          </span>
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

        <Link
          to="/orders"
          aria-label={`Shopping cart, ${count} items`}
          className="relative inline-flex items-center justify-center rounded-lg bg-orange-500 p-3 text-white transition hover:bg-orange-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>

          {count > 0 && (
            <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full border-2 border-neutral-900 bg-white px-1 text-xs font-extrabold text-orange-600 shadow-md">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
