import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-bold">
          Civic Reporter
        </h1>

        <div className="flex gap-6">

          <Link to="/">
            Home
          </Link>

          <Link to="/issues">
            Issues
          </Link>

          <Link to="/login">
            Login
          </Link>

          <Link to="/register">
            Register
          </Link>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;