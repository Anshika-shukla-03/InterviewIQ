import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ServerUrl } from '../App'
import { IoSparkles } from "react-icons/io5"
import { BsBriefcase } from "react-icons/bs"

function CreateInterview() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        jobTitle: '',
        jobDescription: '',
        experience: '',
        resumeText: '' // optional
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await axios.post(ServerUrl + '/api/ai/generate', formData, { withCredentials: true })
            if (result.data.interviewId) {
                navigate(`/session/${result.data.interviewId}`)
            }
        } catch (error) {
            console.error(error)
            alert(error.response?.data?.message || 'Failed to generate interview')
            setLoading(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 w-full">
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Interview</h1>
                <p className="text-gray-500">Provide details about the job you're applying for, and our AI will generate tailored questions.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm max-w-2xl mx-auto">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Job Title / Position</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <BsBriefcase className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="jobTitle"
                                value={formData.jobTitle}
                                onChange={handleChange}
                                placeholder="e.g. Frontend Developer"
                                className="pl-10 w-full rounded-xl border border-gray-300 py-3 px-4 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Job Description or Technologies</label>
                        <textarea
                            name="jobDescription"
                            value={formData.jobDescription}
                            onChange={handleChange}
                            placeholder="e.g. Required skills: React, Node.js, MongoDB... (Paste full job description for better results)"
                            className="w-full rounded-xl border border-gray-300 py-3 px-4 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all h-32"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                        <select
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 py-3 px-4 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                            required
                        >
                            <option value="" disabled>Select experience level</option>
                            <option value="Entry Level (0-2 years)">Entry Level (0-2 years)</option>
                            <option value="Mid Level (2-5 years)">Mid Level (2-5 years)</option>
                            <option value="Senior Level (5+ years)">Senior Level (5+ years)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Resume Copy (Optional)</label>
                        <textarea
                            name="resumeText"
                            value={formData.resumeText}
                            onChange={handleChange}
                            placeholder="Paste your resume content to personalize the interview further."
                            className="w-full rounded-xl border border-gray-300 py-3 px-4 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all h-24 text-sm"
                        ></textarea>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-black text-white rounded-full py-3.5 font-medium hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                    Generating AI Interview...
                                </>
                            ) : (
                                <>
                                    <IoSparkles size={20} />
                                    Start Interview (-10 Credits)
                                </>
                            )}
                        </button>
                        <p className="text-center text-xs text-gray-500 mt-3">By starting, 10 credits will be deducted from your account.</p>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateInterview
