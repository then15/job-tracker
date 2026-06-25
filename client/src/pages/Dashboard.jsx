import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editJob, setEditJob] = useState(null)
  const [showEditForm, setShowEditForm] = useState(false)
  const [filter, setFilter] = useState('All')
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    location: '',
    status: 'Applied',
    notes: ''
  })

  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  const filteredJobs = filter === 'All'
    ? jobs
    : jobs.filter(job => job.status === filter)

  const fetchJobs = useCallback(async () => {
    try {
      const response = await axios.get('https://job-tracker-jyss.onrender.com/api/jobs', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setJobs(response.data)
    } catch {
      setError('Failed to fetch jobs!')
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    if (!token) {
      navigate('/')
    } else {
      // eslint-disable-next-line
      fetchJobs()
    }
  }, [token, navigate, fetchJobs])

  const handleAddJob = async (e) => {
    e.preventDefault()
    try {
      await axios.post('https://job-tracker-jyss.onrender.com/api/jobs', newJob, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setShowForm(false)
      setNewJob({ title: '', company: '', location: '', status: 'Applied', notes: '' })
      fetchJobs()
    } catch {
      setError('Failed to add job!')
    }
  }

  const handleEdit = (job) => {
    setEditJob(job)
    setShowEditForm(true)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`https://job-tracker-jyss.onrender.com/api/jobs/${editJob._id}`, editJob, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setShowEditForm(false)
      setEditJob(null)
      fetchJobs()
    } catch {
      setError('Failed to update job!')
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://job-tracker-jyss.onrender.com/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchJobs()
    } catch {
      setError('Failed to delete job!')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied': return 'bg-blue-100 text-blue-600'
      case 'Interview': return 'bg-yellow-100 text-yellow-600'
      case 'Offered': return 'bg-green-100 text-green-600'
      case 'Rejected': return 'bg-red-100 text-red-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div className="min-h-screen"
      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>

      {/* Navbar */}
      <nav className="bg-white bg-opacity-10 backdrop-blur-md text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
         <div className="flex items-center justify-center">
  <svg width="45" height="45" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="45" cy="45" r="45" fill="url(#navBgGrad)"/>
    <rect x="20" y="35" width="50" height="35" rx="6" fill="white" fillOpacity="0.9"/>
    <path d="M33 35 V28 Q33 22 45 22 Q57 22 57 28 V35"
      stroke="white" strokeWidth="4" strokeLinecap="round" fill="none"/>
    <line x1="20" y1="50" x2="70" y2="50" stroke="url(#navBgGrad)" strokeWidth="2"/>
    <circle cx="45" cy="55" r="10" fill="url(#navGreenGrad)"/>
    <path d="M39 55 L43 59 L51 51"
      stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="navBgGrad" x1="0" y1="0" x2="90" y2="90" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#667eea"/>
        <stop offset="100%" stopColor="#764ba2"/>
      </linearGradient>
      <linearGradient id="navGreenGrad" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#4ade80"/>
        <stop offset="100%" stopColor="#16a34a"/>
      </linearGradient>
    </defs>
  </svg>
</div>
          <h1 className="text-xl font-bold">Job Tracker</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white text-sm">👋 Welcome, {user?.name}!</span>
          <button
            onClick={handleLogout}
            className="bg-white text-purple-600 px-4 py-2 rounded-2xl font-semibold text-sm hover:bg-gray-100 transition shadow"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Edit Job Popup */}
      {showEditForm && editJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold mb-6 text-gray-700">✏️ Edit Job</h3>
            <form onSubmit={handleUpdate}>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-gray-600 mb-1 text-sm font-medium">Job Title</label>
                  <input
                    type="text"
                    value={editJob.title}
                    onChange={(e) => setEditJob({...editJob, title: e.target.value})}
                    required
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 text-sm font-medium">Company</label>
                  <input
                    type="text"
                    value={editJob.company}
                    onChange={(e) => setEditJob({...editJob, company: e.target.value})}
                    required
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 text-sm font-medium">Location</label>
                  <input
                    type="text"
                    value={editJob.location}
                    onChange={(e) => setEditJob({...editJob, location: e.target.value})}
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 text-sm font-medium">Status</label>
                  <select
                    value={editJob.status}
                    onChange={(e) => setEditJob({...editJob, status: e.target.value})}
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 bg-gray-50"
                  >
                    <option>Applied</option>
                    <option>Interview</option>
                    <option>Offered</option>
                    <option>Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 text-sm font-medium">Notes</label>
                  <input
                    type="text"
                    value={editJob.notes}
                    onChange={(e) => setEditJob({...editJob, notes: e.target.value})}
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 bg-gray-50"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-green-500 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-green-600 transition shadow-lg text-sm"
                >
                  ✅ Update Job
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditForm(false)}
                  className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-200 transition text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white bg-opacity-20 backdrop-blur-md p-4 rounded-2xl text-center shadow">
            <p className="text-3xl font-bold text-white">{jobs.length}</p>
            <p className="text-white text-opacity-80 text-sm mt-1">Total</p>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-md p-4 rounded-2xl text-center shadow">
            <p className="text-3xl font-bold text-blue-200">
              {jobs.filter(j => j.status === 'Applied').length}
            </p>
            <p className="text-white text-opacity-80 text-sm mt-1">Applied</p>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-md p-4 rounded-2xl text-center shadow">
            <p className="text-3xl font-bold text-yellow-200">
              {jobs.filter(j => j.status === 'Interview').length}
            </p>
            <p className="text-white text-opacity-80 text-sm mt-1">Interview</p>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-md p-4 rounded-2xl text-center shadow">
            <p className="text-3xl font-bold text-green-200">
              {jobs.filter(j => j.status === 'Offered').length}
            </p>
            <p className="text-white text-opacity-80 text-sm mt-1">Offered</p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {['All', 'Applied', 'Interview', 'Offered', 'Rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-2xl text-sm font-medium transition duration-200 shadow ${
                filter === status
                  ? 'bg-green-500 text-white'
                  : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Add Job Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">My Applications</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-500 text-white px-5 py-2 rounded-2xl font-semibold hover:bg-green-600 transition shadow-lg text-sm"
          >
            + Add New Job
          </button>
        </div>

        {/* Add Job Form */}
        {showForm && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
            <h3 className="text-xl font-bold mb-6 text-gray-700">➕ Add New Job</h3>
            <form onSubmit={handleAddJob}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 mb-1 text-sm font-medium">Job Title</label>
                  <input
                    type="text"
                    placeholder="Software Engineer"
                    value={newJob.title}
                    onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                    required
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 text-sm font-medium">Company</label>
                  <input
                    type="text"
                    placeholder="Google"
                    value={newJob.company}
                    onChange={(e) => setNewJob({...newJob, company: e.target.value})}
                    required
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 text-sm font-medium">Location</label>
                  <input
                    type="text"
                    placeholder="Chennai"
                    value={newJob.location}
                    onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 text-sm font-medium">Status</label>
                  <select
                    value={newJob.status}
                    onChange={(e) => setNewJob({...newJob, status: e.target.value})}
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 bg-gray-50"
                  >
                    <option>Applied</option>
                    <option>Interview</option>
                    <option>Offered</option>
                    <option>Rejected</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-600 mb-1 text-sm font-medium">Notes</label>
                  <input
                    type="text"
                    placeholder="Any notes..."
                    value={newJob.notes}
                    onChange={(e) => setNewJob({...newJob, notes: e.target.value})}
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 bg-gray-50"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-green-500 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-green-600 transition shadow-lg text-sm"
                >
                  🚀 Add Job
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-200 transition text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-2xl mb-4 text-sm flex items-center gap-2">
            <span>❌</span>
            <span>{error}</span>
          </div>
        )}

        {/* Jobs List */}
        {loading ? (
          <div className="text-center text-white py-8">
            <p className="text-lg">⏳ Loading jobs...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-2xl p-10 text-center">
            <p className="text-5xl mb-4">📭</p>
            <p className="text-gray-500 text-lg font-medium">No jobs found!</p>
            <p className="text-gray-400 text-sm mt-1">Click "+ Add New Job" to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div key={job._id} className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{job.title}</h3>
                    <p className="text-gray-500 text-sm mt-1">🏢 {job.company}</p>
                    <p className="text-gray-500 text-sm">📍 {job.location}</p>
                    <p className="text-gray-400 text-xs mt-1">
                      📅 Applied on: {new Date(job.appliedDate).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    {job.notes && (
                      <p className="text-gray-400 text-xs mt-1">📝 {job.notes}</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(job)}
                        className="bg-blue-50 text-blue-500 hover:bg-blue-100 px-3 py-1 rounded-xl text-xs font-medium transition"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="bg-red-50 text-red-500 hover:bg-red-100 px-3 py-1 rounded-xl text-xs font-medium transition"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-white text-opacity-50 text-xs mt-8 pb-4">
          © 2026 Job Tracker. All rights reserved.
        </p>

      </div>
    </div>
  )
}

export default Dashboard