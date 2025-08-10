# EdgeVantage P2 Onboarding System - Setup Instructions

This guide will help you set up and run the EdgeVantage P2 Onboarding System on your Windows machine.

## Prerequisites

Before starting, you'll need to install these programs:

### 1. Node.js and npm
- Go to https://nodejs.org/
- Download and install the "LTS" version (currently v20.x.x)
- This will also install npm (Node Package Manager)
- Verify installation by opening Command Prompt and running:
  ```
  node --version
  npm --version
  ```

### 2. PostgreSQL Database
- Go to https://www.postgresql.org/download/windows/
- Download and install PostgreSQL (version 14 or higher)
- During installation:
  - Remember your superuser (postgres) password
  - Use default port 5432
  - Install pgAdmin (database management tool)
- After installation, create a new database for the project

### 3. Redis (for job queues)
- Go to https://github.com/microsoftarchive/redis/releases
- Download "Redis-x64-3.0.504.msi" 
- Install using default settings
- Redis will run automatically as a Windows service

## Project Setup

### Step 1: Install Dependencies

Open Command Prompt or PowerShell as Administrator and navigate to your project folder:

```bash
cd C:\Users\admin\Desktop\Onboarding-App
```

Install all project dependencies:

```bash
npm run setup
```

This command will:
- Install root dependencies
- Install server dependencies
- Install client dependencies

### Step 2: Environment Configuration

1. Copy the environment template:
   ```bash
   copy .env.example .env
   ```

2. Open `.env` file in a text editor and update these values:

```bash
# Database - Replace with your PostgreSQL credentials
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/edgevantage_onboarding"

# Create a new database named 'edgevantage_onboarding' in pgAdmin first

# JWT Secret - Generate a random 64-character string
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Encryption Key - Generate a random 32-character string
ENCRYPTION_KEY=your-32-character-encryption-key

# Email Configuration (Gmail recommended)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password  # See Gmail App Password setup below
EMAIL_FROM=EdgeVantage Onboarding <noreply@edgevantage.com>

# Twilio SMS (sign up at twilio.com)
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=your-twilio-phone-number

# Redis (should work with defaults)
REDIS_URL=redis://localhost:6379
```

### Step 3: Database Setup

1. **Create Database**: Open pgAdmin and create a database named `edgevantage_onboarding`

2. **Initialize Database Schema**:
   ```bash
   npm run db:push
   ```

3. **Generate Prisma Client**:
   ```bash
   npm run db:generate
   ```

### Step 4: External Service Setup

#### Gmail App Password (for Email)
1. Go to your Google Account settings
2. Enable 2-Step Verification if not already enabled
3. Go to "App passwords" section
4. Generate an app password for "Mail"
5. Use this 16-character password in your `.env` file

#### Twilio Setup (for SMS)
1. Sign up at https://www.twilio.com/
2. Get your Account SID and Auth Token from dashboard
3. Purchase a phone number for SMS
4. Add these credentials to your `.env` file

## Running the Application

### Development Mode

To start both the server and client in development mode:

```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend client on http://localhost:3001
- Database admin panel available at: `npm run db:studio`

### Individual Services

If you need to run services separately:

```bash
# Run only the backend server
npm run server:dev

# Run only the frontend client  
npm run client:dev

# Open database admin panel
npm run db:studio
```

## Verification Steps

### 1. Check if everything is running:
- Open http://localhost:3001 - you should see the EdgeVantage dashboard
- Open http://localhost:5000/api/health - you should see `{"status":"OK"}`

### 2. Test database connection:
- Run `npm run db:studio`
- This should open Prisma Studio in your browser
- You should see all the database tables

### 3. Check services:
- Redis: Open Task Manager and look for "Redis" service
- PostgreSQL: Should be running as a Windows service

## First Steps After Setup

1. **Add Your First P2 Client**:
   - Go to http://localhost:3001/p2-clients/add
   - Fill in the form to add a test P2 client

2. **Configure Websites**:
   - Go to the Websites section
   - Add sweepstakes websites you want to automate

3. **Test Automation**:
   - Start with a simple website to test the automation flow

## Troubleshooting

### Common Issues:

**Database Connection Error**:
- Check PostgreSQL is running in Windows Services
- Verify database name and credentials in `.env`
- Make sure the database `edgevantage_onboarding` exists

**Port Already in Use**:
- The client is configured to run on port 3001 (changed from 3000)
- If port 3001 or 5000 are occupied, change them in:
  - `.env` file for CLIENT_URL
  - `client/vite.config.ts` for the dev server port

**Redis Connection Error**:
- Check Redis is running in Windows Services
- Try restarting Redis service

**Email/SMS Not Working**:
- Verify your Gmail app password
- Check Twilio credentials and account balance

## Production Deployment

For production deployment, you'll need to:

1. Set `NODE_ENV=production` in your environment
2. Set up a production database (PostgreSQL)
3. Configure a production Redis instance
4. Set up proper SSL certificates
5. Use a process manager like PM2 for the Node.js server
6. Set up a reverse proxy like Nginx

Detailed production deployment instructions will be provided once the development setup is complete.

## Next Steps

Once the system is running, you'll want to:

1. **Configure your first sweepstakes websites** - I'll help you create website configurations
2. **Test the automation workflow** - We'll run through the complete P2 onboarding process
3. **Set up monitoring** - Add error tracking and performance monitoring
4. **Customize email/SMS templates** - Create professional communication templates
5. **Scale the system** - Add more websites and optimize performance

## Support

If you encounter any issues during setup:

1. Check the logs in the terminal where you ran `npm run dev`
2. Look for error messages in the browser developer console (F12)
3. Check the database connection in pgAdmin
4. Verify all services are running in Windows Services

I'll help you troubleshoot any specific issues you encounter during setup.