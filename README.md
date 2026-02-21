# NoteHub API

**NoteHub API** is a learning-focused pet project built to practice and master back-end development fundamentals. It provides a RESTful API for user authentication and note management, designed primarily to serve the NoteHub frontend application, and also structured to be reusable with any client that shares the same core goal: storing and editing notes within a user profile.

👉 **Frontend repository:** [https://github.com/hellvita/notehub-helvita](https://github.com/hellvita/notehub-helvita)

---

## Purpose

The main purpose of this project is to implement a real-world backend that supports:

- User accounts and authentication
- Secure session management
- Full CRUD operations for notes
- Searching, sorting and paginating user data
- File storage and delivery (user avatars)

This project was created as part of full-stack developer studies and focuses equally on best practices and experimentation.

---

## Core Features

### Authentication & Sessions

- ✅ User registration, login, logout and account deletion
- ✅ Session-based authentication with access and refresh tokens
- ✅ Sessions stored in the database with token metadata (expiration, ownership)

### Notes Management

- ✅ Create, read, update and delete notes
- ✅ Search notes by content
- ✅ Flexible sorting
- ✅ Pagination support

### File Handling

- ✅ User avatar upload and storage via Cloudinary

---

## Tech Stack

- **Node.js** v22.17.0
- **Express** ^5.2.1
- **Mongoose** ^9.2.1
- **MongoDB** (cloud-hosted)
- **Cloudinary** (file storage)

---

## Project Structure

The codebase is intentionally structured to be readable and scalable. It follows a layered approach with clear separation of concerns:

- `routes`
- `controllers`
- `services`
- `models`
- `validation schemas`
- `middlewares`
- `helpers, constants and utilities`

Naming, imports and file organization are treated as first-class concerns to keep the code approachable and maintainable.

---

## Documentation

Detailed API documentation is available in **`documentation.md`**. It includes, for every endpoint:

- HTTP method
- Endpoint path
- Parameters
- Request body structure
- Possible responses with status codes
- Example response payloads

---

## Getting Started

### Requirements

- **Node.js** 22+
- **MongoDB** (you'll need your own cluster for development)
- **Cloudinary** account

### Setup

1. **Clone the repository**

2. **Install dependencies:**

```bash
   npm install
```

3. **Create a `.env` file** using `.env.example` as a reference  
   _(the example file explains where to obtain each variable)_

4. **Run the project:**

   **Development mode:**

```bash
   npm run dev
```

> Requires `nodemon` (`npm i nodemon`) or replace with `node --watch src/index.js`

**Production mode:**

```bash
   npm start
```

Once environment variables are set, the API is ready to use.

---

## Status

This project is **functionally complete** and fully supports the NoteHub frontend. At the same time, it intentionally leaves room for further development and experimentation - both unused features and potential extensions.

> Built as a pet project with real architectural intent.

---

## Author

Created with 💙 by [Olha Sereda](https://github.com/hellvita)
