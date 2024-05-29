// Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    // Store username and password in local storage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    navigate('/login'); // Redirect to login page after registration
  };

  return (
    <div class="bg-gradient-to-br from-purple-700 to-pink-500 min-h-screen flex flex-col justify-center items-center">
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-md">
        <h1 class="text-4xl font-bold text-center text-purple-700 mb-8">Welcome to SpArts</h1>
        <h3 class="text-2xl text-center text-black-700 mb-8">Register</h3>
        <form class="space-y-6">
    <div>
    <label class="block text-gray-700 font-bold mb-2" for="email">
                    Staff Name
                </label>
      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      </div> <div>
                <label class="block text-gray-700 font-bold mb-2" for="password">
                    Password
                </label>
      <input
        type="password"
        placeholder="Enter yourPassword"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
      <button class="w-full mt-6 bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-lg" onClick={handleRegister}>Register</button>
    </div>
    </div>
    </form>
    </div>
</div>
  );
};

export default Register;
