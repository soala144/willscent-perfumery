# Will-Scent Perfumery

A premium Next.js waitlist experience for Will-Scent Perfumery.

## Overview

This project delivers a luxury mobile-first landing page, waitlist registration flow, and protected admin area for managing subscriber interest. It is built with Next.js App Router, TypeScript, Tailwind CSS, Zod validation, and a modular service layer designed for future product catalogue expansion.

## Local development

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Environment configuration

Copy `.env.example` to `.env.local` and fill in values as needed:

```bash
cp .env.example .env.local
```

Environment variables:

- `DATABASE_URL`: PostgreSQL connection string for Drizzle/Pxxl integration.
- `RESEND_API_KEY`: API key for transactional email delivery.
- `EMAIL_FROM`: Verified sender address used by Resend.
- `ADMIN_NOTIFICATION_EMAIL`: Business inbox for new-signup alerts.
- `NEXT_PUBLIC_SITE_URL`: Public application URL used by email links and metadata.
- `ADMIN_EMAIL`: Administrator email for `/admin` access.
- `ADMIN_PASSWORD`: Plaintext admin password used only for local development. Do not set this in production.
- `ADMIN_PASSWORD_HASH`: Argon2id password hash used for production admin authentication.
- `SESSION_SECRET`: Secret used to sign admin session cookies.

Waitlist registrations are stored in PostgreSQL through Drizzle. Email delivery is attempted only when Resend is configured; a delivery failure does not undo a successful database registration. `ADMIN_NOTIFICATION_EMAIL` is optional and enables the extra business notification.

The waitlist form collects a visitor's full name, email address, location, and perfume preferences.

`ADMIN_NOTIFICATION_EMAIL` is optional. Run `pnpm admin:setup` to create `ADMIN_PASSWORD_HASH` and `SESSION_SECRET`.

## Database and Drizzle

The project includes a Drizzle schema for the namespaced `willscent_waitlist_subscribers` table in `db/schema.ts`. The table name is prefixed to avoid collisions in a shared PostgreSQL database.

Generate a migration and apply it to the configured PostgreSQL database:

```bash
pnpm db:generate
pnpm db:migrate
```

These migrations create the WILLSCENT table and its indexes; they do not drop or modify unrelated database objects. Ensure the Pxxl database credentials have permission to create tables and indexes before applying.

## Admin setup

Set `ADMIN_EMAIL` and then run the interactive setup command:

```bash
pnpm admin:setup
```

The command displays password input as you type, checks for an 8-character minimum and confirmation, creates an Argon2id password hash, generates a random session secret, and saves the password, hash, and session secret to `.env.local` (or `.env` if `.env.local` does not exist). In development the app compares the entered password with `ADMIN_PASSWORD` directly, so it is easy to verify. Production ignores `ADMIN_PASSWORD` and uses `ADMIN_PASSWORD_HASH`. The password you type will be visible on screen; the hash and session secret are not printed.

Restart the Next.js server after setup. Admin login also requires `SESSION_SECRET` to be set; the setup command creates it automatically. Never deploy the plaintext `ADMIN_PASSWORD` variable; configure `ADMIN_PASSWORD_HASH` and `SESSION_SECRET` in the production secret manager instead.

To check whether a password matches the hash currently saved on disk without logging in, run:

```bash
pnpm admin:verify
```

The password is visible in the terminal while checking. If the check succeeds but the website still rejects the password, restart the Next.js server to reload `.env.local` or `.env`.

## Production build

```bash
pnpm build
```
