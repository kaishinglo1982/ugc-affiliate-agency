ALTER TABLE "invitation"
  ADD COLUMN IF NOT EXISTS "createdAt" timestamp DEFAULT now() NOT NULL;
