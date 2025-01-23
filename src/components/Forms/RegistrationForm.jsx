import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../data/api';

const RegistrationForm = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    eventId: '',
    teamName: '',
    teamSize: '',
    teamMembers: [{ name: '', email: '', pin: '', branch: '', phone: '' }],
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_URL}/events`);
        if (Array.isArray(response.data)) {
          setEvents(response.data);
        } else {
          console.error('Events data is not an array');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTeamMemberChange = (index, e) => {
    const { name, value } = e.target;
    const teamMembers = [...formData.teamMembers];
    teamMembers[index][name] = value;
    setFormData({ ...formData, teamMembers });
  };

  const addTeamMember = () => {
    setFormData({
      ...formData,
      teamMembers: [
        ...formData.teamMembers,
        { name: '', email: '', pin: '', branch: '', phone: '' },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/registrations`, formData);
      alert('Team registered successfully!');
    } catch (error) {
      console.error(error);
      alert('Error registering team.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 font-OpenSans">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center font-Montserrat">
        Register Your Team
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="event" className="block text-sm font-medium text-gray-700">
            Select Event
          </label>
          <select
            id="event"
            name="eventId"
            value={formData.eventId}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="" disabled>
              Select an event
            </option>
            {Array.isArray(events) && events.length > 0 ? (
              events.map((event) => (
                <option key={event._id} value={event._id}>
                  {event.name}
                </option>
              ))
            ) : (
              <option disabled>No events available</option>
            )}
          </select>
        </div>

        <div>
          <label htmlFor="teamName" className="block text-sm font-medium text-gray-700">
            Team Name
          </label>
          <input
            id="teamName"
            type="text"
            name="teamName"
            placeholder="Enter team name"
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700">
            Team Size
          </label>
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

        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Team Members</h4>
          {formData.teamMembers.map((member, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 border p-4 rounded-lg"
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={member.name}
                onChange={(e) => handleTeamMemberChange(index, e)}
                required
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={member.email}
                onChange={(e) => handleTeamMemberChange(index, e)}
                required
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                type="text"
                name="pin"
                placeholder="Pin No"
                value={member.pin}
                onChange={(e) => handleTeamMemberChange(index, e)}
                required
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                type="text"
                name="branch"
                placeholder="Branch"
                value={member.branch}
                onChange={(e) => handleTeamMemberChange(index, e)}
                required
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={member.phone}
                onChange={(e) => handleTeamMemberChange(index, e)}
                required
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addTeamMember}
            className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-700"
          >
            Add Team Member
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Register Team
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
