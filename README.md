# 📝 TodoList WebApp Full Stack

A simple Full Stack Todo Application with authentication system using:

- Frontend: Vite + React.js
- Backend: Express.js + Node.js
- Database: MySQL
- ORM: Prisma
- Authentication: JWT
- Features: Login, Register, Logout, Add Todo, Edit Todo, Delete Todo

---

# 🚀 Features

## Authentication
- Register
- Login
- Logout
- JWT Authentication
- Protected Routes

## Todo Features
- Add Todo
- Get Todo List
- Edit Todo
- Delete Todo

---

# 🛠 Tech Stack

## Frontend
- React.js
- Vite
- Axios
- React Router DOM
- Tailwind CSS

## Backend
- Node.js
- Express.js
- Prisma ORM
- MySQL
- JWT
- bcryptjs
- cors
- dotenv

---

# 📂 Project Structure

```bash
project/
│
├── client/
│   ├── src/
│   ├── .env
│   └── package.json
│
├── server/
│   ├── prisma/
│   ├── src/
│   ├── .env
│   └── package.json
│
└── README.md
```

---

# ⚙️ Environment Variables

## Frontend `.env`

```env
VITE_BASE_URL=http://localhost:3500
```

---

## Backend `.env`

```env
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/DATABASE_NAME"

DATABASE_USER=root
DATABASE_PASSWORD=yourpassword
DATABASE_NAME=todolist_db
DATABASE_HOST=localhost
DATABASE_PORT=3306

JWT_SECRET=your_jwt_secret

PORT=3500
```

---

# 📦 Installation

## 1. Clone Project

```bash
git clone <your-repository-url>
```

---

## 2. Install Frontend

```bash
cd client
npm install
```

---

## 3. Install Backend

```bash
cd server
npm install
```

---

# 🗄 Database Setup

## Create MySQL Database

```sql
CREATE DATABASE todolist_db;
```

---

## Prisma Setup

Generate Prisma Client

```bash
npx prisma generate
```

Run Migration

```bash
npx prisma migrate dev --name init
```

Push Database

```bash
npx prisma db push
```

Open Prisma Studio

```bash
npx prisma studio
```

---

# ▶️ Run Project

## Start Backend

```bash
cd server
npm run dev
```

Backend running on:

```bash
http://localhost:3500
```

---

## Start Frontend

```bash
cd client
npm run dev
```

Frontend running on:

```bash
http://localhost:5173
```

---

# 🔐 Authentication Flow

## Register
User creates account with:
- name
- email
- password

Password will be hashed using bcrypt.

---

## Login
User logs in using:
- email
- password

Backend returns JWT token.

---

## Protected Routes
Frontend sends token via Authorization Header:

```bash
Authorization: Bearer <token>
```

---

# 📌 API Endpoints

## Auth Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | /auth/register | Register User |
| POST | /auth/login | Login User |

---

## Todo Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | /todos | Get All Todos |
| POST | /todos | Create Todo |
| PATCH | /todos/:id | Update Todo |
| DELETE | /todos/:id | Delete Todo |

---

# 🧩 Prisma Example Schema

```prisma
model User {
  id       Int    @id @default(autoincrement())
  name     String
  email    String @unique
  password String
  todos    Todo[]
}

model Todo {
  id          Int     @id @default(autoincrement())
  description String
  isDone      Boolean @default(false)
  userId      Int
  user        User    @relation(fields: [userId], references: [id])
}
```

---

# 📮 Example Request Header

```js
headers: {
  Authorization: `Bearer ${token}`
}
```

---

# 👨‍💻 Author

Developed by Pan_Fifth & Allio & Nieiei & Bosszio & Nape🙏🏻
Supported by A.Jeang & A.Prince