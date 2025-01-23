import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../data/api';

const CreateEventForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    eventDate: '',
    registrationDeadline: '',
    location: '',
    department: '',
    facultyCoordinator: { name: '', email: '', phone: '', department: '' },
    studentCoordinator: { name: '', email: '', phone: '', department: '' },
    teamSize: '',
    prizes: { first: '', second: '', third: '' },
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (e, section) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value,
      },
    }));
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('eventDate', formData.eventDate);
    form.append('registrationDeadline', formData.registrationDeadline);
    form.append('location', formData.location);
    form.append('department', formData.department);
    form.append('facultyCoordinator', JSON.stringify(formData.facultyCoordinator));
    form.append('studentCoordinator', JSON.stringify(formData.studentCoordinator));
    form.append('teamSize', formData.teamSize);
    form.append('prizes', JSON.stringify(formData.prizes));
    if (image) form.append('image', image);

    try {
      const response = await axios.post(`${API_URL}/events`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response);
      alert('Event created successfully!');
    } catch (error) {
      console.error(error);
      alert('Error creating event');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 font-OpenSans">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center font-Montserrat">Create Event</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Event Name and Description */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Event Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter event name"
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter event description"
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Event Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">Event Date</label>
            <input
              id="eventDate"
              type="date"
              name="eventDate"
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="registrationDeadline" className="block text-sm font-medium text-gray-700">Registration Deadline</label>
            <input
              id="registrationDeadline"
              type="date"
              name="registrationDeadline"
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Location and Department */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <input
              id="location"
              type="text"
              name="location"
              placeholder="Event location"
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
            <input
              id="department"
              type="text"
              name="department"
              placeholder="Organizing department"
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Coordinators */}
        <fieldset>
          <legend className="text-lg font-medium text-gray-700">Faculty Coordinator</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['name', 'email', 'phone', 'department'].map((field) => (
              <div key={`faculty-${field}`}>
                <label htmlFor={`faculty-${field}`} className="block text-sm font-medium text-gray-700 capitalize">
                  {field}
                </label>
                <input
                  id={`faculty-${field}`}
                  type="text"
                  name={field}
                  placeholder={`Faculty ${field}`}
                  onChange={(e) => handleNestedChange(e, 'facultyCoordinator')}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-lg font-medium text-gray-700">Student Coordinator</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['name', 'email', 'phone', 'department'].map((field) => (
              <div key={`student-${field}`}>
                <label htmlFor={`student-${field}`} className="block text-sm font-medium text-gray-700 capitalize">
                  {field}
                </label>
                <input
                  id={`student-${field}`}
                  type="text"
                  name={field}
                  placeholder={`Student ${field}`}
                  onChange={(e) => handleNestedChange(e, 'studentCoordinator')}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            ))}
          </div>
        </fieldset>

        {/* Team Size */}
        <div>
          <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700">Team Size</label>
          <input
            id="teamSize"
            type="number"
            name="teamSize"
            placeholder="Enter team size"
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Prizes */}
        <fieldset>
          <legend className="text-lg font-medium text-gray-700">Prizes</legend>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {['first', 'second', 'third'].map((prize) => (
              <div key={prize}>
                <label htmlFor={`prize-${prize}`} className="block text-sm font-medium text-gray-700 capitalize">
                  {prize} Prize
                </label>
                <input
                  id={`prize-${prize}`}
                  type="text"
                  name={prize}
                  placeholder={`${prize} prize`}
                  onChange={(e) => handleNestedChange(e, 'prizes')}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            ))}
          </div>
        </fieldset>

        {/* Image */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Event Image</label>
          <input
            id="image"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEventForm;
