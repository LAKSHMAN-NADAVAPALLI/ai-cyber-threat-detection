import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './AdminDashboard.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [roleCounts, setRoleCounts] = useState({ Admin: 0, User: 0 });
  const [threats, setThreats] = useState([]); // ✅ For recent threats

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admin | Dashboard";
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://backend-edwk.onrender.com/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAllUsers(response.data);
        setUsers(response.data);
        calculateRoleCounts(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem('token');
          navigate('/login/admin');
        }
      }
    };
    fetchUsers();
  }, [token, navigate]);

  useEffect(() => {
    applyFilters(allUsers, searchKeyword, filterRole);
  }, [searchKeyword, filterRole, allUsers]);

  // ✅ Fetch recent threats on mount
  useEffect(() => {
    fetch("https://backend-edwk.onrender.com/api/admin/recent-threats", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("Threats:", data);
        setThreats(data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login/admin');
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

  const calculateRoleCounts = (usersList) => {
    const counts = { Admin: 0, User: 0 };
    usersList.forEach((user) => {
      if (user.role === 'ADMIN') counts.Admin++;
      else if (user.role === 'user') counts.User++;
    });
    setRoleCounts(counts);
  };

  const chartData = {
    labels: ['Admin', 'User'],
    datasets: [
      {
        label: 'User Roles',
        data: [roleCounts.Admin, roleCounts.User],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Number of Users by Role',
      },
    },
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <h2 className="admin-sidebar-title">Admin Panel</h2>
        <ul className="admin-sidebar-nav">
          <li><Link to="/admin-dashboard" className="admin-sidebar-link">Dashboard</Link></li>
          <li><Link to="/admin/usermanagement" className="admin-sidebar-link">Users</Link></li>
          <li><Link to="/admin/analytics" className="admin-sidebar-link">View Analytics</Link></li>
          <li className="admin-sidebar-logout" onClick={handleLogout}>Logout</li>
        </ul>
      </aside>

      <main className="admin-main-content">
        <div className="admin-main-header">
          <h2>Admin Dashboard</h2>
        </div>

        <div className="admin-search-container">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="admin-search-input"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <select
            className="admin-search-select"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="user">User</option>
          </select>
          <button className="admin-search-button" onClick={handleSearch}>
            Search
          </button>
        </div>

        <div className="admin-chart-container">
          <Bar data={chartData} options={chartOptions} />
        </div>

        {/* ✅ Recent Threats */}
        <div className="admin-threats-card">
          <h3>Recent Threat Predictions</h3>
          {threats.length > 0 ? (
            <ul className="admin-threats-list">
              {threats.map((t, idx) => (
                <li key={idx} className="admin-threat-item">
                  <strong>{t.message}</strong> <br />
                  Type: <em>{t.type}</em>, Confidence: <b>{t.confidence}%</b> <br />
                  Time: <span>{t.timestamp}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No recent threats found.</p>
          )}
        </div>

        <div className="admin-users-card">
          <h3>Registered Users</h3>
          <div className="admin-users-table-container">
            <table className="admin-users-table">
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
                  users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td className="capitalize">{u.role}</td>
                      <td>
                        <button className="admin-edit-button" onClick={() => handleEditUser(u.id)}>Edit</button>
                        <button className="admin-delete-button" onClick={() => handleDeleteUser(u.id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="admin-no-users">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
