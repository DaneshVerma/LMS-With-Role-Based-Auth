# Learning Management System (LMS) – Project Documentation

## Overview
This project is a role-based **Learning Management System** built with **Node.js, Express, MongoDB, and Mongoose**.  
It supports three roles: **Admin, Teacher, and Student** with authentication, role-based access control, and course/lecture management.

---

## Features
- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Admin, Teacher, Student)
  - Secure password hashing with bcrypt

- **Admin**
  - Create teachers/students
  - Assign teachers to courses

- **Teacher**
  - Manage assigned courses
  - Upload lectures with files via **ImageKit Signed URLs**

- **Student**
  - Enroll in courses
  - Access enrolled courses & lectures

- **File Management**
  - Lecture content stored on **ImageKit**
  - Secure file access using signed URLs

- **Validation & Error Handling**
  - Express-validator for request validation
  - Centralized error handling middleware

---


---

## API Endpoints

### Auth Routes
- `POST /auth/signup/:key` → Admin signup using secret key  
- `POST /auth/login` → Login for all users (Admin/Teacher/Student)  
- `POST /auth/logout` → Logout and clear cookie  

### Admin Routes
- `POST /admin/create-user` → Create teacher/student  
- `POST /admin/assign-course/:courseId/:teacherId` → Assign teacher to a course  

### Teacher Routes
- `GET /teacher/courses` → Get courses assigned to teacher  
- `POST /teacher/course/:id/lecture` → Upload lecture to course  

### Student Routes
- `POST /student/enroll/:courseId` → Enroll in a course  
- `GET /student/courses` → Get enrolled courses  
- `GET /student/lectures/:courseId` → Get lectures of a course  

---

## Tech Stack
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose ORM)  
- **Authentication:** JWT + bcrypt  
- **File Storage:** ImageKit (Signed URLs)  

---

## Setup Instructions
1. Clone repository
2. Install dependencies:
   ```bash
   npm install

3. configure .env file
  ```bash
  MONGO_URI=your_mongo_uri
  JWT_SECRET=your_jwt_secret
  KEY=your_admin_secret_key
  IMAGEKIT_PUBLIC_KEY=xxx
  IMAGEKIT_PRIVATE_KEY=xxx
  IMAGEKIT_URL_ENDPOINT=xxx
```
4. Run server:
   ```bash
    node server.js
  or with auto-reload:
  ```bash
    npx nodemon server.js


