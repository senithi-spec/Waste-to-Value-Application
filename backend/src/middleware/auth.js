import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
        return res.status(401).json({ message: 'No token provided' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.userId
        req.userRole = decoded.role
        next()
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' })
    }
}
