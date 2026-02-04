import { NextRequest } from "next/server";
import { z } from "zod";
import { createUser } from "@/lib/mockDb";
import { jsonError, jsonOk } from "@/lib/api";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(4, "Password must be at least 4 characters."),
});

export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return jsonError("Invalid input", 400, { issues: parsed.error.issues });
  }

  const { email, password } = parsed.data;

  try {
    const user = await createUser({ email, password });
    return jsonOk({
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    });
  } catch (err) {
    if (err instanceof Error && err.message === "User already exists") {
      return jsonError("User already exists", 409);
    }
    return jsonError("Failed to create user", 500);
  }
}

