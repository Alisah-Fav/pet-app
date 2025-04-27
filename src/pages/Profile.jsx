// UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { apiUpdate, apiUser } from '../services/transaction';

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateStatus, setUpdateStatus] = useState(null);
  const [user, setUser] = useState({
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    profilePicture: '',
  });
  const [formData, setFormData] = useState(user);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await apiUser();
        // Assuming the API returns data in the format you need
        const userData = response.data;
        console.log(userData)
        
        // Map API response to your component's user structure
        const mappedUser = {
          id: userData.id || '',
          firstname: userData.firstname || userData.first_name || '',
          lastname: userData.lastname || userData.last_name || '',
          email: userData.email || '',
          profilePicture: userData.profilePicture || userData.profile_picture || '',
        };
        
        setUser(mappedUser);
        setFormData(mappedUser);
        setError(null);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateStatus('updating');
    
    try {
      // Prepare the payload matching backend parameter names
      const payload = {
        id:formData.id,
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        profilePicture: formData.profilePicture,
      };
      
      // Call the update endpoint
      await apiUpdate(payload);
      
      // Update the local state to reflect changes
      setUser(formData);
      setEditing(false);
      setUpdateStatus('success');
      console.log(user)
      
      // Clear success message after a few seconds
      setTimeout(() => {
        setUpdateStatus(null);
      }, 3000);
    } catch (err) {
      console.error('Error updating user:', err);
      setUpdateStatus('error');
    }
  };

  const handleCancel = () => {
    setFormData(user);
    setEditing(false);
    setUpdateStatus(null);
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
        <div className="flex justify-center">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
        <div className="flex justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      {updateStatus === 'success' && (
        <div className="mb-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
          Profile updated successfully!
        </div>
      )}
      
      {updateStatus === 'error' && (
        <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
          Failed to update profile. Please try again.
        </div>
      )}
      
      <div className="flex flex-col items-center space-y-4">
        <img
          src={user.profilePicture || '/api/placeholder/150/150'}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <h2 className="text-xl font-bold">
          {user.firstname} {user.lastname}
        </h2>
        <p className="text-gray-600">{user.email}</p>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="mt-4 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
          >
            Edit Profile
          </button>
        )}
      </div>

      {editing && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              disabled={updateStatus === 'updating'}
              className={`px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 ${
                updateStatus === 'updating' ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {updateStatus === 'updating' ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={updateStatus === 'updating'}
              className={`px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 ${
                updateStatus === 'updating' ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserProfile;