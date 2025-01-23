import { useState } from 'react';

const AdminSettings = () => {
  const [profileDetails, setProfileDetails] = useState({
    name: '',
    email: '',
  });
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileDetails({ ...profileDetails, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications({ ...notifications, [name]: checked });
  };

  const saveProfile = () => {
    alert('Profile details saved!');
    // Add API call logic here
  };

  const changePassword = () => {
    if (password.newPassword !== password.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert('Password changed successfully!');
    // Add API call logic here
  };

  const saveNotifications = () => {
    alert('Notification preferences updated!');
    // Add API call logic here
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Settings</h2>

      {/* Profile Settings */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl font-bold mb-4">Profile Details</h3>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={profileDetails.name}
            onChange={handleProfileChange}
            placeholder="Name"
            className="p-3 border rounded-md w-full"
          />
          <input
            type="email"
            name="email"
            value={profileDetails.email}
            onChange={handleProfileChange}
            placeholder="Email"
            className="p-3 border rounded-md w-full"
          />
        </div>
        <button
          onClick={saveProfile}
          className="mt-4 bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600"
        >
          Save Changes
        </button>
      </div>

      {/* Password Settings */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl font-bold mb-4">Change Password</h3>
        <div className="flex flex-col gap-4">
          <input
            type="password"
            name="currentPassword"
            value={password.currentPassword}
            onChange={handlePasswordChange}
            placeholder="Current Password"
            className="p-3 border rounded-md w-full"
          />
          <input
            type="password"
            name="newPassword"
            value={password.newPassword}
            onChange={handlePasswordChange}
            placeholder="New Password"
            className="p-3 border rounded-md w-full"
          />
          <input
            type="password"
            name="confirmPassword"
            value={password.confirmPassword}
            onChange={handlePasswordChange}
            placeholder="Confirm Password"
            className="p-3 border rounded-md w-full"
          />
        </div>
        <button
          onClick={changePassword}
          className="mt-4 bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600"
        >
          Change Password
        </button>
      </div>

      {/* Notification Settings */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Notification Preferences</h3>
        <div className="flex flex-col gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="emailNotifications"
              checked={notifications.emailNotifications}
              onChange={handleNotificationChange}
              className="mr-3"
            />
            Email Notifications
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="smsNotifications"
              checked={notifications.smsNotifications}
              onChange={handleNotificationChange}
              className="mr-3"
            />
            SMS Notifications
          </label>
        </div>
        <button
          onClick={saveNotifications}
          className="mt-4 bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
