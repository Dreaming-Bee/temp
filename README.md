# Secure Next.js Template

A secure Next.js template with authentication, Prisma, Docker, and shadcn/ui components.

## Features

- 🔒 Secure authentication with NextAuth.js
- 🛢️ PostgreSQL database with Prisma ORM
- 🐳 Docker setup for development and production
- 🎨 UI components with shadcn/ui
- 🔐 Security best practices implemented
- 🚀 Next.js App Router
- 🧩 TypeScript for type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- Docker and Docker Compose
- npm or yarn

### Setup

1. Clone the repository:

\`\`\`bash
git clone https://github.com/yourusername/secure-nextjs-template.git
cd secure-nextjs-template
\`\`\`

2. Install dependencies:

\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the setup script:

\`\`\`bash
npm run setup
# or
yarn setup
\`\`\`

This script will:
- Create a `.env` file from `.env.example`
- Generate a secure random string for `NEXTAUTH_SECRET`
- Start the PostgreSQL database with Docker Compose
- Run Prisma migrations

4. Start the development server:

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

\`\`\`
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nextjs_template?schema=public"

# Next Auth
NEXTAUTH_SECRET="your-secret-key-at-least-32-chars"
NEXTAUTH_URL="http://localhost:3000"

# Environment
NODE_ENV="development"
\`\`\`

## Docker

### Development

Start only the database:

\`\`\`bash
npm run docker:dev
# or
yarn docker:dev
\`\`\`

### Production

Build and start the application:

\`\`\`bash
npm run docker:build
npm run docker:up
# or
yarn docker:build
yarn docker:up
\`\`\`

Stop the application:

\`\`\`bash
npm run docker:down
# or
yarn docker:down
\`\`\`

## Database

### Prisma Studio

Open Prisma Studio to manage your database:

\`\`\`bash
npm run db:studio
# or
yarn db:studio
\`\`\`

### Migrations

Create a new migration:

\`\`\`bash
npm run db:migrate
# or
yarn db:migrate
\`\`\`

## Security Features

- CSRF protection
- Content Security Policy
- Secure HTTP headers
- Password hashing with bcrypt
- Input validation with Zod
- Environment variable validation
- Rate limiting
- Secure cookie handling

## License

This project is licensed under the MIT License.
