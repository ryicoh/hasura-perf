CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."SubTaskAssignee"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "sub_task_id" uuid NOT NULL, "user_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("sub_task_id") REFERENCES "public"."SubTask"("id") ON UPDATE restrict ON DELETE cascade, FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON UPDATE restrict ON DELETE cascade);
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
CREATE TRIGGER "set_public_SubTaskAssignee_updated_at"
BEFORE UPDATE ON "public"."SubTaskAssignee"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_SubTaskAssignee_updated_at" ON "public"."SubTaskAssignee" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
