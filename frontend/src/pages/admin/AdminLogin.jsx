import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Page reload မဖြစ်အောင် တားခြင်း
    setError('');
    setLoading(true);

    try {
      // Backend API သို့ Login Request ပို့ခြင်း
      const res = await axios.post('http://localhost:4000/api/admin/login', {
        email,
        password,
      });

      // Login အောင်မြင်ပါက Token သို့မဟုတ် Admin Data ကို localStorage ထဲသိမ်းပါ
      if (res.data.token) {
        localStorage.setItem('adminToken', res.data.token);
      }

      // Admin Dashboard သို့ သွားမည်
      navigate('/admin/dashboard');
    } catch (err) {
      // Error တက်ပါက Message ပြပေးမည်
      setError(
        err.response?.data?.message || 'Login လုပ်ဆောင်မှု မအောင်မြင်ပါ။ ပြန်လည် ကြိုးစားပါ။'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Admin Login
        </h1>

        {/* Error Message ပြရန် */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter email..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter password..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition duration-200 shadow-md disabled:bg-blue-300"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;