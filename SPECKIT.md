# TT Breathwork Instructor Toolkit - Technical Specification

## Project Overview

A white-label platform for TT Breathwork instructors to generate branded business materials. This toolkit provides newly certified instructors with 19 professional assets, a 90-day launch plan, and a complete business-in-a-box solution.

**Live URL:** `toolkit.timvandervliet.com`

## Core Features

### 1. Authentication System
- **Code-based entry:** Unique access codes (format: `TT-2025-A7B9C2`)
- **No-friction start:** Instant access without account creation
- **Optional account creation:** Save progress by providing email
- **Persistent sessions:** JWT-based authentication with 90-day expiry

### 2. Brand Wizard (One-time Setup)
Five-step guided process to capture instructor branding:
- **Step 1:** Upload logo and photo, choose color palette
- **Step 2:** Enter contact details and credentials
- **Step 3:** Define positioning and target audience
- **Step 4:** Configure services and pricing
- **Step 5:** Review and generate all assets

### 3. Dashboard Interface
Four organized tabs:
- **For You (8 assets):** Professional presence materials
- **For Clients (6 assets):** Client experience documents
- **For Companies (5 assets):** Corporate sales tools
- **Launch Plan:** 90-day step-by-step roadmap

### 4. Live Template Editor
- **Zone-based customization:** Click any element to edit
- **Real-time preview:** See changes instantly
- **Professional design preservation:** Constrained editing maintains quality
- **Visual controls:** Color pickers, font selectors, spacing adjusters

### 5. PDF Generation
- **19 pre-built templates** automatically branded
- **High-quality output:** Professional print-ready PDFs
- **Instant downloads:** Generate and download in seconds
- **Customization support:** Apply user edits to templates

### 6. Progress Tracking & Gamification
- **Progress bars:** Visual tracking through launch plan
- **Celebrations:** Confetti animations on completions
- **Week-by-week checklist:** 90-day guided path
- **Milestone rewards:** Encouraging feedback at key points

## Technical Stack

### Frontend
- **React 18.2** - UI framework
- **Vite 5.0** - Build tool and dev server
- **Tailwind CSS 3.4** - Utility-first styling
- **Framer Motion 11** - Animations and transitions
- **React Router 6** - Client-side routing
- **Zustand 4** - Lightweight state management
- **React Hook Form 7** - Form validation
- **React-PDF 7** - PDF preview in browser
- **Fabric.js 5** - Image editing and cropping
- **React-Colorful 5** - Color picker components
- **TinyColor2** - Color manipulation utilities

### Backend
- **Node.js 20 LTS** - Runtime environment
- **Express 4.18** - Web framework
- **PostgreSQL 15** - Primary database
- **Prisma 5** - ORM and database toolkit
- **Puppeteer 21** - PDF generation engine
- **Sharp 0.33** - Image processing
- **Nodemailer 6** - Email delivery
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcrypt** - Password hashing (if needed)
- **dotenv** - Environment configuration

### DevOps & Infrastructure
- **Docker 24** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx 1.25** - Reverse proxy and static files
- **Let's Encrypt** - SSL certificates
- **PM2** - Process management (optional)

## Project Structure

