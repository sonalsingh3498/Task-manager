# Task-manager
- Clone the Repository
- git clone https://github.com/sonalsingh3498/Task-manager.git
- cd Task-manager

# Backend (Server)
- cd server
- npm install
- Create a .env file in /server with

  - MONGO_URI=your_mongo_connection_string
  - JWT_SECRET=your_jwt_secret
  - PORT=5000

 Start the backend:
- npm run dev

# Frontend (Client)

- cd client
- npm install
- npm start

# API Endpoints
Auth Routes

- POST /api/auth/register → Register a new user
Body: { "username": "John", "email": "john@example.com", "password": "123456" }

- POST /api/auth/login → Login user
Body: { "email": "john@example.com", "password": "123456" }

Task Routes (protected, require Authorization: Bearer <token>)

- GET /api/tasks → Get all tasks for logged-in user

- POST /api/tasks → Create new task
Body: { "title": "Buy groceries" }

- PUT /api/tasks/:id → Update a task
Body: { "title": "Buy fruits", "completed": true }

- DELETE /api/tasks/:id → Delete a task

# Technologies Used
- Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs for password hashing

# Frontend
- React.js
- Axios for API calls
- React Router for navigation
- Context API / State management
- TailwindCSS / CSS Modules (depending on your setup)