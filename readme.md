# 📚 LMS Platform (Learning Management System)

A full-stack **Learning Management System (LMS)** built with modern web technologies.  
This platform allows **students to enroll in courses, watch lessons, track progress, and leave reviews**, while **instructors can create and manage courses**.

The project is inspired by platforms like **Udemy** and **Coursera**.

---

# 🚀 Features

## 👨‍🎓 Student Features
- Browse available courses
- View course details
- Enroll in courses
- Watch lessons
- Track learning progress
- Write course reviews
- Manage profile

## 👨‍🏫 Instructor Features
- Create courses
- Manage lessons
- Update course content

## 👑 Admin Features
- Manage users
- Monitor platform data

---

# 🛠 Tech Stack

## Frontend
- React
- React Router
- React Icons
- Axios
- Modern CSS

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- REST API

---

# 🗄 Database Collections

The system uses **MongoDB** with the following collections:

- Users
- Courses
- Lessons
- Enrollments
- Reviews

### Relationships

- **Instructor → creates → Course**
- **Course → contains → Lessons**
- **Student → enrolls → Course**
- **Student → writes → Review**
- **Enrollment → tracks → Progress**

---

# ⚙️ Requirements

Make sure the following tools are installed on your system:

- Git
- Node.js
- npm
- MongoDB

### Install Dependencies (Ubuntu / Linux)

```bash
sudo apt update && sudo apt upgrade
sudo apt install git nodejs npm mongodb
```

## 📦 Installation

Clone the repository and install dependencies.

```bash
git clone https://github.com/ranasaad-dev/LMS.git
cd LMS
npm install
```
## 🗄 Start MongoDB

Before starting the project, you must run **MongoDB**.

Open a new terminal and run:

```bash
mongod
```

This will start the MongoDB server in the background.

## 🔧 Environment Setup

Go to the backend folder and create the .env file. Example:
```
PORT=3000
JWT_SECRET="Anything_random_for_JWT_creation"
MONGO_URI=mongodb://localhost:27017/userDB
VITE_BACKEND_URL=http://localhost:3000/api
```

Update the MongoDB connection string:

## ▶️ Running the Project

#### Start the development server:
```
npm run dev
```
The application will start at:

http://localhost:5173
#### 📡 API Server

Backend API runs on:

http://localhost:3000

#### API Base URL:

http://localhost:3000/api
🔐 Authentication

The system uses JWT authentication.

User Roles

* student
* instructor
* admin

## Protected routes require:

Authorization: Bearer TOKEN
📂 Project Structure
```
LMS
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   └── .env
│
├── src
│   ├── components
│   ├── pages
│   ├── context
│   ├── services
│   └── routes
│
└── package.json
```
🎯 Future Improvements

### Possible future features:
Course search and filters
Instructor dashboards
Video streaming optimization
Payment integration
Notifications system
Course certificates

## 👨‍💻 Author

Developed as a full-stack LMS project using React and Node.js.