# API Specification & Endpoints

## 1. Global Specifications

- **Base URL:** `https://api.manchesterschoolbridge.com/v1`
- **Tenant Header:** Every request (except super-admin endpoints) must include the `X-Tenant-ID` header.
- **Authentication Header:** Requests to protected endpoints must include:
  `Authorization: Bearer <JWT_ACCESS_TOKEN>`

---

## 2. Authentication Flow

### 2.1 Login
- **Endpoint:** `POST /auth/login`
- **Payload:**
```json
{
  "email": "teacher@manchesterschool.com",
  "password": "SecurePassword123"
}
```
- **Response (200 OK):**
```json
{
  "accessToken": "eyJhbGciOi...",
  "refreshToken": "d3Y4OW...",
  "user": {
    "id": "c7a7263b-9a84-4861-bf96-2de68d374465",
    "role": "TEACHER",
    "firstName": "Jane",
    "lastName": "Doe",
    "schoolId": "a9a3b8cd-6612-4fb3-9828-569d300eb0be"
  }
}
```

### 2.2 Refresh Token
- **Endpoint:** `POST /auth/refresh`
- **Payload:**
```json
{
  "refreshToken": "d3Y4OW..."
}
```
- **Response (200 OK):**
```json
{
  "accessToken": "new_access_token_here",
  "refreshToken": "new_refresh_token_here"
}
```

---

## 3. Academic & Student Management

### 3.1 Get Students (School Admin / Teacher / Accounts Staff)
- **Endpoint:** `GET /students`
- **Query Params:** `sectionId` (optional), `page` (default 1), `limit` (default 20)
- **Response (200 OK):**
```json
{
  "data": [
    {
      "id": "e0bfa900-53bc-4235-86f7-b715a201b16c",
      "firstName": "John",
      "lastName": "Smith",
      "admissionNumber": "MSB2026001",
      "section": {
        "id": "d0ef4456-11f8-45a8-ac49-0cf02d1dcd4b",
        "name": "Section A",
        "class": { "name": "Grade 10" }
      }
    }
  ],
  "meta": { "total": 1, "page": 1, "totalPages": 1 }
}
```

### 3.2 Create Student (School Admin)
- **Endpoint:** `POST /students`
- **Payload:**
```json
{
  "email": "john.smith@parent.com",
  "firstName": "John",
  "lastName": "Smith",
  "admissionNumber": "MSB2026001",
  "sectionId": "d0ef4456-11f8-45a8-ac49-0cf02d1dcd4b",
  "academicYearId": "f7ab823c-9a44-486a-aa84-dcfb87b7a661",
  "dateOfBirth": "2012-05-15",
  "gender": "MALE",
  "parentUser": {
    "email": "smith.parent@mail.com",
    "firstName": "Robert",
    "lastName": "Smith",
    "phoneNumber": "+1234567890",
    "relationship": "Father"
  }
}
```

---

## 4. Attendance Management

### 4.1 Mark Attendance (Teacher)
- **Endpoint:** `POST /attendance`
- **Payload:**
```json
{
  "date": "2026-06-27",
  "records": [
    { "studentId": "e0bfa900-53bc-4235-86f7-b715a201b16c", "status": "PRESENT" },
    { "studentId": "b1b1163b-9a84-4861-bf96-2de68d374465", "status": "ABSENT", "remarks": "Sick leave" }
  ]
}
```
- **Response (201 Created):**
```json
{ "success": true, "message": "Attendance marked successfully." }
```

---

## 5. Fee Management

### 5.1 Record Fee Payment (Accounts Staff)
- **Endpoint:** `POST /fees/payments`
- **Payload:**
```json
{
  "allocationId": "a7bfa900-53bc-4235-86f7-b715a201b16c",
  "amountPaid": 500.00,
  "paymentMethod": "CARD",
  "transactionReference": "TXN_7823947812"
}
```
- **Response (201 Created):**
```json
{
  "paymentId": "9a3b8cd-6612-4fb3-9828-569d300eb0be",
  "receiptNumber": "REC-2026-000492",
  "amountPaid": 500.00,
  "status": "PAID"
}
```
