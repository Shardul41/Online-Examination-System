import React, { useState } from "react";

// Login Component
const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student"); // Default role

  const submitHandler = (e) => {
    e.preventDefault();
    handleLogin(email, password, role); // Pass login details to the parent
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-blue-100">
      <div className="border-2 rounded-xl border-emerald-600 p-10 bg-white">
        <form
          onSubmit={submitHandler}
          className="flex flex-col items-center justify-center space-y-4"
        >
          <h2 className="text-2xl font-bold text-emerald-600 mb-4">Login</h2>

          {/* Role Selection */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border-2 border-emerald-600 py-3 px-5 rounded-full  placeholder:bg-white"
          >
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Admin">Admin</option>
            <option value="Proctor">Proctor</option>
          </select>

          {/* Email Input */}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className=" border-2 border-emerald-600 py-3 text-xl px-5 rounded-full placeholder:bg-white w-full"
            type="email"
            placeholder="Enter your email"
          />

          {/* Password Input */}
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-2 border-emerald-600 py-3 text-xl px-5 rounded-full placeholder:text-gray-500 w-full"
            type="password"
            placeholder="Enter your password"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-5 border-none outline-none bg-emerald-600 text-white py-3 px-5 rounded-full text-xl hover:bg-emerald-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
