import React, { useState } from "react";

const AdminPanel = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", role: "Student", email: "john@example.com" },
    { id: 2, name: "Jane Smith", role: "Teacher", email: "jane@example.com" },
    { id: 3, name: "Sam Wilson", role: "Proctor", email: "sam@example.com" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [activeTab, setActiveTab] = useState("UserManagement"); // Toggle between 'UserManagement' and 'Reports'

  // Add User
  const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  // Edit User
  const editUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditingUser(null);
  };

  // Delete User
  const deleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    }
  };

  // Filtered Users
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Generate Reports
  const generateReport = () => {
    const totalUsers = users.length;
    const rolesCount = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {});

    return { totalUsers, rolesCount };
  };

  const reports = generateReport();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 bg-emerald-600 text-white p-5">
        <h1 className="text-2xl font-bold mb-5">Admin Panel</h1>
        <nav>
          <ul className="space-y-4">
            <li>
              <button
                className={`w-full text-left ${
                  activeTab === "UserManagement" ? "font-bold underline" : ""
                }`}
                onClick={() => setActiveTab("UserManagement")}
              >
                User Management
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left ${
                  activeTab === "Reports" ? "font-bold underline" : ""
                }`}
                onClick={() => setActiveTab("Reports")}
              >
                Reports
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5 bg-gray-100">
        {activeTab === "UserManagement" && (
          <>
            <header className="mb-5">
              <h2 className="text-2xl font-bold text-emerald-600">
                User Management
              </h2>
            </header>

            {/* Search Bar */}
            <div className="mb-5 flex">
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 p-3 rounded-l-md border-2 border-emerald-600 outline-none"
              />
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-r-md">
                Search
              </button>
            </div>

            {/* User Table */}
            <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-emerald-600 text-white">
                <tr>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="text-center border-b last:border-none hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.role}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4 space-x-2">
                      <button
                        onClick={() => setEditingUser(user)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Edit Form */}
            {editingUser && (
              <div className="mt-5 p-5 bg-white shadow-lg rounded-lg">
                <h3 className="text-xl font-bold mb-3">Edit User</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    editUser(editingUser);
                  }}
                  className="space-y-3"
                >
                  <input
                    type="text"
                    value={editingUser.name}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, name: e.target.value })
                    }
                    placeholder="Name"
                    className="w-full p-3 border-2 border-emerald-600 rounded"
                  />
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, email: e.target.value })
                    }
                    placeholder="Email"
                    className="w-full p-3 border-2 border-emerald-600 rounded"
                  />
                  <select
                    value={editingUser.role}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, role: e.target.value })
                    }
                    className="w-full p-3 border-2 border-emerald-600 rounded"
                  >
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Proctor">Proctor</option>
                  </select>
                  <button
                    type="submit"
                    className="bg-emerald-600 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                </form>
              </div>
            )}
          </>
        )}

        {activeTab === "Reports" && (
          <>
            <header className="mb-5">
              <h2 className="text-2xl font-bold text-emerald-600">Reports</h2>
            </header>

            {/* Reports Section */}
            <div className="bg-white p-5 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold mb-3">System Usage</h3>
              <p className="mb-2">Total Users: {reports.totalUsers}</p>
              <ul className="list-disc pl-5">
                {Object.entries(reports.rolesCount).map(([role, count]) => (
                  <li key={role}>
                    {role}s: {count}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
