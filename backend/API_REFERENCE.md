# TT Breathwork Toolkit - API Reference

## Base URL

Development: `http://localhost:3000/api`
Production: `https://toolkit.timvandervliet.com/api`

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

Tokens are obtained from:
- `/auth/validate-code` - Temporary session token
- `/auth/claim-code` - Permanent user token
- `/auth/login` - Login token

Token expiry: 90 days

## Response Format

### Success Response
```json
{
  "success": true,
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "details": []
}
```

## Endpoints

### Health Check

#### `GET /health`

Check API health status.

**Authentication:** Not required

**Response:**
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "uptime": 3600
}
```

---

### Authentication Endpoints

#### `POST /auth/validate-code`

Validate an access code and get temporary session.

**Authentication:** Not required

**Request Body:**
```json
{
  "code": "TT-2025-A7B9C2"
}
```

**Validation Rules:**
- `code` must match format: `TT-YYYY-XXXXXX`
- Code must be active (not used or revoked)

**Success Response (200):**
```json
{
  "success": true,
  "sessionToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "hasAccount": false,
  "codeId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Error Responses:**
- `400` - Invalid code format or code not found
- `400` - Code has been used or revoked

---

#### `POST /auth/claim-code`

Claim an access code with email to create permanent account.

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "instructor@example.com",
  "codeId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Validation Rules:**
- `email` must be valid email format
- `codeId` must be valid UUID
- Email must not already be registered
- Code must not already be claimed

**Success Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "email": "instructor@example.com",
    "brandData": {}
  }
}
```

**Error Responses:**
- `400` - Invalid email or codeId
- `404` - Code not found
- `409` - Code already claimed or email already registered

---

#### `POST /auth/login`

Login with existing email.

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "instructor@example.com"
}
```

**Validation Rules:**
- `email` must be valid email format
- Email must be registered

**Success Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "email": "instructor@example.com",
    "brandData": {
      "fullName": "John Doe",
      "logo": "base64_image_data"
    },
    "createdAt": "2025-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Invalid email format
- `404` - User not found

---

### Brand Management Endpoints

#### `POST /brand/save`

Save or update brand data for a user.

**Authentication:** Required

**Request Body:**
```json
{
  "userId": "660e8400-e29b-41d4-a716-446655440000",
  "brandData": {
    "logo": "data:image/png;base64,iVBORw0KGgo...",
    "photo": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
    "colorPalette": {
      "name": "Tim's Classic",
      "primary": "#0B2545",
      "accent": "#3ABAB4",
      "secondary": "#D4AF37"
    },
    "fullName": "John Doe",
    "credentials": "Certified TT Breathwork Instructor",
    "businessName": "Breathwork with John",
    "location": "Amsterdam, Netherlands",
    "phone": "+31 6 1234 5678",
    "email": "john@example.com",
    "website": "https://breathworkwithjohn.com",
    "instagram": "@breathworkjohn",
    "linkedin": "linkedin.com/in/johndoe"
  }
}
```

**Validation Rules:**
- `userId` must be valid UUID
- `brandData` must be an object
- Existing data is merged with new data

**Success Response (200):**
```json
{
  "success": true,
  "brandData": {
    "fullName": "John Doe",
    "logo": "data:image/png;base64,..."
  }
}
```

**Error Responses:**
- `400` - Invalid userId or brandData
- `401` - Unauthorized
- `404` - User not found

---

#### `GET /brand/:userId`

Retrieve brand data for a user.

**Authentication:** Required

**URL Parameters:**
- `userId` - User UUID

