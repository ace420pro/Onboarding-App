# EdgeVantage P2 Onboarding Automation System

A comprehensive automation system for streamlining P2 (client) onboarding across 70+ sweepstakes websites. This system replaces manual employee work with automated processes while maintaining professional communication and ensuring complete account verification.

## 🚀 Features

- **P2 Client Management**: Secure storage and management of client information
- **Multi-Website Automation**: Support for 70+ sweepstakes websites
- **Complete Verification Flow**: Email, SMS, and identity verification automation
- **Real-Time Dashboard**: Monitor progress and success metrics
- **Professional Communication**: Automated email and SMS templates
- **Error Handling**: Robust retry mechanisms and error logging
- **Security First**: Encrypted storage of sensitive information

## 🏗️ Architecture

- **Frontend**: React.js with TypeScript, Tailwind CSS
- **Backend**: Node.js with Express, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Automation**: Playwright for web automation
- **Communication**: Nodemailer (Email) + Twilio (SMS)
- **Queue System**: Bull/Redis for job processing

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)  
- Redis (v6 or higher)
- Gmail account (for email automation)
- Twilio account (for SMS automation)

## 🛠️ Installation

1. **Clone the repository**:
   ```bash
   cd C:\Users\admin\Desktop\Onboarding-App
   ```

2. **Install dependencies**:
   ```bash
   npm run setup
   ```

3. **Configure environment**:
   ```bash
   copy .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up database**:
   ```bash
   npm run db:push
   npm run db:generate
   ```

5. **Start development server**:
   ```bash
   npm run dev
   ```

## 📚 Detailed Setup

See [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md) for complete step-by-step setup guide.

## 🖥️ Usage

### Dashboard
- View real-time statistics and activity
- Monitor system health and performance
- Track completion rates across websites

### P2 Client Management
- Add new P2 clients with secure information storage
- Track verification progress across all websites
- View detailed client activity logs

### Automation Control
- Start automation for specific clients and websites
- Monitor active automation jobs
- Handle failed verifications manually

### Website Configuration
- Add and configure new sweepstakes websites
- Update selectors and automation flows
- Enable/disable websites

## 🔧 Development

### Project Structure
```
├── client/          # React frontend
├── server/          # Node.js backend
├── server/prisma/   # Database schema and migrations
└── docs/           # Documentation
```

### Available Scripts
```bash
npm run dev          # Start both client and server
npm run build        # Build for production
npm run db:studio    # Open database admin
npm run db:push      # Push schema to database
```

## 🔒 Security

- All sensitive data is encrypted at rest
- JWT-based authentication
- Rate limiting on all endpoints
- Input validation and sanitization
- Secure communication protocols

## 🚀 Deployment

### Development
- Frontend: http://localhost:3001
- Backend: http://localhost:5000
- Database Admin: Run `npm run db:studio`

### Production
- Set `NODE_ENV=production`
- Configure production database
- Set up SSL certificates
- Use process manager (PM2)
- Configure reverse proxy (Nginx)

## 📊 Monitoring

- Application logs via Winston
- Database query monitoring
- Error tracking and alerting
- Performance metrics
- Success/failure rates

## 🔄 Automation Workflow

1. **Client Registration**: Automated form filling on target websites
2. **Email Verification**: Monitor inbox and click verification links
3. **SMS Verification**: Receive and input verification codes
4. **Identity Verification**: Guide clients through document upload
5. **Final Verification**: Confirm account is fully activated

## 🛡️ Error Handling

- Automatic retry mechanisms
- Detailed error logging
- Manual intervention options
- Website change detection
- Graceful failure handling

## 📈 Performance

- Concurrent processing of multiple clients
- Queue-based job management
- Efficient database queries
- Caching for frequently accessed data
- Optimized web automation

## 🤝 Support

For setup assistance or technical issues:

1. Check the logs for error messages
2. Verify all services are running
3. Review the setup instructions
4. Check database connectivity
5. Validate API configurations

## 🔮 Future Enhancements

- Machine learning for captcha solving
- Advanced analytics and reporting
- Mobile application
- API integrations with more services
- Automated website configuration detection

---

**EdgeVantage P2 Onboarding System** - Automating success, one client at a time.