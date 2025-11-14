# Todo Backend API

A production-ready REST API for task management with secure JWT authentication, built with Express.js, TypeScript, Prisma ORM, and PostgreSQL.

## ✨ Features

- 🔐 **Secure Authentication** - Dual-token strategy with JWT access tokens and httpOnly refresh tokens 
- 📝 **Task Management** - Full CRUD operations with status workflow (TODO → IN_PROGRESS → DONE) 
- 🔍 **Advanced Querying** - Pagination, filtering, and case-insensitive search 
- 🛡️ **Security First** - bcrypt password hashing, CORS protection, helmet security headers 
- ✅ **Type Safety** - End-to-end TypeScript with Zod validation 
- 👤 **User Isolation** - Row-level security ensuring users only access their own data 

## 🚀 Quick Start

### Prerequisites

- Node.js (v14+)
- PostgreSQL database
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd todo-backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL and JWT secrets

# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Start development server
npm run dev
``` 

The server will start on `http://localhost:4000` 

## 📁 Project Structure

```
src/
├── controllers/      # Request handlers
│   ├── auth.controller.ts
│   └── tasks.controller.ts
├── services/        # Business logic
│   ├── auth.service.ts
│   ├── token.service.ts
│   └── tasks.service.ts
├── routes/          # API endpoints
│   ├── auth.routes.ts
│   └── tasks.routes.ts
├── middleware/      # Express middleware
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   └── validate.middleware.ts
├── schemas/         # Zod validation schemas
│   ├── auth.schema.ts
│   └── task.schema.ts
├── errors/          # Custom error classes
├── utils/           # Helper functions
├── app.ts          # Express app configuration
└── server.ts       # Entry point
```

## 🔑 Authentication API

### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}
``` 

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
``` 

### Refresh Token
```http
POST /auth/refresh
Cookie: jid=<refresh_token>
``` 

### Logout
```http
POST /auth/logout
Cookie: jid=<refresh_token>
``` 

## 📋 Task Management API

All task endpoints require authentication via `Authorization: Bearer <access_token>` header. 

### List Tasks
```http
GET /tasks?page=1&limit=10&status=TODO&search=keyword
Authorization: Bearer <access_token>
``` 

### Create Task
```http
POST /tasks
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the backend API",
  "status": "TODO"
}
``` 

### Get Single Task
```http
GET /tasks/:id
Authorization: Bearer <access_token>
``` 

### Update Task
```http
PATCH /tasks/:id
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Updated title",
  "status": "IN_PROGRESS"
}
``` 

### Delete Task
```http
DELETE /tasks/:id
Authorization: Bearer <access_token>
``` 

### Toggle Task Status
```http
POST /tasks/:id/toggle
Authorization: Bearer <access_token>
```

Cycles through: TODO → IN_PROGRESS → DONE → TODO 

## 🗄️ Database Schema

The application uses three main models:

- **User** - Authentication and profile data 
- **Task** - Todo items with status tracking  
- **RefreshToken** - Session management with revocation support 

## 🔒 Security Features

- **Password Hashing** - bcrypt with 12 salt rounds 
- **JWT Tokens** - Signed access tokens with configurable expiration 
- **Refresh Tokens** - Cryptographically secure, hashed storage  
- **httpOnly Cookies** - XSS protection with strict SameSite policy 
- **CORS** - Configured for specific origin with credentials 
- **Helmet** - Security headers for production  
- **Input Validation** - Zod schemas on all endpoints 

## 🛠️ Technology Stack

| Category | Technology |
|----------|-----------|
| Runtime | Node.js |
| Language | TypeScript |
| Framework | Express.js |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | JWT (jsonwebtoken) |
| Password Security | bcrypt |
| Validation | Zod |
| Security | helmet, cors | 

## 📜 Available Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Compile TypeScript to JavaScript
npm start            # Run production server
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run database migrations
``` 

## 🌍 Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/todo_db"

# JWT Secrets
JWT_ACCESS_SECRET="your-access-secret"
JWT_REFRESH_SECRET="your-refresh-secret"

# Server
PORT=4000

# Security
BCRYPT_SALT_ROUNDS=12
REFRESH_COOKIE_NAME="jid"
``` 

## 🏗️ Architecture

The application follows a layered architecture pattern:

1. **Routes** - Define API endpoints and apply middleware 
2. **Middleware** - Authentication, validation, error handling 
3. **Controllers** - Handle HTTP requests/responses 
4. **Services** - Business logic and database operations 
5. **Prisma ORM** - Type-safe database access 

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Notes

This README provides a complete overview of the todo-backend API, including all authentication and task management endpoints, security features, and setup instructions.<cite></cite> The project uses a modern TypeScript stack with Prisma ORM for type-safe database access and implements industry-standard security practices including JWT authentication, password hashing, and CORS protection.<cite></cite>

Wiki pages you might want to explore:
- [Overview (Samarth622/todo-backend)](/wiki/Samarth622/todo-backend#1)
- [Authentication System (Samarth622/todo-backend)](/wiki/Samarth622/todo-backend#3)
- [Task Management System (Samarth622/todo-backend)](/wiki/Samarth622/todo-backend#4)
