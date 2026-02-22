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

**Content-Type:** `application/json`

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
  "email": "example@mail.com",
  "username": "example",
  "avatar": "https://res.cloudinary.com/dtzkjc68z/image/upload/v1771176027/notehub-helvita/avatars/default/nqbgcatljocysnj7jviq.jpg",
  "notesAmount": 0,

  "createdAt": "2026-02-21T17:16:54.759Z",
  "updatedAt": "2026-02-21T17:16:54.759Z",

  "_id": "0000a0000aaaaa0000aa0000",
  "id": "0000a0000aaaaa0000aa0000"
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

**Content-Type:** `application/json`

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
  "email": "example@mail.com",
  "username": "example",
  "avatar": "https://res.cloudinary.com/dtzkjc68z/image/upload/v1771176027/notehub-helvita/avatars/default/nqbgcatljocysnj7jviq.jpg",
  "notesAmount": 0,

  "createdAt": "2026-02-21T17:16:54.759Z",
  "updatedAt": "2026-02-21T17:16:54.759Z",

  "_id": "0000a0000aaaaa0000aa0000",
  "id": "0000a0000aaaaa0000aa0000"
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

## Logout User

Logout the current user.

```
POST /auth/logout
```

### Parameters

_No parameters._

### Request Body

_No request body._

### Responses

| Status | Description             |
| ------ | ----------------------- |
| `204`  | Successfully logged out |
| `400`  | Missing session data    |

<details>
<summary><code>204</code> - Success</summary>

#### Headers:

| Name         | Type   | Description                                                  |
| ------------ | ------ | ------------------------------------------------------------ |
| `Set-Cookie` | string | Clears `sessionId`, `accessToken` and `refreshToken` cookies |

</details>

---

---

## Get User

Get the current user profile.

```
GET /users/me
```

### Parameters

_No parameters._

### Request Body

_No request body._

### Responses

| Status | Description                                   |
| ------ | --------------------------------------------- |
| `200`  | Successfully fetched user profile             |
| `401`  | Unauthorized - invalid or missing credentials |

<details>
<summary><code>200</code> - Success</summary>

```json
{
  "email": "example@mail.com",
  "username": "example",
  "avatar": "https://res.cloudinary.com/dtzkjc68z/image/upload/v1771176027/notehub-helvita/avatars/default/nqbgcatljocysnj7jviq.jpg",
  "notesAmount": 0,

  "createdAt": "2026-02-21T17:16:54.759Z",
  "updatedAt": "2026-02-21T17:16:54.759Z",

  "_id": "0000a0000aaaaa0000aa0000",
  "id": "0000a0000aaaaa0000aa0000"
}
```

</details>

---

## Update User

Update the current user profile.

```
PATCH /users/me
```

### Parameters

_No parameters._

### Request Body

**Content-Type:** `application/json`

| Field         | Type   | Required | Description                       |
| ------------- | ------ | -------- | --------------------------------- |
| `email`       | string | ❌\*     | User email                        |
| `username`    | string | ❌\*     | User name                         |
| `avatar`      | string | ❌\*     | User profile picture URL          |
| `password`    | string | ❌\*     | User password (min 6 chars)       |
| `notesAmount` | number | ❌\*     | User notes amount (integer, >= 0) |

|                                      |
| ------------------------------------ |
| **_\* at least one field required_** |

```json
{
  "username": "new cool name"
}
```

### Responses

| Status | Description                                   |
| ------ | --------------------------------------------- |
| `200`  | Successfully updated user profile             |
| `400`  | Validation error - invalid or missing fields  |
| `401`  | Unauthorized - invalid or missing credentials |

<details>
<summary><code>200</code> - Success</summary>

```json
{
  "email": "example@mail.com",
  "username": "new cool name",
  "avatar": "https://res.cloudinary.com/dtzkjc68z/image/upload/v1771176027/notehub-helvita/avatars/default/nqbgcatljocysnj7jviq.jpg",
  "notesAmount": 0,

  "createdAt": "2026-02-21T17:16:54.759Z",
  "updatedAt": "2026-02-21T17:16:54.759Z",

  "_id": "0000a0000aaaaa0000aa0000",
  "id": "0000a0000aaaaa0000aa0000"
}
```

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

## Update User Avatar

Update the avatar of the current user profile.

```
PATCH /users/me/avatar
```

### Parameters

_No parameters._

### Request Body

**Content-Type:** `multipart/form-data`

| Field    | Type | Required | Description                                           |
| -------- | ---- | -------- | ----------------------------------------------------- |
| `avatar` | file | ✅       | User profile picture (JPEG/JPG/PNG/GIF/WEBP, max 2MB) |

```bash
curl -X POST https://notehub-helvita-api.onrender.com/users/me/avatar \
  -F "avatar=@/path/to/photo.jpg"
```

### Responses

| Status | Description                                          |
| ------ | ---------------------------------------------------- |
| `200`  | Successfully updated user avatar                     |
| `400`  | Validation error - missing file or invalid file type |
| `401`  | Unauthorized - invalid or missing credentials        |
| `500`  | Internal Server Error - invalid file size            |

