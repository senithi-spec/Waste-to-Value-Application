import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
    // Create sample users
    const user1 = await prisma.user.create({
        data: {
            email: 'generator@example.com',
            password: await bcrypt.hash('password123', 10),
            role: 'generator',
            approved: true
        }
    })

    const user2 = await prisma.user.create({
        data: {
            email: 'collector@example.com',
            password: await bcrypt.hash('password123', 10),
            role: 'collector',
            approved: true
        }
    })

    const user3 = await prisma.user.create({
        data: {
            email: 'recycler@example.com',
            password: await bcrypt.hash('password123', 10),
            role: 'recycler',
            approved: true
        }
    })

    // Create sample waste listings
    await prisma.wasteListing.create({
        data: {
            wasteType: 'Plastic Bottles',
            quantity: 100,
            unit: 'pcs',
            location: 'New York, NY',
            description: 'Used plastic bottles ready for recycling',
            userId: user1.id
        }
    })

    await prisma.wasteListing.create({
        data: {
            wasteType: 'Metal Scraps',
            quantity: 500,
            unit: 'kg',
            location: 'Los Angeles, CA',
            description: 'Industrial metal scraps',
            userId: user1.id
        }
    })

    console.log('Seed data created successfully')
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
