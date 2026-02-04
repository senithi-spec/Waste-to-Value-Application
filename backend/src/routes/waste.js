import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authMiddleware } from '../middleware/auth.js'

const router = express.Router()
const prisma = new PrismaClient()

// Get all listings
router.get('/listings', authMiddleware, async (req, res) => {
    try {
        const listings = await prisma.wasteListing.findMany({
            include: {
                user: {
                    select: { id: true, email: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        })
        res.json(listings)
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch listings', error: error.message })
    }
})

// Create listing
router.post('/create', authMiddleware, async (req, res) => {
    try {
        const { wasteType, quantity, unit, location, description } = req.body

        const listing = await prisma.wasteListing.create({
            data: {
                wasteType,
                quantity: parseFloat(quantity),
                unit,
                location,
                description,
                userId: req.userId
            },
            include: {
                user: {
                    select: { id: true, email: true }
                }
            }
        })

        res.json(listing)
    } catch (error) {
        res.status(500).json({ message: 'Failed to create listing', error: error.message })
    }
})

// Request waste
router.post('/:listingId/request', authMiddleware, async (req, res) => {
    try {
        const { listingId } = req.params

        const listing = await prisma.wasteListing.findUnique({ where: { id: listingId } })
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' })
        }

        // Check if already requested
        const existingRequest = await prisma.wasteRequest.findFirst({
            where: {
                listingId,
                senderId: req.userId
            }
        })

        if (existingRequest) {
            return res.status(400).json({ message: 'You have already requested this listing' })
        }

        const wasteRequest = await prisma.wasteRequest.create({
            data: {
                listingId,
                senderId: req.userId,
                receiverId: listing.userId
            }
        })

        res.json(wasteRequest)
    } catch (error) {
        res.status(500).json({ message: 'Failed to create request', error: error.message })
    }
})

// Get user's listings
router.get('/my-listings', authMiddleware, async (req, res) => {
    try {
        const listings = await prisma.wasteListing.findMany({
            where: { userId: req.userId },
            include: {
                requests: {
                    include: {
                        sender: {
                            select: { id: true, email: true }
                        }
                    }
                }
            }
        })
        res.json(listings)
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch listings', error: error.message })
    }
})

export default router
