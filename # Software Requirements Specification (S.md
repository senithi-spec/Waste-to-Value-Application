# Software Requirements Specification (SRS)

## Project Name

**Waste-to-Value Platform**

## Document Version

1.0

## Date

February 2026

## Status

Draft – Ready for Development (Copilot-friendly)

---

## 1. Introduction

### 1.1 Purpose

This document defines the functional and non-functional requirements for the **Waste-to-Value Platform**, a web-based system that enables tracking, trading, and conversion of waste into reusable or valuable resources. The SRS is structured to be directly usable with **VS Code + GitHub Copilot** for system generation.

### 1.2 Scope

The platform connects **waste generators**, **collectors**, and **recyclers/processors** through a real-time, scalable system. It supports waste listing, request handling, live status updates, analytics, and secure transactions.

### 1.3 Intended Audience

* Software Developers
* System Architects
* Product Owners
* QA Engineers

### 1.4 Technology Stack

| Layer          | Technology                     |
| -------------- | ------------------------------ |
| Frontend       | React 18, Vite, Tailwind CSS   |
| Backend        | Node.js, Express.js, Socket.io |
| Database       | SQLite with Prisma ORM         |
| Authentication | JWT, bcrypt                    |
| DevOps         | Docker, Docker Compose         |

---

## 2. Overall Description

### 2.1 Product Perspective

The system is a modular, containerized web application deployable on any machine using Docker. It follows a client-server architecture with real-time communication.

### 2.2 User Classes

| User Type       | Description                          |
| --------------- | ------------------------------------ |
| Admin           | Manages users, categories, analytics |
| Waste Generator | Lists waste materials                |
| Collector       | Requests and collects waste          |
| Recycler        | Converts waste into value            |

### 2.3 Operating Environment

* Web Browser (Chrome, Firefox, Edge)
* Docker-supported OS (Windows, macOS, Linux)
* Node.js 18+ (inside container)

---

## 3. System Features & Functional Requirements

### 3.1 User Authentication & Authorization

**Description:** Secure login and role-based access

**Functional Requirements:**

* Users shall register with email and password
* Passwords shall be hashed using bcrypt
* JWT tokens shall be issued on login
* Role-based access control shall be enforced

---

### 3.2 User Management

* Admin shall approve or suspend users
* Users shall update profile details
* Users shall view their activity history

---

### 3.3 Waste Listing Management

* Waste generators shall create waste listings
* Listings shall include:

  * Waste type
  * Quantity
  * Location
  * Availability status
* Users shall edit or delete listings

---

### 3.4 Waste Request & Matching

* Collectors shall request waste listings
* Generators shall approve or reject requests
* System shall notify users in real time using Socket.io

---

### 3.5 Real-Time Tracking

* System shall provide live updates for:

  * Request status
  * Collection progress
* Socket.io shall handle real-time communication

---

### 3.6 Analytics & Reports

* Admin shall view dashboards showing:

  * Waste collected by type
  * Environmental impact metrics
* Users shall view personal statistics

---

## 4. External Interface Requirements

### 4.1 User Interface

* Responsive UI using React + Tailwind CSS
* Clean dashboard layout
* Mobile and desktop support

### 4.2 Backend API

* RESTful APIs using Express.js
* JSON request/response format

### 4.3 Database Schema (High-Level)

Entities:

* User
* WasteListing
* WasteRequest
* Transaction
* Notification

Managed using Prisma ORM with SQLite

---

## 5. Non-Functional Requirements

### 5.1 Performance

* API response time < 300ms for most requests
* Real-time updates < 1s latency

### 5.2 Security

* JWT-based authentication
* Encrypted passwords
* Protected API routes

### 5.3 Scalability

* Modular services
* Easily replace SQLite with PostgreSQL later

### 5.4 Portability

* Entire system shall run using Docker Compose

---

## 6. System Architecture

### 6.1 High-Level Architecture

* Frontend container (React)
* Backend container (Express + Socket.io)
* Database container (SQLite volume)

### 6.2 Deployment

* Dockerfile for frontend and backend
* docker-compose.yml for orchestration

---

## 7. Assumptions & Constraints

### Assumptions

* Users have internet access
* Docker is installed on host machines

### Constraints

* Initial version uses SQLite
* Payments not included in v1

---

## 8. Future Enhancements

* AI-based waste matching
* Payment gateway integration
* Mobile application
* Blockchain-based waste tracking

---

## 9. Approval

| Role          | Name | Signature | Date |
| ------------- | ---- | --------- | ---- |
| Product Owner |      |           |      |
| Tech Lead     |      |           |      |

---

**End of Document**
