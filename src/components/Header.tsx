import { Link } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className={`${
        theme === "light"
          ? "bg-white shadow-lg border-b-2 border-blue-400"
          : "bg-gray-900 shadow-lg border-b-2 border-purple-600"
      } sticky top-0 z-40 transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-90 transition"
        >
          <img
            src="https://www.theinfinityhub.com/in/wp-content/uploads/2024/11/logo.png"
            alt="Logo"
            className="h-6 w-auto"
          />
        </Link>

        <button
          onClick={toggleTheme}
          className={`p-2.5 rounded-lg transition-all duration-300 transform hover:scale-110 ${
            theme === "light"
              ? "bg-gradient-to-br from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 text-blue-600 shadow-md"
              : "bg-gradient-to-br from-purple-900 to-indigo-900 hover:from-purple-800 hover:to-indigo-800 text-yellow-300 shadow-lg shadow-purple-700/50"
          }`}
          aria-label="Toggle theme"
        >
          {theme === "light" ? <FiMoon size={22} /> : <FiSun size={22} />}
        </button>
      </div>
    </header>
  );
}
