import { NextResponse } from "next/server";
import { z } from "zod";
import {
  checkAdminLogin,
  createAdminSession,
  getAdminCredentials,
  SESSION_COOKIE_NAME,
  SESSION_DURATION_SECONDS,
} from "@/lib/auth";

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const parsed = loginSchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) {
      return NextResponse.json({ error: "Please enter a valid email and password." }, { status: 400 });
    }

    if (!getAdminCredentials()) {
      return NextResponse.json(
        { error: "Admin access is not configured. Set ADMIN_EMAIL and ADMIN_PASSWORD." },
        { status: 503 },
      );
    }

    if (!checkAdminLogin(parsed.data.email, parsed.data.password)) {
      return NextResponse.json({ error: "Incorrect email or password." }, { status: 401 });
    }

    const response = NextResponse.json({ success: true, message: "Logged in successfully." });
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: createAdminSession(),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_DURATION_SECONDS,
    });
    return response;
  } catch (error) {
    console.error("Admin login failed", error);
    return NextResponse.json({ error: "Unable to log in right now." }, { status: 500 });
  }
}