<details>
<summary><code>200</code> - Success</summary>

```json
{
  "url": "https://res.cloudinary.com/dtzkjc68z/image/upload/v1771768351/notehub-helvita/avatars/sqcx2nkw4c0pfwukmztk.jpg"
}
```

</details>

<details>
<summary><code>400</code> - Validation Error</summary>

```json
{
  "message": "Invalid file type. Only JPEG, PNG, GIF and WebP are allowed"
}
```

</details>

<details>
<summary><code>500</code> - Internal Server Error</summary>

```json
{
  "message": "File too large"
}
```

</details>

---

## Delete User

Delete the current user account.

```
DELETE /users/me
```

### Parameters

_No parameters._

### Request Body

_No request body._

### Responses

| Status | Description                             |
| ------ | --------------------------------------- |
| `204`  | Account deleted successfully            |
| `401`  | Unauthorized - missing or invalid token |

---

---

## Get Notes

Get all notes with optional search, filter and pagination.

```
GET /notes
```

### Parameters

| Name        | In    | Type   | Required | Description                                                                                                                                    |
| ----------- | ----- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `search`    | query | string | ❌       | Search text for note title or content                                                                                                          |
| `tag`       | query | string | ❌       | Filter notes by tag (Available values: `Todo`, `Work`, `Personal`, `Meeting`, `Shopping`, `Ideas`, `Travel`, `Finance`, `Health`, `Important`) |
| `page`      | query | number | ❌       | Page number (Integer, default value: `1`)                                                                                                      |
| `perPage`   | query | number | ❌       | Notes per page (Integer, default value: `10`)                                                                                                  |
| `sortBy`    | query | string | ❌       | Sort by any object field (Default value: `'_id'`)                                                                                              |
| `sortOrder` | query | string | ❌       | Sort `'asc'` or `'desc'` (Default value: `'desc'`)                                                                                             |

### Request Body

_No request body._

### Responses

| Status | Description                             |
| ------ | --------------------------------------- |
| `200`  | Successfully fetched list of notes      |
| `401`  | Unauthorized - missing or invalid token |

<details>
<summary><code>200</code> - Success</summary>

```json
{
  "page": 1,
  "perPage": 10,

  "totalNotes": 1,
  "totalPages": 1,

  "notes": [
    {
      "title": "Note",
      "content": "Made by Cool Name",
      "tag": "Personal",

      "createdAt": "2026-02-22T17:07:06.708Z",
      "updatedAt": "2026-02-22T17:07:06.708Z",

      "_id": "1111b1111bbbbb1111bb1111",
      "id": "1111b1111bbbbb1111bb1111"

      "userId": "0000a0000aaaaa0000aa0000",
    }
  ]
}
```

</details>

---

## Get Note

Get a single note by ID.

```
GET /notes/:noteId
```

### Parameters

| Name     | In   | Type   | Required | Description        |
| -------- | ---- | ------ | -------- | ------------------ |
| `noteId` | path | string | ✅       | The ID of the note |

```bash
curl -X GET https://notehub-helvita-api.onrender.com/notes/1111b1111bbbbb1111bb1111
```

### Request Body

_No request body._

### Responses

| Status | Description                               |
| ------ | ----------------------------------------- |
| `200`  | Successfully fetched the note             |
| `400`  | Validation error - invalid note ID format |
| `401`  | Unauthorized - missing or invalid token   |
| `404`  | Not found - invalid note ID or user ID    |

<details>
<summary><code>200</code> - Success</summary>

```json
{

  "title": "Note",
  "content": "Made by Cool Name",
  "tag": "Personal",

  "createdAt": "2026-02-22T17:07:06.708Z",
  "updatedAt": "2026-02-22T17:07:06.708Z",

  "_id": "1111b1111bbbbb1111bb1111",
  "id": "1111b1111bbbbb1111bb1111"

  "userId": "0000a0000aaaaa0000aa0000",
}
```

</details>

<details>
<summary><code>400</code> - Validation Error</summary>

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "validation": {
    "params": {
      "source": "params",
      "keys": ["noteId"],
      "message": "Invalid id format"
    }
  }
}
```

</details>

---

## Get Note Draft

Get draft of the unsaved user note.

```
GET /note-draft
```

### Parameters

_No parameters._

### Request Body

_No request body._

### Responses

| Status | Description                             |
| ------ | --------------------------------------- |
| `200`  | Successfully fetched the draft          |
| `401`  | Unauthorized - missing or invalid token |
| `404`  | Not found - invalid user ID             |

<details>
<summary><code>200</code> - Success</summary>

```json
{
  "title": "New note",
  "content": "I will fill it later...",
  "tag": "Todo",

  "createdAt": "2026-02-22T13:18:59.160Z",
  "updatedAt": "2026-02-22T13:18:59.160Z",

  "_id": "2222c2222ccccc2222cc2222",
  "id": "2222c2222ccccc2222cc2222"

  "userId": "0000a0000aaaaa0000aa0000",
}
```

</details>

---

## Create Note

Create a new note.

```
POST /notes
```

### Parameters

_No parameters._

### Request Body

**Content-Type:** `application/json`

| Field     | Type   | Required | Description                                                                                                                                                |
| --------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`   | string | ✅       | Note title                                                                                                                                                 |
| `content` | string | ❌       | Note content (Default value: `''`)                                                                                                                         |
| `tag`     | string | ❌       | Note tag (Available values: `Todo`, `Work`, `Personal`, `Meeting`, `Shopping`, `Ideas`, `Travel`, `Finance`, `Health`, `Important`. Default value: `Todo`) |

