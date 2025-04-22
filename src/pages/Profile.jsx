import React, { useState } from 'react';

const defaultUser = {
  firstName: 'Ama',
  lastName: 'Mensah',
  email: 'ama@example.com',
  profileImage: '', // will use default avatar if empty
};

const UserProfile = () => {
  const [user, setUser] = useState(defaultUser);
  const [formData, setFormData] = useState(user);
  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(formData);
    setEditing(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setEditing(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <div className="flex flex-col items-center space-y-4">
        <img
          src={formData.profileImage || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <h2 className="text-xl font-bold">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-gray-600">{user.email}</p>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="mt-4 px-4 py-2 bg-teal-400 text-white rounded hover:bg-teal-600"
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
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
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
              className="px-4 py-2 bg-teal-400 text-white rounded hover:bg-teal-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
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
