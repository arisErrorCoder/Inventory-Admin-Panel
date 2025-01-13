import React, { useState } from 'react';
import "./UserRoleUpdate.css"
const UserRoleUpdate = ({ users, updateUserRole }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filterRole, setFilterRole] = useState('All');

  // Filter users based on search query and selected role filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'All' || user.role === filterRole;

    return matchesSearch && matchesRole;
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

  // Handle Role Update
  const handleRoleUpdate = (newRole) => {
    selectedUsers.forEach((userId) => {
      updateUserRole(userId, newRole); // Call the function to update the user's role
    });
  };

  return (
    <div className="user-list">
      {/* Search and Filter */}
      <div className="user-list-filters">
        <input
          type="text"
          placeholder="Search by Name or Email"
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

        <button
          className="user-list-role-update-btn"
          onClick={() => handleRoleUpdate('Wholesaler')}
        >
          Make Selected Users Wholesalers
        </button>
        <button
          className="user-list-role-update-btn"
          onClick={() => handleRoleUpdate('Retailer')}
        >
          Make Selected Users Retailers
        </button>
      </div>

      {/* User List Table */}
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
            <th>Email</th>
            <th>Role</th>
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
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserRoleUpdate;
