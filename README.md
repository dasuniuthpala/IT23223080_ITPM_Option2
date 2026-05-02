# IT23223080 - ITPM Option 2
## ITPM Task Manager

**Student:** Uthpala G D  
**Student ID:** IT23223080  
**Course:** IT Project Management (ITPM)

A full-stack Task Management web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

---

## Features

- ✅ Create, read, update, and delete tasks
- 🏷️ Organize tasks by category
- 🎯 Set task priority (Low / Medium / High)
- 📊 Track task status (Todo / In Progress / Done)
- 📅 Set due dates for tasks
- 🔍 Filter tasks by category, status, and priority

---

## Tech Stack

| Layer     | Technology        |
|-----------|-------------------|
| Frontend  | React.js          |
| Backend   | Node.js + Express |
| Database  | MongoDB           |
| HTTP      | Axios             |
| Routing   | React Router DOM  |

---

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (running locally) or MongoDB Atlas

### Backend Setup

```bash
cd backend
npm install
# (optional) edit .env to change MONGO_URI and PORT
npm run dev
```

The backend server will run at http://localhost:5000

### Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

The frontend app will open at http://localhost:3000

---

## API Endpoints

### Tasks
| Method | Endpoint             | Description         |
|--------|----------------------|---------------------|
| GET    | /api/tasks           | Get all tasks       |
| GET    | /api/tasks/:id       | Get a single task   |
| POST   | /api/tasks           | Create a task       |
| PUT    | /api/tasks/:id       | Update a task       |
| DELETE | /api/tasks/:id       | Delete a task       |

### Categories
| Method | Endpoint             | Description           |
|--------|----------------------|-----------------------|
| GET    | /api/categories      | Get all categories    |
| POST   | /api/categories      | Create a category     |
| DELETE | /api/categories/:id  | Delete a category     |

---

## Project Structure

```
IT23223080_ITPM_Option2/
├── backend/
│   ├── models/
│   │   ├── Task.js
│   │   └── Category.js
│   ├── routes/
│   │   ├── taskRoutes.js
│   │   └── categoryRoutes.js
│   ├── server.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axiosConfig.js
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── Navbar.css
│   │   ├── pages/
│   │   │   ├── TaskList.js
│   │   │   ├── AddTask.js
│   │   │   ├── EditTask.js
│   │   │   └── Categories.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.css
│   └── package.json
└── README.md
```
