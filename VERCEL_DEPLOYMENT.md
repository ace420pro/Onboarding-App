# EdgeVantage P2 Onboarding System - Vercel Deployment Guide

This guide will help you deploy the EdgeVantage system to Vercel for easy testing and production use.

## Prerequisites

Before deploying, you'll need:

1. **GitHub Account**: Sign up at https://github.com if you don't have one
2. **Vercel Account**: Sign up at https://vercel.com using your GitHub account
3. **Database**: PostgreSQL database (we'll use Neon for free hosting)
4. **Email Service**: Gmail account with App Password
5. **SMS Service**: Twilio account

## Step 1: Set Up GitHub Repository

### 1.1 Install Git (if not already installed)
- Download from https://git-scm.com/download/win
- Install with default settings

### 1.2 Initialize Git Repository
Open Command Prompt in your project folder:

```bash
cd C:\Users\admin\Desktop\Onboarding-App
git init
git add .
git commit -m "Initial commit: EdgeVantage P2 Onboarding System"
```

### 1.3 Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `edgevantage-p2-onboarding`
3. Description: `Automated P2 onboarding system for EdgeVantage`
4. Keep it **Private** (recommended for business applications)
5. Don't initialize with README (we already have files)
6. Click "Create repository"

### 1.4 Push to GitHub
Replace `YOUR_GITHUB_USERNAME` with your actual username:

```bash
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/edgevantage-p2-onboarding.git
git branch -M main
git push -u origin main
```

## Step 2: Set Up Database (Neon PostgreSQL)

### 2.1 Create Neon Account
1. Go to https://neon.tech
2. Sign up with GitHub (recommended)
3. Create a new project named "EdgeVantage Onboarding"

### 2.2 Get Database URL
1. In your Neon dashboard, go to "Dashboard"
2. Click "Connection Details"
3. Copy the "Connection String" - it looks like:
   ```
   postgresql://username:password@host/database?sslmode=require
   ```
4. Save this URL - you'll need it for Vercel environment variables

## Step 3: Deploy Frontend to Vercel

### 3.1 Connect Vercel to GitHub
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your `edgevantage-p2-onboarding` repository
4. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3.2 Set Environment Variables
In Vercel dashboard, go to your project → Settings → Environment Variables:

Add these variables:
```
VITE_API_URL=https://your-api-domain.vercel.app/api
```

### 3.3 Deploy Frontend
1. Click "Deploy"
2. Wait for deployment to complete
3. Your frontend URL will be something like: `https://edgevantage-p2-onboarding.vercel.app`

## Step 4: Deploy Backend API to Vercel

### 4.1 Create Separate API Project
1. In Vercel dashboard, click "Add New..." → "Project"
2. Import the same repository again
3. Configure project:
   - **Project Name**: `edgevantage-api` (different from frontend)
   - **Framework Preset**: Other
   - **Root Directory**: `api`
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: Leave empty

### 4.2 Set API Environment Variables
In your API project → Settings → Environment Variables:

```bash
DATABASE_URL=postgresql://your-neon-connection-string
NODE_ENV=production
JWT_SECRET=your-64-character-random-string
ENCRYPTION_KEY=your-32-character-random-string

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_FROM=EdgeVantage Onboarding <noreply@edgevantage.com>

# Twilio SMS
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=your-twilio-number

# Application URLs (update with your actual domains)
CLIENT_URL=https://edgevantage-p2-onboarding.vercel.app
SERVER_URL=https://edgevantage-api.vercel.app

# Verification URLs
VERIFICATION_BASE_URL=https://edgevantage-p2-onboarding.vercel.app/verify

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Automation Settings
MAX_CONCURRENT_AUTOMATIONS=3
AUTOMATION_TIMEOUT_MS=300000
```

### 4.3 Deploy API
1. Click "Deploy"
2. Your API URL will be something like: `https://edgevantage-api.vercel.app`

## Step 5: Update Frontend Configuration

### 5.1 Update Frontend Environment
1. Go to your frontend project in Vercel
2. Settings → Environment Variables
3. Update `VITE_API_URL` with your actual API URL:
   ```
   VITE_API_URL=https://edgevantage-api.vercel.app/api
   ```

### 5.2 Redeploy Frontend
1. Go to Deployments tab
2. Click the three dots on latest deployment
3. Click "Redeploy"

## Step 6: Initialize Database

### 6.1 Set Up Prisma for Production
Since Vercel functions are serverless, you need to initialize the database:

1. In your local project, update `.env` with your Neon database URL
2. Run database migration:
   ```bash
   npm run db:push
   ```

## Step 7: Test Your Deployment

### 7.1 Test API Health
Visit: `https://edgevantage-api.vercel.app/api/health`

You should see: `{"status":"OK","timestamp":"..."}`

### 7.2 Test Frontend
Visit: `https://edgevantage-p2-onboarding.vercel.app`

You should see the EdgeVantage dashboard.

### 7.3 Test Database Connection
1. Try adding a P2 client through the web interface
2. Check if data persists and displays correctly

## Step 8: Domain Configuration (Optional)

### 8.1 Custom Domain
If you have a custom domain:

1. In Vercel project → Settings → Domains
2. Add your custom domain
3. Update environment variables with new domain URLs

## Common Issues & Solutions

### Issue: API Routes Not Working
**Solution**: 
- Check that API environment variables are set correctly
- Verify database connection string
- Check Vercel function logs in dashboard

### Issue: Database Connection Errors
**Solution**:
- Verify Neon database is running
- Check connection string format
- Ensure IP restrictions are disabled in Neon

### Issue: CORS Errors
**Solution**:
- Ensure CLIENT_URL in API environment matches your frontend URL
- Check that both URLs use HTTPS

### Issue: Environment Variables Not Loading
**Solution**:
- Redeploy after adding environment variables
- Check variable names match exactly
- Ensure no trailing spaces in values

## Updating Your Application

### For Code Changes
1. Make changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
3. Vercel will automatically redeploy both frontend and API

### For Environment Variable Changes
1. Update in Vercel dashboard
2. Redeploy the affected project

## Production Considerations

### Security
- Keep your repository private
- Use strong, unique passwords for all services
- Regularly rotate API keys and secrets
- Monitor Vercel function logs for security issues

### Performance
- Monitor Vercel function execution time
- Consider upgrading to Vercel Pro for better performance
- Optimize database queries for serverless functions

### Monitoring
- Set up Vercel integrations for monitoring
- Configure error tracking (Sentry, LogRocket, etc.)
- Monitor database performance in Neon dashboard

### Scaling
- Vercel automatically scales serverless functions
- Monitor usage and upgrade plans as needed
- Consider function timeout limits for long-running processes

## Support & Troubleshooting

### Useful Commands
```bash
# Check deployment status
vercel --prod

# View function logs
vercel logs https://your-api-domain.vercel.app

# Local development with production environment
vercel dev
```

### Resources
- Vercel Documentation: https://vercel.com/docs
- Neon Documentation: https://neon.tech/docs
- GitHub Documentation: https://docs.github.com

Your EdgeVantage P2 Onboarding System is now deployed and accessible worldwide via Vercel URLs!