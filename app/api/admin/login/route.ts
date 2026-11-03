import { NextResponse } from "next/server";
import { z } from "zod";
import {
  signAdminSession,
  verifyAdminPassword,
  verifyDevelopmentAdminPassword,
} from "@/lib/auth";

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8),
});

function invalidCredentials(reason: "email" | "password") {
  const isDevelopment = process.env.NODE_ENV !== "production";

  if (isDevelopment) {
    return NextResponse.json(
      {
        error:
          reason === "email"
            ? "The email does not match the configured admin email."
            : "The password does not match the configured admin password.",
        code: reason === "email" ? "ADMIN_EMAIL_MISMATCH" : "ADMIN_PASSWORD_MISMATCH",
      },
      { status: 401 },
    );
  }

  return NextResponse.json(
    {
      error: "Invalid credentials.",
    },
    { status: 401 },
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const parsed = loginSchema.safeParse({
      email: body.email,
      password: body.password,
    });

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Please enter a valid email and password.",
        },
        { status: 400 },
      );
    }

    const adminEmail = process.env.ADMIN_EMAIL?.trim();
    const passwordHash = process.env.ADMIN_PASSWORD_HASH?.trim();
    const developmentPassword = process.env.ADMIN_PASSWORD;
    const sessionSecret = process.env.SESSION_SECRET?.trim();
    const useDevelopmentPassword =
      process.env.NODE_ENV !== "production" && developmentPassword !== undefined;

    if (
      !adminEmail ||
      (!useDevelopmentPassword && !passwordHash) ||
      !sessionSecret
    ) {
      return NextResponse.json(
        {
          error:
            "Admin access is not configured. Set ADMIN_EMAIL, the development ADMIN_PASSWORD or production ADMIN_PASSWORD_HASH, and SESSION_SECRET.",
        },
        { status: 503 },
      );
    }

    if (parsed.data.email.toLowerCase() !== adminEmail.toLowerCase()) {
      return invalidCredentials("email");
    }

    const passwordMatches = useDevelopmentPassword
      ? verifyDevelopmentAdminPassword(parsed.data.password, developmentPassword)
      : await verifyAdminPassword(parsed.data.password, passwordHash!);

    if (!passwordMatches) {
      return invalidCredentials("password");
    }

    const response = NextResponse.json({
      success: true,
      message: "Logged in successfully.",
    });

    response.cookies.set({
      name: "willscnt_admin_session",
      value: signAdminSession(adminEmail),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 12,
    });

    return response;
  } catch (error) {
    console.error("Admin login failed", error);
    return NextResponse.json(
      {
        error: "Unable to authenticate at the moment.",
      },
      { status: 500 },
    );
  }
}