```
timvandervliet/
├── README.md                    # Setup and deployment guide
├── SPECKIT.md                   # This file - technical specification
├── docker-compose.yml           # Container orchestration
├── nginx.conf                   # Reverse proxy configuration
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
│
├── frontend/                    # React application
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   ├── .env.example
│   │
│   ├── public/
│   │   ├── tim-logo.svg
│   │   └── fonts/
│   │       ├── Inter-*.woff2
│   │       └── PlayfairDisplay-*.woff2
│   │
│   └── src/
│       ├── main.jsx             # App entry point
│       ├── App.jsx              # Root component
│       ├── index.css            # Global styles
│       │
│       ├── pages/               # Route components
│       │   ├── Landing.jsx
│       │   ├── CodeEntry.jsx
│       │   ├── BrandWizard.jsx
│       │   ├── Dashboard.jsx
│       │   ├── Editor.jsx
│       │   └── LaunchPlan.jsx
│       │
│       ├── components/
│       │   ├── layout/
│       │   │   ├── Header.jsx
│       │   │   ├── Sidebar.jsx
│       │   │   └── Footer.jsx
│       │   │
│       │   ├── wizard/          # Brand wizard steps
│       │   │   ├── Step1Visuals.jsx
│       │   │   ├── Step2Details.jsx
│       │   │   ├── Step3Positioning.jsx
│       │   │   ├── Step4Services.jsx
│       │   │   └── Step5Review.jsx
│       │   │
│       │   ├── editor/          # Template editor
│       │   │   ├── LivePreview.jsx
│       │   │   ├── EditPanel.jsx
│       │   │   ├── TextEditor.jsx
│       │   │   ├── ImageEditor.jsx
│       │   │   └── ColorPicker.jsx
│       │   │
│       │   ├── dashboard/       # Dashboard components
│       │   │   ├── TabNavigation.jsx
│       │   │   ├── AssetCard.jsx
│       │   │   ├── DownloadButton.jsx
│       │   │   └── ProgressBar.jsx
│       │   │
│       │   └── common/          # Reusable components
│       │       ├── Button.jsx
│       │       ├── Input.jsx
│       │       ├── Modal.jsx
│       │       ├── Toast.jsx
│       │       ├── Loader.jsx
│       │       └── Confetti.jsx
│       │
│       ├── store/               # State management
│       │   ├── brandStore.js
│       │   ├── authStore.js
│       │   └── assetStore.js
│       │
│       ├── utils/               # Utilities
│       │   ├── api.js
│       │   ├── pdfGenerator.js
│       │   ├── imageProcessor.js
│       │   └── validators.js
│       │
│       ├── templates/           # Template definitions
│       │   ├── onePager.js
│       │   ├── businessCard.js
│       │   ├── welcomeEmail.js
│       │   ├── healthForm.js
│       │   ├── waiverForm.js
│       │   └── ... (all 19 templates)
│       │
│       └── styles/
│           ├── animations.css
│           └── tim-theme.css
│
├── backend/                     # Node.js API
│   ├── package.json
│   ├── server.js                # Express app entry
│   ├── .env.example
│   │
│   ├── prisma/
│   │   ├── schema.prisma        # Database schema
│   │   └── migrations/          # Migration history
│   │
│   ├── routes/                  # API routes
│   │   ├── auth.js
│   │   ├── brand.js
│   │   ├── assets.js
│   │   └── download.js
│   │
│   ├── controllers/             # Request handlers
│   │   ├── authController.js
│   │   ├── brandController.js
│   │   ├── assetController.js
│   │   └── pdfController.js
│   │
│   ├── services/                # Business logic
│   │   ├── codeService.js
│   │   ├── emailService.js
│   │   ├── pdfService.js
│   │   └── storageService.js
│   │
│   ├── middleware/              # Express middleware
│   │   ├── auth.js
│   │   ├── validation.js
│   │   └── errorHandler.js
│   │
│   ├── utils/                   # Utilities
│   │   ├── jwt.js
│   │   ├── logger.js
│   │   └── config.js
│   │
│   ├── templates/               # PDF HTML templates
│   │   └── pdf/
│   │       ├── onePager.html
│   │       ├── businessCard.html
│   │       └── ... (all templates)
│   │
│   └── scripts/                 # Utility scripts
│       ├── seedCodes.js
│       └── backup.sh
│
└── database/
    ├── init.sql                 # Initial database setup
    └── seeds.sql                # Sample data
```

## Database Schema

### Prisma Schema Definition

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Code {
  id          String    @id @default(uuid())
  code        String    @unique
  status      String    @default("active") // active, used, revoked
  issuedAt    DateTime  @default(now())
  usedAt      DateTime?
  usedByEmail String?
  user        User?

  @@index([code])
  @@index([status])
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  codeId    String   @unique
  code      Code     @relation(fields: [codeId], references: [id])
  brandData Json     @default("{}")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  assets    Asset[]
  progress  LaunchProgress[]

  @@index([email])
}

