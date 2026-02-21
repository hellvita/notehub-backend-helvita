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

## </details>

---
---



_Last updated: 2026-02-21_