**Success Response (200):**
```json
{
  "success": true,
  "brandData": {
    "fullName": "John Doe",
    "logo": "data:image/png;base64,..."
  },
  "user": {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "email": "instructor@example.com",
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T12:00:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Invalid userId
- `401` - Unauthorized
- `404` - User not found

---

### Asset Management Endpoints

#### `POST /assets/generate/:templateId`

Generate a new asset from template.

**Authentication:** Required

**URL Parameters:**
- `templateId` - Template identifier (e.g., "onePager", "businessCard")

**Request Body:**
```json
{
  "userId": "660e8400-e29b-41d4-a716-446655440000",
  "customizations": {
    "headline": "Custom headline",
    "colors": {
      "primary": "#0B2545"
    }
  }
}
```

**Validation Rules:**
- `userId` must be valid UUID
- `customizations` is optional object

**Success Response (200):**
```json
{
  "success": true,
  "asset": {
    "id": "770e8400-e29b-41d4-a716-446655440000",
    "fileName": "one-pager.pdf",
    "downloadUrl": "/api/assets/download/770e8400-e29b-41d4-a716-446655440000"
  }
}
```

**Error Responses:**
- `400` - Invalid userId or templateId
- `401` - Unauthorized
- `404` - User not found

---

#### `GET /assets/:userId`

Get all assets for a user.

**Authentication:** Required

**URL Parameters:**
- `userId` - User UUID

**Success Response (200):**
```json
{
  "success": true,
  "assets": [
    {
      "id": "770e8400-e29b-41d4-a716-446655440000",
      "userId": "660e8400-e29b-41d4-a716-446655440000",
      "assetType": "onePager",
      "fileName": "one-pager.pdf",
      "filePath": "/app/uploads/assets/660e8400.../one-pager.pdf",
      "fileSize": 245678,
      "downloads": 3,
      "createdAt": "2025-01-15T10:30:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `400` - Invalid userId
- `401` - Unauthorized

---

#### `GET /assets/download/:assetId`

Download a specific asset.

**Authentication:** Required

**URL Parameters:**
- `assetId` - Asset UUID

**Success Response (200):**
- Returns PDF file stream
- Content-Type: application/pdf
- Increments download counter

**Error Responses:**
- `400` - Invalid assetId
- `401` - Unauthorized
- `404` - Asset not found

---

### Launch Plan Endpoints

#### `GET /launch-plan/:userId`

Get launch plan progress for a user.

**Authentication:** Required

**URL Parameters:**
- `userId` - User UUID

**Success Response (200):**
```json
{
  "success": true,
  "progress": [
    {
      "id": "880e8400-e29b-41d4-a716-446655440000",
      "userId": "660e8400-e29b-41d4-a716-446655440000",
      "week": 1,
      "completed": true,
      "completedAt": "2025-01-15T10:30:00.000Z"
    },
    {
      "id": "990e8400-e29b-41d4-a716-446655440000",
      "userId": "660e8400-e29b-41d4-a716-446655440000",
      "week": 2,
      "completed": false,
      "completedAt": null
    }
  ]
}
```

**Error Responses:**
- `400` - Invalid userId
- `401` - Unauthorized
- `404` - User not found

---

#### `POST /launch-plan/complete-week`

Mark a week as completed in the launch plan.

**Authentication:** Required

**Request Body:**
```json
{
  "userId": "660e8400-e29b-41d4-a716-446655440000",
  "week": 1
}
```

**Validation Rules:**
- `userId` must be valid UUID
- `week` must be integer between 1-12

**Success Response (200):**
```json
{
  "success": true,
  "showCelebration": false,
  "progress": {
    "id": "880e8400-e29b-41d4-a716-446655440000",
    "userId": "660e8400-e29b-41d4-a716-446655440000",
    "week": 1,
    "completed": true,
    "completedAt": "2025-01-15T10:30:00.000Z"
  },
  "totalCompleted": 1,
  "totalWeeks": 12
}
```

**Celebration Logic:**
- `showCelebration: true` when week is 4, 8, 12 (milestones)

**Error Responses:**
- `400` - Invalid userId or week number
- `401` - Unauthorized
- `404` - User not found

---

## Rate Limiting

Currently not implemented. Recommended to add:
- 100 requests per 15 minutes per IP
- 1000 requests per day per user

## CORS

CORS is configured to allow requests from:
- Development: `http://localhost:5173`
- Production: `https://toolkit.timvandervliet.com`

## Data Types

### Code Status
- `active` - Code is available for use
- `used` - Code has been claimed by a user
- `revoked` - Code has been deactivated

### Asset Types
- `onePager` - One-page business summary
- `businessCard` - Business card design
- `welcomeEmail` - Welcome email template
- `healthForm` - Health intake form
- `waiverForm` - Liability waiver
- ... (19 total types)

### Color Palette Object
```json
{
  "name": "Palette Name",
  "primary": "#0B2545",
  "accent": "#3ABAB4",
  "secondary": "#D4AF37"
}
```

## Error Codes

- `400` - Bad Request (validation failed)
- `401` - Unauthorized (missing/invalid token)
- `404` - Not Found (resource doesn't exist)
- `409` - Conflict (duplicate resource)
- `500` - Internal Server Error

## Changelog

### v1.0.0 (2025-01-15)
- Initial API release
- Authentication system
- Brand management
- Asset generation (placeholder)
- Launch plan tracking
