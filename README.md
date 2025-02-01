Quizz?
A simple React-based quiz app that allows users to answer 10 multiple-choice questions and see their score at the end, with a summary of correct and incorrect answers.

Features
Fetches quiz questions from a local API (http://localhost:3001/api/questions).
Allows users to select answers and shows whether they are correct or incorrect.
Displays the final score after answering all questions.
Provides a summary of the user's answers and correctness.
Option to restart the quiz.
Requirements
React (create-react-app)
Axios (for fetching data from an API)
CSS for basic styling

Usage
When you first open the app, you will see a "Start Quiz" button. Click it to begin the quiz.
Select your answers from the provided options.
After all questions are answered, you will see your score and a summary of your responses.
You can click the "Restart Quiz" button to reset the quiz and start over.
API
This application expects a response from a local API endpoint (GET /api/questions), which should return a list of quiz questions. Each question object should follow this format:
Styling
The app uses simple CSS for layout and design. You can find the styles in App.css.
