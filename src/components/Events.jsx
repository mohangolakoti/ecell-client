import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../data/api';
import { IoMdAdd } from "react-icons/io";
import { Link } from 'react-router-dom';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsResponse = await axios.get(`${API_URL}/events`);
        const eventsData = eventsResponse.data;

        // Fetch registrations for each event
        const registrationsPromises = eventsData.map(async (event) => {
          try {
            const registrationResponse = await axios.get(`${API_URL}/events/${event._id}/teams`);
            return {
              ...event,
              registrationCount: registrationResponse.data.teams?.length || 0, // Handle no teams registered
            };
          } catch (err) {
            console.warn(`Failed to fetch registrations for event ${event._id}`, err);
            return {
              ...event,
              registrationCount: 0, // Default to 0 if the API call fails
            };
          }
        });

        const eventsWithRegistrations = await Promise.all(registrationsPromises);
        setEvents(eventsWithRegistrations);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch events or registrations.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p className="text-center text-blue-600 font-semibold mt-10">Loading events...</p>;
  if (error) return <p className="text-center text-red-600 font-semibold">{error}</p>;

  return (
    <div className="mx-6 my-10 w-full">
      <div className="flex justify-between w-full px-6">
        <h2 className="text-3xl font-bold font-Montserrat">Event Details</h2>
        <Link to='/event-register'><button className="bg-[#5ad157] px-6 py-2 rounded-lg text-background flex items-center gap-1 hover:bg-[#3ccb3a]"><IoMdAdd className='mt-[3px] text-lg'/> New Event</button></Link>
      </div>
      <div className="flex justify-center">
        <table className="text-left my-14 w-11/12 shadow-md">
          <thead className="bg-accent text-background font-semibold">
            <tr className="font-Montserrat text-base">
              <th className="px-4 py-4 rounded-tl-xl">Event Name</th>
              <th className="px-4 py-4">Date</th>
              <th className="px-4 py-4">Location</th>
              <th className="px-4 py-4">Registrations</th>
              <th className="px-4 py-4 rounded-tr-xl">Faculty Coordinator</th>
            </tr>
          </thead>
          <tbody className="font-OpenSans text-sm">
            {events.map((event) => (
              <tr key={event._id} className="hover:bg-[#e0f9df] bg-[#f2fcf1] border-b-2 border-muted hover:shadow-sm text-gray-500 font-medium">
                <td className="px-4 py-3">{event.name}</td>
                <td className="px-4 py-3">{new Date(event.eventDate).toLocaleDateString()}</td>
                <td className="px-4 py-3">{event.location}</td>
                <td className="px-4 py-3">{event.registrationCount}</td>
                <td className="px-4 py-3">
                  {event.facultyCoordinator?.name || 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Events;
