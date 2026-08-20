# Backend Folder Structure (NestJS Blueprint)

The NestJS backend codebase follows a modular structure where each domain boundary is isolated. Common functionality (e.g. Prisma/TypeORM context, dynamic tenant extraction, auth guards) is managed inside a shared Core module.

## 1. Directory Structure

```
backend/
├── src/
│   ├── main.ts                       # Application entrypoint & bootstrapping
│   ├── app.module.ts                 # Root Application module importing domain modules
│   │
│   ├── core/                         # Global/shared framework integrations
│   │   ├── tenant/                   # Tenant extraction middleware, interceptors & decorator
│   │   │   ├── tenant.interceptor.ts
│   │   │   ├── tenant.decorator.ts
│   │   │   └── tenant.module.ts
│   │   │
│   │   ├── guards/                   # Authentication & RBAC rules
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   │
│   │   ├── decorators/               # Helper decorators (@Roles, @CurrentUser)
│   │   │   ├── roles.decorator.ts
│   │   │   └── current-user.decorator.ts
│   │   │
│   │   ├── exceptions/               # Global filter exception handlers
│   │   │   └── http-exception.filter.ts
│   │   │
│   │   └── database/                 # Core database ORM module config
│   │       ├── database.module.ts
│   │       └── database.provider.ts
│   │
│   └── modules/                      # Domain Modules
│       ├── auth/                     # Authentication & Token rotation
│       │   ├── auth.module.ts
│       │   ├── auth.controller.ts
│       │   ├── auth.service.ts
│       │   ├── dto/                  # LoginDto, RegisterDto, RefreshTokenDto
│       │   └── strategies/           # jwt.strategy.ts
│       │
│       ├── student/                  # Student Profiles & Enrolment
│       │   ├── student.module.ts
│       │   ├── student.controller.ts
│       │   ├── student.service.ts
│       │   └── entities/             # student.entity.ts
│       │
│       ├── attendance/               # Attendance logs
│       │   ├── attendance.module.ts
│       │   ├── attendance.controller.ts
│       │   └── attendance.service.ts
│       │
│       ├── fee/                      # Fee Allocations & Payments
│       │   ├── fee.module.ts
│       │   ├── fee.controller.ts
│       │   └── fee.service.ts
│       │
│       ├── homework/                 # Assignments and Homeworks upload/management
│       │   ├── homework.module.ts
│       │   ├── homework.controller.ts
│       │   └── homework.service.ts
│       │
│       └── chat/                     # WebSockets (Gateway) based direct messaging
│           ├── chat.module.ts
│           ├── chat.gateway.ts       # Real-time WebSocket server gateway
│           └── chat.service.ts
│
├── test/                             # E2E test suites
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
│
├── package.json                      # Dependency registry
├── tsconfig.json                     # Compilation rules
├── backend.Dockerfile                # Multi-stage release Dockerfile
└── nest-cli.json                     # Nest CLI configuration
```

---

## 2. Key Backend Layer Descriptions

- **`core/tenant`**: Houses the `TenantInterceptor`. It extracts the `X-Tenant-ID` header from headers and sets it in the request execution scope. Controllers use the custom `@Tenant()` decorator to extract the tenant validation scope.
- **`modules/auth`**: Validates user identity via bcrypt hashes. Issues short-lived Access Tokens (JWT) and stores Refresh Tokens in the database.
- **`modules/chat`**: Implements WebSocket gateway via `@nestjs/websockets` and Socket.io, enabling persistent duplex messaging between parents and teachers.
