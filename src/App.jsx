import React, { useState } from "react";
import Login from "./components/Auth/LoginPage";
import StudentPanel from "./components/Panel/StudentPanel";
import TeacherPanel from "./components/Panel/TeacherPanel";
import AdminPanel from "./components/Panel/AdminPanel";
import ProctorPanel from "./components/Panel/ProctorPanel";




const App = () => {
  const [currentPanel, setCurrentPanel] = useState(null);

  const handleLogin = (email, password, role) => {
    console.log("Login Details:");
    console.log(`Role: ${role}`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);

    // Determine which panel to open based on role
    switch (role) {
      case "Student":
        setCurrentPanel (<StudentPanel/>);
        break;
      case "Teacher":
        setCurrentPanel(<TeacherPanel />);
        break;
      case "Admin":
        setCurrentPanel(<AdminPanel/>);
        break;
      case "Proctor":
        setCurrentPanel(<ProctorPanel />);
        break;
      default:
        alert("Invalid role selected!");
    }
  };

  return (
    <div className="App">
      {currentPanel ? currentPanel : <Login handleLogin={handleLogin} />}
    </div>
  );
};

export default App;
