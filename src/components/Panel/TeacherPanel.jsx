import React, { useState } from 'react';

const TeacherPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [tab, setTab] = useState('Manage Exams'); // "Manage Exams" or "View Submissions"
  const [exams, setExams] = useState([]);
  const [newExam, setNewExam] = useState({
    title: '',
    subject: '',
    date: '',
    time: '',
    duration: ''
  });

  const [studentSubmissions, setStudentSubmissions] = useState([
    { id: 1, student: 'Amit', exam: 'Mathematics', score: 85 },
    { id: 2, student: 'Jack', exam: 'Physics', score: 92 },
    { id: 3, student: 'Sonam', exam: 'Chemistry', score: 76 },
    { id: 4, student: 'Mansi', exam: 'Mathematics', score: 85 },
    { id: 5, student: 'Patil', exam: 'Physics', score: 92 },
    { id: 6, student: 'Sam', exam: 'Chemistry', score: 76 }
  ]);

  const loginHandler = (e) => {
    e.preventDefault();
    // Mock login functionality
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  const handleCreateExam = (e) => {
    e.preventDefault();
    setExams([...exams, { id: exams.length + 1, ...newExam }]);
    setNewExam({ title: '', subject: '', date: '', time: '', duration: '' });
  };

  const handleDeleteExam = (id) => {
    setExams(exams.filter((exam) => exam.id !== id));
  };

  if (!isLoggedIn) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
        <div className="border-2 rounded-xl border-indigo-600 p-10 bg-white shadow-lg">
          <form onSubmit={loginHandler} className="flex flex-col items-center space-y-4">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">Teacher Login</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="outline-none bg-transparent border-2 border-indigo-600 py-3 px-5 rounded-full w-full placeholder:text-gray-400"
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="outline-none bg-transparent border-2 border-indigo-600 py-3 px-5 rounded-full w-full placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="mt-4 bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">Teacher Panel</h1>

      {/* Tabs */}
      <div className="flex space-x-6 mb-6">
        <button
          onClick={() => setTab('Manage Exams')}
          className={`py-2 px-4 rounded-full ${
            tab === 'Manage Exams'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
          }`}
        >
          Manage Exams
        </button>
        <button
          onClick={() => setTab('View Submissions')}
          className={`py-2 px-4 rounded-full ${
            tab === 'View Submissions'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
          }`}
        >
          View Submissions
        </button>
      </div>

      {tab === 'Manage Exams' && (
        <div>
          {/* Exam Creation Form */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Create New Exam</h2>
            <form onSubmit={handleCreateExam} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={newExam.title}
                onChange={(e) => setNewExam({ ...newExam, title: e.target.value })}
                required
                className="outline-none bg-transparent border-2 border-indigo-600 py-3 px-5 rounded-full w-full placeholder:text-gray-400"
              />
              <input
                type="text"
                placeholder="Subject"
                value={newExam.subject}
                onChange={(e) => setNewExam({ ...newExam, subject: e.target.value })}
                required
                className="outline-none bg-transparent border-2 border-indigo-600 py-3 px-5 rounded-full w-full placeholder:text-gray-400"
              />
              <input
                type="date"
                value={newExam.date}
                onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
                required
                className="outline-none bg-transparent border-2 border-indigo-600 py-3 px-5 rounded-full w-full placeholder:text-gray-400"
              />
              <input
                type="time"
                value={newExam.time}
                onChange={(e) => setNewExam({ ...newExam, time: e.target.value })}
                required
                className="outline-none bg-transparent border-2 border-indigo-600 py-3 px-5 rounded-full w-full placeholder:text-gray-400"
              />
              <input
                type="text"
                placeholder="Duration (e.g., 1 hour)"
                value={newExam.duration}
                onChange={(e) => setNewExam({ ...newExam, duration: e.target.value })}
                required
                className="outline-none bg-transparent border-2 border-indigo-600 py-3 px-5 rounded-full w-full placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="mt-4 bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700 transition"
              >
                Create Exam
              </button>
            </form>
          </div>

          {/* Manage Exams */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Existing Exams</h2>
            {exams.length === 0 ? (
              <p className="text-gray-500">No exams available. Create a new one!</p>
            ) : (
              <ul>
                {exams.map((exam) => (
                  <li key={exam.id} className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">{exam.title}</h3>
                      <p className="text-sm text-gray-500">
                        {exam.subject} | {exam.date} | {exam.time} | {exam.duration}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteExam(exam.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {tab === 'View Submissions' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Student Submissions</h2>
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Student</th>
                <th className="border border-gray-300 px-4 py-2">Exam</th>
                <th className="border border-gray-300 px-4 py-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {studentSubmissions.map((submission) => (
                <tr key={submission.id}>
                  <td className="border border-gray-300 px-4 py-2">{submission.student}</td>
                  <td className="border border-gray-300 px-4 py-2">{submission.exam}</td>
                  <td className="border border-gray-300 px-4 py-2">{submission.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TeacherPanel;
