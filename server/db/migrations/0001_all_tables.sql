CREATE TABLE "expense_by_category" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"expense_summary_id" varchar(64) NOT NULL,
	"category" varchar(64) DEFAULT 'unknown' NOT NULL,
	"amount" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"terminated_at" timestamp (3) with time zone
);
--> statement-breakpoint
CREATE TABLE "expenses" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"category" varchar(64) DEFAULT 'unknown' NOT NULL,
	"amount" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"terminated_at" timestamp (3) with time zone
);
--> statement-breakpoint
CREATE TABLE "expense_summary" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"total_expense" numeric(3) DEFAULT '0' NOT NULL,
	"created_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"terminated_at" timestamp (3) with time zone
);
--> statement-breakpoint
CREATE TABLE "sales_summary" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"total_value" numeric(3) DEFAULT '0' NOT NULL,
	"change_percentage" numeric(3) DEFAULT '0' NOT NULL,
	"created_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"terminated_at" timestamp (3) with time zone
);
--> statement-breakpoint
ALTER TABLE "expense_by_category" ADD CONSTRAINT "expense_by_category_expense_summary_id_expense_summary_id_fk" FOREIGN KEY ("expense_summary_id") REFERENCES "public"."expense_summary"("id") ON DELETE no action ON UPDATE no action;