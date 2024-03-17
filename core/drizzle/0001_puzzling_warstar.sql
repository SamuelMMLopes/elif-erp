DO $$ BEGIN
 CREATE TYPE "organization_type" AS ENUM('individual', 'corporate');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "type" "organization_type" DEFAULT 'individual' NOT NULL;