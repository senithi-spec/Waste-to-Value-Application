import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

import authRoutes from './routes/auth.js'
import wasteRoutes from './routes/waste.js'

dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
})

const prisma = new PrismaClient()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/auth', authRoutes)
app.use('/waste', wasteRoutes)

// Socket.io
io.on('connection', (socket) => {
    const token = socket.handshake.auth.token

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            socket.userId = decoded.userId
            console.log(`User ${decoded.userId} connected`)
        } catch (error) {
            socket.disconnect()
        }
    }

    socket.on('waste:create', (data) => {
        io.emit('waste:created', data)
    })

    socket.on('waste:update', (data) => {
        io.emit('waste:updated', data)
    })

    socket.on('request:status', (data) => {
        io.emit('request:updated', data)
    })

    socket.on('disconnect', () => {
        console.log(`User ${socket.userId} disconnected`)
    })
})

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'Server is running' })
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
