# 📝 Post-Comment Service

A backend service that allows users to create posts and comments, designed with scalability, clean architecture, and database integrity in mind. Built using **Node.js**, **Express.js**, and **MySQL**, this project demonstrates a modular backend system ideal for blogging or discussion-based platforms.

---

## 🔧 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL

---

## 💡 Why MySQL?

- **Structured Data**: Perfect for relational data like posts and comments.
- **Foreign Keys**: Ensures referential integrity between users, posts, and comments.
- **Performance**: Efficient for read-heavy applications.
- **ACID Compliance**: Ensures data consistency and reliability.

---

## 🏗️ Architecture Overview

This project follows a **Modular MVC-like architecture** for clear separation of concerns and scalability:

- **Models**: Handle database schema and data operations using raw SQL or ORM.
- **Controllers**: Contain business logic and interact with models to process client requests.
- **Routes**: Define API endpoints and link them to corresponding controllers.
- **Middleware**: Contains reusable functions like authentication, validation, etc.
- **Config**: Centralized configuration files like database connection.

This structure keeps code clean, maintainable, and easy to extend with new features.


## ✨ Features

- **User Authentication** using JWT (JSON Web Tokens) for secure login and authorization.
- **CRUD Operations** for Posts and Comments.
- **Relational Database** (MySQL) with foreign key constraints to maintain data integrity.
- **Modular Architecture** with clear separation of concerns (Models, Controllers, Routes, Middleware).
- **Middleware-based Authentication** to protect routes.
- **Error Handling** with appropriate HTTP status codes and messages.
- **Timestamps** to track creation and update times of posts and comments.
- **Scalable Design** suitable for extending features like rich text support, notifications, etc.



## 🚀 Setup and Run

1. Clone the repository: git clone https://github.com/Ravindra230104/PostCommentService.git
2. Navigate to the project folder: cd server
3. Install dependencies: npm install
4. Create a `.env` file in the root directory with your own database credentials. Example `.env`:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=your_password
   DB_NAME=your_database
   PORT=3000
   JWT_SECRET=jwt secret
   ```
5. Start the server: node app.js



 


   



