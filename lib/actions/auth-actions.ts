"use server"

import { db } from "@/lib/db"
import { hash } from "bcrypt"
import { z } from "zod"

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
})

type RegisterData = z.infer<typeof registerSchema>

export async function registerUser(data: RegisterData) {
  try {
    // Validate input data
    const validatedData = registerSchema.parse(data)

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email: validatedData.email },
    })

    if (existingUser) {
      return { error: "User with this email already exists" }
    }

    // Hash password
    const hashedPassword = await hash(validatedData.password, 10)

    // Create user
    const user = await db.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
      },
    })

    return { success: true, userId: user.id }
  } catch (error) {
    console.error("Registration error:", error)
    if (error instanceof z.ZodError) {
      return { error: "Invalid input data" }
    }
    return { error: "Failed to register user" }
  }
}
