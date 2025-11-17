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
- **Ad Integration** - Optional Google AdSense integration per server
- **Auction System** - Bid on promoted spots for maximum visibility
- **Promoted Listings** - Featured spots at the top of the list
- **Percentage-Based Revenue Sharing** - 75% of ad revenue to servers (60% vote + 15% bonus)
- **Server Owner Dashboard** - Track earnings, votes, and statistics

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

## Background Workers

### Server Ping Worker

To automatically ping servers and update player counts, run the ping worker as a cron job:

```bash
# Run every 5 minutes
*/5 * * * * cd /path/to/project && npm run ping:servers
```

Or manually:
```bash
npm run ping:servers
```

### Revenue Distribution

To distribute monthly ad revenue to servers based on their votes:

```bash
# After calculating monthly ad revenue, run:
npm run distribute:revenue 1000  # Replace 1000 with actual monthly ad revenue

# This will:
# - Calculate each server's vote share (30% pool)
# - Add popularity bonuses for top 10 (20% pool)
# - Apply 50% penalty to servers with ads disabled
# - Update server balances and create revenue records
```

Run this at the start of each month after tallying ad revenue.

### Auction Closer

To close ended auctions and create promoted listings for winners:

```bash
# Run hourly to check for ended auctions
npm run close:auctions

# This will:
# - Close auctions that have ended
# - Assign winners (highest bidders)
# - Create 7-day promoted listings for winners
# - Mark losing bids as REFUNDED
# - Record revenue from winning bids
```

Set up as an hourly cron job:
```bash
0 * * * * cd /path/to/project && npm run close:auctions
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

Revenue is distributed monthly based on **percentage of total votes**:

1. **Vote Share Pool (30%)**: 30% of monthly ad revenue is distributed to all servers based on their vote percentage
   - Formula: `(Server Votes / Total Votes) × Vote Pool`
   - Example: Server with 5% of votes gets 5% of the pool

2. **Popularity Bonus (20%)**: Top 10 servers get additional revenue from a 20% pool
   - Rank #1: 25% of bonus pool
   - Rank #2: 18% of bonus pool
   - Rank #3-10: Decreasing percentages

3. **Ad Settings**: Servers can optionally disable ads
   - Servers with ads enabled: Get full revenue share
   - Servers with ads disabled: 50% penalty applied

### Example Calculation

If platform earns $1,000/month in ads and your server gets 5,000 votes out of 100,000 total:

- Vote pool: $1,000 × 30% = $300
- Your vote share: 5,000/100,000 = 5%
- Your revenue: $300 × 5% = **$15.00**
- If ranked #5: Add popularity bonus of **$18.00**
- **Total: $33.00**

### Configuring Revenue

Edit in `.env`:
```env
AD_REVENUE_POOL_PERCENT=60         # % of ad revenue for vote share (60%)
POPULARITY_BONUS_PERCENT=15        # % of ad revenue for top 10 bonus (15%)
# Total: 75% to servers, 25% platform keeps
```

## Admin Dashboard

Access the admin dashboard at `/admin` (requires ADMIN role).

### Admin Features:
- Approve/reject new servers
- View global statistics
- Monitor revenue records
- Manage promoted listings

## Server Owner Dashboard

Access at `/dashboard` (requires authentication).

### Features:
- View all your servers and statistics
- Track monthly and all-time votes
- Monitor revenue earned per server
- See detailed analytics (24h, 7d, 30d vote trends)
- Player count history graphs
- Revenue breakdown and calculations
- Understand how revenue sharing works

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
- `GET /api/my-servers` - Get user's servers (authenticated)
- `GET /api/my-servers/[id]/stats` - Get detailed server statistics (owner only)

### Voting
- `POST /api/servers/[id]/vote` - Submit a vote (requires hCaptcha)

### Reviews
- `GET /api/servers/[id]/reviews` - Get server reviews
- `POST /api/servers/[id]/reviews` - Submit review (authenticated)

### Admin
- `POST /api/admin/servers/[id]/approve` - Approve server (admin only)

### Auctions
- `GET /api/auctions` - List all active auctions
- `GET /api/auctions/[id]` - Get auction details with all bids
- `POST /api/auctions/[id]/bid` - Place a bid (authenticated, server owner)
- `POST /api/auctions` - Create auction (admin only)

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
