import React, { useState } from 'react';

const mcqPapers = {
  1: [
    { question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], answer: 1 },
    { question: 'What is 5 x 3?', options: ['8', '15', '10', '20'], answer: 1 },
  ],
  2: [
    { question: 'What is the SI unit of Force?', options: ['Newton', 'Joule', 'Watt', 'Pascal'], answer: 0 },
    { question: 'Speed is defined as?', options: ['Distance/Time', 'Mass/Volume', 'Force/Area', 'None'], answer: 0 },
  ],
  3: [
    { question: 'What is the symbol for Sodium?', options: ['Na', 'S', 'Sn', 'So'], answer: 0 },
    { question: 'Water is also known as?', options: ['H2O', 'O2', 'CO2', 'H2'], answer: 0 },
  ],
  4: [
    { question: 'What is the powerhouse of the cell?', options: ['Mitochondria', 'Nucleus', 'Ribosome', 'Chloroplast'], answer: 0 },
    { question: 'Photosynthesis occurs in which part of the plant?', options: ['Leaf', 'Root', 'Stem', 'Flower'], answer: 0 },
  ],
};

const StudentPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentExam, setCurrentExam] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const loginHandler = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  const startExam = (examId) => {
    setCurrentExam({ id: examId, questions: mcqPapers[examId] });
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  const handleAnswerSelect = (index) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestion] = index;
    setSelectedAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < currentExam.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return answer === currentExam.questions[index].answer ? score + 1 : score;
    }, 0);
  };

  if (!isLoggedIn) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
        <div className="border-2 rounded-xl border-blue-600 p-10 bg-white shadow-lg">
          <form onSubmit={loginHandler} className="flex flex-col items-center space-y-4">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Student Login</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="outline-none bg-transparent border-2 border-blue-600 py-3 px-5 rounded-full w-full placeholder:text-gray-400"
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="outline-none bg-transparent border-2 border-blue-600 py-3 px-5 rounded-full w-full placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (currentExam) {
    if (showResults) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h2 className="text-2xl font-bold mb-4">Exam Results</h2>
          <p className="text-lg">Your Score: {calculateScore()} / {currentExam.questions.length}</p>
          <button
            onClick={() => setCurrentExam(null)}
            className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition"
          >
            Back to Exams
          </button>
        </div>
      );
    }

    const question = currentExam.questions[currentQuestion];

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-xl font-bold mb-4">{`Question ${currentQuestion + 1} / ${currentExam.questions.length}`}</h2>
        <p className="text-lg mb-4">{question.question}</p>
        <div className="flex flex-col space-y-2 mb-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`px-4 py-2 rounded-lg text-left w-full ${
                selectedAnswers[currentQuestion] === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        <button
          onClick={handleNext}
          className="mt-4 bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition"
        >
          {currentQuestion < currentExam.questions.length - 1 ? 'Next' : 'Submit'}
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Student Panel</h1>
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Upcoming Exams</h2>
          {Object.keys(mcqPapers).map((examId) => (
            <div key={examId} className="flex justify-between items-center border-b pb-3 mb-3 last:border-none last:pb-0">
              <div>
                <h3 className="text-lg font-medium text-gray-800">Exam {examId}</h3>
              </div>
              <button
                onClick={() => startExam(parseInt(examId))}
                className="px-4 py-2 rounded-full text-sm bg-green-500 text-white hover:bg-green-600"
              >
                Start Exam
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentPanel;
