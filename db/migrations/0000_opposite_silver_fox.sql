CREATE TABLE "willscent_waitlist_subscribers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"location" varchar(255) NOT NULL,
	"fragrance_interests" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "waitlist_subscriber_email_unique" ON "willscent_waitlist_subscribers" USING btree ("email");--> statement-breakpoint
CREATE INDEX "waitlist_subscriber_created_at_index" ON "willscent_waitlist_subscribers" USING btree ("created_at");