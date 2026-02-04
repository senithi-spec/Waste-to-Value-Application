import { useState } from 'react'
import axios from 'axios'

export default function Login({ onLogin }) {
    const [isRegister, setIsRegister] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('generator')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const base = import.meta.env.VITE_API_URL ?? ''
            const url = isRegister ? `${base}/auth/register` : `${base}/auth/login`
            const payload = isRegister ? { email, password, role } : { email, password }
            const response = await axios.post(url, payload)
            onLogin(response.data.user, response.data.token)
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-500 to-blue-600">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    Waste-to-Value
                </h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="your@email.com"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="••••••••"
                        />
                    </div>

                    {isRegister && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Role
                            </label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="generator">Waste Generator</option>
                                <option value="collector">Collector</option>
                                <option value="recycler">Recycler</option>
                            </select>
                        </div>
                    )}

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600 transition disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : isRegister ? 'Register' : 'Login'}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <button
                        onClick={() => {
                            setIsRegister(!isRegister)
                            setError('')
                        }}
                        className="text-green-600 hover:underline text-sm"
                    >
                        {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
                    </button>
                </div>
            </div>
        </div>
    )
}
