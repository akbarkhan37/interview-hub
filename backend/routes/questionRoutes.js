const express = require("express");
const router = express.Router();
const {
  getQuestions,
  getQuestionsByCategory,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionControllers");

// Get all questions
router.get("/", getQuestions);

// Get questions by category
router.get("/category/:category", getQuestionsByCategory);

// Get a specific question by ID (Added this route)
router.get("/:id", getQuestionById); // <-- This is the route for fetching a question by its ID

// Create a new question
router.post("/", createQuestion);

// Update an existing question
router.put("/:id", updateQuestion);

// Delete a question
router.delete("/:id", deleteQuestion);

module.exports = router;
