# Chat App Deployed

A full-stack real-time chat application built with React, Vite, Express, MongoDB, and Socket.IO.

## Overview

This project includes:

- A React frontend with authentication, protected routes, and a chat UI
- An Express backend with REST APIs for auth, users, and messages
- MongoDB for storing users, conversations, and messages
- Socket.IO for real-time online user updates and messaging support
- A production setup that serves the built frontend from the backend

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Zustand
- Tailwind CSS
- DaisyUI
- Socket.IO Client
- React Hot Toast

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT Authentication
- Cookie Parser
- Socket.IO

## Project Structure

```text
chat-app-deployed/
├── backend/
│   ├── controllers/
│   ├── db/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── socket/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── zustand/
│   ├── package.json
│   └── vite.config.js
├── package.json
└── README.md
```

## Features

- User signup and login
- JWT-based authentication with cookies
- Protected API routes
- Search and list conversations
- Send and receive messages
- Real-time online user tracking with Socket.IO
- Responsive chat layout
- Toast notifications for user feedback

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
MONGO_DB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
NODE_ENV=development
```

## Installation

### 1. Install root dependencies

```bash
npm install
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

## Running Locally

This project uses two processes during development.

### Terminal 1: start the backend

From the project root:

```bash
npm run server
```

### Terminal 2: start the frontend

```bash
cd frontend
npm run dev
```

The frontend Vite app runs on:

```text
http://localhost:5173
```

The backend runs on:

```text
http://localhost:3000
```

## Available Scripts

### Root scripts

```bash
npm run server   # start backend with nodemon
npm run start    # start backend with node
npm run build    # install deps and build frontend
```

### Frontend scripts

```bash
cd frontend
npm run dev
npm run build
npm run preview
npm run lint
```

## API Routes

### Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`

### Users
- `GET /api/user`

### Messages
- `GET /api/message/:id`
- `POST /api/message/send/:id`

## Production Build

To build the app for production:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

The backend serves the compiled frontend from `frontend/dist`.

## Important Note About Socket Connection

The frontend socket connection is currently pointed at a deployed backend URL:

```text
https://chat-app-deployed.onrender.com
```

If you want full real-time behavior during local development, update the Socket.IO client connection in the frontend to your local backend URL.

## Notes

- Authentication state is stored in local storage under `chat-user`
- Cookies are used for backend auth verification
- The current frontend `README.md` is still the default Vite template and can be replaced later if needed

## License

This project is for learning and personal development. It is not intended for production use.
```