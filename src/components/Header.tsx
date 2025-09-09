import { Link, useLocation } from "react-router-dom";
import { Home, Plus } from "lucide-react";

function Header() {
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            <Home color="blue" className="h-6 w-6" />
            <span className="">PropertyHub</span>
          </Link>

          <nav className="flex space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === "/"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              Browse Properties
            </Link>
            <Link
              to="/add"
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === "/add"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white"
              }`}
            >
              <Plus className="h-4 w-4" />
              <span>Add Property</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
