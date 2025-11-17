# MCServerList - Modern Minecraft Server List

A modern, feature-rich Minecraft server list platform with voting, revenue sharing, and real-time server stats.

## Features

### 🎮 Core Features
- **Server Listing** - Browse and discover Minecraft servers with advanced filters
- **Voting System** - Vote for your favorite servers with hCaptcha protection
- **Votifier Integration** - Automatic vote notifications to servers
- **Real-time Stats** - Live player counts and server status
- **Review System** - Rate and review servers (1-5 stars)
- **Search & Filters** - Filter by game mode, sort by votes/players/rating

### 💰 Monetization
- **Ad Integration** - Optional Google AdSense integration
- **Promoted Listings** - Featured spots at the top of the list
- **Revenue Sharing** - Servers earn money from votes
- **Popularity Bonuses** - Additional revenue for popular servers

### 🎨 Modern Design
- **Responsive UI** - Mobile-friendly design with Tailwind CSS
- **Rounded Corners** - Modern, clean interface
- **Real-time Updates** - Dynamic player counts and status
- **Dark Mode Ready** - Full dark mode support

### 🔒 Security & Auth
- **NextAuth.js** - Secure authentication (Google OAuth + Credentials)
- **hCaptcha** - Bot protection for voting
- **Role-based Access** - Admin dashboard for moderation

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Captcha**: hCaptcha
- **Server Ping**: minecraft-server-util

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Google OAuth credentials (optional)
- hCaptcha site key and secret

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Mcserverlist
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mcserverlist"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# hCaptcha
NEXT_PUBLIC_HCAPTCHA_SITE_KEY="your-site-key"
HCAPTCHA_SECRET_KEY="your-secret-key"

# Google AdSense (optional)
NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID="ca-pub-xxxxx"

# Revenue Settings
VOTE_REVENUE_SHARE_PERCENT=30
POPULARITY_REVENUE_SHARE_PERCENT=20
```

4. Set up the database:
```bash
npm run db:push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Server Ping Worker

To automatically ping servers and update player counts, run the ping worker as a cron job:

```bash
# Run every 5 minutes
*/5 * * * * cd /path/to/project && npm run ping:servers
```

Or manually:
```bash
npm run ping:servers
```

## Setting Up Votifier

Server owners can configure Votifier to receive vote notifications:

1. Install Votifier plugin on your Minecraft server
2. Get your Votifier token/public key
3. When adding your server to the list, fill in:
   - Votifier Address (e.g., vote.yourserver.com)
   - Votifier Port (default: 8192)
   - Votifier Token

## Revenue Sharing

### How It Works

1. **Vote Revenue**: Servers earn $0.001 per vote (configurable)
2. **Ad Revenue**: Servers with ads enabled earn a percentage of ad revenue
3. **Popularity Bonus**: Top servers earn additional revenue

### Configuring Revenue

Edit in `.env`:
```env
VOTE_REVENUE_SHARE_PERCENT=30      # % of ad revenue shared per vote
POPULARITY_REVENUE_SHARE_PERCENT=20 # % shared with popular servers
```

## Admin Dashboard

Access the admin dashboard at `/admin` (requires ADMIN role).

### Features:
- Approve/reject new servers
- View global statistics
- Monitor revenue
- Manage promoted listings

### Creating an Admin User

1. Sign up normally through the website
2. Update your role in the database:
```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your@email.com';
```

## API Endpoints

### Servers
- `GET /api/servers` - List servers with filters
- `POST /api/servers` - Create new server (authenticated)
- `GET /api/servers/promoted` - Get promoted servers

### Voting
- `POST /api/servers/[id]/vote` - Submit a vote (requires hCaptcha)

### Reviews
- `GET /api/servers/[id]/reviews` - Get server reviews
- `POST /api/servers/[id]/reviews` - Submit review (authenticated)

### Admin
- `POST /api/admin/servers/[id]/approve` - Approve server (admin only)

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

### Self-Hosted

1. Build the application:
```bash
npm run build
```

2. Start production server:
```bash
npm start
```

3. Set up a cron job for the ping worker

## Project Structure

```
Mcserverlist/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/                   # Next.js app router pages
│   │   ├── api/              # API routes
│   │   ├── servers/          # Server pages
│   │   ├── admin/            # Admin dashboard
│   │   └── auth/             # Authentication pages
│   ├── components/           # React components
│   │   ├── ui/              # Base UI components
│   │   ├── servers/         # Server-related components
│   │   ├── admin/           # Admin components
│   │   └── layout/          # Layout components
│   ├── lib/                 # Utility libraries
│   │   ├── prisma.ts        # Prisma client
│   │   ├── auth.ts          # Auth configuration
│   │   ├── minecraft.ts     # Minecraft server utilities
│   │   └── utils.ts         # Helper functions
│   ├── types/               # TypeScript types
│   └── workers/             # Background workers
│       └── ping-servers.ts  # Server ping worker
├── package.json
└── tsconfig.json
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this for your own server list!

## Support

For issues and questions, please open an issue on GitHub.

## Roadmap

- [ ] Server tags/categories
- [ ] Advanced analytics for server owners
- [ ] API for external integrations
- [ ] Mobile app
- [ ] Discord bot integration
- [ ] Payment processing for promoted listings
- [ ] Automatic revenue payouts

## Credits

Built with Next.js, Prisma, Tailwind CSS, and lots of ☕
