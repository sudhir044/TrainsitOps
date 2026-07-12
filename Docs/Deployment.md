# Deployment Guide

This document outlines the hosting provider strategy and environment configurations used to deploy the TransitOps platform to production.

---

## 🌐 Infrastructure Overview

The system architecture utilizes a fully decoupled, cloud-hosted deployment model ensuring seamless scalability and minimal overhead:

| Component | Cloud Provider | Deployment Model |
| :--- | :--- | :--- |
| **Frontend UI** | **Vercel** | Edge Network Delivery / Jamstack |
| **Backend API** | **Render** | Managed Web Service (Node.js Environment) |
| **Database** | **Neon** | Serverless PostgreSQL (ACID-Compliant) |


##  Step-by-Step Production Deployment

### 1. Database Provisioning (Neon)
1. Initialize a new project in the **Neon Console**.
2. Create a production branch (e.g., `main`).
3. Copy the secure database connection string from your dashboard.
4. Execute your initialization DDL scripts (tables, schemas, indexing constraints) directly via the Neon SQL Editor.

### 2. Backend Deployment (Render)
1. Connect your GitHub repository to **Render**.
2. Select **New Web Service** and point it to the repository branch.
3. Apply the following settings:
   * **Runtime:** `Node`
   * **Build Command:** `npm install`
   * **Start Command:** `npm start` (or `node src/app.js`)
4. Under **Advanced Settings**, inject your production Environment Variables (see Environment Configuration below).

### 3. Frontend Deployment (Vercel)
1. Connect the frontend repository to **Vercel**.
2. Select the designated client framework setup (React / Vite setup).
3. Populate the frontend environment variable configuration with your live Render backend URL.
4. Trigger the deployment pipeline.

---

## 🔐 Environment Configuration

The following application properties must be configured securely inside the environment variables settings of the respective hosting dashboards. **Never commit these values directly to source control.**

### Backend Environment Variables (`Render`)
env
PORT=5175
NODE_ENV=production
DATABASE_URL=postgresql://[user]:[password]@[host]/[database]?sslmode=require
JWT_SECRET=your_high_entropy_production_jwt_secret_key