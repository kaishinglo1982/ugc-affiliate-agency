ALTER TABLE "session"
  ADD COLUMN IF NOT EXISTS "activeOrganizationId" text;

CREATE TABLE IF NOT EXISTS "organization" (
  "id" text PRIMARY KEY NOT NULL,
  "name" text NOT NULL,
  "slug" text NOT NULL,
  "logo" text,
  "metadata" text,
  "createdAt" timestamp DEFAULT now() NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "organization_slug_unique"
  ON "organization" ("slug");

CREATE TABLE IF NOT EXISTS "member" (
  "id" text PRIMARY KEY NOT NULL,
  "organizationId" text NOT NULL,
  "userId" text NOT NULL,
  "role" text DEFAULT 'member' NOT NULL,
  "createdAt" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "member_organizationId_organization_id_fk"
    FOREIGN KEY ("organizationId") REFERENCES "organization"("id")
    ON DELETE CASCADE,
  CONSTRAINT "member_userId_user_id_fk"
    FOREIGN KEY ("userId") REFERENCES "user"("id")
    ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "member_organization_user_unique"
  ON "member" ("organizationId", "userId");
CREATE INDEX IF NOT EXISTS "member_organization_id_idx"
  ON "member" ("organizationId");
CREATE INDEX IF NOT EXISTS "member_user_id_idx"
  ON "member" ("userId");

CREATE TABLE IF NOT EXISTS "invitation" (
  "id" text PRIMARY KEY NOT NULL,
  "organizationId" text NOT NULL,
  "email" text NOT NULL,
  "role" text,
  "status" text DEFAULT 'pending' NOT NULL,
  "expiresAt" timestamp NOT NULL,
  "inviterId" text NOT NULL,
  CONSTRAINT "invitation_organizationId_organization_id_fk"
    FOREIGN KEY ("organizationId") REFERENCES "organization"("id")
    ON DELETE CASCADE,
  CONSTRAINT "invitation_inviterId_user_id_fk"
    FOREIGN KEY ("inviterId") REFERENCES "user"("id")
    ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "invitation_organization_id_idx"
  ON "invitation" ("organizationId");
CREATE INDEX IF NOT EXISTS "invitation_email_idx"
  ON "invitation" ("email");
CREATE INDEX IF NOT EXISTS "session_user_id_idx"
  ON "session" ("userId");
CREATE INDEX IF NOT EXISTS "session_active_organization_idx"
  ON "session" ("activeOrganizationId");
