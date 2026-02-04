# 03 - Product Backlog

This initial backlog is derived from the codebase and README. Rank and refine with stakeholders.

## Epics & User Stories

1. User Management
- As a user, I want to register and log in so I can manage listings. (priority: high)
- As an admin, I want to approve users if required. (priority: medium)

2. Waste Listings
- As a generator, I want to create a waste listing with type, quantity, location and description. (high)
- As a collector, I want to search and filter listings by type/location. (high)
- As any user, I want to view my listings and requests. (medium)

3. Requests & Approval
- As a collector, I want to request a listing and notify the listing owner. (high)
- As a generator, I want to approve/reject requests. (high)

4. Real-time updates & Notifications
- As a user, I want to get real-time updates when a request changes status. (high)

5. Infrastructure & DevOps
- Add Docker Compose, build images, and provide migration and seed scripts. (high)
- Add tests and CI (medium)

6. Future enhancements
- AI-based matching, payments, mobile app, analytics (low)

## Acceptance Criteria
- API endpoints documented and functional
- Frontend user flows complete for core actions (register/login/create/list/request/approve)
- Database migrations and seed data available for dev