# 05 - Component Diagram

High-level components:
- Frontend (Vite + static assets served by nginx)
- Backend (Express API, Socket.io)
- Database (SQLite in dev; PostgreSQL for production)
- External services (Email/SMS, Payment gateways - future)

```mermaid
graph LR
  Frontend -->|REST / Sockets| Backend
  Backend --> Database
  Backend --> External[Email/SMS/Payments (future)]
```