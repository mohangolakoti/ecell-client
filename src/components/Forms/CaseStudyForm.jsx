import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../data/api';

const CaseStudyForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    author: '',
  });

  const [coverImage, setCoverImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    form.append('title', formData.title);
    form.append('summary', formData.summary);
    form.append('content', formData.content);
    form.append('author', formData.author);
    if (coverImage) form.append('coverImage', coverImage);

    try {
      const response = await axios.post(`${API_URL}/create-casestudy`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Case study added successfully!');
    } catch (error) {
      console.error(error);
      alert('Error adding case study');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg px-8 py-6 max-w-2xl mx-auto mt-10 space-y-4 font-OpenSans"
    >
      <h2 className="text-3xl font-bold text-gray-700 text-center font-Montserrat">Add Case Study</h2>
      
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-600">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Enter case study title"
          onChange={handleChange}
          required
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        />
      </div>

      <div>
        <label htmlFor="summary" className="block text-sm font-medium text-gray-600">Summary</label>
        <textarea
          name="summary"
          id="summary"
          placeholder="Enter a brief summary"
          rows="3"
          onChange={handleChange}
          required
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        ></textarea>
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-600">Content</label>
        <textarea
          name="content"
          id="content"
          placeholder="Enter detailed content"
          rows="5"
          onChange={handleChange}
          required
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        ></textarea>
      </div>

      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-600">Author</label>
        <input
          type="text"
          name="author"
          id="author"
          placeholder="Enter author's name"
          onChange={handleChange}
          required
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        />
      </div>

      <div>
        <label htmlFor="coverImage" className="block text-sm font-medium text-gray-600">Cover Image</label>
        <input
          type="file"
          name="coverImage"
          id="coverImage"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full mt-1 text-gray-600"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-pink-400 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-pink-500 transition duration-300"
      >
        Add Case Study
      </button>
    </form>
  );
};

export default CaseStudyForm;
