import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ServerUrl } from '../App'
import { IoAddCircle, IoTimeOutline, IoCheckmarkCircleOutline } from "react-icons/io5"

function Dashboard() {
    const { userData } = useSelector(state => state.user)
    const navigate = useNavigate()
    const [interviews, setInterviews] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!userData) {
            navigate('/auth')
            return
        }
        const fetchInterviews = async () => {
            try {
                const result = await axios.get(ServerUrl + '/api/user/interviews', { withCredentials: true })
                setInterviews(result.data.interviews || [])
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchInterviews()
    }, [userData, navigate])

    if (!userData) return null

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Welcome back, {userData.name.split(' ')[0]}!</h1>
                    <p className="text-gray-500 mt-2">Manage your mock interviews and track your progress.</p>
                </div>
                <button
                    onClick={() => navigate('/create-interview')}
                    className="bg-black text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
                >
                    <IoAddCircle size={24} />
                    Start New Interview
                </button>
            </div>

            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <IoTimeOutline size={24} className="text-gray-500" />
                Recent Interviews
            </h2>

            {loading ? (
                <div className="w-full flex justify-center py-20">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
                </div>
            ) : interviews.length === 0 ? (
                <div className="bg-gray-50 flex flex-col items-center justify-center py-16 rounded-3xl border border-gray-100 text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                        <IoAddCircle size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">No interviews yet</h3>
                    <p className="text-gray-500 max-w-sm mb-6">Create your first AI-powered mock interview to start practicing.</p>
                    <button onClick={() => navigate('/create-interview')} className="text-black font-medium border border-black rounded-full px-6 py-2 hover:bg-black hover:text-white transition-colors">Create Interview</button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {interviews.map((interview) => (
                        <div key={interview._id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(interview.status === 'Completed' ? `/result/${interview._id}` : `/session/${interview._id}`)}>
                            <div className="flex justify-between items-start mb-4">
                                <div className={`px-2.5 py-1 text-xs font-medium rounded-full ${interview.status === 'Completed' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                                    {interview.status}
                                </div>
                                {interview.status === 'Completed' && (
                                    <div className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                                        <IoCheckmarkCircleOutline className="text-green-500" size={18} />
                                        {interview.overallScore}%
                                    </div>
                                )}
                            </div>
                            <h3 className="font-bold text-lg mb-1 line-clamp-1">{interview.jobTitle}</h3>
                            <p className="text-sm text-gray-500 mb-4">{interview.experience} Experience</p>
                            <div className="text-xs text-gray-400">
                                {new Date(interview.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Dashboard
