import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-stone-950 text-stone-100 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-bold">
          Civic Reporter
        </h1>

        <div className="flex gap-6">

          <Link to="/">
            Home
          </Link>

          <Link className="hover:text-orange-200" to="/issues">
            Issues
          </Link>

          <Link className="hover:text-orange-200" to="/login">
            Login
          </Link>

          <Link className="hover:text-orange-200" to="/register">
            Register
          </Link>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;