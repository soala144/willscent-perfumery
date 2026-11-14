import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const SESSION_COOKIE_NAME = "willscnt_admin_session";
export const SESSION_DURATION_SECONDS = 60 * 60 * 12;

// Admin access is configured with just two env vars: ADMIN_EMAIL and ADMIN_PASSWORD.
export function getAdminCredentials() {
  const email = process.env.ADMIN_EMAIL?.trim();
  const password = process.env.ADMIN_PASSWORD;
  return email && password ? { email, password } : null;
}

// Sessions are signed with a key derived from the admin credentials,
// so changing the password logs out every existing session.
function signingKey(credentials: { email: string; password: string }) {
  return crypto
    .createHash("sha256")
    .update(`willscent-admin-session:${credentials.email.toLowerCase()}:${credentials.password}`)
    .digest();
}

function sign(value: string, key: Buffer) {
  return crypto.createHmac("sha256", key).update(value).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const left = crypto.createHash("sha256").update(a).digest();
  const right = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(left, right);
}

export function checkAdminLogin(email: string, password: string) {
  const credentials = getAdminCredentials();
  if (!credentials) return false;
  const emailMatches = safeEqual(email.trim().toLowerCase(), credentials.email.toLowerCase());
  const passwordMatches = safeEqual(password, credentials.password);
  return emailMatches && passwordMatches;
}

export function createAdminSession() {
  const credentials = getAdminCredentials();
  if (!credentials) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required.");
  }
  const payload = Buffer.from(
    JSON.stringify({ email: credentials.email, exp: Date.now() + SESSION_DURATION_SECONDS * 1000 }),
  ).toString("base64url");
  return `${payload}.${sign(payload, signingKey(credentials))}`;
}

export function verifyAdminSession(token: string | null | undefined) {
  const credentials = getAdminCredentials();
  if (!token || !credentials) return null;

  const [payloadPart, signaturePart] = token.split(".");
  if (!payloadPart || !signaturePart) return null;
  if (!safeEqual(signaturePart, sign(payloadPart, signingKey(credentials)))) return null;

  try {
    const payload = JSON.parse(Buffer.from(payloadPart, "base64url").toString("utf8")) as {
      email: string;
      exp: number;
    };
    return payload.exp > Date.now() ? payload : null;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  return verifyAdminSession(cookieStore.get(SESSION_COOKIE_NAME)?.value);
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}
