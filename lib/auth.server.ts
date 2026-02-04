import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

export type SessionUser = {
  id: string;
  email: string;
  role: "user" | "admin";
};

export async function requireUser(): Promise<SessionUser> {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;
  if (!user?.id || !user?.email) throw new Error("UNAUTHORIZED");
  return {
    id: String(user.id),
    email: String(user.email),
    role: (user.role === "admin" ? "admin" : "user") as SessionUser["role"],
  };
}

export async function requireAdmin(): Promise<SessionUser> {
  const user = await requireUser();
  if (user.role !== "admin") throw new Error("FORBIDDEN");
  return user;
}

