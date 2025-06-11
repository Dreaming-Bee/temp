// This script sets up the project by creating the database and running migrations
const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

console.log("🚀 Setting up the project...")

// Check if .env file exists, if not create it from .env.example
if (!fs.existsSync(".env")) {
  console.log("📄 Creating .env file from .env.example")
  fs.copyFileSync(".env.example", ".env")
  console.log("✅ Created .env file")
}

// Generate a secure random string for NEXTAUTH_SECRET
const crypto = require("crypto")
const secureSecret = crypto.randomBytes(32).toString("hex")

// Update NEXTAUTH_SECRET in .env file
console.log("🔑 Generating secure NEXTAUTH_SECRET")
const envContent = fs.readFileSync(".env", "utf8")
const updatedEnvContent = envContent.replace(/NEXTAUTH_SECRET=".*"/, `NEXTAUTH_SECRET="${secureSecret}"`)
fs.writeFileSync(".env", updatedEnvContent)
console.log("✅ Updated NEXTAUTH_SECRET in .env file")

// Start the database with Docker Compose
console.log("🐳 Starting PostgreSQL database with Docker Compose")
try {
  execSync("docker-compose -f docker-compose.dev.yml up -d", { stdio: "inherit" })
  console.log("✅ Database started successfully")
} catch (error) {
  console.error("❌ Failed to start the database:", error.message)
  process.exit(1)
}

// Wait for the database to be ready
console.log("⏳ Waiting for the database to be ready...")
setTimeout(() => {
  // Run Prisma migrations
  console.log("🔄 Running Prisma migrations")
  try {
    execSync("npx prisma migrate dev --name init", { stdio: "inherit" })
    console.log("✅ Prisma migrations completed")
  } catch (error) {
    console.error("❌ Failed to run Prisma migrations:", error.message)
    process.exit(1)
  }

  console.log("🎉 Setup completed successfully!")
  console.log("\nNext steps:")
  console.log("1. Run `npm run dev` to start the development server")
  console.log("2. Open http://localhost:3000 in your browser")
}, 5000)
