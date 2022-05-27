
BEGIN;

DROP TABLE IF EXISTS "user",
"list",
"card",
"card_has_tag",
"tag";

-- -----------------------------------------------------
-- Table "user"
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS "user" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "firstname" TEXT NOT NULL,
  "lastname" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);

-- -----------------------------------------------------
-- Table "list"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "list" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL DEFAULT 'liste vide',
  "position" INTEGER NOT NULL DEFAULT 1,
  "user_id" INTEGER NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);

-- -----------------------------------------------------
-- Table "card"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "card" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL DEFAULT 'Carte vide',
  "position" INTEGER NOT NULL,
  "color" text NOT NULL DEFAULT '#FFF',
  "list_id" integer NOT NULL REFERENCES "list" ("id") ON DELETE CASCADE,
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);

-- -----------------------------------------------------
-- Table "tag"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "tag" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" text NOT NULL DEFAULT 'Tag vide',
  "color" text NOT NULL DEFAULT '#FFF',
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);

-- -----------------------------------------------------
-- Table "card_has_tag"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "card_has_tag" (
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "card_id" integer NOT NULL REFERENCES "card"("id") ON DELETE CASCADE,
  "tag_id" integer NOT NULL REFERENCES "tag" ("id") ON DELETE CASCADE,
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE ("card_id", "tag_id")
);

COMMIT;