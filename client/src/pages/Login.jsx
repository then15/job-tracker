import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await axios.post(
        'https://job-tracker-jyss.onrender.com/api/auth/login',
        { email, password }
      )
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>

      {/* Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md mx-4">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mx-auto mb-4">
  <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    
    {/* Outer Circle */}
    <circle cx="45" cy="45" r="45" fill="url(#bgGrad)"/>
    
    {/* Briefcase Body */}
    <rect x="20" y="35" width="50" height="35" rx="6" fill="white" fillOpacity="0.9"/>
    
    {/* Briefcase Handle */}
    <path d="M33 35 V28 Q33 22 45 22 Q57 22 57 28 V35" 
      stroke="white" strokeWidth="4" strokeLinecap="round" fill="none"/>
    
    {/* Briefcase Middle Line */}
    <line x1="20" y1="50" x2="70" y2="50" stroke="url(#bgGrad)" strokeWidth="2"/>
    
    {/* Checkmark */}
    <circle cx="45" cy="55" r="10" fill="url(#greenGrad)"/>
    <path d="M39 55 L43 59 L51 51" 
      stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>

    {/* Shine effect */}
    <circle cx="30" cy="30" r="8" fill="white" fillOpacity="0.1"/>

    {/* Gradient Definitions */}
    <defs>
      <linearGradient id="bgGrad" x1="0" y1="0" x2="90" y2="90" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#667eea"/>
        <stop offset="100%" stopColor="#764ba2"/>
      </linearGradient>
      <linearGradient id="greenGrad" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#4ade80"/>
        <stop offset="100%" stopColor="#16a34a"/>
      </linearGradient>
    </defs>
  </svg>
</div>
          <h1 className="text-3xl font-bold text-gray-800">Job Tracker</h1>
          <p className="text-gray-400 mt-2 text-sm">Sign in to your account</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl mb-5 text-sm flex items-center gap-2">
            <span>❌</span>
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin}>

          {/* Email Field */}
          <div className="mb-5">
            <label className="block text-gray-600 font-medium mb-2 text-sm">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-gray-400 text-sm">📧</span>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition bg-gray-50"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-7">
            <label className="block text-gray-600 font-medium mb-2 text-sm">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-gray-400 text-sm">🔒</span>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition bg-gray-50"
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-3 rounded-2xl font-semibold hover:bg-green-600 transition duration-200 shadow-lg hover:shadow-xl text-sm"
          >
            {loading ? '⏳ Signing in...' : '🚀 Sign In'}
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-100"></div>
          <span className="text-gray-300 text-xs">OR</span>
          <div className="flex-1 h-px bg-gray-100"></div>
        </div>

        {/* Register Link */}
        <p className="text-center text-gray-400 text-sm">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-green-500 font-semibold hover:underline"
          >
            Create Account
          </Link>
        </p>

        {/* Footer */}
        <p className="text-center text-gray-300 text-xs mt-6">
          © 2026 Job Tracker. All rights reserved.
        </p>

      </div>
    </div>
  )
}

export default Login