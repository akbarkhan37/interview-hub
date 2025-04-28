import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openQuestionId, setOpenQuestionId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(5); // Show 5 questions initially

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/questions');
        setQuestions(res.data);

        // Extract unique categories
        const uniqueCategories = ['All', ...new Set(res.data.map(q => q.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error('Error fetching questions:', err);
      }
    };

    fetchQuestions();
  }, []);

  const toggleQuestion = (id) => {
    if (openQuestionId === id) {
      setOpenQuestionId(null);
    } else {
      setOpenQuestionId(id);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setVisibleCount(5); // Reset visible questions on category change
    setOpenQuestionId(null); // Close any open questions when changing category
  };

  // Filter questions by selected category
  const filteredQuestions = selectedCategory === 'All'
    ? questions
    : questions.filter(q => q.category === selectedCategory);

  // Get visible questions
  const visibleQuestions = filteredQuestions.slice(0, visibleCount);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">All Interview Questions</h1>

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

      {/* Questions Accordion */}
      <div className="space-y-4">
        {visibleQuestions.length > 0 ? (
          visibleQuestions.map((q, index) => (
            <div key={q._id} className="border rounded shadow-sm">
              <button
                onClick={() => toggleQuestion(q._id)}
                className="w-full flex justify-between items-center p-4 text-left font-medium text-lg hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">{index + 1}.</span>
                  <span>{q.question}</span>
                </div>
                <span>{openQuestionId === q._id ? '-' : '+'}</span>
              </button>

              {openQuestionId === q._id && (
                <div className="p-4 bg-gray-50 text-gray-700">
                  {q.answer}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No questions found for this category.</div>
        )}
      </div>

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
    </div>
  );
};

export default Home;
