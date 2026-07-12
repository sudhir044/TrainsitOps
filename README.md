# TransitOps – Smart Transport Operations Platform

> A centralized fleet and transport management platform.

![Node.js](https://img.shields.io/badge/Node.js-22.x-green)
![Express.js](https://img.shields.io/badge/Express.js-Backend-black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-blue)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![License](https://img.shields.io/badge/License-MIT-blue)

---

##  Problem Statement

Many logistics companies still rely on spreadsheets and manual logbooks to manage transport operations. This often results in:

- Vehicle scheduling conflicts
- Underutilized fleet
- Missed maintenance
- Driver license expiry
- Poor fuel tracking
- Lack of operational visibility

**TransitOps** solves these problems by providing a centralized platform to manage the complete transport lifecycle.

---

#  Features

##  Authentication & Authorization

- JWT Authentication
- Secure Password Hashing (bcrypt)
- Role-Based Access Control (RBAC)
- User Login
- User Registration

---

##  Vehicle Registry

- Add Vehicle
- Update Vehicle
- Delete Vehicle
- View Fleet
- Vehicle Status Tracking

Vehicle Status

- Available
- On Trip
- In Shop
- Retired

---

##  Driver Management

- Driver Registration
- License Management
- Safety Score
- Driver Availability

Driver Status

- Available
- On Trip
- Off Duty
- Suspended

---

##  Trip Dispatcher

Business validations included:

- Vehicle availability
- Driver availability
- License expiry validation
- Cargo capacity validation

Trip Workflow

```
Draft
   │
Dispatch
   │
Dispatched
   │
Complete
   │
Completed
```

Automatically updates:

- Vehicle Status
- Driver Status
- Vehicle Odometer

---

## 🔧 Maintenance

- Create Maintenance Request
- Start Maintenance
- Complete Maintenance
- Vehicle Service History

Maintenance Status

- Pending
- In Progress
- Completed

---

##  Fuel Logs

- Fuel Entry
- Fuel Cost Tracking
- Vehicle-wise Fuel Consumption

---

##  Expense Management

Track

- Insurance
- Toll
- Parking
- Miscellaneous Expenses

---

##  Dashboard

Real-time statistics

- Total Vehicles
- Active Trips
- Available Vehicles
- Drivers on Duty
- Vehicles in Maintenance
- Fleet Utilization

---

##  Reports

- Trip Reports
- Fuel Reports
- Expense Reports
- Maintenance Reports

---

#  System Architecture

```
Client
   │
React Frontend
   │
REST API
   │
Express.js
   │
Business Logic
   │
PostgreSQL (Neon)
```

---

#  Project Structure

```
TransitOps
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── routes
│   │   ├── services
│   │   ├── validators
│   │   ├── utils
│   │   └── sql
│   │
│   ├── package.json
│   └── .env
│
├── frontend
│
├── docs
│
└── README.md
```

---

#  Database Design

Tables

- Roles
- Users
- Drivers
- Vehicles
- Trips
- Maintenance Logs
- Fuel Logs
- Expenses

---

#  Database Relationships

```
Roles
   │
Users
   │
Drivers
   │
Trips
   │
Vehicles
   ├── Maintenance
   ├── Fuel Logs
   └── Expenses
```

---

#  Tech Stack

## Backend

- Node.js
- Express.js
- PostgreSQL
- Neon Database
- JWT
- bcryptjs
- Express Validator

## Frontend

- React.js
- Tailwind CSS
- Axios

## Database

- PostgreSQL

---

#  REST APIs

## Authentication

```
POST   /api/auth/register

POST   /api/auth/login
```

---

## Vehicles

```
POST   /api/vehicles

GET    /api/vehicles

GET    /api/vehicles/:id

PUT    /api/vehicles/:id

DELETE /api/vehicles/:id
```

---

## Drivers

```
POST   /api/drivers

GET    /api/drivers

GET    /api/drivers/:id

PUT    /api/drivers/:id

DELETE /api/drivers/:id
```

---

## Trips

```
POST   /api/trips

GET    /api/trips

GET    /api/trips/:id

PATCH  /api/trips/:id/dispatch

PATCH  /api/trips/:id/complete

DELETE /api/trips/:id
```

---

## Maintenance

```
POST   /api/maintenance

GET    /api/maintenance

PATCH  /api/maintenance/:id/start

PATCH  /api/maintenance/:id/complete

DELETE /api/maintenance/:id
```

---

#  Installation

Clone the repository

```bash
git clone https://github.com/yourusername/TransitOps.git
```

Backend

```bash
cd backend

npm install

npm run dev
```

Create `.env`

```env
PORT=5000

DATABASE_URL=your_neon_database_url

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=7d
```

---

#  Screens

- Dashboard
- Vehicle Registry
- Driver Management
- Trip Dispatcher
- Maintenance
- Reports

---

#  Future Enhancements

- GPS Tracking
- Route Optimization
- AI-based Maintenance Prediction
- Fuel Analytics
- Live Notifications
- Odoo ERP Integration

---

#  Acknowledgements

- Express.js
- PostgreSQL
- Neon
- React.js


