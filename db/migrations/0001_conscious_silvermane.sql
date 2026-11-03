ALTER TABLE "willscent_waitlist_subscribers" ADD COLUMN "full_name" varchar(150) DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "willscent_waitlist_subscribers" ALTER COLUMN "full_name" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "willscent_waitlist_subscribers" ADD COLUMN "whatsapp_number" varchar(30) DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "willscent_waitlist_subscribers" ALTER COLUMN "whatsapp_number" DROP DEFAULT;