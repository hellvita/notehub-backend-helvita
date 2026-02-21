# 📘 NoteHub API

Base URL: `https://notehub-helvita-api.onrender.com`

API for managing notes and user authentication.

---

## Auth

User authentication endpoints

- [Get User Session](#get-user-session)
- [Register User](#register-user)
- [Login User](#login-user)
- [Logout User](#logout-user)

## Users

Operations on the user data

- [Get User](#get-user)
- [Update User](#update-user)
- [Update User Avatar](#update-user-avatar)
- [Delete User](#delete-user)

## Notes

Operations on the notes collection

- [Get Notes](#get-notes)
- [Get Note](#get-note)
- [Get Note Draft](#get-note-draft)
- [Create Note](#create-note)
- [Update Note](#update-note)
- [Update Note Draft](#update-note-draft)
- [Delete Note](#delete-note)

---

---

## Get User Session

Refresh the current session tokens.

```
GET /auth/session
```

### Parameters

_No parameters._

### Request Body

_No request body._

### Responses

| Status | Description                             |
| ------ | --------------------------------------- |
| `200`  | Tokens refreshed successfully           |
| `401`  | Unauthorized - missing or invalid token |

<details>
<summary><code>200</code> - Success</summary>

```json
{
  "success": true,
  "message": "Session refreshed"
}
```

</details>

---

## Register User

Register a new user.

```
POST /auth/register
```

### Parameters

_No parameters._

### Request Body

| Field      | Type   | Required | Description                 |
| ---------- | ------ | -------- | --------------------------- |
| `email`    | string | ✅       | User email                  |
| `password` | string | ✅       | User password (min 6 chars) |

```json
{
  "email": "example@mail.com",
  "password": "123456"
}
```

### Responses

| Status | Description                                  |
| ------ | -------------------------------------------- |
| `201`  | User registered successfully                 |
| `400`  | Validation error - invalid or missing fields |
| `409`  | User already exists                          |

<details>
<summary><code>201</code> - Created</summary>

```json
{
  "_id": "0000a0000aaaaa0000aa0000",
  "id": "0000a0000aaaaa0000aa0000"
  "email": "example@mail.com",
  "username": "example",
  "avatar": "https://res.cloudinary.com/dtzkjc68z/image/upload/v1771176027/notehub-helvita/avatars/default/nqbgcatljocysnj7jviq.jpg",
  "notesAmount": 0,
  "createdAt": "2026-02-21T17:16:54.759Z",
  "updatedAt": "2026-02-21T17:16:54.759Z",
}
```

#### Headers:

| Name         | Type   | Description                                                                           |
| ------------ | ------ | ------------------------------------------------------------------------------------- |
| `Set-Cookie` | string | Sets `sessionId`, `accessToken` and `refreshToken` cookies on successful registration |

</details>

<details>
<summary><code>400</code> - Validation Error</summary>

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "validation": {
    "body": {
      "source": "body",
      "keys": ["password"],
      "message": "\"password\" length must be at least 6 characters long"
    }
  }
}
```

</details>

---

## Login User

Login a user.

```
POST /auth/login
```

### Parameters

_No parameters._

### Request Body

| Field      | Type   | Required | Description                 |
| ---------- | ------ | -------- | --------------------------- |
| `email`    | string | ✅       | User email                  |
| `password` | string | ✅       | User password (min 6 chars) |

```json
{
  "email": "example@mail.com",
  "password": "123456"
}
```

### Responses

| Status | Description                                  |
| ------ | -------------------------------------------- |
| `200`  | Login successful                             |
| `400`  | Validation error - invalid or missing fields |
| `401`  | Unauthorized - invalid credentials           |

<details>
<summary><code>200</code> - Success</summary>

```json
{
  "_id": "0000a0000aaaaa0000aa0000",
  "id": "0000a0000aaaaa0000aa0000"
  "email": "example@mail.com",
  "username": "example",
  "avatar": "https://res.cloudinary.com/dtzkjc68z/image/upload/v1771176027/notehub-helvita/avatars/default/nqbgcatljocysnj7jviq.jpg",
  "notesAmount": 0,
  "createdAt": "2026-02-21T17:16:54.759Z",
  "updatedAt": "2026-02-21T17:16:54.759Z",
}
```

#### Headers:

| Name         | Type   | Description                                                |
| ------------ | ------ | ---------------------------------------------------------- |
| `Set-Cookie` | string | Sets `sessionId`, `accessToken` and `refreshToken` cookies |

</details>

<details>
<summary><code>400</code> - Validation Error</summary>

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "validation": {
    "body": {
      "source": "body",
      "keys": ["password"],
      "message": "\"password\" is required"
    }
  }
}
```

</details>

---

_Last updated: 2026-02-21_
