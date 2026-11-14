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
- `ADMIN_PASSWORD`: Password for `/admin` access.

Waitlist registrations are stored in PostgreSQL through Drizzle. Email delivery is attempted only when Resend is configured; a delivery failure does not undo a successful database registration. `ADMIN_NOTIFICATION_EMAIL` is optional and enables the extra business notification.

The waitlist form collects a visitor's full name, email address, location, and perfume preferences.

`ADMIN_NOTIFICATION_EMAIL` is optional.

## Database and Drizzle

The project includes a Drizzle schema for the namespaced `willscent_waitlist_subscribers` table in `db/schema.ts`. The table name is prefixed to avoid collisions in a shared PostgreSQL database.

Generate a migration and apply it to the configured PostgreSQL database:

```bash
pnpm db:generate
pnpm db:migrate
```

These migrations create the WILLSCENT table and its indexes; they do not drop or modify unrelated database objects. Ensure the Pxxl database credentials have permission to create tables and indexes before applying.

## Admin access

Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env` locally and in your host's environment variables, then restart or redeploy. Sign in at `/admin/login`. Use a long, unique password. Changing it logs out all existing admin sessions.

## Production build

```bash
pnpm build
```
