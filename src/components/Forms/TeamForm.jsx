import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../data/api';

const TeamForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    linkedInURL: '',
    department: '',
  });

  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    form.append('name', formData.name);
    form.append('position', formData.position);
    form.append('linkedInURL', formData.linkedInURL);
    form.append('department', formData.department);
    if (profileImage) form.append('profileImage', profileImage);

    try {
      const response = await axios.post(`${API_URL}/create-team`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Team member added successfully!');
      console.log(response);
    } catch (error) {
      console.error(error);
      alert('Error adding team member');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg px-8 py-6 max-w-lg mx-auto mt-10 space-y-4 font-OpenSans"
    >
      <h2 className="text-2xl font-bold text-gray-700 text-center font-Montserrat">Add Team Member</h2>
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter name"
          onChange={handleChange}
          required
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        />
      </div>
      
      <div>
        <label htmlFor="position" className="block text-sm font-medium text-gray-600">Position</label>
        <input
          type="text"
          name="position"
          id="position"
          placeholder="Enter position"
          onChange={handleChange}
          required
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        />
      </div>
      
      <div>
        <label htmlFor="linkedInURL" className="block text-sm font-medium text-gray-600">LinkedIn URL</label>
        <input
          type="url"
          name="linkedInURL"
          id="linkedInURL"
          placeholder="Enter LinkedIn URL"
          onChange={handleChange}
          required
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        />
      </div>
      
      <div>
        <label htmlFor="department" className="block text-sm font-medium text-gray-600">Department</label>
        <input
          type="text"
          name="department"
          id="department"
          placeholder="Enter department"
          onChange={handleChange}
          required
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        />
      </div>
      
      <div>
        <label htmlFor="profileImage" className="block text-sm font-medium text-gray-600">Profile Image</label>
        <input
          type="file"
          name="profileImage"
          id="profileImage"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full mt-1 text-gray-600"
        />
      </div>
      
      <button
        type="submit"
        className="w-full bg-teal-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
      >
        Add Team Member
      </button>
    </form>
  );
};

export default TeamForm;
