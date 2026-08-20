# Online Free PostgreSQL Database Setup Guide

If you want to host your database completely online for free (with zero local setup), you can use free-tier PostgreSQL cloud database providers. The two best options are **Neon** and **Supabase**.

---

## Option 1: Using Neon.tech (Recommended)
Neon is a serverless PostgreSQL provider with a very generous, permanent free tier.

### 1. Create a Free Account
1. Go to [https://neon.tech/](https://neon.tech/) and click **Sign Up**.
2. Log in using your GitHub or Google account.

### 2. Create a Database Project
1. In the console, click **Create a Project**.
2. Name your project (e.g., `manchester-school-bridge`).
3. Select your database version (PostgreSQL 15 or 16) and region closest to you.
4. Click **Create Project**.

### 3. Get your Connection String
1. Neon will show you a connection string immediately. It will look like this:
   `postgresql://neondb_owner:PASSWORD@ep-random-name.us-east-2.aws.neon.tech/neondb?sslmode=require`
2. Copy this string.

---

## Option 2: Using Supabase
Supabase provides a free, fully-managed PostgreSQL database with up to 500MB of storage.

### 1. Create a Free Account
1. Go to [https://supabase.com/](https://supabase.com/) and sign up.
2. Link your GitHub account.

### 2. Create a Project
1. Click **New Project**.
2. Set a project name, database password, and choose your hosting region.
3. Choose the **Free** pricing plan.
4. Click **Create new project**.

### 3. Get your Connection String
1. Once the project is provisioned (takes 1-2 minutes), go to **Project Settings** > **Database**.
2. Under **Connection string**, copy the URI (make sure to replace `[YOUR-PASSWORD]` with the database password you chose).

---

## How to Link and Run the Database Online

Once you have your connection string from Neon or Supabase:

### 1. Run the SQL Schema against the Online Database
You can run the schema using the online SQL editor:
1. Copy the entire contents of [`docs/DATABASE_SCHEMA.sql`](file:///c:/Users/swamy/OneDrive/Desktop/SCHOOL_ERP/docs/DATABASE_SCHEMA.sql).
2. Go to the **SQL Editor** tab in your Neon or Supabase console.
3. Paste the SQL script and click **Run** / **Execute**.
This will instantly construct all 20+ tables, indexes, and triggers online.

### 2. Connect your local NestJS Backend
Create/update the `.env` file in the `backend/` directory:
```env
DATABASE_URL=your_copied_connection_string_here
```
Now NestJS can connect and interact with your online database directly!
