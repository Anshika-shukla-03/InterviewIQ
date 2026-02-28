import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ServerUrl } from '../App'
import { BsMicFill, BsStopCircle, BsRobot } from "react-icons/bs"
import { IoSend } from "react-icons/io5"

function InterviewSession() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [interview, setInterview] = useState(null)
    const [loading, setLoading] = useState(true)
    const [currentIdx, setCurrentIdx] = useState(0)
    const [answer, setAnswer] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isCompleting, setIsCompleting] = useState(false)

    useEffect(() => {
        const fetchInterview = async () => {
            try {
                const res = await axios.get(ServerUrl + `/api/user/interview/${id}`, { withCredentials: true })
                setInterview(res.data)
                // Find first uncompleted question
                const firstUnanswered = res.data.questions.findIndex(q => !q.completed)
                if (firstUnanswered !== -1) {
                    setCurrentIdx(firstUnanswered)
                } else if (res.data.status !== 'Completed') {
                    // all answered but not completed
                    handleCompleteInterview(res.data._id)
                } else {
                    // already completed
                    navigate(`/result/${res.data._id}`)
                }
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchInterview()
    }, [id, navigate])

    const handleCompleteInterview = async (interviewId) => {
        setIsCompleting(true)
        try {
            await axios.post(ServerUrl + '/api/ai/complete', { interviewId }, { withCredentials: true })
            navigate(`/result/${interviewId}`)
        } catch (err) {
            console.error(err)
            setIsCompleting(false)
        }
    }

    const handleSubmitAnswer = async () => {
        if (!answer.trim()) return
        setIsSubmitting(true)

        const questionId = interview.questions[currentIdx]._id

        try {
            await axios.post(ServerUrl + '/api/ai/evaluate', {
                interviewId: id,
                questionId,
                userAnswer: answer
            }, { withCredentials: true })

            // Update local state to mark as complete
            const updatedInterview = { ...interview }
            updatedInterview.questions[currentIdx].completed = true
            updatedInterview.questions[currentIdx].userAnswer = answer
            setInterview(updatedInterview)
            setAnswer('')

            if (currentIdx < interview.questions.length - 1) {
                setCurrentIdx(currentIdx + 1)
            } else {
                handleCompleteInterview(id)
            }
        } catch (err) {
            console.error(err)
            alert("Failed to submit answer")
        } finally {
            setIsSubmitting(false)
        }
    }

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

    const currentQuestion = interview.questions[currentIdx]

    return (
        <div className="max-w-5xl mx-auto px-6 py-8 w-full">
            {/* Header Info */}
            <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <BsRobot className="text-blue-600" /> Interview Session
                    </h2>
                    <p className="text-sm text-gray-500">{interview.jobTitle} • {interview.experience}</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="text-sm font-medium text-gray-600">
                        Progress: {currentIdx + 1} / {interview.questions.length}
                    </div>
                    <div className="w-32 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="bg-blue-600 h-full transition-all duration-300"
                            style={{ width: `${((currentIdx) / interview.questions.length) * 100}%` }}>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left: AI Question */}
                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-md">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                            <BsRobot size={22} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">AI Interviewer</h3>
                            <p className="text-xs text-blue-600 font-medium tracking-wide uppercase">Question {currentIdx + 1}</p>
                        </div>
                    </div>

                    <p className="text-lg text-gray-800 leading-relaxed font-medium">
                        {currentQuestion?.questionText}
                    </p>
                </div>

                {/* Right: User Answer */}
                <div className="flex flex-col">
                    <div className="flex-1 bg-white rounded-3xl border border-gray-200 shadow-md overflow-hidden flex flex-col">
                        <div className="bg-gray-50 border-b border-gray-100 p-4 flex justify-between items-center">
                            <h3 className="font-semibold text-gray-700">Your Answer</h3>
                            <div className="flex gap-2">
                                {/* Voice future implementation placeholder */}
                                <button className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-gray-100">
                                    <BsMicFill size={18} />
                                </button>
                            </div>
                        </div>
                        <textarea
                            className="flex-1 w-full p-6 outline-none bg-transparent resize-none leading-relaxed text-gray-700 placeholder:text-gray-300"
                            placeholder="Type your answer here..."
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            disabled={isSubmitting || isCompleting}
                        ></textarea>

                        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                            <button
                                onClick={handleSubmitAnswer}
                                disabled={!answer.trim() || isSubmitting || isCompleting}
                                className="bg-black text-white px-6 py-2.5 rounded-full font-medium flex items-center gap-2 hover:bg-gray-800 transition-all disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                        Evaluating...
                                    </>
                                ) : isCompleting ? (
                                    <>Finishing...</>
                                ) : (
                                    <>
                                        <IoSend /> Submit & Next
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InterviewSession
