# Navigation Hierarchy & User Flows

This blueprint defines how screens are organized via GoRouter routing, along with role-specific interactive journeys.

## 1. Global Navigation Hierarchy (GoRouter Routes)

```
/ (Root Redirect / Splash)
│
├── /login                            (Anonymous Screen)
├── /otp-verify                       (OTP Verification screen)
│
├── /super-admin                      (Super Admin Dashboard)
│   ├── /schools                      (Schools list)
│   └── /subscriptions                (Global SaaS subscription plans)
│
├── /admin                            (School Admin Dashboard)
│   ├── /profile                      (School profile configuration)
│   ├── /classes                      (Manage Classes & Sections)
│   ├── /teachers                     (Manage Teacher staff)
│   ├── /students                     (Manage Students & Parents)
│   ├── /fees                         (Configure Fee structures)
│   └── /notices                      (Post global notices)
│
├── /teacher                          (Teacher Dashboard)
│   ├── /attendance                   (Class list & Mark attendance)
│   ├── /homework                     (Upload homework / assignments)
│   ├── /marks                        (Term grade entry sheets)
│   └── /leaves                       (Leave requests dashboard)
│
├── /parent                           (Parent Dashboard)
│   ├── /child-profile                (Select sibling / View student info)
│   ├── /attendance-view              (Calendar view of child's attendance)
│   ├── /homework-view                (Assigned homework task board)
│   ├── /marks-view                   (Virtual Report Card card view)
│   ├── /fees-payment                 (Invoice checkout gateway)
│   └── /apply-leave                  (Submit student leave request)
│
├── /student                          (Student Dashboard)
│   ├── /timetable                    (Academic schedule view)
│   ├── /homework                     (Homework tasks list)
│   ├── /notes                        (Shared learning resources)
│   └── /exams                        (Schedule & hall ticket details)
│
└── /accounts                         (Accounts Staff Dashboard)
    ├── /payments                     (Log payments & checkouts)
    ├── /defaulters                   (Track unpaid fee statuses)
    └── /reports                      (Export accounting sheets)
```

---

## 2. Dynamic Parent Payment Flow

```mermaid
sequenceDiagram
    autonumber
    actor Parent as Parent Client
    participant App as Flutter Mobile App
    participant API as NestJS Backend API
    participant PG as Stripe / Adyen Payment Gateway
    participant DB as PostgreSQL Database

    Parent->>App: Clicks on "Pay Fees" for Child
    App->>API: GET /fees/outstanding (Header: X-Tenant-ID)
    API->>DB: Fetch student allocations where status != PAID
    DB-->>API: Active outstanding allocations
    API-->>App: List of outstanding allocations
    App->>Parent: Displays invoices & checkout button
    Parent->>App: Clicks Checkout
    App->>API: POST /fees/payments/initialize (allocationId)
    API->>PG: Create Payment Intent (Amount)
    PG-->>API: Payment Client Secret
    API-->>App: Return Client Secret
    App->>Parent: Opens Native Payment Sheet
    Parent->>PG: Submits Card details
    PG-->>Parent: Transaction Succeeded
    PG-->>API: Webhook: payment_intent.succeeded
    API->>DB: UPDATE student_fee_allocations set status = PAID
    API->>DB: INSERT into fee_payments (receipt_number, etc.)
    API-->>Parent: Push Notification: "Payment of $500 received. Receipt downloadable."
```
