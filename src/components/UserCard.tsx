import { Link } from "react-router-dom";
import { FiMail, FiArrowRight } from "react-icons/fi";
import { MdOutlineApartment } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";
import type { User } from "../types";

const UserCard = ({ user }: { user: User }) => {
  const { theme } = useTheme();

  return (
    <Link to={`/user/${user.id}`} className="block group h-full">
      <div
        className={`h-full p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border group-hover:-translate-y-1 group-hover:scale-105 ${
          theme === "light"
            ? "bg-white hover:bg-blue-50 border-gray-200 group-hover:border-blue-400"
            : "bg-gray-800 hover:bg-gray-700 border-gray-700 group-hover:border-blue-500"
        }`}
      >
        <div className="flex items-start gap-4">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-14 h-14 rounded-full object-cover shadow-lg group-hover:scale-110 transition flex-shrink-0"
            />
          ) : (
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition flex-shrink-0 ${
                theme === "light"
                  ? "bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-600"
                  : "bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-700"
              }`}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3
              className={`text-xl font-bold group-hover:transition line-clamp-2 ${
                theme === "light"
                  ? "text-gray-800 group-hover:text-blue-600"
                  : "text-white group-hover:text-blue-400"
              }`}
            >
              {user.name}
            </h3>
            <div className="space-y-2 mt-3">
              <div
                className={`flex items-center gap-2 text-sm ${
                  theme === "light" ? "text-gray-600" : "text-gray-300"
                }`}
              >
                <FiMail
                  className={`w-4 h-4 flex-shrink-0 ${
                    theme === "light" ? "text-blue-600" : "text-blue-400"
                  }`}
                />
                <span className="truncate">{user.email}</span>
              </div>
              <div
                className={`flex items-center gap-2 text-sm ${
                  theme === "light" ? "text-gray-600" : "text-gray-300"
                }`}
              >
                <MdOutlineApartment
                  className={`w-4 h-4 flex-shrink-0 ${
                    theme === "light" ? "text-blue-600" : "text-blue-400"
                  }`}
                />
                <span className="truncate">{user.company}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`flex items-center justify-between mt-4 pt-4 border-t ${
            theme === "light" ? "border-gray-200" : "border-gray-700"
          }`}
        >
          <span
            className={`text-xs font-medium ${
              theme === "light" ? "text-gray-500" : "text-gray-400"
            }`}
          >
            View Profile
          </span>
          <FiArrowRight
            className={`w-4 h-4 group-hover:translate-x-1 transition ${
              theme === "light" ? "text-blue-600" : "text-blue-400"
            }`}
          />
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
