import { useEffect, useState } from "react";
import { FiLoader, FiAlertCircle, FiUsers } from "react-icons/fi";
import UserCard from "../components/UserCard";
import { useTheme } from "../context/ThemeContext";
import type { User } from "../types";

const UsersList = () => {
  const { theme } = useTheme();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const t = setTimeout(() => {
      fetch("/data/users.json")
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load users");
          return res.json();
        })
        .then((data: User[]) => {
          setUsers(data);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }, 400);

    return () => clearTimeout(t);
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="relative w-16 h-16 mb-4">
          <FiLoader
            className={`w-16 h-16 animate-spin ${
              theme === "light" ? "text-blue-600" : "text-blue-400"
            }`}
          />
        </div>
        <p
          className={`${
            theme === "light" ? "text-gray-600" : "text-gray-300"
          } text-lg font-medium`}
        >
          Loading users...
        </p>
      </div>
    );
  if (error)
    return (
      <div
        className={`p-6 rounded-lg border ${
          theme === "light"
            ? "bg-red-50 border-red-300 text-red-700"
            : "bg-red-900/20 border-red-800 text-red-400"
        }`}
      >
        <div className="flex items-start gap-3">
          <FiAlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold mb-1">Error loading users</h3>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );

  return (
    <div>
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <FiUsers
            className={`w-8 h-8 ${
              theme === "light" ? "text-blue-600" : "text-blue-400"
            }`}
          />
          <h1
            className={`text-4xl md:text-5xl font-bold ${
              theme === "light" ? "text-gray-800" : "text-white"
            }`}
          >
            Users Directory
          </h1>
        </div>
        <p
          className={`${
            theme === "light" ? "text-gray-600" : "text-gray-400"
          } text-lg ml-11`}
        >
          Browse and manage all users in the system
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {users.map((u) => (
          <UserCard key={u.id} user={u} />
        ))}
      </div>
    </div>
  );
};

export default UsersList;
