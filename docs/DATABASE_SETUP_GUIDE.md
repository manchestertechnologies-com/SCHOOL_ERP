# Local PostgreSQL Database Setup Guide

Since you want to run the database locally without Docker, follow these steps to install PostgreSQL on Windows, create the database, load the schema, and connect your NestJS application.

---

## 1. Install PostgreSQL on Windows

1. Download the PostgreSQL Installer for Windows from the official site:
   [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/)
2. Run the installer and proceed with the default setup options.
3. During the installation, you will be prompted to set a **password** for the default `postgres` superuser. Keep note of this password (e.g., `SecureDbPassword2026`).
4. Keep the default port as `5432`.
5. Complete the installation (you can uncheck the Stack Builder utility at the end).

---

## 2. Create the Database & Load the Schema

You can do this using the PostgreSQL Command Line (`psql`) or the GUI client (`pgAdmin`) which is installed automatically with PostgreSQL.

### Option A: Using the Command Line (`psql`)
1. Open your Windows Command Prompt or PowerShell.
2. Log in as the postgres superuser:
   ```cmd
   psql -U postgres
   ```
   *(Enter the password you set during installation)*
3. Create the database:
   ```sql
   CREATE DATABASE manchester_school_bridge;
   ```
4. Exit psql:
   ```sql
   \q
   ```
5. Import the schema file directly from your workspace directory:
   ```cmd
   psql -U postgres -d manchester_school_bridge -f "c:\Users\swamy\OneDrive\Desktop\SCHOOL_ERP\docs\DATABASE_SCHEMA.sql"
   ```

---

## 3. Connect NestJS to the PostgreSQL Database

To switch from the in-memory mock system to your live database, follow these steps:

### A. Add Database Package Dependencies
In `backend/package.json`, we already included the `pg` driver module. If you are using Prisma or TypeORM, install the library:
```bash
npm install @nestjs/typeorm typeorm pg
```

### B. Add a Environment File (`.env`)
Create a `.env` file in the `backend/` folder to store your connection string:
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=YOUR_PASSWORD_HERE
DATABASE_NAME=manchester_school_bridge
```

### C. Initialize TypeORM / Prisma in `app.module.ts`
Import the TypeORM module into your main application module:

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT) || 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: false, // Set to false in production since we loaded the schema manually
    }),
  ],
})
export class AppModule {}
```
