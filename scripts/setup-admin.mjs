import { randomBytes } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createInterface } from "node:readline/promises";
import argon2 from "argon2";

async function updateEnvFile(key, value) {
  let envPath = resolve(process.cwd(), ".env.local");
  let contents = "";

  try {
    contents = await readFile(envPath, "utf8");
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
    envPath = resolve(process.cwd(), ".env");
    try {
      contents = await readFile(envPath, "utf8");
    } catch (fallbackError) {
      if (fallbackError.code !== "ENOENT") {
        throw fallbackError;
      }
      envPath = resolve(process.cwd(), ".env.local");
    }
  }

  if (/[\r\n]/.test(value)) {
    throw new Error("Environment values cannot contain line breaks.");
  }
  const escapedValue = value
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\$/g, "\\$");
  const assignment = `${key}="${escapedValue}"`;
  const matcher = new RegExp(`^[\\t ]*${key}[\\t ]*=.*$`, "m");
  const nextContents = matcher.test(contents)
    ? contents.replace(matcher, assignment)
    : `${contents}${contents && !contents.endsWith("\n") ? "\n" : ""}${assignment}\n`;

  await writeFile(envPath, nextContents, "utf8");
}

async function main() {
  if (!process.stdin.isTTY) {
    throw new Error("Run this command in an interactive terminal.");
  }

  const prompt = createInterface({ input: process.stdin, output: process.stdout });
  let password;
  let confirmation;
  try {
    password = await prompt.question("Create admin password (minimum 8 characters; input is visible): ");
    confirmation = await prompt.question("Confirm admin password: ");
  } finally {
    prompt.close();
  }

  if (password.length < 8) {
    throw new Error("Use an admin password with at least 8 characters.");
  }

  if (password !== confirmation) {
    throw new Error("The passwords did not match. No environment values were changed.");
  }

  const hash = await argon2.hash(password, { type: argon2.argon2id });
  if (!(await argon2.verify(hash, password))) {
    throw new Error("The generated password hash could not be verified; environment values were not changed.");
  }
  const sessionSecret = randomBytes(32).toString("base64url");

  await updateEnvFile("ADMIN_PASSWORD", password);
  await updateEnvFile("ADMIN_PASSWORD_HASH", hash);
  await updateEnvFile("SESSION_SECRET", sessionSecret);

  process.stdout.write("Admin password, Argon2id hash, and session secret saved to your local environment file.\n");
  process.stdout.write("The app uses ADMIN_PASSWORD only in development; production must use ADMIN_PASSWORD_HASH.\n");
  process.stdout.write("Restart the Next.js server to load the updated environment.\n");
}

try {
  await main();
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : "Admin setup failed."}\n`);
  process.exitCode = 1;
}
