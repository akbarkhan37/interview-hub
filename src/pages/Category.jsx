import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import QuestionCard from '../components/QuestionCard';

const Category = () => {
  const { category } = useParams();  // Get the category from the URL
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle any error from API

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Make an API request to your backend to get questions by category
        const response = await axios.get(`http://localhost:5000/api/questions/category/${category}`);
        setQuestions(response.data);  // Set questions based on the response data
        setLoading(false);  // Set loading to false once data is fetched
      } catch (err) {
        setError('Error fetching questions.');
        setLoading(false);
      }
    };

    fetchQuestions();  // Call fetch function when component mounts
  }, [category]);  // Re-run the effect when category changes

  if (loading) {
    return <div className="text-center">Loading questions...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{category} Questions</h1>
      {questions.length > 0 ? (
        questions.map((q) => <QuestionCard key={q._id} question={q} />)  // Map over questions and display using QuestionCard component
      ) : (
        <p>No questions available for this category.</p>
      )}
    </div>
  );
};

export default Category;
