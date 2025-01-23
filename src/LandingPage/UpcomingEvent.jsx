import { useState, useEffect } from 'react';
import axios from 'axios';
import alarm from '../constants/alarm_clock.png'; // Adjust path as needed
import { API_IMG, API_URL } from '../data/api';
import { Link } from 'react-router-dom';

const UpcomingEvent = () => {
  const [event, setEvent] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const fetchUpcomingEvent = async () => {
      try {
        const response = await axios.get(`${API_URL}/events`);
        const events = response.data;

        // Filter events with future dates
        const upcomingEvents = events.filter(event => new Date(event.eventDate) > new Date());
        // Sort events by date
        const sortedEvents = upcomingEvents.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

        // Select the nearest upcoming event
        if (sortedEvents.length > 0) {
          setEvent(sortedEvents[0]);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchUpcomingEvent();
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (event) {
        const eventDate = new Date(event.eventDate);
        const now = new Date();
        const difference = eventDate - now;

        if (difference > 0) {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          });
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [event]);

  if (!event) {
    return <div>Loading upcoming event...</div>;
  }

  return (
    <section className="py-10 px-4 pt-1 mt-24 text-white" id="next_event">
      <h1 className="text-white text-4xl p-2 font-bold mb-4 ml-12 mt-14 capitalize">{event.name}</h1>
      <div className="max-w-7xl mx-auto text-center flex items-start space-x-6 xl:flex-row flex-col mt-6">
        {/* Left Section */}
        <div className="flex-1 text-left">
          <p className="text-grey-500 font-Montserrat mt-4 text-[#acacac] font-bold" data-aos="fade-right">
            {event.description}
          </p>
          <div className="flex items-center mt-4">
            <img
              src={alarm}
              className="w-12 h-12 mr-5 mt-6"
              data-aos="fade-in"
              alt="Timer Alarm"
            />
            {Object.entries(timeLeft).map(([key, value]) => (
              <div
                key={key}
                className="bg-white/10 backdrop-blur-md text-center p-4 rounded-lg mr-3 mt-5 w-30 hover:shadow-2xl hover:scale-110 hover:cursor-pointer"
                data-aos="fade-in"
              >
                <span className="text-3xl font-bold text-white">{value}</span>
                <p className="text-white font-bold">{key}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vertical Line */}
        <div className="border-l-2 border-gray-300 h-auto"></div>

        {/* Right Section */}
        <div className="flex-1 text-center">
          <img
            src={`${API_IMG}${event.image}`}
            className="w-2/3 h-2/3 mx-auto mb-4 shadow-lg shadow-gray-600 rounded-xl transition-transform duration-300 ease-in-out hover:shadow-2xl hover:scale-110 hover:cursor-pointer"
            alt={event.name}
            data-aos="fade-left"
          />
          <button
            className="mt-4 px-8 py-3 bg-gradient-to-r from-fuchsia-500 to-cyan-500 font-bold hover:bg-indigo-700 transition-transform duration-200 ease-in-out rounded-xl hover:scale-110"
            data-aos="fade-in"
          >
            <Link to='/registration'>
            Register Now
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvent;
