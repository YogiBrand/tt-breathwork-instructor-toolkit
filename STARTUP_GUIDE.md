# 🚀 TT Breathwork Toolkit - Startup Guide

## Complete Setup in 5 Minutes

### Step 1: Configure Environment

```bash
cd /home/yogi/tim-van-der-vliet

# Copy environment template
cp .env.example .env

# Generate secure passwords (save these!)
echo "DB_PASSWORD=$(openssl rand -base64 32)"
echo "JWT_SECRET=$(openssl rand -base64 32)"

# Edit .env and paste the generated values
nano .env
```

**Required changes in `.env`:**
```bash
DB_PASSWORD=<paste_generated_password>
JWT_SECRET=<paste_generated_secret>
```

**Optional (for email features):**
```bash
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_gmail_app_password
```

### Step 2: Start Docker Services

```bash
# Build and start all containers
docker-compose up -d --build

# This will start:
# - PostgreSQL database on port 5449
# - Backend API on port 3856
# - Frontend on port 5287
```

**Watch the startup process:**
```bash
docker-compose logs -f
```

**Wait for these messages:**
- `backend    | Server started on port 3000`
- `frontend   | Local: http://localhost:5173/`
- `db         | database system is ready to accept connections`

Press `Ctrl+C` to stop watching logs.

### Step 3: Initialize Database

```bash
# Run database migrations
docker-compose exec backend npx prisma migrate deploy

# Expected output:
# ✓ 1 migration applied: 20250122000000_init
```

### Step 4: Generate Access Codes

```bash
# Generate 50 instructor access codes
docker-compose exec backend node scripts/seedCodes.js 50
```

**Save some codes from the output for testing!** They look like:
```
TT-2025-A7B9C2
TT-2025-X3K8M4
TT-2025-P2N9L5
```

### Step 5: Test the Application

1. **Open Frontend:**
   ```bash
   open http://localhost:5287
   ```
   Or visit in browser: http://localhost:5287

2. **Click "Enter Code"**

3. **Paste one of your generated codes**

4. **Complete the 5-step wizard:**
   - Upload logo/photo (optional)
   - Choose color palette
   - Enter contact details
   - Define positioning
   - Review and generate

5. **View your dashboard** with all assets!

---

## 🔍 Verification Checklist

Run these commands to verify everything is working:

```bash
# Check all containers are running
docker-compose ps

# Expected: All services should show "Up"
# - tt-toolkit-db
# - tt-toolkit-backend
# - tt-toolkit-frontend

# Test backend health
curl http://localhost:3856/health

# Expected: {"status":"ok","timestamp":"2025-01-22T..."}

# Test frontend
curl -I http://localhost:5287

# Expected: HTTP/1.1 200 OK

# Check database connection
docker-compose exec db psql -U ttuser -d tt_toolkit -c "SELECT COUNT(*) FROM codes;"

# Expected: Shows count of generated codes
```

---

## 📍 Access URLs

| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend** | http://localhost:5287 | Main application |
| **Backend API** | http://localhost:3856 | REST API |
| **Health Check** | http://localhost:3856/health | API status |
| **Database** | localhost:5449 | PostgreSQL |

---

## 🎨 Quick Tour

### 1. Code Entry
- Enter your access code
- Optionally create an account with email
- Get instant access

### 2. Brand Wizard (5 Steps)
- **Step 1:** Upload logo & photo, choose colors
- **Step 2:** Enter contact details
- **Step 3:** Define your positioning
- **Step 4:** Set up services & pricing
- **Step 5:** Review & generate

### 3. Dashboard (4 Tabs)
- **For You:** 8 personal branding assets
- **For Clients:** 6 client materials
- **For Companies:** 5 corporate tools
- **Launch Plan:** 90-day roadmap

---

## 🛠️ Common Commands

### Managing Services

```bash
# Stop all services
docker-compose down

# Start services
docker-compose up -d

# Restart a specific service
docker-compose restart backend
docker-compose restart frontend

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db

# Rebuild after code changes
docker-compose up -d --build
```

### Database Management

