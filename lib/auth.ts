import jwt from "jsonwebtoken";
import type { User } from "@/types";

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export function generateToken(user: Pick<User, "id" | "email">): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    }
  );
}

export function verifyToken(token: string): { id: string; email: string } {
  const decoded = jwt.verify(token, JWT_SECRET) as {
    id: string;
    email: string;
  };
  return decoded;
}

export function parseAuthHeader(
  authHeader: string | undefined
): string | null {
  if (!authHeader) return null;
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") return null;
  return parts[1];
}
