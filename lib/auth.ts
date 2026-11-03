import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import argon2 from "argon2";

const SESSION_COOKIE_NAME = "willscnt_admin_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 12;

export function adminSessionPayload(email: string) {
  return {
    email,
    exp: Date.now() + SESSION_DURATION_MS,
  };
}

export function signAdminSession(email: string) {
  const payload = adminSessionPayload(email);
  const serialized = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is required to create an admin session.");
  }
  const signature = crypto
    .createHmac("sha256", secret)
    .update(serialized)
    .digest("base64url");

  return `${serialized}.${signature}`;
}

export function verifyAdminSession(token: string | null | undefined) {
  if (!token) {
    return null;
  }

  const [payloadPart, signaturePart] = token.split(".");
  if (!payloadPart || !signaturePart) {
    return null;
  }

  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    return null;
  }
  const expected = crypto
    .createHmac("sha256", secret)
    .update(payloadPart)
    .digest("base64url");

  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signaturePart);
  if (
    expectedBuffer.length === signatureBuffer.length &&
    crypto.timingSafeEqual(expectedBuffer, signatureBuffer)
  ) {
    try {
      const payload = JSON.parse(Buffer.from(payloadPart, "base64url").toString("utf8")) as {
        email: string;
        exp: number;
      };

      if (payload.exp > Date.now() && payload.email === process.env.ADMIN_EMAIL) {
        return payload;
      }
    } catch {
      return null;
    }
  }

  return null;
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value ?? null;
  return verifyAdminSession(sessionToken);
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

export async function verifyAdminPassword(password: string, hash: string) {
  if (!hash) {
    return false;
  }

  try {
    return await argon2.verify(hash, password);
  } catch {
    return false;
  }
}

export function verifyDevelopmentAdminPassword(password: string, configuredPassword: string) {
  const provided = Buffer.from(password);
  const configured = Buffer.from(configuredPassword);

  return (
    provided.length === configured.length &&
    crypto.timingSafeEqual(provided, configured)
  );
}
