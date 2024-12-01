import React, { useState } from "react";

const ProctorPanel = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", webcamFeed: "/path/to/video1.mp4", flagged: false },
    { id: 2, name: "Jane Smith", webcamFeed: "/path/to/video2.mp4", flagged: false },
    { id: 3, name: "Sam Wilson", webcamFeed: "/path/to/video3.mp4", flagged: false },
    { id: 4, name: "Emily Davis", webcamFeed: "/path/to/video4.mp4", flagged: false },
  ]);

  const [activityLogs, setActivityLogs] = useState([]);

  const flagSuspiciousActivity = (studentId) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, flagged: true } : student
      )
    );

    const student = students.find((s) => s.id === studentId);
    setActivityLogs((prev) => [
      ...prev,
      `Suspicious activity flagged for ${student.name}`,
    ]);
  };

  const endMonitoring = () => {
    if (window.confirm("Are you sure you want to end monitoring?")) {
      setActivityLogs((prev) => [...prev, "Monitoring session ended."]);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 bg-blue-600 text-white p-5">
        <h1 className="text-2xl font-bold mb-5">Proctor Panel</h1>
        <nav>
          <ul className="space-y-4">
            <li>
              <button className="w-full text-left">Monitor Exams</button>
            </li>
            <li>
              <button
                onClick={endMonitoring}
                className="w-2/3 text-left bg-red-500 text-white px-3 py-2 rounded mt-4"
              >
                End Monitoring
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5 bg-gray-100">
        <header className="mb-5">
          <h2 className="text-2xl font-bold text-blue-600">Ongoing Exams</h2>
        </header>

        {/* Grid View of Student Webcam Feeds */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {students.map((student) => (
            <div
              key={student.id}
              className="p-4 bg-white rounded-lg shadow-lg relative"
            >
              <h3 className="text-lg font-bold mb-2 text-center">{student.name}</h3>
              <video
                src={student.webcamFeed}
                controls
                className="w-full h-40 bg-gray-200 rounded-lg mb-2"
              />
              <div className="flex justify-center">
                <button
                  onClick={() => flagSuspiciousActivity(student.id)}
                  disabled={student.flagged}
                  className={`${
                    student.flagged
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-yellow-500 hover:bg-yellow-600"
                  } text-white px-4 py-2 rounded`}
                >
                  {student.flagged ? "Flagged" : "Flag Suspicious"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Activity Logs */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-blue-600 mb-3">Activity Logs</h3>
          <div className="bg-white p-4 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {activityLogs.length === 0 ? (
              <p className="text-gray-500">No activity yet.</p>
            ) : (
              <ul className="space-y-2">
                {activityLogs.map((log, index) => (
                  <li key={index} className="text-gray-700">
                    {log}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProctorPanel;
