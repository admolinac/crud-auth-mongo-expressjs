# Event API Documentation

A RESTful API for managing financial events built with Node.js, Express, and MongoDB.

## DEMO videos

```
https://drive.google.com/drive/folders/1YyL4hxtQ2wGB8CJKiKVi9twALmbXYbXr?usp=sharing
```

## Base URL

```
http://localhost:3001
```

---

## Authentication

The API supports three authentication methods:

### 1. Basic Authentication

Use HTTP Basic Authentication with your username and password.

```bash
# Example using curl
curl -X GET http://localhost:3001/api/v1/events \
  -H "Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ="
```

### 2. JWT Authentication

First, obtain a JWT token by logging in, then use it in subsequent requests.

**Login Endpoint:**
`POST /auth/login`

**Request:**

```json
{
  "username": "your_username",
  "password": "your_password"
}
```

**Response:**

```json
{
  "code": "OK",
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Using the token:**

```bash
# Example using curl
curl -X GET http://localhost:3001/api/v1/events \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### 3. Session Authentication

**Login Endpoint:**
`POST /auth/session/login`

**Request:**

```json
{
  "username": "your_username",
  "password": "your_password"
}
```

**Response:**

```json
{
  "code": "OK",
  "message": "Login successful",
  "data": {
    "sessionId": "abc123..."
  }
}
```

The session cookie will be automatically handled by your browser.

## User Management Endpoints

### Register a new user

**Endpoint:**
`POST /auth/register`

**Request:**

```json
{
  "fullName": "Javier Suárez",
  "email": "javier.suarez@example.com",
  "age": 30,
  "password": "securePass123",
  "role": "user"
}
```

**Response:**

```json
{
  "code": "OK",
  "message": "User created successfully!",
  "data": {
    "fullName": "Javier Suárez",
    "email": "javier.suarez@example.com",
    "age": 30,
    "password": "$2b$08$YavmnHLolf9n/Hu1/O8PuOvNZVRdvWYynWPClXOMCwhMuKqUYBvNK",
    "role": "user",
    "_id": "68df150262ca16a4631f54eb",
    "__v": 0
  }
}
```

## Health Check

**Endpoint:**
`GET /health`

**Descripción:**
Verifica que el servicio y la base de datos estén funcionando correctamente.

**Response:**

```json
{
  "status": "OK",
  "uptime": 123.456,
  "dbStatus": "Connected"
}
```

---

## Endpoints de Events

### Obtener todos los eventos

**Endpoint:**
`GET /api/v1/events`

**Query Parameters (opcional):**

- `page` (number) - Número de página para paginación.
- `limit` (number) - Cantidad de registros por página.

**Ejemplos:**

```
GET /api/v1/events
GET /api/v1/events?page=2&limit=5
```

**Response (sin paginación):**

```json
{
  "code": "OK",
  "message": "Events are available",
  "data": [
    {
      "id": "a6b2d36f-6d2e-48f2-9f3a-12d9b6d0c7a1",
      "name": "Salary",
      "description": "Monthly salary payment",
      "amount": 1500,
      "date": "2025-03-01T00:00:00.000Z",
      "type": "income",
      "attachment": "salary-slip.pdf"
    }
  ]
}
```

**Response (con paginación):**

```json
{
  "code": "OK",
  "message": "Events are available",
  "data": [ ...paginated events... ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50
  }
}
```

---

### Obtener un evento por ID

**Endpoint:**
`GET /api/v1/events/:id`

**Path Parameters:**

- `id` (UUID) - ID del evento.

**Ejemplo:**

```
GET /api/v1/events/a6b2d36f-6d2e-48f2-9f3a-12d9b6d0c7a1
```

**Response:**

```json
{
  "code": "OK",
  "message": "Event found",
  "data": {
    "id": "a6b2d36f-6d2e-48f2-9f3a-12d9b6d0c7a1",
    "name": "Salary",
    "description": "Monthly salary payment",
    "amount": 1500,
    "date": "2025-03-01T00:00:00.000Z",
    "type": "income",
    "attachment": "salary-slip.pdf"
  }
}
```

---

### Crear un evento

**Endpoint:**
`POST /api/v1/events`

**Body Parameters:**

| Campo       | Tipo   | Obligatorio | Descripción                                  |
| ----------- | ------ | ----------- | -------------------------------------------- |
| name        | string | Sí          | Nombre del evento (1-20 caracteres)          |
| description | string | No          | Descripción del evento (máx. 100 caracteres) |
| amount      | number | Sí          | Monto positivo                               |
| date        | string | Sí          | Fecha en formato ISO (`YYYY-MM-DD`)          |
| type        | string | Sí          | "income" o "expense"                         |
| attachment  | string | No          | Archivo adjunto                              |

**Ejemplo:**

```json
{
  "name": "Freelance",
  "description": "Payment for project",
  "amount": 600,
  "date": "2025-04-01",
  "type": "income",
  "attachment": "invoice.pdf"
}
```

**Response:**

```json
{
  "code": "OK",
  "message": "Event created successfully!",
  "data": {
    "id": "generated-uuid",
    "name": "Freelance",
    "description": "Payment for project",
    "amount": 600,
    "date": "2025-04-01T00:00:00.000Z",
    "type": "income",
    "attachment": "invoice.pdf"
  }
}
```

---

### Actualizar un evento

**Endpoint:**
`PUT /api/v1/events/:id`

**Path Parameters:**

- `id` (UUID) - ID del evento a actualizar.

**Body Parameters:**
Se pueden enviar solo los campos a actualizar (mismos que en `POST`).

**Ejemplo:**

```json
{
  "amount": 650,
  "description": "Updated payment description"
}
```

**Response:**

```json
{
  "code": "OK",
  "message": "Event updated!",
  "data": {
    "id": "a6b2d36f-6d2e-48f2-9f3a-12d9b6d0c7a1",
    "name": "Freelance",
    "description": "Updated payment description",
    "amount": 650,
    "date": "2025-04-01T00:00:00.000Z",
    "type": "income",
    "attachment": "invoice.pdf"
  }
}
```

---

### Eliminar un evento

**Endpoint:**
`DELETE /api/v1/events/:id`

**Path Parameters:**

- `id` (UUID) - ID del evento a eliminar.

**Response:**

```json
{
  "code": "OK",
  "message": "Event deleted!",
  "data": {
    "id": "a6b2d36f-6d2e-48f2-9f3a-12d9b6d0c7a1",
    "name": "Salary",
    "description": "Monthly salary payment",
    "amount": 1500,
    "date": "2025-03-01T00:00:00.000Z",
    "type": "income",
    "attachment": "salary-slip.pdf"
  }
}
```

---

### Manejo de errores

**400 – Validación fallida**

```json
{
  "code": "VAL_ERR",
  "message": "Validation failed",
  "errors": [
    { "msg": "Name is mandatory.", "param": "name", "location": "body" }
  ]
}
```

**404 – No encontrado**

```json
{
  "code": "NF",
  "message": "Event not found"
}
```

**500 – Error interno**

```json
{
  "code": "ERR",
  "message": "Internal server error"
}
```

---

### Notas

- Todos los IDs de eventos son UUID.
- La paginación se realiza con query params `page` y `limit`.
- Los campos `description` y `attachment` son opcionales.
- Las fechas deben estar en formato ISO (`YYYY-MM-DD`).
- El tipo solo puede ser `"income"` o `"expense"`.
