import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createInterface } from "node:readline/promises";
import argon2 from "argon2";

async function readAdminHash() {
  for (const filename of [".env.local", ".env"]) {
    let contents;
    try {
      contents = await readFile(resolve(process.cwd(), filename), "utf8");
    } catch (error) {
      if (error.code === "ENOENT") {
        continue;
      }
      throw error;
    }

    const matches = contents
      .split(/\r?\n/)
      .filter((line) => /^\s*ADMIN_PASSWORD_HASH\s*=/.test(line));

    if (matches.length > 1) {
      throw new Error(`${filename} contains multiple ADMIN_PASSWORD_HASH entries.`);
    }

    if (matches.length === 1) {
      const match = matches[0].match(/^\s*ADMIN_PASSWORD_HASH\s*=\s*(.*?)\s*$/);
      let hash = match?.[1] ?? "";
      if (
        hash.length >= 2 &&
        ((hash.startsWith('"') && hash.endsWith('"')) ||
          (hash.startsWith("'") && hash.endsWith("'")))
      ) {
        hash = hash.slice(1, -1);
      }

      if (!hash) {
        throw new Error(`${filename} has an empty ADMIN_PASSWORD_HASH.`);
      }

      return { filename, hash };
    }
  }

  throw new Error("No ADMIN_PASSWORD_HASH was found in .env.local or .env.");
}

async function main() {
  if (!process.stdin.isTTY) {
    throw new Error("Run this command in an interactive terminal.");
  }

  const prompt = createInterface({ input: process.stdin, output: process.stdout });
  let password;
  try {
    password = await prompt.question("Enter the admin password to check (input is visible): ");
  } finally {
    prompt.close();
  }

  const { filename, hash } = await readAdminHash();
  let matches;
  try {
    matches = await argon2.verify(hash, password);
  } catch {
    throw new Error(`${filename} contains a password hash that cannot be verified. Run pnpm admin:setup again.`);
  }

  if (!matches) {
    process.stdout.write(`Password does not match the hash saved in ${filename}.\n`);
    process.exitCode = 1;
    return;
  }

  process.stdout.write(`Password matches the hash saved in ${filename}.\n`);
  process.stdout.write("If web login still rejects it, restart the Next.js server to reload the environment.\n");
}

try {
  await main();
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : "Admin password check failed."}\n`);
  process.exitCode = 1;
}
