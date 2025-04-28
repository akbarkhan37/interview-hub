import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy check - you can replace with API later
    if (formData.username === 'admin' && formData.password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <input 
          type="text" 
          name="username" 
          placeholder="Username" 
          value={formData.username}
          onChange={handleChange}
          className="border p-2 w-full mb-4"
          required
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password}
          onChange={handleChange}
          className="border p-2 w-full mb-4"
          required
        />
        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
