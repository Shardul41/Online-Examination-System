
import React, { useState } from 'react';
import ExamPaper from './ExamPaper'; // Import ExamPaper component

const exams = [
  { id: 1, subject: 'Mathematics', time: '10:00 AM', duration: '1 hour', active: true },
  { id: 2, subject: 'Physics', time: '1:00 PM', duration: '1 hour', active: false },
  { id: 3, subject: 'Chemistry', time: '3:00 PM', duration: '1.5 hours', active: true },
  { id: 4, subject: 'Biology', time: '11:30 AM', duration: '1 hour', active: false },
  { id: 5, subject: 'English', time: '9:00 AM', duration: '2 hours', active: true },
  { id: 6, subject: 'History', time: '2:30 PM', duration: '1 hour', active: true },
  { id: 7, subject: 'Geography', time: '4:00 PM', duration: '1 hour', active: false },
];

const results = [
  { id: 1, subject: 'Mathematics', score: '85%', status: 'Passed' },
  { id: 2, subject: 'Physics', score: '75%', status: 'Passed' },
  { id: 3, subject: 'Chemistry', score: '90%', status: 'Passed' },
  { id: 4, subject: 'Biology', score: '65%', status: 'Passed' },
  { id: 5, subject: 'English', score: '78%', status: 'Passed' },
  { id: 6, subject: 'History', score: '50%', status: 'Passed' },
  { id: 7, subject: 'Geography', score: '40%', status: 'Failed' },
];

const StudentPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentExamId, setCurrentExamId] = useState(null); // Track the current exam being taken

  const loginHandler = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  const startExam = (examId) => {
    setCurrentExamId(examId); // Set the current exam ID to start the exam
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

  if (currentExamId !== null) {
    // Render the ExamPaper component for the current exam
    const exam = exams.find((exam) => exam.id === currentExamId);
    return <ExamPaper exam={exam} />;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Student Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Exams Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Upcoming Exams</h2>
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="flex justify-between items-center border-b pb-3 mb-3 last:border-none last:pb-0"
            >
              <div>
                <h3 className="text-lg font-medium text-gray-800">{exam.subject}</h3>
                <p className="text-sm text-gray-500">
                  Time: {exam.time} | Duration: {exam.duration}
                </p>
              </div>
              <button
                onClick={() => startExam(exam.id)}
                disabled={!exam.active}
                className={`px-4 py-2 rounded-full text-sm ${
                  exam.active
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {exam.active ? 'Start Exam' : 'Inactive'}
              </button>
            </div>
          ))}
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Results</h2>
          {results.map((result) => (
            <div
              key={result.id}
              className="flex justify-between items-center border-b pb-3 mb-3 last:border-none last:pb-0"
            >
              <div>
                <h3 className="text-lg font-medium text-gray-800">{result.subject}</h3>
                <p className="text-sm text-gray-500">
                  Score: {result.score} | Status: {result.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentPanel;

