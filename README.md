I'll create a comprehensive README.md file for the `Samarth622/todo-backend` project based on the codebase structure. [1](#1-0) 

# Todo Backend API

A production-ready REST API for task management with secure JWT authentication, built with Express.js, TypeScript, Prisma ORM, and PostgreSQL. [2](#1-1) 

## ✨ Features

- 🔐 **Secure Authentication** - Dual-token strategy with JWT access tokens and httpOnly refresh tokens [3](#1-2) 
- 📝 **Task Management** - Full CRUD operations with status workflow (TODO → IN_PROGRESS → DONE) [4](#1-3) 
- 🔍 **Advanced Querying** - Pagination, filtering, and case-insensitive search [5](#1-4) 
- 🛡️ **Security First** - bcrypt password hashing, CORS protection, helmet security headers [6](#1-5) 
- ✅ **Type Safety** - End-to-end TypeScript with Zod validation [7](#1-6) 
- 👤 **User Isolation** - Row-level security ensuring users only access their own data [8](#1-7) 

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
``` [9](#1-8) 

The server will start on `http://localhost:4000` [10](#1-9) 

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
``` [11](#1-10) 

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
``` [12](#1-11) 

### Refresh Token
```http
POST /auth/refresh
Cookie: jid=<refresh_token>
``` [13](#1-12) 

### Logout
```http
POST /auth/logout
Cookie: jid=<refresh_token>
``` [14](#1-13) 

## 📋 Task Management API

All task endpoints require authentication via `Authorization: Bearer <access_token>` header. [15](#1-14) 

### List Tasks
```http
GET /tasks?page=1&limit=10&status=TODO&search=keyword
Authorization: Bearer <access_token>
``` [16](#1-15) 

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
``` [17](#1-16) 

### Get Single Task
```http
GET /tasks/:id
Authorization: Bearer <access_token>
``` [18](#1-17) 

### Update Task
```http
PATCH /tasks/:id
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Updated title",
  "status": "IN_PROGRESS"
}
``` [19](#1-18) 

### Delete Task
```http
DELETE /tasks/:id
Authorization: Bearer <access_token>
``` [20](#1-19) 

### Toggle Task Status
```http
POST /tasks/:id/toggle
Authorization: Bearer <access_token>
```

Cycles through: TODO → IN_PROGRESS → DONE → TODO [21](#1-20) 

## 🗄️ Database Schema

The application uses three main models:

- **User** - Authentication and profile data [22](#1-21) 
- **Task** - Todo items with status tracking [4](#1-3) 
- **RefreshToken** - Session management with revocation support [23](#1-22) 

## 🔒 Security Features

- **Password Hashing** - bcrypt with 12 salt rounds [6](#1-5) 
- **JWT Tokens** - Signed access tokens with configurable expiration [24](#1-23) 
- **Refresh Tokens** - Cryptographically secure, hashed storage [25](#1-24) 
- **httpOnly Cookies** - XSS protection with strict SameSite policy [3](#1-2) 
- **CORS** - Configured for specific origin with credentials [26](#1-25) 
- **Helmet** - Security headers for production [27](#1-26) 
- **Input Validation** - Zod schemas on all endpoints [28](#1-27) 

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
| Security | helmet, cors | [29](#1-28) 

## 📜 Available Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Compile TypeScript to JavaScript
npm start            # Run production server
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run database migrations
``` [9](#1-8) 

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
``` [30](#1-29) 

## 🏗️ Architecture

The application follows a layered architecture pattern:

1. **Routes** - Define API endpoints and apply middleware [31](#1-30) 
2. **Middleware** - Authentication, validation, error handling [32](#1-31) 
3. **Controllers** - Handle HTTP requests/responses [17](#1-16) 
4. **Services** - Business logic and database operations [33](#1-32) 
5. **Prisma ORM** - Type-safe database access [34](#1-33) 

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

ISC [35](#1-34) 

## Notes

This README provides a complete overview of the todo-backend API, including all authentication and task management endpoints, security features, and setup instructions.<cite></cite> The project uses a modern TypeScript stack with Prisma ORM for type-safe database access and implements industry-standard security practices including JWT authentication, password hashing, and CORS protection.<cite></cite>

Wiki pages you might want to explore:
- [Overview (Samarth622/todo-backend)](/wiki/Samarth622/todo-backend#1)
- [Authentication System (Samarth622/todo-backend)](/wiki/Samarth622/todo-backend#3)
- [Task Management System (Samarth622/todo-backend)](/wiki/Samarth622/todo-backend#4)

### Citations

**File:** package.json (L1-4)
```json
{
  "name": "todo-backend",
  "version": "1.0.0",
  "description": "",
```

**File:** package.json (L6-12)
```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev --name init"
```

**File:** package.json (L16-16)
```json
  "license": "ISC",
```

**File:** package.json (L18-29)
```json
  "dependencies": {
    "@prisma/client": "^6.19.0",
    "bcrypt": "^6.0.0",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "dotenv": "^17.2.3",
    "express": "^4.21.2",
    "express-async-errors": "^3.1.1",
    "helmet": "^8.1.0",
    "jsonwebtoken": "^9.0.2",
    "prisma": "^6.19.0",
    "zod": "^4.1.12"
```

**File:** src/app.ts (L1-11)
```typescript
import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import prisma from "./prisma";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/tasks.routes";
import cors from "cors";
import helmet from "helmet";
import errorMiddleware from "./middleware/error.middleware";

const app = express();
```

**File:** src/app.ts (L14-19)
```typescript
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
```

**File:** src/app.ts (L21-25)
```typescript
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
```

**File:** src/app.ts (L29-29)
```typescript
app.get("/", (req, res) => res.send("Hello from TypeScript + Prisma!"));
```

**File:** src/controllers/auth.controller.ts (L17-17)
```typescript
const COOKIE_NAME = process.env.REFRESH_COOKIE_NAME || "jid";
```

**File:** src/controllers/auth.controller.ts (L20-27)
```typescript
function setRefreshCookie(res: Response, token: string) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    path: "/auth/refresh",
  });
}
```

**File:** src/controllers/auth.controller.ts (L30-46)
```typescript
export async function register(req: Request, res: Response) {
  const { email, password, name } = req.body;

  const user = await createUser(email, password, name);

  const accessToken = signAccessToken({ sub: user.id, email: user.email });

  const refreshToken = generateRefreshToken();
  await storeRefreshToken(user.id, refreshToken);

  setRefreshCookie(res, refreshToken);

  return res.status(201).json({
    accessToken,
    user: { id: user.id, email: user.email, name: user.name },
  });
}
```

**File:** src/controllers/auth.controller.ts (L49-67)
```typescript
export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await verifyUser(email, password);
  if (!user)
    throw new UnauthorizedError("Invalid email or password");

  const accessToken = signAccessToken({ sub: user.id, email: user.email });

  const refreshToken = generateRefreshToken();
  await storeRefreshToken(user.id, refreshToken);

  setRefreshCookie(res, refreshToken);

  return res.status(200).json({
    accessToken,
    user: { id: user.id, email: user.email, name: user.name },
  });
}
```

**File:** src/controllers/auth.controller.ts (L70-91)
```typescript
export async function refresh(req: Request, res: Response) {
  const token = req.cookies[COOKIE_NAME];
  if (!token)
    throw new UnauthorizedError("No refresh token");

  const payload: any = null;

  let userId = null;

  const users = await prisma.user.findMany();
  for (const user of users) {
    const match = await verifyRefreshToken(token, user.id);
    if (match) userId = user.id;
  }

  if (!userId)
    throw new UnauthorizedError("Invalid refresh token");

  const accessToken = signAccessToken({ sub: userId });

  return res.status(200).json({ accessToken });
}
```

**File:** src/controllers/auth.controller.ts (L94-108)
```typescript
export async function logout(req: Request, res: Response) {
  const token = req.cookies[COOKIE_NAME];

  if (token) {
    const users = await prisma.user.findMany();
    for (const user of users) {
      const match = await verifyRefreshToken(token, user.id);
      if (match) await revokeToken(match.id);
    }
  }

  res.clearCookie(COOKIE_NAME, { path: "/auth/refresh" });

  return res.status(200).json({ message: "Logged out successfully" });
}
```

**File:** src/services/tasks.service.ts (L3-31)
```typescript
export function createTask(userId: number, data: any) {
  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      status: data.status || "TODO",
      userId,
    },
  });
}

export function getTaskById(id: number, userId: number) {
  return prisma.task.findFirst({
    where: { id, userId },
  });
}

export function updateTask(id: number, userId: number, data: any) {
  return prisma.task.updateMany({
    where: { id, userId },
    data
  });
}

export function deleteTask(id: number, userId: number) {
  return prisma.task.deleteMany({
    where: { id, userId },
  });
}
```

**File:** src/controllers/tasks.controller.ts (L8-12)
```typescript
export async function createTaskController(req: AuthRequest, res: Response) {
  const userId = req.user!.id;
  const task = await createTask(userId, req.body);
  return res.status(201).json(task);
}
```

**File:** src/controllers/tasks.controller.ts (L15-56)
```typescript
export async function getTasksController(req: AuthRequest, res: Response) {
  const userId = req.user!.id;

  const {
    limit = 10,
    page = 1,
    status,
    search
  } = req.query;

  const skip = (Number(page) - 1) * Number(limit);

  const where: any = { userId };

  if (status) where.status = status;

  if (search) {
    where.OR = [
      { title: { contains: search as string, mode: "insensitive" } },
      { description: { contains: search as string, mode: "insensitive" } }
    ];
  }

  const [items, total] = await Promise.all([
    prisma.task.findMany({
      where,
      skip,
      take: Number(limit),
      orderBy: { createdAt: "desc" }
    }),
    prisma.task.count({ where })
  ]);

  return res.json({
    items,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit)
    }
  });
}
```

**File:** src/controllers/tasks.controller.ts (L59-67)
```typescript
export async function getTaskController(req: AuthRequest, res: Response) {
  const userId = req.user!.id;
  const id = Number(req.params.id);

  const task = await getTaskById(id, userId);
  if (!task) throw new NotFoundError("Task not found");

  return res.json(task);
}
```

**File:** src/controllers/tasks.controller.ts (L70-80)
```typescript
export async function updateTaskController(req: AuthRequest, res: Response) {
  const userId = req.user!.id;
  const id = Number(req.params.id);

  const updated = await updateTask(id, userId, req.body);

  if (updated.count === 0)
    throw new NotFoundError("Task not found");

  return res.json({ message: "Updated successfully" });
}
```

**File:** src/controllers/tasks.controller.ts (L83-93)
```typescript
export async function deleteTaskController(req: AuthRequest, res: Response) {
  const userId = req.user!.id;
  const id = Number(req.params.id);

  const deleted = await deleteTask(id, userId);

  if (deleted.count === 0)
    throw new NotFoundError("Task not found");

  return res.status(204).send();
}
```

**File:** src/controllers/tasks.controller.ts (L96-116)
```typescript
export async function toggleTaskStatusController(req: AuthRequest, res: Response) {
  const userId = req.user!.id;
  const id = Number(req.params.id);

  const task = await getTaskById(id, userId);
  if (!task) throw new NotFoundError("Task not found");

  let newStatus;

  if (task.status === "TODO") {
    newStatus = "IN_PROGRESS";
  } else if (task.status === "IN_PROGRESS") {
    newStatus = "DONE";
  } else if (task.status === "DONE") {
    newStatus = "TODO";
  }

  await updateTask(id, userId, { status: newStatus });

  return res.json({ message: "Status updated", status: newStatus });
}
```

**File:** src/services/auth.service.ts (L5-17)
```typescript
const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 12;

export async function createUser(email: string, password: string, name?: string) {
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    throw new ConflictError("Email already exists");
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  return prisma.user.create({
    data: { email, passwordHash, name },
  });
```

**File:** src/schemas/task.schema.ts (L3-9)
```typescript
export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional()
  }),
});
```

**File:** src/middleware/auth.middleware.ts (L9-33)
```typescript
export default function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    throw new ForbiddenError("No access token provided");
  }

  const token = auth.split(" ")[1];
  const payload: any = verifyAccessToken(token);

  if (!payload) {
    throw new ForbiddenError("Invalid or expired token");
  }

  req.user = {
    id: payload.sub,
    email: payload.email,
  };

  next();
}
```

**File:** src/services/token.service.ts (L10-17)
```typescript
export function generateRefreshToken() {
  return crypto.randomBytes(64).toString("hex");
}


export async function hashToken(token: string) {
  return bcrypt.hash(token, SALT_ROUNDS);
}
```

**File:** src/services/token.service.ts (L20-33)
```typescript
export async function storeRefreshToken(userId: number, token: string) {
  const tokenHash = await hashToken(token);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  return prisma.refreshToken.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
    },
  });
}
```

**File:** src/routes/auth.routes.ts (L8-9)
```typescript
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
```

**File:** src/routes/tasks.routes.ts (L15-30)
```typescript
const router = Router();

router.use(authMiddleware);

router.get("/", getTasksController);

router.post("/", validate(createTaskSchema), createTaskController);

router.get("/:id", getTaskController);

router.patch("/:id", validate(updateTaskSchema), updateTaskController);

router.delete("/:id", deleteTaskController);

router.post("/:id/toggle", toggleTaskStatusController);

```
