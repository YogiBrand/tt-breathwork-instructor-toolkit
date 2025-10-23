# TT Breathwork Instructor Toolkit

> **Your Complete Business-in-a-Box**

A white-label platform for TT Breathwork instructors to generate 19 branded business materials, access a 90-day launch plan, and build a professional presence from day one.

**Live URL:** `toolkit.timvandervliet.com`

## Features

- **Code-based Authentication**: Instant access with instructor codes
- **Brand Wizard**: 5-step setup for professional branding
- **Visual Editor**: Live preview with click-to-edit zones
- **19 Templates**: Complete business asset library
- **PDF Generation**: High-quality downloadable materials
- **Launch Plan**: 90-day guided business development
- **Progress Tracking**: Gamified experience with celebrations

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, Prisma, PostgreSQL
- **PDF Generation**: Puppeteer
- **Deployment**: Docker Compose, Nginx
- **Domain**: toolkit.timvandervliet.com

## 🚀 Quick Start with Docker

### Prerequisites

- Docker 24+ installed
- Docker Compose installed
- 4GB RAM minimum
- Ports available: **5449, 3856, 5287, 8167, 8443**

### 1. Navigate and Configure

```bash
# Navigate to project directory
cd /home/yogi/tim-van-der-vliet

# Copy environment template
cp .env.example .env

# Generate secure secrets
DB_PASSWORD=$(openssl rand -base64 32)
JWT_SECRET=$(openssl rand -base64 32)

# Edit configuration with your values
nano .env
```

### 2. Start the Application

```bash
# Build and start all services
docker-compose up -d --build

# Watch logs
docker-compose logs -f
```

### 3. Initialize Database

```bash
# Run Prisma migrations
docker-compose exec backend npx prisma migrate deploy

# Generate access codes (generates 50 codes)
docker-compose exec backend node scripts/seedCodes.js 50
```

### 4. Access the Application

- **Frontend:** http://localhost:5287
- **Backend API:** http://localhost:3856/health
- **Database:** localhost:5449

### 5. Stop the Application

```bash
# Stop services
docker-compose down

# Stop and remove volumes (⚠️ deletes data)
docker-compose down -v
```

### Production Deployment

```bash
# Set up subdomain DNS
# Point toolkit.timvandervliet.com to your server IP

# Deploy
rsync -avz --exclude 'node_modules' ./ user@server:/var/www/timvandervliet/
ssh user@server
cd /var/www/timvandervliet

# Configure environment
nano .env

# Deploy with SSL
docker-compose -f docker-compose.prod.yml up -d --build

# Set up SSL certificate
./scripts/setup-ssl.sh
```

## Project Structure

```
timvandervliet/
├── frontend/          # React application
├── backend/           # Node.js API
├── database/          # SQL migrations
├── docker-compose.yml # Development setup
├── nginx.conf         # Reverse proxy config
└── .env.example       # Environment template
```

## Environment Variables

Required environment variables:

```env
# Database
DB_USER=ttuser
DB_PASSWORD=your_secure_password
DATABASE_URL=postgresql://ttuser:password@db:5432/tt_toolkit

# JWT
JWT_SECRET=your_jwt_secret

# Email (optional - for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Application
NODE_ENV=production
API_URL=https://toolkit.timvandervliet.com/api
FRONTEND_URL=https://toolkit.timvandervliet.com
```

## API Endpoints

### Authentication
- `POST /api/auth/validate-code` - Validate instructor code
- `POST /api/auth/claim-code` - Claim code with email
- `POST /api/auth/login` - Login with email

### Brand Management
- `POST /api/brand/save` - Save brand data
- `GET /api/brand/:userId` - Get brand data

### Asset Generation
- `POST /api/assets/generate/:templateId` - Generate asset
- `GET /api/assets/:userId` - List user assets
- `GET /api/assets/download/:assetId` - Download asset

### Launch Plan
- `GET /api/launch-plan/:userId` - Get progress
- `POST /api/launch-plan/complete-week` - Mark week complete

## Templates Available

### For You (Personal Branding)
1. One-page bio/overview
2. Business cards
3. Email signature
4. Zoom background
5. Social media profile templates

### For Clients (Client-facing Materials)
6. Welcome email template
7. Session preparation guide
8. Intake form
9. Follow-up email templates
10. Testimonial request template

### For Companies (B2B Materials)
11. Corporate workshop proposal
12. Company wellness presentation
13. ROI calculator
14. Case study template
15. Partnership proposal

### Launch Plan (Business Development)
16. Week-by-week action plans
17. Marketing calendar
18. Pricing guide
19. Launch checklist

## Development

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

### Backend Development

```bash
cd backend
npm install
npm run dev
```

### Database

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# View database
npx prisma studio
```

## Maintenance

### Backups

Automated daily backups at 2 AM:

```bash
# Manual backup
./scripts/backup.sh

# View backups
ls -la /var/backups/timvandervliet/
```

### Monitoring

- Application logs: `docker-compose logs -f`
- Database health: `docker-compose exec db pg_isready`
- SSL certificate: Check expiry every 60 days

### Updates

```bash
# Pull latest code
git pull origin main

# Rebuild containers
docker-compose down
docker-compose up -d --build

# Run any new migrations
docker-compose exec backend npx prisma migrate deploy
```

## Security

- JWT tokens with 90-day expiry
- Input validation on all endpoints
- Rate limiting on authentication
- SQL injection protection via Prisma
- XSS protection with CSP headers
- Regular security updates

## Performance

- Target: <2s page load time
- PDF generation: <5s per document
- Database queries optimized with indexes
- Image compression for uploads
- CDN for static assets (future enhancement)

## Support

For technical issues:
1. Check logs: `docker-compose logs`
2. Verify environment variables
3. Ensure database connectivity
4. Contact: [your-email@domain.com]

## License

Proprietary - All rights reserved by Tim van der Vliet