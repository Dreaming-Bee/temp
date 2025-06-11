-- This script seeds the database with initial data
-- It will be executed by the setup script

-- Create a test user with password "password123"
-- In a real application, you would use bcrypt to hash the password
INSERT INTO "User" (id, name, email, password, "createdAt", "updatedAt")
VALUES (
  'cltest123456',
  'Test User',
  'test@example.com',
  '$2b$10$rG4FZ1GH1.o/6LgS.Xz9KOBLpLPxmXSgZ.8N0iJB5xEOzLX0R9/9q', -- bcrypt hash for "password123"
  NOW(),
  NOW()
)
ON CONFLICT (email) DO NOTHING;

-- You can add more seed data here as needed
