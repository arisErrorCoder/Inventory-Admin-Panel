import React, { useState } from "react";
import Papa from "papaparse";
import "./UserList.css";

const UserList = ({ users }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  // Filtered user data based on search and filter criteria
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);
    const matchesRole = filterRole === "All" || user.role === filterRole;
    const matchesStatus =
      filterStatus === "All" || user.status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Handle individual user selection
  const handleUserSelection = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // Handle "Select All" checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(filteredUsers.map((user) => user.id)); // Select all filtered user IDs
    } else {
      setSelectedUsers([]); // Deselect all
    }
  };

  // Check if all filtered users are selected
  const areAllSelected = selectedUsers.length === filteredUsers.length;

  // Export selected user data as CSV
  const handleExportCSV = () => {
    const dataToExport = users
      .filter((user) => selectedUsers.includes(user.id))
      .map((user) => ({
        Name: user.name,
        Phone: user.phone,
        Role: user.role,
        Orders: user.orders,
        "Total Value of Orders": user.totalValue,
        Status: user.status,
      }));

    const csv = Papa.unparse(dataToExport);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "selected_user_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="user-list">
      <div className="user-list-filters">
        <input
          type="text"
          placeholder="Search by Name or Phone"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="user-list-search-input"
        />
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="user-list-role-filter"
        >
          <option value="All">All Roles</option>
          <option value="Retailer">Retailer</option>
          <option value="Wholesaler">Wholesaler</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="user-list-status-filter"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button className="user-list-export-btn" onClick={handleExportCSV}>
          Export CSV
        </button>
      </div>

      <table className="user-list-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={areAllSelected}
                onChange={handleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Orders</th>
            <th>Total Value</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleUserSelection(user.id)}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
              <td>{user.orders}</td>
              <td>₹{user.totalValue.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
