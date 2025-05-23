import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditUser.css'; // Optional CSS file

const EditUser = () => {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  });

  useEffect(() => {
    document.title = 'Admin | Edit User';

    console.log('🚀 EditUser mounted with ID:', id);

    if (!token) {
      console.warn('❌ No token found in localStorage');
      alert('Unauthorized: Please log in first.');
      navigate('/login');
      return;
    }

    const fetchUser = async () => {
      try {
        console.log('📡 Fetching user list for ID:', id);

        const response = await axios.get('https://backend-edwk.onrender.com/api/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('✅ Users fetched:', response.data);

        if (response.data && Array.isArray(response.data)) {
          const user = response.data.find((u) => {
            console.log('🕵️ Checking user:', u.id, 'against', id);
            return u.id === id || u.id === parseInt(id);
          });

          if (user) {
            console.log('🎯 User found:', user);
            setFormData({
              name: user.name || '',
              email: user.email || '',
              role: user.role || '',
            });
          } else {
            console.warn('⚠️ User not found with ID:', id);
            alert('User not found.');
            navigate('/admin/users');
          }
        } else {
          console.error('❌ Invalid response from server:', response);
          alert('Invalid response from server.');
        }
      } catch (err) {
        console.error('🔥 Error fetching user:', err);
        alert('Failed to fetch user details.');
      }
    };

    fetchUser();
  }, [id, token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`✏️ Field changed - ${name}:`, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('📤 Submitting updated user data:', formData);

    try {
      const res = await axios.put(
        `https://backend-edwk.onrender.com/api/admin/users/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('✅ User update response:', res.data);
      alert('User updated successfully.');
         navigate('/admin-dashboard'); 
    } catch (err) {
      console.error('❌ Failed to update user:', err.response || err);
      if (err.response?.status === 403) {
        alert('Unauthorized: Admin access required.');
      } else if (err.response?.status === 404) {
        alert('User not found on update.');
      } else {
        alert('Failed to update user.');
      }
    }
  };

  return (
    <div className="edit-user-container">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit} className="edit-user-form">
        <div className="edit-user-field">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="edit-user-field">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="edit-user-field">
          <label>Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
          </select>
        </div>
        <button type="submit" className="edit-user-submit-button">
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUser;
