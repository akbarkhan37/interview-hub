import React from 'react';
import { Link } from 'react-router-dom';

const QuestionCard = ({ question }) => {
  return (
    <div className="border-white p-4 my-2 rounded-md shadow-md">
      <h3 className="text-lg font-semibold">{question.question}</h3>
      <Link to={`/question/${question._id}`} className="text-blue-500 underline">View Answer</Link>
    </div>
  );
};

export default QuestionCard;
