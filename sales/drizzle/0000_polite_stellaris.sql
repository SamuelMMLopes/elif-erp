DO $$ BEGIN
 CREATE TYPE "customer_type" AS ENUM('individual', 'corporate');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customers" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"type" "customer_type" NOT NULL,
	"document" text NOT NULL,
	"organization_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "customers_document_organization_id_unique" UNIQUE("document","organization_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organizations" (
	"id" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "customers" ADD CONSTRAINT "customers_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
