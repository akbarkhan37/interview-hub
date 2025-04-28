// components/QuestionDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const QuestionDetail = () => {
  const { id } = useParams(); // Get the question id from URL
  const [question, setQuestion] = useState(null); // State to hold the question data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch the question data from the API when the component mounts
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/questions/${id}`); // Backend API URL
        setQuestion(response.data); // Set the question data
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError('Error fetching question'); // Handle any errors
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id]); // Re-run the effect if the id changes

  if (loading) return <div className="p-4">Loading...</div>; // Display loading message
  if (error) return <div className="p-4 text-red-500">{error}</div>; // Display error message

  if (!question) return <div className="p-4">Question not found.</div>; // Display if no question is found

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{question.question}</h1>
      <p className="text-gray-700">{question.answer}</p>
    </div>
  );
};

export default QuestionDetail;
