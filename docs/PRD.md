# Product Requirements Document (PRD)

## Project Name: Manchester School Bridge

## 1. Objective & Scope
Manchester School Bridge is a next-generation, multi-tenant school management and communication platform designed to unify school administrators, teachers, parents, students, and accounts staff into a single, cohesive digital ecosystem.
The platform supports:
- Isolated data per school (multi-tenancy) via a unified tenant-based relational schema.
- Cross-platform unified client (Flutter) supporting Android, iOS, and Web Admin dashboard.
- Modular, highly secure NestJS API backend deployed using Docker.

---

## 2. User Roles & Access Control
The platform implements rigid Role-Based Access Control (RBAC) across six user classes:

### 2.1 Super Admin
- **Scope:** Global platform level.
- **Key Capabilities:** 
  - Onboard new schools/tenants and configure billing.
  - Manage subscription tiers, limits (e.g., student count, storage size).
  - Global system monitoring, analytics, and platform-wide logs.

### 2.2 School Admin
- **Scope:** Tenant/School level.
- **Key Capabilities:**
  - Manage school profiles, branding, logo, metadata.
  - Define configurations (academic years, terms, classes, sections).
  - Manage user onboarding (teachers, accounts staff, parents, students).
  - Configure fee items, categories, and school-wide policies.
  - View overall analytics (attendance statistics, collection reports).

### 2.3 Teacher
- **Scope:** Assigned classes, sections, and subjects.
- **Key Capabilities:**
  - Mark daily class/subject attendance.
  - Create and distribute homework, assignments, and study materials (notes).
  - Enter marks and construct digital report cards.
  - Submit leave requests to school admins and manage parent communication.

### 2.4 Parent
- **Scope:** Linked child/children profile(s).
- **Key Capabilities:**
  - Track real-time attendance, homework, test grades, and report cards.
  - Pay fees, view invoices, and download PDF receipts.
  - Apply for student leave and send messages to teachers.
  - View circulars, bulletins, and notifications.

### 2.5 Student
- **Scope:** Individual personal profile.
- **Key Capabilities:**
  - Access personal timetable, subject notes, assignments, and exam schedules.
  - View homework tasks and grades.
  - View school notices and daily schedules.

### 2.6 Accounts Staff
- **Scope:** School financial operations.
- **Key Capabilities:**
  - Record payments, verify bank transfers, and configure online payment options.
  - Send payment reminders, follow up on outstanding balances.
  - Export structured tax and revenue audits (PDF/CSV/Excel).

---

## 3. Core System Modules

### 3.1 Authentication
- JWT access tokens (short-lived) + secure refresh tokens (long-lived, database-tracked).
- Multi-factor OTP authentication option for administrators and staff.

### 3.2 School Management
- Multi-tenant tenant configuration, academic calendar, and metadata configuration.

### 3.3 Student Management
- Student profiles, medical records, enrollment history, and parent-student relationship mapping.

### 3.4 Teacher Management
- Teacher assignment to subjects, classes, sections, and departments.

### 3.5 Parent Management
- Parent contact directory, linking multiple siblings to a single parental account.

### 3.6 Attendance Management
- Real-time attendance tracking with notification alerts sent to parents for absent students.

### 3.7 Homework Management
- Document and media upload capabilities; homework tracking for students.

### 3.8 Assignment Management
- Submission gateways, status tracking (pending, submitted, graded), and grading tools.

### 3.9 Notes Management
- Central repository for PDF slides, text transcripts, and external study resources.

### 3.10 Notice Board
- Direct notifications and rich-text announcements categorized by priority.

### 3.11 Fee Management
- Invoice generation, fee structure settings, payment tracking, and receipt exports.

### 3.12 Report Cards
- Marks entry per subject/term, GPA calculation, teacher remarks, and signature generation.

### 3.13 Leave Management
- Workflows for teachers and parents to request time off, with automated approvals.

### 3.14 Timetable Management
- Interactive calendar mapping periods, teachers, classrooms, and breaks.

### 3.15 Exam Management
- Exam schedules, seating arrangements, hall tickets, and rule books.

### 3.16 Notification Center
- Integrated push notifications using Firebase Cloud Messaging (FCM) and email triggers.

### 3.17 Chat Module
- Admin-to-teacher, teacher-to-parent secure messaging with read receipts.

### 3.18 Reports & Analytics
- Dashboards for fees collection, school performance metrics, and attendance analysis.

### 3.19 Settings Module
- Themes (dark/light/custom branding), notifications configuration, and language settings.

### 3.20 Audit Logs
- Immutable record of actions (create, edit, delete, authenticate) across all modules for security.