```json
{
  "title": "Cinema, 4pm",
  "tag": "Meeting"
}
```

### Responses

| Status | Description                                  |
| ------ | -------------------------------------------- |
| `201`  | Note created successfully                    |
| `400`  | Validation error - invalid or missing fields |
| `401`  | Unauthorized - missing or invalid token      |

<details>
<summary><code>201</code> - Created</summary>

```json
{
  "title": "Cinema, 4pm",
  "content": "",
  "tag": "Meeting",

  "createdAt": "2026-02-22T18:13:49.127Z",
  "updatedAt": "2026-02-22T18:13:49.127Z",

  "_id": "3333d3333ddddd3333dd3333",
  "id": "3333d3333ddddd3333dd3333"

  "userId": "0000a0000aaaaa0000aa0000",
}
```

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
      "keys": ["tag"],
      "message": "\"tag\" must be one of [Todo, Work, Personal, Meeting, Shopping, Ideas, Travel, Finance, Health, Important]"
    }
  }
}
```

</details>

---

## Update Note

Update an existing note by ID.

```
PATCH /notes/:noteId
```

### Parameters

| Name     | In   | Type   | Required | Description        |
| -------- | ---- | ------ | -------- | ------------------ |
| `noteId` | path | string | ✅       | The ID of the note |

```bash
curl -X PATCH https://notehub-helvita-api.onrender.com/notes/3333d3333ddddd3333dd3333
```

### Request Body

**Content-Type:** `application/json`

| Field     | Type   | Required | Description                                                                                                                         |
| --------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `title`   | string | ❌\*     | Note title                                                                                                                          |
| `content` | string | ❌\*     | Note content                                                                                                                        |
| `tag`     | string | ❌\*     | Note tag (Available values: `Todo`, `Work`, `Personal`, `Meeting`, `Shopping`, `Ideas`, `Travel`, `Finance`, `Health`, `Important`) |

|                                      |
| ------------------------------------ |
| **_\* at least one field required_** |

```json
{
  "content": "Wait at the bus station near the cinema"
}
```

### Responses

| Status | Description                                   |
| ------ | --------------------------------------------- |
| `200`  | Successfully updated note                     |
| `400`  | Validation error - invalid or missing fields  |
| `401`  | Unauthorized - invalid or missing credentials |
| `404`  | Not found - invalid note ID or user ID        |

<details>
<summary><code>200</code> - Success</summary>

```json
{
  "title": "Cinema, 4pm",
  "content": "Wait at the bus station near the cinema",
  "tag": "Meeting",

  "createdAt": "2026-02-22T18:13:49.127Z",
  "updatedAt": "2026-02-22T18:26:30.319Z",

  "_id": "3333d3333ddddd3333dd3333",
  "id": "3333d3333ddddd3333dd3333"

  "userId": "0000a0000aaaaa0000aa0000",
}
```

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
      "keys": [""],
      "message": "\"value\" must have at least 1 key"
    }
  }
}
```

</details>

---

## Update Note Draft

Update draft of the unsaved user note.

```
PATCH /note-draft
```

### Parameters

_No parameters._

### Request Body

**Content-Type:** `application/json`

| Field     | Type   | Required | Description                                                                                                                         |
| --------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `title`   | string | ❌\*     | Note title                                                                                                                          |
| `content` | string | ❌\*     | Note content                                                                                                                        |
| `tag`     | string | ❌\*     | Note tag (Available values: `Todo`, `Work`, `Personal`, `Meeting`, `Shopping`, `Ideas`, `Travel`, `Finance`, `Health`, `Important`) |

|                                      |
| ------------------------------------ |
| **_\* at least one field required_** |

```json
{
  "tag": "Ideas"
}
```

### Responses

| Status | Description                                   |
| ------ | --------------------------------------------- |
| `200`  | Successfully updated draft                    |
| `400`  | Validation error - invalid or missing fields  |
| `401`  | Unauthorized - invalid or missing credentials |
| `404`  | Not found - invalid user ID                   |

<details>
<summary><code>200</code> - Success</summary>

```json
{
  "title": "New note",
  "content": "I will fill it later...",
  "tag": "Ideas",

  "createdAt": "2026-02-22T13:18:59.160Z",
  "updatedAt": "2026-02-22T18:34:58.889Z",

  "_id": "2222c2222ccccc2222cc2222",
  "id": "2222c2222ccccc2222cc2222"

  "userId": "0000a0000aaaaa0000aa0000",
}
```

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
      "keys": ["anotherField"],
      "message": "\"anotherField\" is not allowed"
    }
  }
}
```

</details>

---

---

_Last updated: 2026-02-22_
