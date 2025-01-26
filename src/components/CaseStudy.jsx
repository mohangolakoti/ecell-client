import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_IMG, API_URL } from '../data/api';
import { Link } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';

const CaseStudy = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null); // For the popup

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const response = await axios.get(`${API_URL}/casestudy`);
        setCaseStudies(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch case studies.');
        setLoading(false);
        console.log(err);
      }
    };

    fetchCaseStudies();
  }, []);

  const handleCardClick = (caseStudy) => {
    setSelectedCaseStudy(caseStudy);
  };

  const closeModal = () => {
    setSelectedCaseStudy(null);
  };

  if (loading) return <p className="text-center mt-10">Loading case studies...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="mx-6 my-10 w-full">
      <div className="flex justify-between w-full px-6">
        <h2 className="text-3xl font-bold font-Montserrat">Case Studies</h2>
        <Link to='/create-casestudy'><button className="bg-pink-400 px-6 py-2 rounded-lg text-background flex items-center gap-1 font-OpenSans hover:bg-pink-500"><IoMdAdd className='mt-[3px] text-lg'/> Add Case Study</button></Link>
      </div>
      {/* Grid for Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-10 mx-8">
        {caseStudies.map((caseStudy) => (
          <div
            key={caseStudy._id}
            className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => handleCardClick(caseStudy)}
          >
            {/* Image */}
            {caseStudy.coverImage && (
              <img
                src={`${API_IMG}${caseStudy.coverImage}`}
                alt={caseStudy.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}

            {/* Details */}
            <h3 className="text-xl font-bold text-coral_red capitalize font-Montserrat mb-2">
              {caseStudy.title}
            </h3>
            <p className="text-sm text-gray-600">
              <strong>Author:</strong> {caseStudy.author}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Created:</strong> {new Date(caseStudy.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      {selectedCaseStudy && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-3xl relative">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-red-500 hover:text-black text-4xl "
              onClick={closeModal}
            >
              &times;
            </button>

            {/* Image */}
            {selectedCaseStudy.coverImage && (
              <img
                src={`${API_IMG}${selectedCaseStudy.coverImage}`}
                alt={selectedCaseStudy.title}
                className="w-full h-64 object-cover rounded mb-4"
              />
            )}

            {/* Title */}
            <h2 className="text-2xl font-bold text-coral_red capitalize mb-4">
              {selectedCaseStudy.title}
            </h2>

            {/* Author & Created Date */}
            <p className="text-sm text-gray-600 mb-4">
              <strong>Author:</strong> {selectedCaseStudy.author}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Created:</strong> {new Date(selectedCaseStudy.createdAt).toLocaleDateString()}
            </p>

            {/* Summary */}
            <p className="text-gray-700">{selectedCaseStudy.summary}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseStudy;
