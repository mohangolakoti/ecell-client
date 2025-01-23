import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../data/api';

const JudgingCriteriaForm = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    eventId: '',
    criteria: [{ name: '', weightage: '' }],
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

  const handleEventChange = (e) => {
    setFormData({
      ...formData,
      eventId: e.target.value,
    });
  };

  const handleCriteriaChange = (index, e) => {
    const { name, value } = e.target;
    const criteria = [...formData.criteria];
    criteria[index][name] = value;
    setFormData({ ...formData, criteria });
  };

  const addCriteria = () => {
    setFormData({
      ...formData,
      criteria: [...formData.criteria, { name: '', weightage: '' }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/judging-criteria`, formData);
      alert('Judging criteria saved successfully!');
    } catch (error) {
      console.error(error);
      alert('Error saving judging criteria.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto mt-10 font-OpenSans"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-700 font-Montserrat">Judging Criteria</h2>
      <div className="mb-4">
        <label
          htmlFor="event"
          className="block text-gray-700 font-medium mb-2"
        >
          Select Event:
        </label>
        <select
          id="event"
          name="eventId"
          value={formData.eventId}
          onChange={handleEventChange}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-800"
        >
          <option value="" disabled>Select an event</option>
          {events.length > 0 ? (
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

      <h4 className="text-lg font-medium mb-2 text-gray-700">Criteria</h4>
      {formData.criteria.map((criterion, index) => (
        <div key={index} className="flex items-center gap-4 mb-4">
          <input
            type="text"
            name="name"
            placeholder="Criterion Name"
            value={criterion.name}
            onChange={(e) => handleCriteriaChange(index, e)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-800"
          />
          <input
            type="number"
            name="weightage"
            placeholder="Weightage (%)"
            value={criterion.weightage}
            onChange={(e) => handleCriteriaChange(index, e)}
            required
            className="w-1/4 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-800"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addCriteria}
        className="bg-blue-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-900"
      >
        Add Criterion
      </button>
      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-yellow-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-500"
        >
          Save Criteria
        </button>
      </div>
    </form>
  );
};

export default JudgingCriteriaForm;