model Asset {
  id         String   @id @default(uuid())
  userId     String
  user       User     @relation(fields: [userId], references: [id])
  assetType  String   // onePager, businessCard, welcomeEmail, etc.
  fileName   String
  filePath   String
  fileSize   Int
  customData Json?    @default("{}")
  createdAt  DateTime @default(now())
  downloads  Int      @default(0)

  @@index([userId])
  @@index([assetType])
}

model LaunchProgress {
  id          String    @id @default(uuid())
  userId      String
  user        User      @relation(fields: [userId], references: [id])
  week        Int
  completed   Boolean   @default(false)
  completedAt DateTime?

  @@unique([userId, week])
  @@index([userId])
}
```

### Brand Data JSON Structure

```json
{
  "logo": "base64_encoded_image",
  "photo": "base64_encoded_image",
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
  "linkedin": "linkedin.com/in/johndoe",
  "targetAudience": ["Corporate Executives", "Athletes"],
  "uniquePositioning": "Former corporate professional turned breathwork expert",
  "signatureTechnique": "TT5 - 5 Minutes to Clarity",
  "oneLine": "I help busy executives reduce stress through simple breathing techniques",
  "services": [
    {
      "type": "oneOnOne",
      "price": 150
    },
    {
      "type": "groupWorkshop",
      "price": 50
    },
    {
      "type": "corporate",
      "price": 2500
    }
  ]
}
```

## API Endpoints

### Authentication

#### POST `/api/auth/validate-code`
Validate an access code and create temporary session.

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
  "sessionToken": "jwt_token",
  "hasAccount": false
}
```

