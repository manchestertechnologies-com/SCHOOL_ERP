# Manchester School Bridge - Architecture & Prototype Blueprints

Welcome to the **Manchester School Bridge** project codebase. This repository contains the complete production-ready blueprints, architectural guidelines, database schemas, folder structures, API specifications, and Docker setups for the platform.

## 🚀 Repository Contents

All deliverables are fully detailed and organized within the `docs/` directory and root configurations:

1. **Product Requirements Document (PRD):** [`docs/PRD.md`](file:///c:/Users/swamy/OneDrive/Desktop/SCHOOL_ERP/docs/PRD.md)
   - Scope, modules, user roles, permission metrics, and platform requirements.
2. **System & Deployment Architecture:** [`docs/ARCHITECTURE.md`](file:///c:/Users/swamy/OneDrive/Desktop/SCHOOL_ERP/docs/ARCHITECTURE.md)
   - High-level design, multi-tenant database isolation model, and system interactions.
3. **Database Schema:** [`docs/DATABASE_SCHEMA.sql`](file:///c:/Users/swamy/OneDrive/Desktop/SCHOOL_ERP/docs/DATABASE_SCHEMA.sql)
   - SQL definitions for multi-tenant Postgres tables, indices, RLS policies, soft deletes, and triggers.
4. **Backend (NestJS) Folder Structure Blueprint:** [`docs/BACKEND_STRUCTURE.md`](file:///c:/Users/swamy/OneDrive/Desktop/SCHOOL_ERP/docs/BACKEND_STRUCTURE.md)
   - Bounded context design and modular directory layout for the backend services.
5. **Frontend (Flutter) Folder Structure Blueprint:** [`docs/FRONTEND_STRUCTURE.md`](file:///c:/Users/swamy/OneDrive/Desktop/SCHOOL_ERP/docs/FRONTEND_STRUCTURE.md)
   - Clean Architecture + MVVM implementation layout for cross-platform (Web, Android, iOS) compiling.
6. **API Specifications:** [`docs/API_SPECIFICATION.md`](file:///c:/Users/swamy/OneDrive/Desktop/SCHOOL_ERP/docs/API_SPECIFICATION.md)
   - REST payload schemas, headers, query filters, and response specifications.
7. **User Flows & Route Hierarchies:** [`docs/USER_FLOWS.md`](file:///c:/Users/swamy/OneDrive/Desktop/SCHOOL_ERP/docs/USER_FLOWS.md)
   - Detailed screen list, navigation tree, and sequence diagrams.

---

## 🛠️ Getting Started (Local Orchestration)

To spin up the local development database, cache, pgAdmin console, and backend application container, run:

```bash
docker-compose up -d --build
```

### Port Mappings
- **NestJS API Service:** `http://localhost:3000`
- **Postgres Database Instance:** `localhost:5432`
- **PgAdmin Dashboard:** `http://localhost:5050`
  - *Login:* `admin@msb.internal` / `admin`
- **Redis Cache Instance:** `localhost:6379`