```bash
# Open Prisma Studio (database GUI)
docker-compose exec backend npx prisma studio
# Opens at http://localhost:5555

# View database tables
docker-compose exec db psql -U ttuser -d tt_toolkit

# Common SQL commands:
# \dt              - List tables
# SELECT * FROM codes LIMIT 5;
# SELECT * FROM users;
# \q               - Quit
```

### Generate More Codes

```bash
# Generate 10 more codes
docker-compose exec backend node scripts/seedCodes.js 10

# Generate 100 codes
docker-compose exec backend node scripts/seedCodes.js 100
```

---

## 🐛 Troubleshooting

### Problem: Ports already in use

```bash
# Find what's using the port
sudo lsof -i :5287

# Option 1: Stop the conflicting service
# Option 2: Change ports in docker-compose.yml
```

### Problem: Database connection errors

```bash
# Restart database
docker-compose restart db

# Check database logs
docker-compose logs db

# Verify database is healthy
docker-compose exec db pg_isready -U ttuser
```

### Problem: Frontend can't connect to backend

```bash
# Verify both are on same network
docker network inspect timvandervliet_tt-network

# Check frontend environment
docker-compose exec frontend env | grep VITE_API_URL

# Should show: VITE_API_URL=http://localhost:3856/api
```

### Problem: Prisma errors

```bash
# Regenerate Prisma client
docker-compose exec backend npx prisma generate

# Re-run migrations
docker-compose exec backend npx prisma migrate deploy
```

### Complete Reset

```bash
# Nuclear option - start fresh
docker-compose down -v
docker-compose up -d --build
docker-compose exec backend npx prisma migrate deploy
docker-compose exec backend node scripts/seedCodes.js 50
```

---

## 📊 Monitoring

### Check Resource Usage

```bash
# See CPU and memory usage
docker stats

# View disk usage
docker system df
```

### View All Logs

```bash
# All services
docker-compose logs -f

# Last 100 lines
docker-compose logs --tail=100

# Since 10 minutes ago
docker-compose logs --since 10m
```

---

## 🎯 Next Steps

1. ✅ **Complete Setup** (you're here!)
2. 📝 Test the wizard with different data
3. 🎨 Try different color palettes
4. 📥 Download some assets
5. 🚀 Share with test users
6. 🔧 Customize templates (see SPECKIT.md)
7. 🌐 Deploy to production (see README.md)

---

## 🆘 Need Help?

### Check Documentation
- `README.md` - Complete guide
- `SPECKIT.md` - Technical specification
- `BRAND_WIZARD_README.md` - Wizard details

### Verify Installation
```bash
# Run comprehensive check
./scripts/health-check.sh

# Or manual checks:
curl http://localhost:3856/health
curl -I http://localhost:5287
docker-compose ps
```

### Still Stuck?
1. Check logs: `docker-compose logs -f`
2. Verify .env file has correct values
3. Ensure all required ports are available
4. Try complete reset (see above)

---

## ✅ Success Indicators

You know everything is working when:

- ✅ All 3 containers show "Up" in `docker-compose ps`
- ✅ Frontend loads at http://localhost:5287
- ✅ Backend health check returns `{"status":"ok"}`
- ✅ You can enter a code and access the wizard
- ✅ You can complete the wizard and see the dashboard
- ✅ Assets appear in the dashboard
- ✅ Download buttons work (PDFs coming soon)

---

## 🎉 You're Ready!

The TT Breathwork Instructor Toolkit is now running on your machine.

**Share these URLs with your team:**
- Frontend: http://localhost:5287
- Health Check: http://localhost:3856/health

**Pro tip:** Bookmark these commands:
```bash
# Daily start
alias tt-start='cd /home/yogi/tim-van-der-vliet && docker-compose up -d'

# Daily stop
alias tt-stop='cd /home/yogi/tim-van-der-vliet && docker-compose down'

# View logs
alias tt-logs='cd /home/yogi/tim-van-der-vliet && docker-compose logs -f'
```

Add these to your `~/.bashrc` or `~/.zshrc` for convenience!