#### POST `/api/auth/claim-code`
Claim a code with email to create permanent account.

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
  "token": "jwt_token",
  "user": {
    "id": "uuid",
    "email": "instructor@example.com"
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
  "token": "jwt_token",
  "user": {
    "id": "uuid",
    "email": "instructor@example.com",
    "brandData": {}
  }
}
```

### Brand Management

#### POST `/api/brand/save`
Save or update brand data.

**Request:**
```json
{
  "userId": "uuid",
  "brandData": {
    "fullName": "John Doe",
    "email": "john@example.com"
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
Retrieve brand data for a user.

**Response:**
```json
{
  "success": true,
  "brandData": {}
}
```

### Asset Management

#### POST `/api/assets/generate/:templateId`
Generate a new asset from template.

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
Get all assets for a user.

**Response:**
```json
{
  "success": true,
  "assets": []
}
```

#### GET `/api/assets/download/:assetId`
Download a specific asset.

**Response:** PDF file stream

### Launch Plan

#### GET `/api/launch-plan/:userId`
Get launch plan progress.

**Response:**
```json
{
  "success": true,
  "progress": [
    {
      "week": 1,
      "completed": true,
      "completedAt": "2025-01-15T10:30:00Z"
    }
  ]
}
```

#### POST `/api/launch-plan/complete-week`
Mark a week as completed.

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
  "showCelebration": true
}
```

## Design System

### Color Palette

**Tim's Brand Colors:**
- Navy Dark: `#0B2545`
- Navy Medium: `#13315C`
- Navy Light: `#1E4976`
- Teal: `#3ABAB4`
- Teal Light: `#5DD5CF`
- Gold: `#D4AF37`
- Gold Light: `#E5C862`
- Grey Dark: `#6B7280`
- Grey Medium: `#9CA3AF`
- Grey Light: `#E5E7EB`
- White: `#FFFFFF`
- Off White: `#F9FAFB`

### Typography

**Fonts:**
- Headings: Playfair Display (serif)
- Body: Inter (sans-serif)

**Scales:**
- xs: 12px
- sm: 14px
- base: 16px
- lg: 18px
- xl: 20px
- 2xl: 24px
- 3xl: 30px
- 4xl: 36px

### Spacing System

Based on 4px grid:
- 1: 4px
- 2: 8px
- 3: 12px
- 4: 16px
- 6: 24px
- 8: 32px
- 12: 48px
- 16: 64px

### Component Patterns

**Button Variants:**
- Primary: Navy background, white text
- Secondary: Teal background, white text
- Outline: Border only, navy text
- Ghost: No border, navy text

**Animations:**
- Fast: 150ms
- Medium: 300ms
- Slow: 500ms
- Easing: ease-in-out

## Environment Variables

### Frontend (.env)
```bash
VITE_API_URL=http://localhost:3000/api
```

### Backend (.env)
```bash
NODE_ENV=production
PORT=3000

# Database
DATABASE_URL=postgresql://ttuser:password@db:5432/tt_toolkit

# JWT
JWT_SECRET=your_secure_random_secret_here

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Application
FRONTEND_URL=https://toolkit.timvandervliet.com
```

## Deployment

### Docker Deployment

1. **Clone repository:**
```bash
git clone https://github.com/yourusername/timvandervliet.git
cd timvandervliet
```

2. **Configure environment:**
```bash
cp .env.example .env
nano .env  # Edit with your values
```

3. **Start services:**
```bash
docker-compose up -d --build
```

4. **Run migrations:**
```bash
docker-compose exec backend npx prisma migrate deploy
```

5. **Generate access codes:**
```bash
docker-compose exec backend node scripts/seedCodes.js
```

### SSL Configuration

```bash
# Install certbot
apt-get install certbot

# Generate certificate
certbot certonly --webroot -w /var/www/html \
  -d toolkit.timvandervliet.com

# Update nginx.conf with certificate paths
# Restart nginx
docker-compose restart nginx
```

## Testing Requirements

### Functional Tests
- [ ] Code validation works
- [ ] Brand wizard saves data correctly
- [ ] All 19 templates generate
- [ ] PDF downloads work
- [ ] Image uploads process correctly
- [ ] Color pickers function
- [ ] Live preview updates in real-time
- [ ] Customizations persist
- [ ] Email claiming works
- [ ] Login authentication works
- [ ] Progress tracking saves
- [ ] Confetti animations trigger

### Performance Tests
- [ ] Page load < 2 seconds
- [ ] PDF generation < 5 seconds
- [ ] Image upload < 3 seconds
- [ ] API response < 500ms

### Security Tests
- [ ] JWT tokens expire correctly
- [ ] Invalid codes rejected
- [ ] File uploads validated
- [ ] SQL injection protected
- [ ] XSS prevention active

### Compatibility Tests
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile responsive (iOS/Android)

## Maintenance & Monitoring

### Backup Strategy
- **Database:** Daily automated backups at 2 AM
- **Uploads:** Daily archive of user files
- **Retention:** 30 days

### Logging
- **Error logs:** `/var/log/tt-toolkit/error.log`
- **Access logs:** `/var/log/tt-toolkit/access.log`
- **Rotation:** Daily, 30-day retention

### Monitoring
- **Uptime:** 99% target
- **Response time:** < 500ms average
- **Disk usage:** Alert at 80%
- **Database connections:** Monitor pool usage

## Success Metrics

### Technical KPIs
- Page load time: < 2 seconds
- PDF generation: < 5 seconds
- Uptime: 99%+
- Zero data loss

### User Experience KPIs
- Brand wizard completion rate: > 80%
- Asset download rate: > 90%
- Return visits: > 60%
- Launch plan engagement: > 50%

## Future Enhancements

### Phase 2 Features
- AI-powered content suggestions
- Template marketplace
- Team collaboration tools
- Analytics dashboard
- Mobile app

### Phase 3 Features
- CRM integration
- Automated email sequences
- Client portal
- Payment processing
- Scheduling integration

## Support & Documentation

### For Developers
- This SPECKIT.md contains complete technical specification
- README.md contains setup instructions
- Code comments explain complex logic
- API documentation in `/docs/api`

### For Users
- In-app tooltips and guidance
- Launch plan provides step-by-step instructions
- Tim's examples show best practices
- Support email: support@timvandervliet.com

## License

Proprietary - All rights reserved by Tim van der Vliet

## Version History

- **v1.0.0** (Target: Q1 2025) - Initial release
  - 19 templates
  - Brand wizard
  - Dashboard with 4 tabs
  - 90-day launch plan
  - PDF generation
  - Authentication system
