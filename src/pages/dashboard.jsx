import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import { BACKEND_URL } from "../../config"; 

export const Dashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get(`${BACKEND_URL}api/v1/getUser`);
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-display text-slate-800 dark:text-slate-200 flex flex-col">
      <header className="sticky top-0 z-10 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-16">
            <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
              MERN Stack Developer Practical Task
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6 space-y-6">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search users"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
            onClick={() => navigate("/")}
          >
            Add User
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
            Export CSV
          </button>
        </div>

        <div className="space-y-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user._id}
                className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 space-y-4 border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      user.profilePic
                        ? user.profilePic
                        : user.gender === "male"
                        ? "https://i.pravatar.cc/150?img=3"
                        : user.gender === "female"
                        ? "https://i.pravatar.cc/150?img=5"
                        : "https://i.pravatar.cc/150?img=1"
                    }
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="flex-grow">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      ID: {user._id}
                    </p>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {user.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm">
                    <strong className="font-semibold text-slate-700 dark:text-slate-300">
                      Email:
                    </strong>{" "}
                    {user.email}
                  </p>
                  <p className="text-sm">
                    <strong className="font-semibold text-slate-700 dark:text-slate-300">
                      Gender:
                    </strong>{" "}
                    {user.gender}
                  </p>
                </div>
                <div className="flex gap-2 pt-3 border-t border-slate-200 dark:border-slate-700">
                  <button
                    className="flex-1 px-3 py-1.5 text-sm rounded-md bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-all"
                    onClick={() => navigate(`/edit-user/${user._id}`)}
                  >
                    View
                  </button>
                  <button
                    className="flex-1 px-3 py-1.5 text-sm rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-all"
                    onClick={() => navigate(`/edit-user/${user._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="flex-1 px-3 py-1.5 text-sm rounded-md bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 font-medium hover:bg-red-200 dark:hover:bg-red-800 transition-all"
                    onClick={async () => {
                      try {
                        await axios.delete(
                          `${BACKEND_URL}api/v1/deleteUser/${user._id}`
                        );
                        setUsers(users.filter((u) => u._id !== user._id));
                      } catch (error) {
                        console.error("Error deleting user:", error);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-8 text-center border border-slate-200 dark:border-slate-700">
              <span className="text-6xl text-slate-400 dark:text-slate-500 mx-auto">
                <SearchIcon fontSize="inherit" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-slate-800 dark:text-slate-200">
                No Users Found
              </h3>
              <p className="mt-2 text-slate-500 dark:text-slate-400">
                Try adjusting your filters or search term.
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className="sticky bottom-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <nav className="container mx-auto px-4 flex justify-around h-16 items-center">
          <a
            href="#"
            className="flex flex-col items-center gap-1 text-indigo-600 dark:text-indigo-400"
          >
            <GroupIcon />
            <span className="text-xs font-bold">Users</span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <BarChartIcon />
            <span className="text-xs font-medium">Analytics</span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <SettingsIcon />
            <span className="text-xs font-medium">Settings</span>
          </a>
        </nav>
      </footer>
    </div>
  );
};
