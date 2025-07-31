import type { Request, Response, NextFunction } from "express"
import { prismaClient } from "store/client"

// Simple auth middleware without JWT for now
export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.headers

    if (!userId) {
      return res.status(401).json({
        error: "User ID is required in headers"
      })
    }

    // Verify user exists
    const user = await prismaClient.user.findUnique({
      where: { id: userId as string }
    })

    if (!user) {
      return res.status(401).json({
        error: "Invalid user"
      })
    }

    // Add user to request object
    req.user = {
      id: user.id,
      username: user.username
    }

    next()
  } catch (error) {
    console.error("Auth middleware error:", error)
    return res.status(500).json({
      error: "Internal server error"
    })
  }
}

// Optional auth middleware
export const optionalAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.headers

    if (userId) {
      const user = await prismaClient.user.findUnique({
        where: { id: userId as string }
      })

      if (user) {
        req.user = {
          id: user.id,
          username: user.username
        }
      }
    }

    next()
  } catch (error) {
    console.error("Optional auth middleware error:", error)
    next() // Continue even if auth fails
  }
}

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        username: string
      }
    }
  }
}
