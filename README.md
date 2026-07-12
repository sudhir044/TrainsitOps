# TransitOps 
> Smart Transport Operations Platform

TransitOps is an enterprise-grade fleet management solution designed to streamline vehicle logistics, track real-time maintenance cycles, optimize driver allocation, and minimize operational overhead. 


##  Key Features
* **Role-Based Access Control (RBAC):** Secure, distinct dashboard privileges for Fleet Managers and Drivers.
* **Live Vehicle Registry:** Dynamic tracking of asset availability and operational status (`Available`, `On Trip`, `In Shop`).
* **Comprehensive Trip Dispatcher:** Automated scheduling system matching available drivers and vehicles with payload capacity verification.
* **Automated Maintenance Pipelines:** Transaction-backed status transitions (`Pending` ──► `In Progress` ──► `Completed`) that safely lock down unroadworthy assets.
* **Expense & Fuel Analytics:** Granular tracking of fuel consumption records and operational overhead expenses per vehicle.

---

## 🛠️ Tech Stack
* **Frontend:** React.js, Tailwind CSS, Axios
* **Backend:** Node.js, Express.js (Layered Architecture: Routes, Controllers, Services, Middleware, Validators)
* **Database:** PostgreSQL (Hosted on Neon serverless clusters)
* **Authentication:** JSON Web Tokens (JWT) & bcrypt hashing



##  Repository Structure
```text
transitops/
├── docs/                # Extended Technical Documentation (Jury Reference)
│   ├── api.md           # REST Endpoint definitions & payload schema
│   ├── architecture.md  # Structural flow & application layer breakdowns
│   ├── business_rules.md# Core logical guardrails & validation logic
│   ├── database.md      # Relational schema design & entity breakdown
│   ├── deployment.md    # Production hosting environments & CI/CD pipeline
│   ├── future_scope.md  # Scalability roadmap (IoT, ML Predictive Maintenance)
│   ├── presentation.md  # Pitch script and demo flow structure
│   ├── testing.md       # API manual integration test cases
│   └── workflow.md      # Step-by-step user journey & data transitions
├── src/                 # Production Backend Application Source Code
│   ├── config/          # Neon DB pool connections
│   ├── controllers/     # HTTP Request/Response handling
│   ├── middleware/      # Auth shields & RBAC guards
│   ├── routes/          # Express API route mapping
│   ├── services/        # Business logic & transaction queries
│   └── validators/      # Express-validator schema rules
├── .env.example         # Template for required environment variables
├── package.json         # Dependencies & execution scripts
└── README.md            # You are here