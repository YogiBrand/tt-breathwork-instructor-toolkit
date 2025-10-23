# TT Breathwork Toolkit - Backend API

Node.js backend API for the TT Breathwork Instructor Toolkit.

## Features

- JWT-based authentication with 90-day sessions
- Code-based access system
- Brand data management
- Asset generation and storage
- Launch plan progress tracking
- PDF generation with Puppeteer
- Email notifications with Nodemailer
- PostgreSQL database with Prisma ORM

## Project Structure

```
backend/
├── server.js                 # Express server entry point
├── package.json             # Dependencies and scripts
├── .env.example             # Environment variables template
│
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Migration history
│
├── controllers/             # Request handlers
│   ├── authController.js
│   ├── brandController.js
│   ├── assetController.js
│   └── launchPlanController.js
│
├── routes/                  # API routes
│   ├── auth.js
│   ├── brand.js
│   ├── assets.js
│   └── launchPlan.js
│
├── services/                # Business logic
│   ├── codeService.js
│   ├── emailService.js
│   ├── pdfService.js
│   └── storageService.js
│
├── middleware/              # Express middleware
│   ├── auth.js
│   ├── validation.js
│   └── errorHandler.js
│
├── utils/                   # Utilities
│   ├── jwt.js
│   ├── logger.js
│   └── config.js
│
├── templates/               # PDF HTML templates
│   └── pdf/
│
└── scripts/                 # Utility scripts
    └── seedCodes.js
```

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
nano .env  # Edit with your values
```

Required environment variables:

```bash
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/tt_toolkit
JWT_SECRET=your_secure_random_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
FRONTEND_URL=http://localhost:5173
```

### 3. Initialize Database

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Optional: Open Prisma Studio
npx prisma studio
```

### 4. Generate Access Codes

```bash
# Generate 100 codes (default)
npm run seed

# Generate specific number of codes
node scripts/seedCodes.js 50
```

### 5. Start Server

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

## API Endpoints

### Health Check

#### GET `/api/health`

Check server status.

**Response:**
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "uptime": 3600
}
```

### Authentication

#### POST `/api/auth/validate-code`

Validate an access code.

**Request:**
```json
{
  "code": "TT-2025-A7B9C2"
}
```

**Response:**
```json
{
  "success": true,
  "sessionToken": "jwt_token_here",
  "hasAccount": false,
  "codeId": "uuid"
}
```

#### POST `/api/auth/claim-code`

Claim a code with email.

**Request:**
```json
{
  "email": "instructor@example.com",
  "codeId": "uuid"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "uuid",
    "email": "instructor@example.com",
    "brandData": {}
  }
}
```

#### POST `/api/auth/login`

Login with existing email.

**Request:**
```json
{
  "email": "instructor@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "uuid",
    "email": "instructor@example.com",
    "brandData": {}
  }
}
```

### Brand Management

#### POST `/api/brand/save`

Save brand data (requires authentication).

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Request:**
```json
{
  "userId": "uuid",
  "brandData": {
    "fullName": "John Doe",
    "logo": "base64_encoded_image",
    "colorPalette": {
      "primary": "#0B2545"
    }
  }
}
```

**Response:**
```json
{
  "success": true,
  "brandData": {}
}
```

#### GET `/api/brand/:userId`

Get brand data (requires authentication).

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "success": true,
  "brandData": {},
  "user": {
    "id": "uuid",
    "email": "instructor@example.com",
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T10:30:00.000Z"
  }
}
```

### Assets

#### POST `/api/assets/generate/:templateId`

Generate asset from template (requires authentication).

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Request:**
```json
{
  "userId": "uuid",
  "customizations": {}
}
```

**Response:**
```json
{
  "success": true,
  "asset": {
    "id": "uuid",
    "fileName": "one-pager.pdf",
    "downloadUrl": "/api/assets/download/uuid"
  }
}
```

#### GET `/api/assets/:userId`

Get all assets for user (requires authentication).

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "success": true,
  "assets": []
}
```

#### GET `/api/assets/download/:assetId`

Download specific asset (requires authentication).

**Headers:**
```
Authorization: Bearer jwt_token_here
```

### Launch Plan

#### GET `/api/launch-plan/:userId`

Get launch plan progress (requires authentication).

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "success": true,
  "progress": [
    {
      "week": 1,
      "completed": true,
      "completedAt": "2025-01-15T10:30:00.000Z"
    }
  ]
}
```

#### POST `/api/launch-plan/complete-week`

Mark week as completed (requires authentication).

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Request:**
```json
{
  "userId": "uuid",
  "week": 1
}
```

**Response:**
```json
{
  "success": true,
  "showCelebration": false,
  "progress": {},
  "totalCompleted": 1,
  "totalWeeks": 12
}
```

## Error Handling

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message here",
  "details": []
}
```

Common HTTP status codes:
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing/invalid token)
- `404` - Not Found
- `409` - Conflict (duplicate resource)
- `500` - Internal Server Error

## Development

### Run Tests

```bash
npm test
```

### Database Migrations

```bash
# Create new migration
npx prisma migrate dev --name migration_name

# Reset database
npx prisma migrate reset
```

### View Logs

Logs are written to:
- `/var/log/tt-toolkit/error.log` - Error logs
- `/var/log/tt-toolkit/combined.log` - All logs

In development, logs also appear in console.

## Docker

Build and run with Docker:

```bash
# Build image
docker build -t tt-toolkit-backend .

# Run container
docker run -p 3000:3000 --env-file .env tt-toolkit-backend
```

## Production Deployment

### Environment Setup

1. Set `NODE_ENV=production`
2. Use strong `JWT_SECRET`
3. Configure SSL for database connection
4. Set up proper SMTP credentials
5. Configure log rotation

### Process Management

Use PM2 for process management:

```bash
pm2 start server.js --name tt-toolkit-backend
pm2 save
pm2 startup
```

## Security

- All passwords hashed with bcrypt
- JWT tokens expire after 90 days
- CORS restricted to frontend URL
- Helmet.js for security headers
- Input validation with express-validator
- SQL injection protection via Prisma
- Rate limiting (recommended to add)

## Performance

- Connection pooling via Prisma
- Async/await throughout
- Efficient database queries
- PDF generation in background (planned)
- Image optimization with Sharp
- Graceful shutdown handling

## License

Proprietary - All rights reserved by Tim van der Vliet
