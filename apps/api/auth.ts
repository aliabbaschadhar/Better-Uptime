import { Router } from "express"
import { z } from "zod"
import { prismaClient } from "store/client"
import bcrypt from "bcrypt"

const authRouter = Router()

// Validation schemas
const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password is too long")
})

const signinSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required")
})

// Signup endpoint
authRouter.post("/signup", async (req, res) => {
  try {
    // Validate input with Zod
    const validationResult = signupSchema.safeParse(req.body)

    if (!validationResult.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: validationResult.error.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message
        }))
      })
    }

    const { username, password } = validationResult.data

    // Check if user already exists
    const existingUser = await prismaClient.user.findUnique({
      where: { username }
    })

    if (existingUser) {
      return res.status(409).json({
        error: "Username already exists"
      })
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prismaClient.user.create({
      data: {
        username,
        password: hashedPassword
      }
    })

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        username: user.username
      }
    })

  } catch (error) {
    console.error("Signup error:", error)
    return res.status(500).json({
      error: "Internal server error"
    })
  }
})

// Signin endpoint
authRouter.post("/signin", async (req, res) => {
  try {
    // Validate input with Zod
    const validationResult = signinSchema.safeParse(req.body)

    if (!validationResult.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: validationResult.error.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message
        }))
      })
    }

    const { username, password } = validationResult.data

    // Find user
    const user = await prismaClient.user.findUnique({
      where: { username }
    })

    if (!user) {
      return res.status(401).json({
        error: "Invalid username or password"
      })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Invalid username or password"
      })
    }

    // Return user info (excluding password)
    return res.json({
      message: "Signin successful",
      user: {
        id: user.id,
        username: user.username
      }
    })

  } catch (error) {
    console.error("Signin error:", error)
    return res.status(500).json({
      error: "Internal server error"
    })
  }
})

export { authRouter }
