import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserManagement.css';  // Create a new CSS file for UserManagement

const UserManagement = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "User Management | Admin";
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://backend-edwk.onrender.com/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAllUsers(response.data);
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };
    fetchUsers();
  }, [token, navigate]);

  useEffect(() => {
    applyFilters(allUsers, searchKeyword, filterRole);
  }, [searchKeyword, filterRole, allUsers]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleEditUser = (userId) => {
    navigate(`/admin/users/edit-user/${userId}`);
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`https://backend-edwk.onrender.com/api/admin/delete/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user._id !== id));
      alert("User deleted successfully");
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user");
    }
  };

  const applyFilters = (userList, keyword, role) => {
    const filtered = userList.filter((user) => {
      const matchKeyword =
        user.name?.toLowerCase().includes(keyword.toLowerCase()) ||
        user.email?.toLowerCase().includes(keyword.toLowerCase());

      const matchRole = role === "" || user.role?.toLowerCase() === role.toLowerCase();

      return matchKeyword && matchRole;
    });

    setUsers(filtered);
  };

  const handleSearch = () => {
    applyFilters(allUsers, searchKeyword, filterRole);
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="USER">User</option>
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="users-list">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => handleEditUser(user._id)}>Edit</button>
                    <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserManagement;
