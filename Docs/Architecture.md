# TransitOps System Architecture

## Tech Stack
* **Frontend:** React.js, Tailwind CSS, Axios
* **Backend:** Node.js, Express.js (Layered Architecture: Controllers, Services, Validators, Routes)
* **Database:** PostgreSQL (Hosted on Neon)
* **Authentication & Security:** JWT (JSON Web Tokens), bcrypt hashing, Role-Based Access Control (RBAC)
* **Version Control:** Git & GitHub

## Architecture Flow

React Frontend
│ (Axios HTTP Requests)
▼
[Express API Gateway & Middleware] ──► [JWT / RBAC Authentication]
│
▼
[Controllers] (Request handling & Validation)
│
▼
[Services] (Business Logic & Transaction Management)
│
▼
[PostgreSQL Database (Neon)]

## Folder Structure (Backend)
```text
src/
├── config/          # Database connection pooling
├── controllers/     # HTTP request handlers
├── middleware/      # Authentication & Role validation
├── routes/          # API endpoints mapping
├── services/        # Business logic & SQL execution
└── validators/      # Express-validator schemas