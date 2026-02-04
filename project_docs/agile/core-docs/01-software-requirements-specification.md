# 01 - Software Requirements Specification (SRS)

## Purpose
Provide a concise SRS for the Waste-to-Value platform: tracking, trading, and conversion of waste into reusable/value materials.

## Scope
- Web platform supporting user registration and role-based access (generator, collector, recycler, admin).
- Create, browse, filter, request and match waste listings.
- Real-time updates and notifications (Socket.io).
- Lightweight database (SQLite via Prisma) for prototyping; production should use PostgreSQL or managed DB.

## Functional Requirements
- User registration and login with JWT authentication
- Role-based access control
- Create / edit / delete waste listings
- Search & filter listings by type, location, quantity
- Request waste listings and approval workflow
- Real-time notifications and listing updates via Socket.io
- User notifications history

## Non-Functional Requirements
- Secure password storage (bcrypt)
- API should support CORS and be documented
- Simple deploy via Docker / docker-compose
- Reasonable performance for small-to-medium datasets; scale via DB upgrade

## Constraints
- Current prototype uses SQLite (file-based); migrations applied via Prisma
- Authentication uses JWT with a secret stored in `.env`

## Assumptions
- Users will be trusted to accurately list waste quantities
- First releases focus on core workflows and reliability over advanced analytics