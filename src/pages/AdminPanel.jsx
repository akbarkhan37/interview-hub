import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({ category: '', question: '', answer: '' });
  const [editId, setEditId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(5);

  const API_URL = 'http://localhost:5000/api/questions'; // your backend API

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const res = await axios.get(API_URL);
    setQuestions(res.data);

    // Extract unique categories
    const uniqueCategories = ['All', ...new Set(res.data.map(q => q.category))];
    setCategories(uniqueCategories);
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${API_URL}/${editId}`, formData);
    } else {
      await axios.post(API_URL, formData);
    }
    setFormData({ category: '', question: '', answer: '' });
    setEditId(null);
    fetchQuestions();
  };

  const handleEdit = (q) => {
    setFormData({ category: q.category, question: q.question, answer: q.answer });
    setEditId(q._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await axios.delete(`${API_URL}/${id}`);
      fetchQuestions();
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setVisibleCount(5); // Reset on filter change
  };

  // Filter questions by selected category
  const filteredQuestions = selectedCategory === 'All'
    ? questions
    : questions.filter(q => q.category === selectedCategory);

  // Only show limited questions
  const visibleQuestions = filteredQuestions.slice(0, visibleCount);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>

      {/* Add / Edit Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mb-8">
        <input 
          type="text" 
          name="category" 
          placeholder="Category" 
          value={formData.category}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          required
        />
        <input 
          type="text" 
          name="question" 
          placeholder="Question" 
          value={formData.question}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          required
        />
        <textarea 
          name="answer" 
          placeholder="Answer" 
          value={formData.answer}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editId ? 'Update' : 'Add'} Question
        </button>
      </form>

      {/* Category Filter */}
      <div className="mb-6 flex justify-center">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border border-gray-300 rounded-md p-2 text-lg"
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* All Questions */}
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">All Questions</h2>
        {questions.length === 0 ? (
          <p>No questions yet.</p>
        ) : filteredQuestions.length === 0 ? (
          <p>No questions found for this category.</p>
        ) : (
          <>
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Category</th>
                  <th className="p-2">Question</th>
                  <th className="p-2">Answer</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visibleQuestions.map((q) => (
                  <tr key={q._id}>
                    <td className="border p-2">{q.category}</td>
                    <td className="border p-2">{q.question}</td>
                    <td className="border p-2">{q.answer}</td>
                    <td className="border p-2">
                      <button onClick={() => handleEdit(q)} className="bg-yellow-400 px-2 py-1 mr-2 rounded">Edit</button>
                      <button onClick={() => handleDelete(q._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Load More Button */}
            {visibleCount < filteredQuestions.length && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setVisibleCount(prev => prev + 5)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded transition"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
