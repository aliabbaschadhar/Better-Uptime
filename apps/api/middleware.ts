import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET;

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send({
      message: "Unauthorized: No token provided",
    });
  }

  try {

    const decoded = jwt.verify(token, JWT_SECRET!)
    req.userId = (decoded as JwtPayload).userId as string;
    next();

  } catch (error) {
    console.error("JWT verification failed:", error);
    return res.status(403).send({
      message: "Forbidden: Invalid token",
    });

  }
}