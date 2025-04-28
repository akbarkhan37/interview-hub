const Question = require('../models/Question');

// Get all questions
const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching questions' });
  }
};

// Get questions by category
const getQuestionsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const questions = await Question.find({ category });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching questions by category' });
  }
};

// Get a specific question by ID (The function you need to implement)
const getQuestionById = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching question' });
  }
};

// Create a new question
const createQuestion = async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ message: 'Error creating question' });
  }
};

// Update an existing question
const updateQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(updatedQuestion);
  } catch (err) {
    res.status(400).json({ message: 'Error updating question' });
  }
};

// Delete a question
const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedQuestion = await Question.findByIdAndDelete(id);
    if (!deletedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json({ message: 'Question deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting question' });
  }
};

module.exports = {
  getQuestions,
  getQuestionsByCategory,
  getQuestionById,  // Export the function
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
