CREATE TABLE IF NOT EXISTS "organizations" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"document" text NOT NULL,
	"slug" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "organizations_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"username" text NOT NULL,
	"organization_id" text NOT NULL,
	"is_organization_owner" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_organization_id_unique" UNIQUE("username","organization_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth_codes" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"code" text NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth_codes" ADD CONSTRAINT "auth_codes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
