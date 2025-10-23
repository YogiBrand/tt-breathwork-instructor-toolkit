#!/bin/bash

# TT Breathwork Toolkit - Health Check Script
# Run this to verify everything is working

echo "🔍 TT Breathwork Toolkit - Health Check"
echo "========================================"
echo ""

# Check if Docker is running
echo "1. Checking Docker..."
if ! docker info > /dev/null 2>&1; then
    echo "   ❌ Docker is not running"
    exit 1
fi
echo "   ✅ Docker is running"
echo ""

# Check if containers are up
echo "2. Checking containers..."
if ! docker-compose ps | grep -q "Up"; then
    echo "   ❌ Containers are not running"
    echo "   Run: docker-compose up -d"
    exit 1
fi
echo "   ✅ Containers are running"
echo ""

# Check backend health
echo "3. Checking backend API..."
BACKEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3856/health)
if [ "$BACKEND_STATUS" != "200" ]; then
    echo "   ❌ Backend API is not responding (HTTP $BACKEND_STATUS)"
    echo "   Check logs: docker-compose logs backend"
    exit 1
fi
echo "   ✅ Backend API is healthy"
echo ""

# Check frontend
echo "4. Checking frontend..."
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5287)
if [ "$FRONTEND_STATUS" != "200" ]; then
    echo "   ❌ Frontend is not responding (HTTP $FRONTEND_STATUS)"
    echo "   Check logs: docker-compose logs frontend"
    exit 1
fi
echo "   ✅ Frontend is accessible"
echo ""

# Check database
echo "5. Checking database..."
if ! docker-compose exec -T db pg_isready -U ttuser > /dev/null 2>&1; then
    echo "   ❌ Database is not ready"
    echo "   Check logs: docker-compose logs db"
    exit 1
fi
echo "   ✅ Database is ready"
echo ""

# Check if tables exist
echo "6. Checking database tables..."
TABLE_COUNT=$(docker-compose exec -T db psql -U ttuser -d tt_toolkit -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';" 2>/dev/null | tr -d ' \n')
if [ "$TABLE_COUNT" -lt "4" ]; then
    echo "   ❌ Database tables not found ($TABLE_COUNT/4)"
    echo "   Run: docker-compose exec backend npx prisma migrate deploy"
    exit 1
fi
echo "   ✅ Database tables exist ($TABLE_COUNT tables)"
echo ""

# Check if codes exist
echo "7. Checking access codes..."
CODE_COUNT=$(docker-compose exec -T db psql -U ttuser -d tt_toolkit -t -c "SELECT COUNT(*) FROM codes;" 2>/dev/null | tr -d ' \n')
if [ "$CODE_COUNT" -eq "0" ]; then
    echo "   ⚠️  No access codes found"
    echo "   Run: docker-compose exec backend node scripts/seedCodes.js 50"
else
    echo "   ✅ Access codes available ($CODE_COUNT codes)"
fi
echo ""

echo "=========================================="
echo "✅ All health checks passed!"
echo ""
echo "Access the application:"
echo "  Frontend: http://localhost:5287"
echo "  Backend:  http://localhost:3856"
echo "  Health:   http://localhost:3856/health"
echo ""
