import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import './App.css'

function App() {
    const [user, setUser] = useState(null)
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const newSocket = io('http://localhost:5000', {
                auth: { token }
            })
            setSocket(newSocket)
            return () => newSocket.close()
        }
    }, [])

    const handleLogin = (userData, token) => {
        setUser(userData)
        localStorage.setItem('token', token)
        const newSocket = io('http://localhost:5000', {
            auth: { token }
        })
        setSocket(newSocket)
    }

    const handleLogout = () => {
        setUser(null)
        localStorage.removeItem('token')
        socket?.close()
        setSocket(null)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {user ? (
                <Dashboard user={user} socket={socket} onLogout={handleLogout} />
            ) : (
                <Login onLogin={handleLogin} />
            )}
        </div>
    )
}

export default App
