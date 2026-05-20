# 💰 Personal Finance Dashboard

A full-stack expense tracking application that helps you manage your finances, track spending by category, and visualize your monthly expenses. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and styled with Tailwind CSS.

## 🚀 Project Live Demo

[View Live App on Loom] (https://www.loom.com/share/8efc749723ec4a349234c432c7192e81)

## 🗄️ Database

This project uses **MongoDB** with **Mongoose** ODM. During development, data is stored locally using MongoDB Compass. For production, it can be easily migrated to MongoDB Atlas.

## ✨ Features

- ✅ **User Authentication** – Secure registration and login with JWT tokens
- ✅ **Password Encryption** – Passwords are hashed using bcrypt for security
- ✅ **Expense Management** – Add, edit, and delete expenses with ease
- ✅ **Category System** – 8 predefined spending categories to organize your expenses
- ✅ **Monthly Analytics** – Filter expenses by month and year to track spending trends
- ✅ **Data Visualization** – Interactive pie chart showing spending breakdown by category
- ✅ **CSV Export** – Download all your expenses as a CSV file for offline analysis
- ✅ **Responsive Design** – Works seamlessly on desktop, tablet, and mobile devices
- ✅ **Toast Notifications** – Real-time feedback for all user actions

## 🛠️ Tech Stack

### Frontend

| React.js 18 | UI library for building the user interface |
| Tailwind CSS | Utility-first CSS framework for styling |
| Chart.js | Interactive charts and data visualization |
| Axios | HTTP client for API requests |
| React Router DOM | Client-side routing and navigation |
| React Hot Toast | Beautiful notification popups |

### Backend

| Node.js | JavaScript runtime for server-side code |
| Express.js | Web framework for building REST APIs |
| MongoDB | NoSQL database for storing user and expense data |
| Mongoose | ODM library for MongoDB data modeling |
| JWT | JSON Web Tokens for secure authentication |
| Bcryptjs | Password hashing for security |
| Express Validator | Input validation for API endpoints |

## 🚀 Quick Start

### Install Dependencies
```bash
# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install

## 🏃‍♂️ Running Locally

### Start the Backend Server
```bash
cd backend
npm install
npm run dev

## start Frontend
cd frontend
npm install
npm start
