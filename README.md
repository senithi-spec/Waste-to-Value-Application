# Waste-to-Value Platform

A comprehensive web-based system that enables tracking, trading, and conversion of waste into reusable or valuable resources.

## Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js, Socket.io
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT, bcrypt
- **DevOps**: Docker, Docker Compose

## Project Structure

```
WasteToValue/
├── frontend/               # React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── utils/         # Utility functions
│   │   └── App.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── Dockerfile
├── backend/               # Express API
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Express middleware
│   │   └── index.js
│   ├── prisma/
│   │   ├── schema.prisma  # Database schema
│   │   └── seed.js        # Seed data
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## Features

### User Management
- User registration and login with JWT authentication
- Role-based access control (Generator, Collector, Recycler, Admin)
- Password encryption with bcrypt

### Waste Listing Management
- Create, edit, and delete waste listings
- Search and filter waste by type, location, quantity
- Real-time updates using Socket.io

### Request & Matching
- Request waste from available listings
- Approve/reject requests
- Real-time notifications

### Real-Time Communication
- Socket.io for live updates
- Instant notifications for requests and status changes
- Real-time waste listing updates

## Getting Started

### Prerequisites
- Docker and Docker Compose installed
- Node.js 18+ (if running locally without Docker)

### Using Docker Compose (Recommended)

1. Clone the repository:
```bash
cd WasteToValue
```

2. Create environment files:
```bash
# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env
```

3. Build and run with Docker Compose:
```bash
# For Docker Desktop (Docker Compose v2 - recommended)
docker compose up --build

# OR if you have Docker Compose v1 installed
docker-compose up --build
```

4. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

### Running Locally

#### Backend Setup
```bash
cd backend
npm install
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Default Test Credentials

The seed script creates the following test users:

| Email | Password | Role |
|-------|----------|------|
| generator@example.com | password123 | Waste Generator |
| collector@example.com | password123 | Collector |
| recycler@example.com | password123 | Recycler |

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

### Waste Listings
- `GET /waste/listings` - Get all waste listings
- `POST /waste/create` - Create a new waste listing
- `GET /waste/my-listings` - Get user's listings
- `POST /waste/:listingId/request` - Request a waste listing

## Database Schema

### User
- id, email, password, role, approved, createdAt, updatedAt

### WasteListing
- id, wasteType, quantity, unit, location, description, status, userId, createdAt, updatedAt

### WasteRequest
- id, listingId, senderId, receiverId, status, createdAt, updatedAt

### Notification
- id, message, type, read, userId, createdAt

## Environment Variables

### Backend (.env)
```
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="your-secret-key"
FRONTEND_URL="http://localhost:5173"
NODE_ENV="development"
PORT=5000
```

### Frontend (.env)
```
VITE_API_URL="http://localhost:5000"
```

## Development

# Docker Compose v2 (integrated with Docker Desktop)
docker compose up

# OR Docker Compose v1 (standalone)
### Running in Development Mode

With Docker Compose:
```bash
docker-compose up
```

The backend will run with nodemon for auto-reload.
The frontend will run with Vite dev server with hot reload.

### Database Migrations

```bash
cd backend
npx prisma migrate dev --name migration_name
```

### Seed Database

```bash
cd backend
npm run seed
```

## Building for Production

```bash
# Docker Compose v2
docker compose build --no-cache

# OR Docker Compose v1
docker-compose build --no-cache
```

## Deployment

1. Update environment variables in `.env` files for production
2. Use a production-grade database (PostgreSQL recommended)
3. Update Docker images with proper security practices
4. Set up proper CORS and security headers
5. Configure SSL/TLS certificates

## Future Enhancements

- AI-based waste matching algorithm
- Payment gateway integration
- Mobile application
- Blockchain-based waste tracking
- Advanced analytics dashboard
- Environmental impact metrics
- SMS/Email notifications

## License

MIT License

## Support

For issues and feature requests, please contact the development team.
