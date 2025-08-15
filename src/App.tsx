import React, { useEffect, useState } from "react";
import UserCard from "./components/UserCard";
import type { User } from "./types/user";

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Additional state for search and filter functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterCompany, setFilterCompany] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data: User[]) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.username.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCity = filterCity ? u.address.city === filterCity : true;
    const matchesCompany = filterCompany
      ? u.company.name === filterCompany
      : true;

    return matchesSearch && matchesCity && matchesCompany;
  });

  return (
    <div
      className={darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}
    >
      <div className="flex flex-col items-center py-6 px-4 lg:px-32 lg:mx-24 ">
        <h1 className="text-2xl font-bold text-center mb-6">
          User Profile Directory
        </h1>

        {/* Filter/Search/Dark Mode */}
        {users.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-6 justify-center w-full max-w-2xl">
            <input
              type="text"
              placeholder="Search by name or username"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded px-3 py-1 text-black dark:bg-white dark:text-black"
            />

            <select
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              className="border rounded px-3 py-1 text-black dark:bg-white dark:text-black"
            >
              <option value="">All Cities</option>
              {[...new Set(users.map((u) => u.address.city))].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <select
              value={filterCompany}
              onChange={(e) => setFilterCompany(e.target.value)}
              className="border rounded px-3 py-1 text-black dark:bg-white dark:text-black"
            >
              <option value="">All Companies</option>
              {[...new Set(users.map((u) => u.company.name))].map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>

            <button
              onClick={toggleDarkMode}
              className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-600"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        )}

        {/* Loading/Error State */}
        {error && <p className="text-center text-red-500">{error}</p>}
        {loading && <p className="text-center">Loading...</p>}

        {/* User Cards */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-6xl">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
