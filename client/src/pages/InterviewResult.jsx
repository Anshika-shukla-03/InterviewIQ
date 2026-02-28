import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ServerUrl } from '../App'
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs"
import { IoArrowBack, IoMedalOutline } from "react-icons/io5"

function InterviewResult() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [interview, setInterview] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchInterview = async () => {
            try {
                const res = await axios.get(ServerUrl + `/api/user/interview/${id}`, { withCredentials: true })
                setInterview(res.data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchInterview()
    }, [id])

    if (loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
        )
    }

    if (!interview) {
        return <div className="p-10 text-center">Interview not found.</div>
    }

    return (
        <div className="max-w-5xl mx-auto px-6 py-10 w-full">
            <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors mb-6 font-medium"
            >
                <IoArrowBack size={20} /> Back to Dashboard
            </button>

            {/* Hero Section */}
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-sm mb-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Results</h1>
                    <p className="text-gray-500 text-lg">{interview.jobTitle} • {interview.experience}</p>
                    <div className="mt-4 inline-block bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold border border-green-200">
                        Completed on {new Date(interview.updatedAt).toLocaleDateString()}
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <div className="relative flex items-center justify-center w-32 h-32 bg-gray-50 rounded-full border-8 border-gray-100 mb-2">
                        <IoMedalOutline size={40} className="absolute text-yellow-500 opacity-20 -top-2 right-0" />
                        <span className="text-4xl font-extrabold text-blue-600">{interview.overallScore}%</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Overall Score</span>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Feedback</h2>

            <div className="space-y-6">
                {interview.questions.map((q, idx) => (
                    <div key={q._id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="bg-gray-50 p-5 w-full flex items-start gap-4 border-b border-gray-100">
                            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold flex-shrink-0">
                                {idx + 1}
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-lg leading-snug">{q.questionText}</h3>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="mb-6">
                                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Your Answer</h4>
                                <p className="text-gray-700 bg-gray-50 p-4 rounded-xl text-md leading-relaxed">
                                    {q.userAnswer ? q.userAnswer : <span className="italic text-gray-400">No answer provided.</span>}
                                </p>
                            </div>

                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h4 className="text-sm font-bold text-blue-600 uppercase tracking-wider">AI Feedback</h4>
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${q.score >= 7 ? 'bg-green-100 text-green-700' : q.score >= 4 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                                        Score: {q.score}/10
                                    </span>
                                </div>
                                <p className="text-gray-800 bg-blue-50 border border-blue-100 p-4 rounded-xl text-md leading-relaxed">
                                    {q.feedback}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default InterviewResult
