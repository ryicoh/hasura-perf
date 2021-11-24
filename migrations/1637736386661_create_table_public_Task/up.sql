CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."Task"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "project_id" uuid NOT NULL, "name" text NOT NULL, "body" text NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("project_id") REFERENCES "public"."Project"("id") ON UPDATE restrict ON DELETE cascade);
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_Task_updated_at"
BEFORE UPDATE ON "public"."Task"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_Task_updated_at" ON "public"."Task" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
