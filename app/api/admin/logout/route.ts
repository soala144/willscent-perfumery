import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Logged out." });
  response.cookies.set({
    name: "willscnt_admin_session",
    value: "",
    httpOnly: true,
    path: "/",
    maxAge: 0,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return response;
}
