# Operational Workflow & User Journey

This document details the step-by-step operational lifecycle within the TransitOps platform, mapping out how fleet resources move from onboarding to active deployment and maintenance.


## 🔄 Core Operational Lifecycle
[ User Authentication ]


 Resource Onboarding ──► (Register Vehicles & Onboard Drivers)
│
▼
[ Trip Planning] ────────► (Match Available Vehicle + Driver + Route)
│
▼
[ Live Dispatch ] ────────► (Trip active: Payload & Status validation)
│
▼
[ Exception Handling ] ──► (Trigger Maintenance Lockout if issues arise)
│
▼
[ Trip Closure ] ─────────► (Log Fuel, Overhead Expenses & Calculate ROI)


---

# Detailed Step-by-Step Breakdown

### Step 1: Secure Authentication & Role Assignment
* **Action:** Users register and log into the system. 
* **Workflow:** The server issues a secure JWT containing the user's role payload. The frontend stores this token to dynamically unlock workspace components based on access level (e.g., `Fleet Manager` vs. `Driver`).

### Step 2: Fleet Resource Onboarding
* **Action:** Populating system assets before running operations.
* **Workflow:** 1. The Fleet Manager registers new haulage trucks or vans, defining structural parameters like payload capacity. Initial status defaults to `Available`.
    2. Drivers are onboarded with licensing details, default status set to `Available`.

### Step 3: Trip Creation & Live Dispatching
* **Action:** Deploying assets to complete fulfillment routes.
* **Workflow:**
    1. The Fleet Manager opens the dispatch board to create a new journey.
    2. The system filters and provides dropdown selection lists containing **only** `Available` drivers and vehicles.
    3. Upon submission, the database opens an isolated transaction block: updates the vehicle to `On Trip`, updates the driver to `On Trip`, and creates the active `trips` record.

### Step 4: Incident Response & Maintenance Pipeling (Lockout)
* **Action:** Managing real-time asset degradation or mechanical breakdowns.
* **Workflow:**
    1. If a driver reports a vehicle fault, the Fleet Manager opens a `maintenance_log` with an initial status of `Pending`.
    2. When work begins, the manager flips the log status to `In Progress`.
    3. **System Guard Trigger:** The database automatically cascades a status update changing the corresponding vehicle to `In Shop`. The vehicle is instantly blocked from appearing in any active trip dispatch queries to ensure absolute road safety.
    4. Once repaired, the log transitions to `Completed`, returning the vehicle status directly back to `Available`.

### Step 5: Trip Resolution & Financial Reconciliation
* **Action:** Closing down completed routes and logging overhead.
* **Workflow:**
    1. The driver completes the route, updating the trip status to `Delivered`.
    2. Driver logs total fuel intake (`fuel_logs`) and associated road costs (`expenses`).
    3. Both the vehicle and driver resource states seamlessly revert to `Available`, ready for the next dispatch assignment.
    4. The live dashboard instantly recalcu